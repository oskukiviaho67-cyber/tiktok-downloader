:root {
  --bg: #f5f5f7;
  --panel: #ffffff;
  --text: #111318;
  --muted: #6b7280;
  --border: #ececf2;
  --accent: #ff2d8d;
  --accent-soft: #ffd9eb;
  --shadow: 0 12px 32px rgba(17, 19, 24, 0.06);
  --radius: 22px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
.container { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(12px);
  background: rgba(245,245,247,.82);
  border-bottom: 1px solid rgba(236,236,242,.8);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 0;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 1.05rem;
}
.brand-dot {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: linear-gradient(135deg, #111 0%, var(--accent) 100%);
}
.navlinks {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.navlinks a { color: var(--muted); font-weight: 600; }
.navlinks a:hover { color: var(--accent); }
.hero { padding: 42px 0 20px; }
.hero-wrap {
  background: linear-gradient(180deg, #fff 0%, #fff9fc 100%);
  border: 1px solid var(--border);
  border-radius: 30px;
  box-shadow: var(--shadow);
  padding: 42px 28px;
}
.hero-copy {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}
.kicker {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 700;
  font-size: .92rem;
  margin-bottom: 18px;
}
.hero h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.8rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
}
.accent { color: var(--accent); }
.hero p {
  margin: 14px auto 0;
  max-width: 680px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}
.form-shell {
  max-width: 760px;
  margin: 26px auto 0;
  padding: 14px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.input-row {
  display: flex;
  gap: 12px;
}
input[type=text] {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px 18px;
  font-size: 1rem;
  outline: none;
  background: #fbfbfd;
}
input[type=text]:focus {
  border-color: #ff9bc7;
  box-shadow: 0 0 0 4px rgba(255,45,141,.08);
}
button, .button {
  border: none;
  border-radius: 18px;
  padding: 18px 22px;
  font-weight: 800;
  font-size: .98rem;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #ff5cab 0%, #ff2d8d 100%);
  box-shadow: 0 12px 24px rgba(255,45,141,.18);
}
button.secondary, .button.secondary {
  background: #fff;
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: none;
}
button:disabled { opacity: .7; cursor: wait; }
.status {
  min-height: 24px;
  margin-top: 12px;
  color: var(--muted);
  text-align: center;
}
.result { display: none; margin-top: 20px; }
.result.show { display: block; }
.result-card {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  padding: 18px;
  text-align: left;
}
.preview {
  width: 100%;
  aspect-ratio: 9/16;
  object-fit: cover;
  border-radius: 18px;
  background: #f2f2f5;
}
.result-meta h3 {
  margin: 6px 0 8px;
  font-size: 1.35rem;
}
.result-meta p {
  margin: 0 0 14px;
  color: var(--muted);
}
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.section { padding: 34px 0; }
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 22px;
}
.icon-badge {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: #fff2f8;
  color: var(--accent);
  font-size: 1.2rem;
  margin-bottom: 14px;
}
.card h3 { margin: 0 0 8px; font-size: 1.05rem; }
.card p { margin: 0; color: var(--muted); line-height: 1.7; }
.center-head {
  text-align: center;
  margin-bottom: 24px;
}
.center-head h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  text-align: center;
}
.step-num {
  color: var(--accent);
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 12px;
}
.step h3 { margin: 0 0 8px; }
.step p { margin: 0; color: var(--muted); line-height: 1.7; }
.faq-wrap { max-width: 760px; margin: 0 auto; }
.faq-item {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
  margin-bottom: 12px;
  overflow: hidden;
}
.faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background: #fff;
  color: var(--text);
  font-weight: 700;
  box-shadow: none;
  border-radius: 0;
}
.faq-q::after {
  content: '+';
  color: var(--accent);
  font-size: 1.25rem;
}
.faq-item.open .faq-q::after { content: '–'; }
.faq-a {
  max-height: 0;
  overflow: hidden;
  color: var(--muted);
  line-height: 1.7;
  transition: max-height .25s ease;
  padding: 0 20px;
}
.faq-item.open .faq-a {
  max-height: 240px;
  padding: 0 20px 18px;
}
.content-card {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 28px;
  box-shadow: var(--shadow);
  padding: 28px;
  line-height: 1.8;
}
.content-card h2, .content-card h3 { line-height: 1.2; }
.footer {
  padding: 36px 0 58px;
  color: var(--muted);
  text-align: center;
}
@media (max-width: 900px) {
  .card-grid, .steps, .result-card { grid-template-columns: 1fr; }
  .input-row { flex-direction: column; }
  button, .button { width: 100%; text-align: center; }
}
