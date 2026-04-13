const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/download", (req, res) => {
  const url = req.query.url;

  if (!url) return res.status(400).send("No URL provided");

  exec(`yt-dlp -f best -g "${url}"`, (err, stdout) => {
    if (err) return res.status(500).send("Download error");

    res.json({ video: stdout.trim() });
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
