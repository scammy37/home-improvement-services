/*
 * Inline SVG artwork: service icons and before/after project illustrations.
 * Swap scenes for real photos by replacing the <svg> output in main.js with <img> tags.
 */
(function () {
  const ICONS = {
    deck: '<path d="M3 20h26M5 20v8M27 20v8M16 20v8M3 14h26M6 14V9M11 14V9M16 14V9M21 14V9M26 14V9M4 9h24"/>',
    roller: '<rect x="4" y="4" width="20" height="8" rx="2"/><path d="M24 8h3v7H15v4"/><rect x="13" y="19" width="4" height="9" rx="1"/>',
    house: '<path d="M4 15 16 5l12 10"/><path d="M7 13v14h18V13"/><rect x="13" y="19" width="6" height="8"/>',
    kitchen: '<rect x="4" y="14" width="24" height="14" rx="1"/><path d="M4 19h24M16 14v14M9 9V4M9 9a3 3 0 0 0 6 0V4M22 4v5"/>',
    bath: '<path d="M3 16h26v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6z"/><path d="M7 16V7a3 3 0 0 1 6 0M8 26l-1 3M24 26l1 3"/>',
    stairs: '<path d="M4 28h6v-6h6v-6h6v-6h6V4"/><path d="M4 28V22"/>',
    floor: '<path d="M4 8h24v20H4zM4 14h24M4 21h24M12 8v6M20 14v7M10 21v7M22 21v7M24 8v6"/>',
    roof: '<path d="M2 17 16 5l14 12"/><path d="M6 14v13h20V14M22 8V4h3v6.5"/><path d="M10 19h12M10 23h12"/>',
    siding: '<rect x="4" y="5" width="24" height="23"/><path d="M4 10h24M4 15h24M4 20h24M4 25h24"/>',
    window: '<rect x="6" y="4" width="20" height="24" rx="1"/><path d="M16 4v24M6 16h20"/>',
    wrench: '<path d="M20 4a6 6 0 0 0-5.6 8.2L4.5 22a2.5 2.5 0 0 0 3.5 3.5l9.8-9.9A6 6 0 0 0 26 10l-4 1-2-2 1-4z"/>',
    shield: '<path d="M16 3 6 7v8c0 6.2 4.3 11.4 10 13 5.7-1.6 10-6.8 10-13V7z"/><path d="m11.5 16 3.2 3.2 6-6.4"/>',
    calendar: '<rect x="4" y="6" width="24" height="22" rx="3"/><path d="M4 12h24M10 3v6M22 3v6"/><path d="m11.5 20 3 3 6-6"/>',
    dollar: '<circle cx="16" cy="16" r="12"/><path d="M20 11.5c-.7-1.3-2.2-2-4-2-2.2 0-4 1.1-4 3s1.8 2.6 4 3.1 4 1.2 4 3.3-1.8 3-4 3c-1.9 0-3.4-.8-4.1-2.2M16 7v2.5M16 22.5V25"/>',
    broom: '<path d="M22 4 14.5 15.5"/><path d="M10 15h10l2 5c.5 1.3-.4 2.6-1.8 2.6H9.8C8.4 22.6 7.5 21.3 8 20z"/><path d="M11 22.6 10 28M15 22.6V28M19.5 22.6l1 5.4"/>',
    chat: '<path d="M27 15c0 5.5-5 10-11 10-1.7 0-3.3-.3-4.8-.9L5 26l1.8-5.1A9.4 9.4 0 0 1 5 15C5 9.5 10 5 16 5s11 4.5 11 10z"/><path d="M11 13h10M11 18h6"/>',
    plus: '<circle cx="16" cy="16" r="12"/><path d="M16 10v12M10 16h12"/>',
    badge: '<rect x="3" y="8" width="26" height="17" rx="3"/><path d="M3 13h26M8 20h5"/>'
  };

  function icon(name) {
    return '<svg viewBox="0 0 32 32" aria-hidden="true"><g class="icon-line">' + (ICONS[name] || ICONS.house) + '</g></svg>';
  }

  /* ---------- Scene helpers ---------- */
  // Every scene gets its own id suffix so gradients never collide when the same scene appears twice on a page.
  let uid = 0;
  const range = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');
  const lin = (id, stops, x2 = 0, y2 = 1) =>
    `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
  const rad = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;
  const wrap = (defs, body, after) => '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    `<defs>${defs}</defs>${body}` +
    // Before shots get a flat, slightly dim treatment; after shots a warm light wash
    (after ? '' : '<rect width="400" height="300" fill="#6b6457" opacity=".12"/>') + '</svg>';
  const plant = (x, y, s = 1, pot = '#c8643f') =>
    `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-30" rx="16" ry="20" fill="#4f7d57"/><ellipse cx="-10" cy="-22" rx="10" ry="14" fill="#3f6b48"/><ellipse cx="10" cy="-24" rx="9" ry="13" fill="#5d8f62"/><path d="M-11 -10h22l-3 18h-16z" fill="${pot}"/><rect x="-12" y="-12" width="24" height="4" rx="1.5" fill="${pot}" opacity=".85"/></g>`;
  const planks = (x, y, w, h, n, color, line) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>` + range(n, (i) => `<line x1="${x}" y1="${y + (i + 1) * h / (n + 1)}" x2="${x + w}" y2="${y + (i + 1) * h / (n + 1)}" stroke="${line}" stroke-width=".8"/>`);

  const scenes = {
    deck(after, u) {
      if (!after) {
        return wrap(
          lin(`sky${u}`, [[0, '#cfd4d3'], [1, '#e2e2da']]),
          `<rect width="400" height="300" fill="url(#sky${u})"/>
           <rect x="0" y="36" width="150" height="200" fill="#d6cfc2"/>${range(12, (i) => `<line x1="0" y1="${48 + i * 16}" x2="150" y2="${48 + i * 16}" stroke="#c4bcae" stroke-width="1"/>`)}
           <rect x="0" y="28" width="160" height="12" fill="#7d7a73"/>
           <rect x="44" y="120" width="52" height="116" fill="#8d887d"/><circle cx="86" cy="180" r="2.5" fill="#6d695f"/>
           <rect x="108" y="80" width="30" height="40" fill="#b9c0c2" stroke="#a49d8f" stroke-width="3"/>
           <rect y="226" width="400" height="74" fill="#a7a58c"/>
           <path d="M150 232 L260 232 L275 262 L150 262 Z" fill="#b3ada0"/><path d="M175 236l12 10 -6 8M220 238l-8 14" stroke="#8e887b" stroke-width="1.5" fill="none"/>
           ${range(10, (i) => `<ellipse cx="${170 + i * 24}" cy="${270 + (i % 3) * 9}" rx="11" ry="3.5" fill="#8b7d62" opacity=".55"/>`)}
           ${range(7, (i) => `<path d="M${285 + i * 16} 262 l3 -12 l3 12 M${289 + i * 16} 262 l5 -9" stroke="#6e7458" stroke-width="1.6" fill="none"/>`)}
           <rect x="300" y="200" width="26" height="28" fill="#8f897c"/><rect x="296" y="196" width="34" height="6" fill="#7d776b"/>`,
          false);
      }
      return wrap(
        lin(`sky${u}`, [[0, '#f3d9b8'], [0.55, '#f7e8d4'], [1, '#dfeef0']]) +
        lin(`wall${u}`, [[0, '#f6f0e5'], [1, '#e7dccb']]) +
        lin(`deckTop${u}`, [[0, '#a8744a'], [1, '#8a5a35']]) +
        rad(`glow${u}`, [[0, '#ffd98a', 0.9], [1, '#ffd98a', 0]]) +
        rad(`win${u}`, [[0, '#ffe7b0'], [1, '#f2c97d']]),
        `<rect width="400" height="300" fill="url(#sky${u})"/>
         <circle cx="330" cy="70" r="46" fill="#fff4dc" opacity=".6"/>
         <rect x="0" y="36" width="150" height="200" fill="url(#wall${u})"/>${range(12, (i) => `<line x1="0" y1="${48 + i * 16}" x2="150" y2="${48 + i * 16}" stroke="#ddd1bf" stroke-width="1"/>`)}
         <rect x="0" y="26" width="162" height="14" fill="#2f3a35"/>
         <rect x="42" y="112" width="56" height="112" rx="2" fill="#1f4338"/><rect x="48" y="118" width="44" height="46" fill="url(#win${u})" opacity=".85"/><circle cx="88" cy="176" r="2.5" fill="#d8b77a"/>
         <rect x="106" y="72" width="34" height="46" fill="url(#win${u})" stroke="#2f3a35" stroke-width="3"/><line x1="123" y1="72" x2="123" y2="118" stroke="#2f3a35" stroke-width="2"/>
         <rect y="238" width="400" height="62" fill="#7fa56a"/><rect y="238" width="400" height="8" fill="#6f955c"/>
         <path d="M150 186 L400 186 L400 238 L150 238 Z" fill="url(#deckTop${u})"/>
         ${range(9, (i) => `<line x1="150" y1="${191 + i * 5.3}" x2="400" y2="${191 + i * 5.3}" stroke="#7a4d2c" stroke-width=".9" opacity=".7"/>`)}
         <rect x="150" y="236" width="250" height="9" fill="#6b4428"/>
         ${range(4, (i) => `<rect x="${168 + i * 68}" y="245" width="9" height="34" fill="#5c3a22"/>`)}
         <rect x="150" y="238" width="250" height="4" fill="#000" opacity=".12"/>
         <rect x="176" y="96" width="8" height="92" fill="#3a2a1e"/><rect x="376" y="96" width="8" height="92" fill="#3a2a1e"/>
         <rect x="166" y="90" width="234" height="8" fill="#3a2a1e"/>${range(9, (i) => `<rect x="${176 + i * 26}" y="84" width="5" height="14" fill="#4a3526"/>`)}
         <rect x="150" y="146" width="250" height="5" fill="#2b2b2b"/>${range(17, (i) => `<rect x="${154 + i * 14.6}" y="151" width="2.4" height="37" fill="#2b2b2b"/>`)}
         <path d="M160 58 Q275 96 400 56" stroke="#3a3a3a" stroke-width="1.2" fill="none"/>
         ${range(9, (i) => { const x = 172 + i * 26; const y = 64 + Math.sin((i + 1) / 10 * Math.PI) * 15; return `<circle cx="${x}" cy="${y}" r="16" fill="url(#glow${u})"/><circle cx="${x}" cy="${y}" r="3.4" fill="#ffe29a"/>`; })}
         <g><rect x="206" y="168" width="70" height="8" rx="3" fill="#f3ede2"/><rect x="202" y="160" width="10" height="16" rx="3" fill="#e7dfcf"/><rect x="210" y="176" width="4" height="12" fill="#3a3a3a"/><rect x="268" y="176" width="4" height="12" fill="#3a3a3a"/>
         <rect x="220" y="160" width="18" height="10" rx="3" fill="#c8643f"/><rect x="242" y="161" width="16" height="9" rx="3" fill="#9fb59a"/></g>
         <ellipse cx="308" cy="186" rx="22" ry="3" fill="#000" opacity=".15"/><rect x="296" y="170" width="24" height="16" rx="3" fill="#6b4428"/><circle cx="302" cy="168" r="3" fill="#e2a23b"/>
         ${plant(356, 186, 1.1)}${plant(186, 186, .75, '#e7dfcf')}`,
        true);
    },

    kitchen(after, u) {
      if (!after) {
        return wrap(
          lin(`w${u}`, [[0, '#dccba4'], [1, '#cdb98f']]),
          `<rect width="400" height="300" fill="url(#w${u})"/>
           <rect x="150" y="6" width="100" height="16" fill="#f4f3e6"/><rect x="150" y="22" width="100" height="4" fill="#c9c7b6"/>
           ${range(4, (i) => `<rect x="${24 + i * 90}" y="34" width="82" height="72" fill="#8b5a2b"/><rect x="${32 + i * 90}" y="42" width="66" height="56" fill="none" stroke="#6b421d" stroke-width="3"/><circle cx="${92 + i * 90}" cy="96" r="2.5" fill="#d9c28a"/>`)}
           <rect x="20" y="106" width="360" height="54" fill="#eadfc0"/>${range(18, (c) => range(4, (r) => `<rect x="${20 + c * 20}" y="${106 + r * 13.5}" width="20" height="13.5" fill="none" stroke="#d6c8a4"/>`))}
           <rect x="18" y="158" width="364" height="12" fill="#c7b88d"/><rect x="18" y="168" width="364" height="3" fill="#a8996f"/>
           ${range(4, (i) => `<rect x="${24 + i * 90}" y="171" width="82" height="72" fill="#8b5a2b"/><rect x="${32 + i * 90}" y="179" width="66" height="56" fill="none" stroke="#6b421d" stroke-width="3"/>`)}
           <rect y="243" width="400" height="57" fill="#a58c6a"/>${range(8, (i) => `<rect x="${i * 50}" y="243" width="50" height="57" fill="none" stroke="#8d7353"/>`)}
           <rect x="170" y="140" width="60" height="18" rx="2" fill="#c9c9c2"/>`,
          false);
      }
      return wrap(
        lin(`w${u}`, [[0, '#f7f3ec'], [1, '#ece4d6']]) +
        lin(`up${u}`, [[0, '#dfe6d8'], [1, '#cbd6c3']]) +
        lin(`low${u}`, [[0, '#24493d'], [1, '#193329']]) +
        lin(`ctr${u}`, [[0, '#ffffff'], [1, '#e9e6df']]) +
        lin(`fl${u}`, [[0, '#c69d6e'], [1, '#a77d51']]) +
        rad(`pg${u}`, [[0, '#ffdca0', 0.75], [1, '#ffdca0', 0]]) +
        lin(`win${u}`, [[0, '#cfe6ee'], [1, '#eaf3f1']]),
        `<rect width="400" height="300" fill="url(#w${u})"/>
         <rect x="160" y="30" width="80" height="70" rx="2" fill="url(#win${u})" stroke="#fff" stroke-width="5"/><line x1="200" y1="30" x2="200" y2="100" stroke="#fff" stroke-width="3"/>
         <path d="M168 100 L232 100 L300 300 L100 300 Z" fill="#fff" opacity=".12"/>
         ${[20, 88, 250, 318].map((x) => `<rect x="${x}" y="26" width="64" height="80" rx="3" fill="url(#up${u})"/><rect x="${x}" y="104" width="64" height="4" fill="#000" opacity=".08"/><rect x="${x + 26}" y="92" width="12" height="3" rx="1.5" fill="#b08d57"/>`).join('')}
         <rect x="20" y="108" width="362" height="52" fill="#fbfaf7"/>
         ${range(13, (c) => range(3, (r) => `<rect x="${20 + c * 28 + (r % 2) * 14}" y="${110 + r * 16}" width="27" height="15" rx="1" fill="#fff" stroke="#e6e1d8"/>`))}
         <rect x="16" y="158" width="370" height="11" fill="url(#ctr${u})"/><rect x="16" y="168" width="370" height="2" fill="#d4cfc5"/>
         ${range(5, (i) => `<rect x="${20 + i * 73}" y="170" width="70" height="72" rx="2" fill="url(#low${u})"/><rect x="${47 + i * 73}" y="178" width="16" height="3" rx="1.5" fill="#d8b77a"/>`)}
         <rect x="0" y="242" width="400" height="58" fill="url(#fl${u})"/>${range(5, (i) => `<line x1="0" y1="${248 + i * 11}" x2="400" y2="${248 + i * 11}" stroke="#8f6a42" stroke-width=".8" opacity=".6"/>`)}
         <ellipse cx="200" cy="292" rx="140" ry="8" fill="#000" opacity=".12"/>
         <rect x="86" y="206" width="228" height="13" rx="2" fill="url(#ctr${u})"/><rect x="92" y="219" width="216" height="72" fill="#1f4338"/><rect x="92" y="219" width="216" height="6" fill="#000" opacity=".15"/>
         ${range(3, (i) => `<g transform="translate(${130 + i * 70} 250)"><rect x="-12" y="-6" width="24" height="7" rx="3" fill="#b08d57"/><line x1="-8" y1="0" x2="-11" y2="40" stroke="#2f2f2f" stroke-width="2.5"/><line x1="8" y1="0" x2="11" y2="40" stroke="#2f2f2f" stroke-width="2.5"/></g>`)}
         ${range(3, (i) => { const x = 140 + i * 60; return `<line x1="${x}" y1="0" x2="${x}" y2="130" stroke="#2f2f2f" stroke-width="1.2"/><circle cx="${x}" cy="152" r="46" fill="url(#pg${u})"/><path d="M${x - 13} 142 h26 l-5 -12 h-16 z" fill="#b08d57"/><ellipse cx="${x}" cy="142" rx="11" ry="2.4" fill="#fff1c9"/>`; })}
         ${plant(292, 206, .7, '#f3ede2')}<rect x="112" y="196" width="26" height="10" rx="2" fill="#c8643f"/><circle cx="118" cy="194" r="4" fill="#e2a23b"/><circle cx="127" cy="193" r="4" fill="#9fb59a"/>`,
        true);
    },

    bath(after, u) {
      if (!after) {
        return wrap(
          lin(`w${u}`, [[0, '#e8c7c3'], [1, '#dcb5b0']]),
          `<rect width="400" height="300" fill="url(#w${u})"/>
           ${range(20, (c) => range(9, (r) => `<rect x="${c * 20}" y="${120 + r * 20}" width="20" height="20" fill="#f1d5d0" stroke="#cfa8a1"/>`))}
           <rect x="20" y="168" width="200" height="72" rx="12" fill="#f0bfc0" stroke="#c99697" stroke-width="3"/><rect x="36" y="176" width="168" height="16" rx="6" fill="#f7d6d6"/>
           <line x1="10" y1="38" x2="232" y2="38" stroke="#999" stroke-width="3"/><path d="M18 40 q14 60 0 124 h54 q-12 -62 0 -124z" fill="#d7e7a6" opacity=".92"/>
           <rect x="268" y="170" width="104" height="80" fill="#c7a377" stroke="#9e7d56" stroke-width="3"/><rect x="262" y="160" width="116" height="14" fill="#efe3c9"/><rect x="304" y="152" width="20" height="10" fill="#bdbdb4"/>
           <rect x="282" y="48" width="76" height="92" fill="#d5dde0" stroke="#b58f5e" stroke-width="5"/>
           <rect x="286" y="30" width="68" height="8" fill="#f4f3e6"/>`,
          false);
      }
      return wrap(
        lin(`w${u}`, [[0, '#f4f2ee'], [1, '#e8e5df']]) +
        lin(`glass${u}`, [[0, '#d7ebf0', 0.55], [1, '#bcd8e0', 0.25]], 1, 1) +
        lin(`dark${u}`, [[0, '#2a4a3f'], [1, '#1c362d']]) +
        lin(`wood${u}`, [[0, '#c9a57a'], [1, '#a98457']]) +
        rad(`mg${u}`, [[0.7, '#fff3d6', 0.9], [1, '#fff3d6', 0]]),
        `<rect width="400" height="300" fill="url(#w${u})"/>
         ${range(5, (c) => range(6, (r) => `<rect x="${c * 48}" y="${r * 48}" width="48" height="48" fill="none" stroke="#dedad2"/>`))}
         <rect x="240" y="0" width="160" height="300" fill="url(#dark${u})"/>${range(12, (i) => `<line x1="${250 + i * 13}" y1="0" x2="${250 + i * 13}" y2="270" stroke="#000" opacity=".08"/>`)}
         <rect x="104" y="96" width="44" height="22" rx="2" fill="#e2ded6"/><rect x="110" y="102" width="10" height="16" rx="2" fill="#b08d57"/><rect x="124" y="104" width="8" height="14" rx="2" fill="#9fb59a"/>
         <circle cx="96" cy="44" r="20" fill="#c9c9c9"/><rect x="93" y="12" width="6" height="16" fill="#b8b8b8"/>
         ${range(9, (i) => `<line x1="${82 + i * 3.5}" y1="66" x2="${76 + i * 4.6}" y2="170" stroke="#9fd0e3" stroke-width="1.1" opacity=".5"/>`)}
         <rect x="16" y="20" width="210" height="252" fill="url(#glass${u})" stroke="#9fb4b8" stroke-width="2"/><line x1="170" y1="20" x2="170" y2="272" stroke="#9fb4b8" stroke-width="2"/>
         <path d="M40 30 L70 30 L30 140 L16 140 Z" fill="#fff" opacity=".35"/>
         <circle cx="320" cy="96" r="60" fill="url(#mg${u})"/><circle cx="320" cy="96" r="48" fill="#dfe8ea" stroke="#b08d57" stroke-width="4"/><path d="M296 70 a40 40 0 0 1 30 -18" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>
         <rect x="256" y="176" width="128" height="48" rx="4" fill="url(#wood${u})"/><line x1="320" y1="180" x2="320" y2="220" stroke="#8a6a44" stroke-width="1.5"/>
         <ellipse cx="320" cy="174" rx="30" ry="7" fill="#fff" stroke="#ddd"/><path d="M320 150 v14 h10" stroke="#8a8a8a" stroke-width="3" fill="none"/>
         <rect x="0" y="272" width="400" height="28" fill="#d7d3cb"/><rect x="0" y="272" width="400" height="3" fill="#000" opacity=".08"/>
         ${plant(372, 176, .6, '#f3ede2')}<rect x="232" y="120" width="6" height="60" rx="3" fill="#b08d57"/><rect x="226" y="150" width="18" height="44" rx="4" fill="#f3ede2"/>`,
        true);
    },

    exterior(after, u) {
      const body = after ? '#24493d' : '#b9b3a6';
      const trim = after ? '#fbfaf7' : '#d8d1c0';
      const defs = lin(`sky${u}`, after ? [[0, '#b9dcea'], [1, '#eaf3f1']] : [[0, '#cfd4d3'], [1, '#e2e2da']]) +
        rad(`wg${u}`, [[0, '#ffe2a6'], [1, '#f2c27a']]);
      let s = `<rect width="400" height="300" fill="url(#sky${u})"/>`;
      if (after) s += `<ellipse cx="80" cy="90" rx="60" ry="14" fill="#fff" opacity=".6"/><ellipse cx="320" cy="60" rx="46" ry="10" fill="#fff" opacity=".5"/>`;
      s += `<rect y="252" width="400" height="48" fill="${after ? '#7fa56a' : '#a4a78a'}"/>`;
      s += `<path d="M52 136 L200 38 L348 136 Z" fill="${after ? '#2c2f2e' : '#6d6a64'}"/><path d="M52 136 L200 38 L348 136" stroke="${trim}" stroke-width="6" fill="none"/>`;
      s += `<rect x="74" y="134" width="252" height="122" fill="${body}"/>`;
      s += after
        ? range(20, (i) => `<line x1="${86 + i * 12}" y1="136" x2="${86 + i * 12}" y2="256" stroke="#1b382e" stroke-width="1.4"/>`)
        : range(10, (i) => `<line x1="74" y1="${144 + i * 12}" x2="326" y2="${144 + i * 12}" stroke="#a59e8f"/>`);
      s += `<rect x="176" y="172" width="48" height="84" fill="${after ? '#c8643f' : '#8a7f6c'}" stroke="${trim}" stroke-width="5"/>`;
      s += after ? `<rect x="186" y="182" width="28" height="24" fill="url(#wg${u})" opacity=".85"/><circle cx="215" cy="220" r="2.5" fill="#d8b77a"/>` : `<circle cx="215" cy="220" r="2.5" fill="#6e6658"/>`;
      [[96, 156], [250, 156]].forEach(([x, y]) => {
        s += `<rect x="${x}" y="${y}" width="54" height="50" fill="${after ? `url(#wg${u})` : '#c5d3d8'}" stroke="${after ? '#1b1f1d' : trim}" stroke-width="${after ? 4 : 5}"/><line x1="${x + 27}" y1="${y}" x2="${x + 27}" y2="${y + 50}" stroke="${after ? '#1b1f1d' : trim}" stroke-width="2.5"/>`;
      });
      s += `<rect x="180" y="84" width="40" height="30" fill="${after ? `url(#wg${u})` : '#c5d3d8'}" stroke="${after ? '#1b1f1d' : trim}" stroke-width="3"/>`;
      if (!after) {
        s += range(14, (i) => `<path d="M${84 + i * 17} ${148 + (i * 37) % 96} l6 3 l-3 5" stroke="#8d8676" fill="none"/>`);
        s += `<ellipse cx="110" cy="256" rx="40" ry="16" fill="#8e8f6d"/><ellipse cx="300" cy="258" rx="36" ry="12" fill="#8e8f6d"/>`;
      } else {
        s += `<path d="M182 256 L218 256 L240 300 L160 300 Z" fill="#d9d1c2"/>`;
        s += `<rect x="168" y="186" width="5" height="10" rx="2" fill="#1b1f1d"/><circle cx="170.5" cy="194" r="6" fill="#ffd98a" opacity=".5"/><rect x="227" y="186" width="5" height="10" rx="2" fill="#1b1f1d"/><circle cx="229.5" cy="194" r="6" fill="#ffd98a" opacity=".5"/>`;
        s += `<ellipse cx="112" cy="254" rx="36" ry="14" fill="#4f7d57"/><ellipse cx="96" cy="250" rx="18" ry="10" fill="#5d8f62"/><ellipse cx="290" cy="254" rx="36" ry="14" fill="#4f7d57"/><ellipse cx="306" cy="250" rx="16" ry="9" fill="#5d8f62"/>`;
        s += `<circle cx="100" cy="246" r="3.5" fill="#e8a384"/><circle cx="120" cy="244" r="3" fill="#fff"/><circle cx="296" cy="244" r="3.5" fill="#e2a23b"/>`;
      }
      return wrap(defs, s, after);
    },

    room(after, u) {
      if (!after) {
        return wrap(
          lin(`w${u}`, [[0, '#cfc3a8'], [1, '#c2b598']]),
          `<rect width="400" height="300" fill="url(#w${u})"/>
           <rect y="228" width="400" height="72" fill="#9c8e76"/>${range(20, (i) => `<circle cx="${(i * 71) % 400}" cy="${240 + (i * 29) % 55}" r="${2 + (i % 3)}" fill="#87795f" opacity=".6"/>`)}
           <rect y="222" width="400" height="8" fill="#b5aa92"/>
           <rect x="190" y="48" width="120" height="80" fill="#bdb095" stroke="#8b8069" stroke-width="5"/>
           <rect x="150" y="168" width="200" height="52" rx="8" fill="#8a7a62"/><rect x="140" y="158" width="220" height="26" rx="8" fill="#7a6b55"/><rect x="140" y="170" width="18" height="50" rx="6" fill="#6f614c"/><rect x="342" y="170" width="18" height="50" rx="6" fill="#6f614c"/>
           ${range(7, (i) => `<path d="M${30 + i * 55} ${60 + (i * 41) % 120} q8 4 14 -2" stroke="#9c8f73" stroke-width="3" fill="none"/>`)}
           <line x1="80" y1="0" x2="80" y2="40" stroke="#555"/><circle cx="80" cy="44" r="6" fill="#fff6c8"/>`,
          false);
      }
      return wrap(
        lin(`w${u}`, [[0, '#a9bda3'], [1, '#98ae92']]) +
        lin(`fl${u}`, [[0, '#caa276'], [1, '#ab8155']]) +
        lin(`sofa${u}`, [[0, '#f5efe4'], [1, '#e4dac8']]) +
        rad(`lamp${u}`, [[0, '#ffe1a3', 0.8], [1, '#ffe1a3', 0]]),
        `<rect width="400" height="300" fill="url(#w${u})"/>
         <rect x="0" y="150" width="400" height="76" fill="#96ab8f"/>${range(9, (i) => `<rect x="${12 + i * 44}" y="160" width="34" height="56" fill="none" stroke="#b5c6ae" stroke-width="2"/>`)}
         <rect x="0" y="146" width="400" height="5" fill="#f3efe7"/>
         <rect y="226" width="400" height="74" fill="url(#fl${u})"/>${range(6, (i) => `<line x1="0" y1="${232 + i * 11}" x2="400" y2="${232 + i * 11}" stroke="#8f6a42" stroke-width=".8" opacity=".55"/>`)}
         <rect y="220" width="400" height="7" fill="#f3efe7"/>
         <path d="M200 44 h110 v84 h-110 z" fill="#f4ecdc" stroke="#b08d57" stroke-width="4"/><path d="M206 122 l32 -38 l24 24 l18 -14 l24 28 z" fill="#c8643f" opacity=".85"/><circle cx="286" cy="66" r="9" fill="#e2a23b"/>
         <ellipse cx="250" cy="268" rx="140" ry="18" fill="#e9dfcc"/>
         <ellipse cx="250" cy="226" rx="120" ry="6" fill="#000" opacity=".12"/>
         <rect x="140" y="170" width="220" height="50" rx="12" fill="url(#sofa${u})"/><rect x="130" y="152" width="240" height="30" rx="12" fill="#ebe2d2"/><rect x="128" y="168" width="22" height="52" rx="8" fill="#e4dac8"/><rect x="350" y="168" width="22" height="52" rx="8" fill="#e4dac8"/>
         <rect x="176" y="150" width="34" height="26" rx="7" fill="#c8643f" transform="rotate(-8 193 163)"/><rect x="292" y="150" width="34" height="26" rx="7" fill="#1f4338" transform="rotate(6 309 163)"/><rect x="238" y="152" width="30" height="24" rx="7" fill="#e2a23b"/>
         <rect x="152" y="218" width="5" height="12" fill="#3a2a1e"/><rect x="344" y="218" width="5" height="12" fill="#3a2a1e"/>
         <circle cx="60" cy="130" r="54" fill="url(#lamp${u})"/><line x1="60" y1="130" x2="60" y2="226" stroke="#2f2f2f" stroke-width="3"/><path d="M40 130 h40 l-8 -26 h-24z" fill="#f3ede2"/>
         ${plant(376, 226, 1.15)}`,
        true);
    },

    floor(after, u) {
      if (!after) {
        return wrap(
          lin(`w${u}`, [[0, '#d6cdb9'], [1, '#cabfa7']]),
          `<rect width="400" height="300" fill="url(#w${u})"/>
           <rect x="150" y="36" width="100" height="120" fill="#c5ccd0" stroke="#aaa" stroke-width="6"/>
           <path d="M0 160 H400 V300 H0 Z" fill="#8f8466"/>
           ${range(40, (i) => `<circle cx="${(i * 71) % 400}" cy="${168 + (i * 37) % 128}" r="${2 + (i % 3)}" fill="#7d7258" opacity=".7"/>`)}
           <ellipse cx="200" cy="240" rx="64" ry="15" fill="#6e6450" opacity=".5"/><ellipse cx="90" cy="200" rx="30" ry="8" fill="#6e6450" opacity=".4"/><ellipse cx="320" cy="270" rx="40" ry="9" fill="#6e6450" opacity=".35"/>
           <rect y="154" width="400" height="8" fill="#b1a78f"/>`,
          false);
      }
      return wrap(
        lin(`w${u}`, [[0, '#f5efe4'], [1, '#ece3d3']]) +
        lin(`fl${u}`, [[0, '#b98755'], [1, '#d2a877']]) +
        lin(`sun${u}`, [[0, '#fff', 0.35], [1, '#fff', 0]]) +
        lin(`win${u}`, [[0, '#cfe6ee'], [1, '#eaf3f1']]),
        `<rect width="400" height="300" fill="url(#w${u})"/>
         <rect x="146" y="30" width="108" height="126" fill="url(#win${u})" stroke="#fff" stroke-width="7"/><line x1="200" y1="30" x2="200" y2="156" stroke="#fff" stroke-width="4"/><line x1="146" y1="93" x2="254" y2="93" stroke="#fff" stroke-width="4"/>
         <path d="M0 160 H400 V300 H0 Z" fill="url(#fl${u})"/>
         ${range(12, (i) => { const y = 160 + i * 11 + i * i * .45; return `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#94673d" stroke-width="1"/>`; })}
         ${range(12, (i) => range(4, (j) => { const y = 160 + i * 11 + i * i * .45; const x = ((j * 113 + i * 57) % 400); return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 11 + i * .9}" stroke="#94673d" stroke-width="1"/>`; }))}
         <polygon points="146,160 254,160 330,300 70,300" fill="url(#sun${u})"/>
         <rect x="0" y="152" width="400" height="9" fill="#fbfaf7"/>
         <ellipse cx="200" cy="262" rx="104" ry="22" fill="#efe6d4"/><ellipse cx="200" cy="262" rx="88" ry="16" fill="none" stroke="#c8643f" stroke-width="2" opacity=".5"/>
         ${plant(52, 160, 1.05)}<rect x="318" y="118" width="46" height="36" rx="3" fill="#6b4428"/><rect x="322" y="106" width="16" height="12" fill="#9fb59a"/><circle cx="352" cy="108" r="7" fill="#f3ede2"/>`,
        true);
    }
  };

  function scene(type, after) {
    uid += 1;
    return (scenes[type] || scenes.room)(after, uid);
  }

  window.ART = { icon, scene };
})();
