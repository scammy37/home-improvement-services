# Home Improvement Services

A fast, mobile-friendly marketing site for a multi-service home improvement business: decks, painting, remodeling, flooring, roofing, siding, windows and handyman work.

It's plain HTML, CSS and JavaScript with no build step. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify or any static host.

## Features

- **Hero with a quick-quote picker** that jumps into the estimator with the chosen service already selected
- **Trust bar** with animated counters (years in business, projects, rating, warranty)
- **11 services** with category filters, each with a starting price and an "Estimate →" shortcut
- **Estimate calculator** with service, size slider, quality tier, add-ons and a site-condition setting. It shows a live price range, a line-by-line breakdown and an illustrative monthly financing figure, and can copy the estimate into the contact form.
- **Before/after gallery** with draggable comparison sliders
- **Reviews** with an average rating, star breakdown (click a bar to filter), filter by service, sort, "show more" and a "Write a review" dialog (saved in the visitor's browser for preview)
- **FAQ** accordion and a list of the areas you serve
- **Contact form** with validation and spam protection. It sends through Formspree when configured, and otherwise opens the visitor's email app.
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
| Process steps and FAQs | `process`, `faqs` |

### Before you launch

1. **Replace the sample reviews** with real reviews from your customers, then set `showSampleReviewNotice: false`. Publishing made-up reviews is illegal in many places, including under the US FTC rule on fake reviews.
2. **Tune the prices** in `services` to your local market. The defaults are rough national ballpark figures.
3. **Swap the illustrations for real project photos** when you have them. Replace the SVG output in the gallery section of `js/main.js` with `<img>` tags.

## Files

```
index.html       page structure
css/styles.css   all styles
js/data.js       content and configuration (edit this)
js/scenes.js     service icons and before/after illustrations
js/main.js       interactivity
```
