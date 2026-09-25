# Home Improvement Services

A fast, mobile-friendly marketing site for a multi-service home improvement business: decks, painting, remodeling, flooring, roofing, siding, windows and handyman work.

It's plain HTML, CSS and JavaScript. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify or any static host.

**Live site:** https://michaelzagame.com/services/

## Features

- **Hero with a quick-quote picker** that jumps into the estimator with the chosen service already selected
- **Trust bar** with animated counters (years in business, projects, rating, warranty)
- **11 services** with category filters, each with a starting price and an "Estimate →" shortcut
- **Estimate calculator** with service, size slider, quality tier, add-ons and a site-condition setting. It shows a live price range, a line-by-line breakdown and an illustrative monthly financing figure, and can copy the estimate into the contact form.
- **Before/after gallery** with draggable comparison sliders
- **Reviews** with an average rating, star breakdown (click a bar to filter), filter by service, sort, "show more" and a "Write a review" dialog (saved in the visitor's browser for preview)
- **FAQ** accordion and a list of the areas you serve
- **Contact form** with validation and spam protection. It sends through Formspree when configured, and otherwise opens the visitor's email app.
- **A page for each service** at clean addresses like `/services/decks/` and `/services/kitchen/`, with its own intro, what's included, a pricing table, a timeline, an estimator already set to that service, matching projects and reviews, service-specific FAQs and links to the other services
- **Real photo support** for the gallery and service pages; the built-in illustrations show until you add photos (see `images/README.md`)
- **SEO basics:** business and service structured data (JSON-LD), canonical links, `sitemap.xml`, `robots.txt` and a custom 404 page
- Sticky header, mobile menu, mobile call/estimate/quote bar, SEO meta tags and support for reduced-motion settings

## Make it yours

Everything you'd normally change lives in **`js/data.js`**:

| What | Where in `js/data.js` |
| --- | --- |
| Name, phone, email, address, hours, service area, license | `business` |
| Receive form submissions by email | `business.formspreeId`: create a free form at formspree.io and paste its ID |
| Services, prices, tiers, add-ons | `services` |
| Customer reviews | `reviews` |
| Gallery projects | `projects` |
| Service page text, what's included, timeline, FAQs, header photo | `serviceDetails` |
| Process steps and FAQs | `process`, `faqs` |
| Your live site address (sitemap and canonical links) | `business.siteUrl` |

**After editing `js/data.js` or the header, footer or shared sections in `index.html`, rebuild the generated pages:**

```sh
node tools/build.mjs
```

This rewrites the service pages (`decks/index.html`, `kitchen/index.html`, …), `404.html`, `sitemap.xml`, `robots.txt` and the structured-data block in `index.html`. It needs Node 18 or newer and nothing else. Commit the result. A GitHub Action (`Check site`) fails if you forget.

### Before you launch

1. **Replace the sample reviews** with real reviews from your customers, then set `showSampleReviewNotice: false`. Publishing made-up reviews is illegal in many places, including under the US FTC rule on fake reviews.
2. **Tune the prices** in `services` to your local market. The defaults are rough national ballpark figures.
3. **Add real project photos.** See `images/README.md`. Only use photos of your own work, or photos you have the rights to.

## Publishing on GitHub Pages

The site is ready for GitHub Pages as it is: every page is a plain file committed to the repo, so nothing needs building on GitHub.

1. Merge these changes into `main`.
2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, **Branch** to `main`, and the folder to `/ (root)`. Click **Save**.
4. After a minute or two the site is live at https://michaelzagame.com/services/. The address comes from the custom domain on your `scammy37.github.io` site plus this repo's name, so renaming the repo changes it. If you rename it, update `business.siteUrl` and rebuild.

Search engines only read `robots.txt` at the root of a domain, so the one in this repo is ignored while the site lives under `/services/`. Submit `https://michaelzagame.com/services/sitemap.xml` in Google Search Console instead.

Every later push to `main` republishes automatically.

**Custom domain (optional):** add it under **Settings → Pages → Custom domain**, point your DNS at GitHub as it describes, then update `business.siteUrl` in `js/data.js` and run `node tools/build.mjs`.

## Files

```
index.html                 home page
<service-id>/index.html    one page per service (generated)
404.html, sitemap.xml,
robots.txt                 generated
css/styles.css             all styles
js/data.js                 content and configuration (edit this)
js/scenes.js               service icons and before/after illustrations
js/main.js                 interactivity for every page
tools/build.mjs            generates the pages listed above
images/                    your photos
.github/workflows/         "Check site" action
```
