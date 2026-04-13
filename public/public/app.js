const form = document.getElementById("download-form");
const input = document.getElementById("video-url");
const button = document.getElementById("download-btn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const thumbEl = document.getElementById("thumb");
const titleEl = document.getElementById("video-title");
const authorEl = document.getElementById("video-author");
const directLinkEl = document.getElementById("direct-link");
const proxyLinkEl = document.getElementById("proxy-link");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = input.value.trim();
  if (!url) return;

  statusEl.textContent = "Checking the TikTok link...";
  button.disabled = true;
  resultEl.classList.remove("show");
  thumbEl.style.display = "none";

  try {
    const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to process the video");
    }

    if (data.thumbnail) {
      thumbEl.src = data.thumbnail;
      thumbEl.style.display = "block";
    }

    titleEl.textContent = data.title || "TikTok Video";
    authorEl.textContent = data.author ? `By ${data.author}` : "";
    directLinkEl.href = data.videoUrl;
    proxyLinkEl.href = `/api/proxy?url=${encodeURIComponent(data.videoUrl)}`;

    resultEl.classList.add("show");
    statusEl.textContent = "Ready. Choose an option below.";
  } catch (err) {
    statusEl.textContent = err.message || "Something went wrong.";
  } finally {
    button.disabled = false;
  }
});
