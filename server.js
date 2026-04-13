const express = require("express");
const path = require("path");
const youtubedl = require("youtube-dl-exec");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      skipDownload: true
    });

    const videoUrl =
      info.url ||
      (Array.isArray(info.formats) &&
        info.formats
          .filter(f => f.url && (f.vcodec !== "none" || f.ext === "mp4"))
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0]?.url);

    if (!videoUrl) {
      return res.status(500).json({ error: "Could not extract video URL" });
    }

    return res.json({
      ok: true,
      title: info.title || "TikTok Video",
      author: info.uploader || info.channel || "",
      thumbnail: info.thumbnail || "",
      videoUrl
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to process this TikTok link",
      details: err.message
    });
  }
});

app.get("/api/proxy", async (req, res) => {
  const fileUrl = req.query.url;
  if (!fileUrl) {
    return res.status(400).send("No file URL provided");
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return res.status(500).send("Failed to fetch video");
    }

    res.setHeader("Content-Type", response.headers.get("content-type") || "video/mp4");
    res.setHeader("Content-Disposition", 'attachment; filename="tiktok-video.mp4"');

    response.body.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(Buffer.from(chunk));
        },
        close() {
          res.end();
        },
        abort(err) {
          res.destroy(err);
        }
      })
    );
  } catch (err) {
    res.status(500).send("Proxy download failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
