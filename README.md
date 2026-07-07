# Ibrahim Aslam — Animated Portfolio (v2)

A second, more visual take on the portfolio: single-page scroll, custom SVG icon set (no external icon library dependency), scroll-reveal animations, an orbiting-icon hero, magnetic buttons, and a subtle custom cursor.

## 1. Files

```
portfolio-v2/
├── index.html   → content, structure, and a self-contained SVG icon sprite
├── styles.css   → theme tokens, layout, animations, responsive rules
├── script.js    → reveal-on-scroll, cursor, magnetic buttons, skills/projects, form
└── assets/      → put your resume PDF and photo here
```

## 2. What makes this one different from v1

- **Visual style:** editorial/premium — serif display type (Fraunces) + a warm coral/violet/gold palette, instead of the code-editor look.
- **Icons:** a self-contained SVG icon sprite (HTML, CSS, JS, Node, MySQL, PHP, Python, Git, mail, phone, GitHub, LinkedIn, TikTok, etc.) — no external icon font to load, so it never breaks or flashes unstyled.
- **Motion:** scroll-triggered reveal animations, an orbiting icon ring around your photo in the hero, animated stat counters, magnetic hover on buttons, and a soft custom cursor on desktop.
- **New sections:** a "Process" section (how you work) and a "Testimonials" section — both help build client trust, which plain project lists don't do on their own.

## 3. Customize your content

| What | Where |
|---|---|
| Name, headline, bio | `index.html` → `<section class="hero">` and `<section id="about">` |
| Photo | Replace `<div class="portrait">IA</div>` with `<img>` and adjust `.portrait` CSS to `background:none` |
| Skills & percentages | `script.js` → the `skills` array |
| Projects | `script.js` → the `projects` array |
| Testimonials | `index.html` → `<section id="testimonials">`, replace with real client quotes once you have them |
| Résumé file | Add your PDF to `assets/` and update the `href` in the hero's "Download résumé" button |
| Email / phone / socials | `<section id="contact">` in `index.html` |

## 4. Set up the contact form (same as v1)

Works immediately via a `mailto:` fallback. For silent background sending, connect free EmailJS:

1. Create a free account at https://www.emailjs.com
2. Add an Email Service (e.g. Gmail) and a template with `{{name}}`, `{{email}}`, `{{message}}`.
3. In `script.js`, replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY` with your real values.

## 5. Preview locally

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## 6. Deploy for free

Same two options as before:

**GitHub Pages**
```bash
cd portfolio-v2
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Source: main / (root)** → Save.

**Cloudflare Pages**
Push to GitHub, then at https://pages.cloudflare.com choose **Create a project → Connect to Git**, framework preset **None**, output directory `/`, and deploy.

## 7. Ideas for next iterations

- Swap the placeholder testimonials for real client feedback once you have it
- Add real project screenshots as background images on `.work-item`
- Add a loading/intro screen if you want an even bigger first-impression moment
- Connect a custom domain once deployed (see v1's README for the exact steps)
