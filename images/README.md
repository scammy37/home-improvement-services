# Photos

Add your own photos here, then point to them from `js/data.js`.

- **Before/after gallery:** put files in `images/projects/` and add `before` and `after` to a project:
  ```js
  { title: 'Backyard composite deck', service: 'decks', town: 'Lakeview', scene: 'deck',
    detail: '420 sq ft · composite', before: 'images/projects/deck-before.jpg', after: 'images/projects/deck-after.jpg' }
  ```
  Take both shots from the same spot and angle so the slider lines up. Landscape images with a 4:3 ratio fit best.
- **Service page header:** put a file in `images/services/` and add `photo` to that service in `serviceDetails`:
  ```js
  decks: { photo: 'images/services/decks.jpg', intro: '…', … }
  ```
  Then run `node tools/build.mjs`.

Keep each photo under about 300 KB (1600px wide, JPEG or WebP) so pages load fast on phones. Only use photos you own or have the rights to.
