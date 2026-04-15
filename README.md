# Heartfelt Greetings — Website

Premium portfolio website for Heartfelt Greetings graphic design studio, Ajmer, Rajasthan.

## Setup

1. **Drop in your photos** — place any additional work images inside `pictures/` (or subcategories).
2. **Add a designer portrait** — name it `designer.jpg` and place it in `pictures/`. Then in `about.html` replace the placeholder `<div>` with:
   ```html
   <img src="./pictures/designer.jpg" alt="Portrait of the Heartfelt Greetings designer" class="about-portrait">
   ```
3. **MMB photos** — place dedicated Mahesh Mishtan Bhandar images into `mmb-pictures/` if you have separate ones.
4. **Instagram handle** — `@heartfelt_Greetings_`.
5. **Deploy to GitHub Pages** — push the entire `heartfelt-greetings/` folder to a GitHub repository and enable Pages from the root.

## File Structure

```
heartfelt-greetings/
├── index.html        Home page
├── portfolio.html    Portfolio with filters + lightbox
├── services.html     All 12 services + process steps
├── about.html        Studio intro, skills, values
├── contact.html      Enquiry form + direct contact
├── styles.css        All styles (single external file)
├── script.js         Nav, filter, lightbox, form validation
├── pictures/         All design work images
│   ├── ads/          Advertisement creatives
│   ├── ecards/       E-cards and digital greetings
│   ├── ebooks/       Ebook design pages
│   ├── logos/        Logo and brand identity work
│   └── 1–8.jpg       Brand mock-ups (general)
├── mmb-pictures/     MMB-specific images (add here)
└── covers/           Book cover PDFs
```
