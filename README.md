# Render-ready TikTok downloader

## Deploy on Render
1. Upload this folder to GitHub.
2. In Render, create a new Web Service from the repo.
3. Render will detect `render.yaml`.
4. Deploy.

## Local run
```bash
npm install
npm start
```
Then open `http://localhost:3000`.

## Notes
- This app uses `youtube-dl-exec`, which downloads and uses `yt-dlp` during install/runtime.
- TikTok changes can break extraction occasionally, so updates may be needed.
