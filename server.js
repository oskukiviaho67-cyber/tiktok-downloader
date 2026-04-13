const express = require('express');
const path = require('path');
const { Readable } = require('stream');
const youtubedl = require('youtube-dl-exec');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

function getBaseUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  return `${req.protocol}://${req.get('host')}`;
}

function isValidTikTokUrl(value) {
  if (!value) return false;
  try {
    const u = new URL(value);
    return [
      /(^|\.)tiktok\.com$/i,
      /(^|\.)vm\.tiktok\.com$/i,
      /(^|\.)vt\.tiktok\.com$/i,
      /(^|\.)m\.tiktok\.com$/i
    ].some((pattern) => pattern.test(u.hostname));
  } catch {
    return false;
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ ok: true, siteUrl: getBaseUrl(req) });
});

app.get('/robots.txt', (req, res) => {
  const site = getBaseUrl(req);
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const site = getBaseUrl(req);
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc></url>
  <url><loc>${site}/how-to-download-tiktok-videos</loc></url>
  <url><loc>${site}/download-tiktok-video-without-watermark</loc></url>
</urlset>`);
});

app.get('/how-to-download-tiktok-videos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'how-to-download-tiktok-videos.html'));
});

app.get('/download-tiktok-video-without-watermark', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'download-tiktok-video-without-watermark.html'));
});

app.get('/api/download', async (req, res) => {
  const url = (req.query.url || '').trim();

  if (!isValidTikTokUrl(url)) {
    return res.status(400).json({ error: 'Paste a valid TikTok URL.' });
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      noPlaylist: true,
      preferFreeFormats: true,
      addHeader: ['referer: https://www.tiktok.com/', 'user-agent: Mozilla/5.0'],
    });

    let direct = info.url;
    if (!direct && Array.isArray(info.formats) && info.formats.length) {
      const candidates = info.formats
        .filter((f) => f.url && (!f.ext || ['mp4', 'm4a', 'webm'].includes(String(f.ext).toLowerCase())))
        .sort((a, b) => (b.height || 0) - (a.height || 0) || (b.tbr || 0) - (a.tbr || 0));
      direct = candidates[0]?.url;
    }

    if (!direct) {
      return res.status(500).json({ error: 'Could not extract a downloadable video URL.' });
    }

    res.json({
      ok: true,
      title: info.title || 'TikTok video',
      thumbnail: info.thumbnail || '',
      author: info.uploader || info.channel || info.creator || '',
      videoUrl: direct,
      webpageUrl: info.webpage_url || url,
      description: info.description || ''
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Download failed. TikTok may have blocked this video or yt-dlp needs an update.'
    });
  }
});

app.get('/api/proxy', async (req, res) => {
  const fileUrl = (req.query.url || '').trim();
  if (!fileUrl) return res.status(400).send('Missing url');

  try {
    const response = await fetch(fileUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0',
        'referer': 'https://www.tiktok.com/'
      }
    });

    if (!response.ok || !response.body) {
      return res.status(502).send('Failed to fetch remote file');
    }

    const contentType = response.headers.get('content-type') || 'video/mp4';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');

    Readable.fromWeb(response.body).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy download failed');
  }
});

app.use((req, res) => {
  res.status(404).send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404</title><style>body{font-family:Arial,sans-serif;padding:40px;background:#f7f7f9;color:#111}a{color:#e91e63}</style></head><body><h1>404</h1><p>Page not found.</p><p><a href="/">Back home</a></p></body></html>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
