/*
 * Site content and configuration.
 * Edit this file to change business details, services, prices, reviews and FAQs.
 * No other file needs to change for day-to-day content updates.
 */

window.SITE = {
  business: {
    name: 'Home Improvement Services',
    shortName: 'HIS',
    tagline: 'Decks, painting, remodeling & more — done right, on time.',
    phone: '(555) 123-4567',
    email: 'hello@example.com',
    address: '123 Main Street, Your City, ST 00000',
    hours: 'Mon–Fri 7am–6pm · Sat 8am–2pm',
    serviceArea: ['Your City', 'Northside', 'Southside', 'Eastville', 'Westbrook', 'Lakeview', 'Riverside', 'Oak Hills'],
    license: 'License #000000',
    yearsInBusiness: 15,
    projectsCompleted: 1200,
    warrantyYears: 5,
    // Paste your Formspree form ID (e.g. "xyzabcd") to receive submissions by email.
    // Leave blank and the form falls back to opening the visitor's email app.
    formspreeId: ''
  },

  // Set to false once the reviews below are replaced with real customer reviews.
  // Publishing made-up reviews as genuine is illegal in many places (e.g. the US FTC rule on fake reviews).
  showSampleReviewNotice: true,

  // Pricing: low/high cost per unit for each tier. Add-ons are flat [low, high].
  // These are rough ballpark ranges — tune them to your local market.
  services: [
    {
      id: 'decks', name: 'Decks & Patios', icon: 'deck', category: 'outdoor',
      blurb: 'Custom decks, patios, pergolas and railings built to last decades — plus repairs and refinishing.',
      bullets: ['Composite & wood decks', 'Pergolas & covered patios', 'Repairs, staining & sealing'],
      unit: 'sq ft of deck', defaultQty: 300, min: 50, max: 2000, step: 10,
      tiers: { Standard: [35, 50], Premium: [55, 80], Luxury: [80, 120] },
      tierNotes: { Standard: 'Pressure-treated lumber', Premium: 'Composite decking', Luxury: 'PVC / hardwood, hidden fasteners' },
      addons: [
        ['Railings', 1500, 3500], ['Stairs', 800, 2000], ['Built-in lighting', 600, 1500],
        ['Pergola', 3500, 8000], ['Remove old deck', 1000, 2500]
      ]
    },
    {
      id: 'interior-painting', name: 'Interior Painting', icon: 'roller', category: 'painting',
      blurb: 'Crisp lines, clean job sites and premium paints for every room, ceiling and cabinet.',
      bullets: ['Walls, ceilings & trim', 'Cabinet refinishing', 'Drywall repair'],
      unit: 'sq ft of floor area', defaultQty: 1200, min: 100, max: 6000, step: 50,
      tiers: { Standard: [3, 5], Premium: [5, 7], Luxury: [7, 10] },
      tierNotes: { Standard: 'Quality paint, 2 coats', Premium: 'Premium paint, minor prep', Luxury: 'Designer finishes, full prep' },
      addons: [
        ['Ceilings', 400, 1200], ['Trim & doors', 500, 1500],
        ['Cabinet refinishing', 3000, 7000], ['Drywall repair', 200, 800]
      ]
    },
    {
      id: 'exterior-painting', name: 'Exterior Painting', icon: 'house', category: 'painting',
      blurb: 'Boost curb appeal and protect your home with weather-tough exterior coatings.',
      bullets: ['Siding, trim & doors', 'Pressure washing', 'Wood rot repair'],
      unit: 'sq ft of home', defaultQty: 2000, min: 500, max: 8000, step: 50,
      tiers: { Standard: [2, 4], Premium: [4, 6], Luxury: [6, 8] },
      tierNotes: { Standard: 'One color, 1–2 coats', Premium: 'Body + trim colors', Luxury: 'Multi-color, elastomeric coatings' },
      addons: [['Pressure washing', 300, 600], ['Wood rot repair', 500, 2000], ['Shutters & doors', 300, 800]]
    },
    {
      id: 'kitchen', name: 'Kitchen Remodeling', icon: 'kitchen', category: 'remodeling',
      blurb: 'From cabinet refreshes to full gut remodels — kitchens designed around how you live.',
      bullets: ['Cabinets & countertops', 'Islands & layout changes', 'Tile backsplashes'],
      unit: 'sq ft of kitchen', defaultQty: 150, min: 50, max: 600, step: 5,
      tiers: { Standard: [150, 250], Premium: [250, 400], Luxury: [400, 650] },
      tierNotes: { Standard: 'Stock cabinets, laminate/quartz', Premium: 'Semi-custom, quartz', Luxury: 'Custom cabinetry, stone' },
      addons: [['Kitchen island', 3000, 10000], ['New appliances', 5000, 15000], ['Layout change', 5000, 15000]]
    },
    {
      id: 'bathroom', name: 'Bathroom Remodeling', icon: 'bath', category: 'remodeling',
      blurb: 'Spa-worthy bathrooms with walk-in showers, heated floors and smart storage.',
      bullets: ['Walk-in showers & tubs', 'Tile & vanities', 'Accessibility upgrades'],
      unit: 'sq ft of bathroom', defaultQty: 60, min: 25, max: 300, step: 5,
      tiers: { Standard: [250, 400], Premium: [400, 600], Luxury: [600, 900] },
      tierNotes: { Standard: 'Tub/shower combo, stock vanity', Premium: 'Tiled shower, quartz', Luxury: 'Frameless glass, custom tile' },
      addons: [['Walk-in shower', 3000, 8000], ['Heated floors', 1000, 2500], ['Double vanity', 1500, 4000]]
    },
    {
      id: 'basement', name: 'Basement Finishing', icon: 'stairs', category: 'remodeling',
      blurb: 'Turn unused space into a family room, home office, gym or guest suite.',
      bullets: ['Framing, drywall & ceilings', 'Egress windows', 'Wet bars & bathrooms'],
      unit: 'sq ft of basement', defaultQty: 800, min: 200, max: 3000, step: 25,
      tiers: { Standard: [35, 55], Premium: [55, 80], Luxury: [80, 120] },
      tierNotes: { Standard: 'Open living space', Premium: 'Rooms + upgraded finishes', Luxury: 'Theater/bar-level finishes' },
      addons: [['Add a bathroom', 10000, 25000], ['Egress window', 3000, 6000], ['Wet bar', 4000, 12000]]
    },
    {
      id: 'flooring', name: 'Flooring', icon: 'floor', category: 'interior',
      blurb: 'Hardwood, luxury vinyl, tile and carpet — expertly installed and finished.',
      bullets: ['Hardwood & engineered', 'Luxury vinyl plank', 'Tile & stone'],
      unit: 'sq ft of flooring', defaultQty: 800, min: 50, max: 5000, step: 25,
      tiers: { Standard: [4, 7], Premium: [8, 12], Luxury: [12, 20] },
      tierNotes: { Standard: 'Luxury vinyl / laminate', Premium: 'Engineered hardwood / tile', Luxury: 'Solid hardwood / natural stone' },
      addons: [['Remove old flooring', 500, 1500], ['Stairs', 1000, 3000], ['New baseboards', 400, 1200]]
    },
    {
      id: 'roofing', name: 'Roofing', icon: 'roof', category: 'exterior',
      blurb: 'Roof replacements and repairs with manufacturer-backed warranties.',
      bullets: ['Asphalt, metal & tile', 'Leak & storm repair', 'Gutters & skylights'],
      unit: 'sq ft of roof', defaultQty: 2000, min: 500, max: 8000, step: 50,
      tiers: { Standard: [4.5, 7], Premium: [7, 11], Luxury: [11, 18] },
      tierNotes: { Standard: 'Architectural shingles', Premium: 'Designer shingles / standing seam', Luxury: 'Metal / slate / tile' },
      addons: [['New gutters', 1000, 3000], ['Skylight', 1500, 3500], ['Extra tear-off layer', 1500, 3500]]
    },
    {
      id: 'siding', name: 'Siding', icon: 'siding', category: 'exterior',
      blurb: 'Low-maintenance siding that transforms your home and lowers energy bills.',
      bullets: ['Vinyl & fiber cement', 'Cedar & engineered wood', 'Soffit & fascia'],
      unit: 'sq ft of wall', defaultQty: 1800, min: 300, max: 6000, step: 50,
      tiers: { Standard: [5, 8], Premium: [8, 12], Luxury: [12, 18] },
      tierNotes: { Standard: 'Vinyl siding', Premium: 'Fiber cement', Luxury: 'Cedar / engineered wood' },
      addons: [['House wrap & insulation', 1500, 4000], ['Soffit & fascia', 1500, 4500], ['Remove old siding', 1000, 3000]]
    },
    {
      id: 'windows', name: 'Windows & Doors', icon: 'window', category: 'exterior',
      blurb: 'Energy-efficient windows and statement doors, professionally installed.',
      bullets: ['Replacement windows', 'Entry & patio doors', 'Storm doors'],
      unit: 'windows', defaultQty: 8, min: 1, max: 60, step: 1,
      tiers: { Standard: [500, 900], Premium: [900, 1500], Luxury: [1500, 2800] },
      tierNotes: { Standard: 'Vinyl double-pane', Premium: 'Fiberglass, Low-E', Luxury: 'Wood-clad, triple-pane' },
      addons: [['New entry door', 1500, 5000], ['Patio / sliding door', 2500, 7000], ['Storm door', 400, 1000]]
    },
    {
      id: 'handyman', name: 'Handyman & Repairs', icon: 'wrench', category: 'interior',
      blurb: 'Your to-do list, handled. Small jobs, fast scheduling, no job too small.',
      bullets: ['Drywall & carpentry', 'Fixture installs', 'Punch lists & repairs'],
      unit: 'hours', defaultQty: 8, min: 2, max: 80, step: 1,
      tiers: { Standard: [75, 95], Priority: [95, 120], Emergency: [130, 175] },
      tierNotes: { Standard: 'Scheduled within ~1 week', Priority: 'Within 48 hours', Emergency: 'Same / next day' },
      addons: [['Materials allowance', 100, 500], ['Haul-away / disposal', 100, 350]]
    }
  ],

  // Sample reviews — REPLACE with real ones from your customers (see showSampleReviewNotice above).
  reviews: [
    { name: 'Jessica M.', town: 'Northside', service: 'kitchen', rating: 5, date: '2026-08-14', text: 'They took our cramped 1990s kitchen down to the studs and gave us an open layout with a huge island. The crew was tidy, communicated every day and finished two days early.' },
    { name: 'Robert T.', town: 'Lakeview', service: 'decks', rating: 5, date: '2026-07-30', text: 'Our new composite deck is stunning. They helped us pick a design, handled the permit and the built-in lighting makes summer nights perfect.' },
    { name: 'Priya S.', town: 'Your City', service: 'interior-painting', rating: 5, date: '2026-07-11', text: 'Painted our entire main floor plus ceilings in three days. Lines are razor sharp and they covered everything. Zero mess.' },
    { name: 'Dan & Carol W.', town: 'Oak Hills', service: 'bathroom', rating: 5, date: '2026-06-22', text: 'Converted our tub into a walk-in shower with heated floors. It feels like a hotel spa. Fair price and quality work.' },
    { name: 'Marcus L.', town: 'Riverside', service: 'roofing', rating: 4, date: '2026-06-02', text: 'Roof replacement went smoothly after a storm. One day of delay because of rain, but they kept us informed and cleaned up every nail.' },
    { name: 'Angela R.', town: 'Westbrook', service: 'exterior-painting', rating: 5, date: '2026-05-19', text: 'The house looks brand new. They repaired rotted trim before painting and suggested a color combo we never would have picked but love.' },
    { name: 'Kevin H.', town: 'Eastville', service: 'basement', rating: 5, date: '2026-05-03', text: 'Finished our basement into a family room and guest suite. The project manager was fantastic and the finish work is top notch.' },
    { name: 'Linda P.', town: 'Southside', service: 'handyman', rating: 5, date: '2026-04-21', text: 'Had a long list of small repairs. They knocked out everything in one visit and charged exactly what they quoted.' },
    { name: 'Tom G.', town: 'Northside', service: 'flooring', rating: 5, date: '2026-04-08', text: 'Engineered hardwood throughout the first floor. Seamless transitions and they even refinished the stairs to match.' },
    { name: 'Sofia N.', town: 'Lakeview', service: 'windows', rating: 4, date: '2026-03-15', text: 'Replaced 12 windows. The house is quieter and warmer. Scheduling took a little longer than hoped but install was flawless.' },
    { name: 'Greg B.', town: 'Your City', service: 'siding', rating: 5, date: '2026-02-27', text: 'Fiber cement siding and new trim completely changed the look of our home. Neighbors keep asking who did it.' },
    { name: 'Hannah K.', town: 'Riverside', service: 'decks', rating: 5, date: '2026-02-10', text: 'Repaired and restained our old deck instead of pushing a full replacement. Honest advice that saved us thousands.' }
  ],

  // Before/after gallery. `scene` picks the illustration style.
  projects: [
    { title: 'Backyard composite deck', service: 'decks', town: 'Lakeview', scene: 'deck', detail: '420 sq ft · composite · lighting' },
    { title: 'Open-concept kitchen', service: 'kitchen', town: 'Northside', scene: 'kitchen', detail: 'Island · quartz · 3 weeks' },
    { title: 'Spa bathroom conversion', service: 'bathroom', town: 'Oak Hills', scene: 'bath', detail: 'Walk-in shower · heated floor' },
    { title: 'Full exterior repaint', service: 'exterior-painting', town: 'Westbrook', scene: 'exterior', detail: '2 colors · trim repair' },
    { title: 'Living room refresh', service: 'interior-painting', town: 'Your City', scene: 'room', detail: 'Walls, ceiling & trim · 2 days' },
    { title: 'Hardwood floor install', service: 'flooring', town: 'Northside', scene: 'floor', detail: '950 sq ft · engineered oak' }
  ],

  process: [
    ['Free consultation', 'Tell us about your project online or by phone. We visit, measure and listen.'],
    ['Detailed proposal', 'You get a clear, itemized quote with options — no pressure, no surprises.'],
    ['Expert build', 'A dedicated project manager keeps you updated daily while our crew does the work.'],
    ['Final walkthrough', 'We walk the job with you, fix anything on the punch list and back it with our warranty.']
  ],

  faqs: [
    ['Are you licensed and insured?', 'Yes. We are fully licensed, bonded and insured, and we pull every permit your project requires.'],
    ['How accurate is the online estimate?', 'The calculator gives a realistic ballpark based on typical projects. Your final quote comes after a free on-site visit, where we measure and discuss materials.'],
    ['Do you offer financing?', 'Yes — we partner with lenders to offer flexible monthly payment plans for approved customers. Ask us during your consultation.'],
    ['What warranty do you provide?', 'All workmanship is covered for 5 years, on top of any manufacturer warranties on materials.'],
    ['How soon can you start?', 'Small jobs can often be scheduled within a week. Larger remodels usually start 2–6 weeks after contract signing, depending on materials.'],
    ['Do I need to be home during the work?', 'No. Many clients provide a lockbox or code. Your project manager will keep you updated with photos every day.']
  ]
};
