const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/download", (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  exec(`yt-dlp -f "bv*+ba/b" -g "${url}"`, (err, stdout, stderr) => {
    if (err || !stdout.trim()) {
      return res.status(500).json({
        error: "Failed to extract video",
        details: stderr || err?.message || "Unknown error"
      });
    }

    const lines = stdout.trim().split("\\n");
    const video = lines[0];

    return res.json({ video });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
