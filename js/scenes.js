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
    wrench: '<path d="M20 4a6 6 0 0 0-5.6 8.2L4.5 22a2.5 2.5 0 0 0 3.5 3.5l9.8-9.9A6 6 0 0 0 26 10l-4 1-2-2 1-4z"/>'
  };

  function icon(name) {
    return '<svg viewBox="0 0 32 32" aria-hidden="true"><g class="icon-line">' + (ICONS[name] || ICONS.house) + '</g></svg>';
  }

  const wrap = (body) => '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + body + '</svg>';
  const range = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');

  const scenes = {
    deck(after) {
      const sky = after ? '#bfe0ef' : '#cfd6d8';
      const grass = after ? '#86b36b' : '#a4a78a';
      let s = `<rect width="400" height="300" fill="${sky}"/>`;
      s += `<rect x="0" y="40" width="140" height="190" fill="${after ? '#f3ede2' : '#d8d2c6'}"/>`;
      s += `<rect x="40" y="110" width="50" height="120" fill="${after ? '#315c49' : '#8d8a80'}"/>`;
      s += `<rect x="0" y="30" width="150" height="14" fill="${after ? '#4a4a4a' : '#7a7a7a'}"/>`;
      s += `<rect y="210" width="400" height="90" fill="${grass}"/>`;
      if (!after) {
        s += range(9, i => `<ellipse cx="${170 + i * 26}" cy="${240 + (i % 3) * 14}" rx="12" ry="4" fill="#8b7d62" opacity=".6"/>`);
        s += range(6, i => `<path d="M${180 + i * 36} 262 l4 -14 l4 14" stroke="#6e7458" stroke-width="2" fill="none"/>`);
        s += `<rect x="140" y="222" width="36" height="8" fill="#9a9384"/><rect x="146" y="230" width="24" height="16" fill="#8f897c"/>`;
      } else {
        s += `<path d="M140 190 L400 190 L400 250 L140 250 Z" fill="#b07a4c"/>`;
        s += range(10, i => `<line x1="140" y1="${194 + i * 6}" x2="400" y2="${194 + i * 6}" stroke="#8f5f37" stroke-width="1.2"/>`);
        s += `<rect x="140" y="250" width="260" height="10" fill="#7b5030"/>`;
        s += range(4, i => `<rect x="${160 + i * 70}" y="258" width="10" height="32" fill="#6b4428"/>`);
        s += `<rect x="140" y="140" width="260" height="6" fill="#3a3a3a"/>`;
        s += range(14, i => `<rect x="${146 + i * 18.5}" y="146" width="3" height="44" fill="#3a3a3a"/>`);
        s += `<path d="M150 60 Q275 95 400 58" stroke="#444" fill="none"/>`;
        s += range(9, i => { const x = 162 + i * 28; const y = 60 + Math.sin((i + 1) / 10 * Math.PI) * 17; return `<circle cx="${x}" cy="${y + 6}" r="4" fill="#ffd66b"/><circle cx="${x}" cy="${y + 6}" r="9" fill="#ffd66b" opacity=".25"/>`; });
        s += `<rect x="330" y="160" width="30" height="30" rx="3" fill="#dd7656"/><circle cx="345" cy="150" r="18" fill="#4f8a55"/>`;
        s += `<rect x="200" y="165" width="60" height="8" rx="2" fill="#f3ede2"/><rect x="204" y="173" width="4" height="17" fill="#555"/><rect x="252" y="173" width="4" height="17" fill="#555"/>`;
      }
      return wrap(s);
    },

    kitchen(after) {
      let s = `<rect width="400" height="300" fill="${after ? '#f4f1ea' : '#d9c9a3'}"/>`;
      s += `<rect y="240" width="400" height="60" fill="${after ? '#c9a57a' : '#a88c6a'}"/>`;
      if (!after) {
        s += range(8, i => `<rect x="${i * 50}" y="240" width="50" height="60" fill="none" stroke="#8d7353"/>`);
        s += `<rect x="150" y="10" width="100" height="14" fill="#f2f2e6"/><rect x="150" y="24" width="100" height="4" fill="#ccc"/>`;
        s += range(4, i => `<rect x="${30 + i * 88}" y="40" width="80" height="70" fill="#8b5a2b" stroke="#6b421d" stroke-width="3"/><rect x="${40 + i * 88}" y="50" width="60" height="50" fill="none" stroke="#6b421d" stroke-width="2"/>`);
        s += `<rect x="20" y="160" width="360" height="12" fill="#c8b98f"/>`;
        s += range(4, i => `<rect x="${30 + i * 88}" y="172" width="80" height="68" fill="#8b5a2b" stroke="#6b421d" stroke-width="3"/>`);
        s += `<rect x="20" y="110" width="360" height="50" fill="#e4d9b8"/>`;
      } else {
        s += range(4, i => `<rect x="${30 + i * 88}" y="30" width="80" height="80" rx="3" fill="#dfe6d8" stroke="#c7d2c0" stroke-width="2"/><rect x="${64 + i * 88}" y="96" width="12" height="3" rx="1.5" fill="#b08d57"/>`);
        s += `<rect x="20" y="110" width="360" height="50" fill="#fff"/>`;
        s += range(12, r => range(3, c => `<rect x="${20 + r * 30 + (c % 2) * 15}" y="${112 + c * 16}" width="28" height="14" fill="#fff" stroke="#e5e1d8"/>`));
        s += `<rect x="20" y="158" width="360" height="10" fill="#f7f6f2" stroke="#ddd"/>`;
        s += range(4, i => `<rect x="${30 + i * 88}" y="168" width="80" height="72" rx="3" fill="#315c49"/><rect x="${64 + i * 88}" y="176" width="12" height="3" rx="1.5" fill="#d8b77a"/>`);
        s += `<rect x="90" y="205" width="220" height="12" fill="#faf8f3" stroke="#ddd"/><rect x="100" y="217" width="200" height="45" fill="#1f3e31"/>`;
        s += range(3, i => `<line x1="${140 + i * 60}" y1="0" x2="${140 + i * 60}" y2="${40 + 0}" stroke="#333"/><path d="M${128 + i * 60} 52 h24 l-4 -12 h-16 z" fill="#b08d57"/><ellipse cx="${140 + i * 60}" cy="56" rx="10" ry="3" fill="#ffe7a8" opacity=".9"/>`);
        s += `<path d="M280 190 v-20 h8 v20" fill="#4f8a55"/><circle cx="284" cy="165" r="10" fill="#6aa56f"/>`;
      }
      return wrap(s);
    },

    bath(after) {
      let s = `<rect width="400" height="300" fill="${after ? '#eef0ec' : '#e8c7c3'}"/>`;
      if (!after) {
        s += range(20, c => range(10, r => `<rect x="${c * 20}" y="${120 + r * 20}" width="20" height="20" fill="#f1d5d0" stroke="#cfa8a1"/>`));
        s += `<rect x="20" y="170" width="200" height="70" rx="10" fill="#f0bfc0" stroke="#c99697" stroke-width="3"/>`;
        s += `<line x1="10" y1="40" x2="230" y2="40" stroke="#999" stroke-width="3"/><path d="M20 40 q10 60 0 120 h40 q-10 -60 0 -120z" fill="#d7e7a6" opacity=".9"/>`;
        s += `<rect x="270" y="170" width="100" height="80" fill="#c7a377" stroke="#9e7d56" stroke-width="3"/><rect x="265" y="160" width="110" height="14" fill="#efe3c9"/>`;
        s += `<rect x="285" y="50" width="70" height="90" fill="#d5dde0" stroke="#b58f5e" stroke-width="5"/>`;
      } else {
        s += range(8, c => range(12, r => `<rect x="${c * 30}" y="${r * 25}" width="30" height="25" fill="#f7f7f4" stroke="#e1e3de"/>`));
        s += `<rect x="20" y="30" width="200" height="240" fill="#bcd3da" opacity=".35" stroke="#9ab" stroke-width="2"/>`;
        s += `<line x1="120" y1="30" x2="120" y2="270" stroke="#9ab"/><circle cx="170" cy="60" r="18" fill="#9aa4a6"/><rect x="167" y="30" width="6" height="14" fill="#9aa4a6"/>`;
        s += range(6, i => `<line x1="${158 + i * 5}" y1="80" x2="${150 + i * 7}" y2="150" stroke="#8fc3d9" opacity=".6"/>`);
        s += `<rect x="240" y="0" width="160" height="300" fill="#2e4a3f"/>`;
        s += `<rect x="260" y="40" width="120" height="100" rx="50" fill="#dfe8ea" stroke="#b08d57" stroke-width="4"/>`;
        s += `<rect x="255" y="170" width="130" height="50" rx="4" fill="#c9a57a"/><rect x="255" y="164" width="130" height="8" fill="#fff"/>`;
        s += `<rect x="0" y="270" width="400" height="30" fill="#d7d3cb"/>`;
        s += `<rect x="360" y="140" width="14" height="24" fill="#6aa56f"/><circle cx="367" cy="136" r="10" fill="#4f8a55"/>`;
      }
      return wrap(s);
    },

    exterior(after) {
      const body = after ? '#315c49' : '#b9b3a6';
      const trim = after ? '#ffffff' : '#d8d1c0';
      let s = `<rect width="400" height="300" fill="${after ? '#bfe0ef' : '#cfd6d8'}"/>`;
      s += `<rect y="250" width="400" height="50" fill="${after ? '#86b36b' : '#a4a78a'}"/>`;
      s += `<path d="M60 130 L200 40 L340 130 Z" fill="${after ? '#3a3a3a' : '#6d6a64'}"/>`;
      s += `<path d="M60 130 L200 40 L340 130" stroke="${trim}" stroke-width="6" fill="none"/>`;
      s += `<rect x="80" y="130" width="240" height="125" fill="${body}"/>`;
      s += range(10, i => `<line x1="80" y1="${140 + i * 12}" x2="320" y2="${140 + i * 12}" stroke="${after ? '#27493a' : '#a59e8f'}"/>`);
      s += `<rect x="178" y="175" width="44" height="80" fill="${after ? '#dd7656' : '#8a7f6c'}" stroke="${trim}" stroke-width="5"/>`;
      s += `<rect x="100" y="160" width="50" height="45" fill="#cfe3ea" stroke="${trim}" stroke-width="5"/><rect x="250" y="160" width="50" height="45" fill="#cfe3ea" stroke="${trim}" stroke-width="5"/>`;
      if (!after) {
        s += range(12, i => `<path d="M${90 + i * 19} ${150 + (i * 37) % 90} l6 3 l-3 5" stroke="#8d8676" fill="none"/>`);
        s += `<rect x="92" y="160" width="6" height="45" fill="#6f6a60"/><rect x="302" y="160" width="6" height="45" fill="#6f6a60"/>`;
      } else {
        s += `<rect x="88" y="158" width="10" height="49" fill="#1f3e31"/><rect x="152" y="158" width="10" height="49" fill="#1f3e31"/><rect x="238" y="158" width="10" height="49" fill="#1f3e31"/><rect x="302" y="158" width="10" height="49" fill="#1f3e31"/>`;
        s += `<ellipse cx="110" cy="252" rx="30" ry="14" fill="#4f8a55"/><ellipse cx="290" cy="252" rx="30" ry="14" fill="#4f8a55"/>`;
        s += `<circle cx="96" cy="245" r="4" fill="#dd7656"/><circle cx="302" cy="244" r="4" fill="#e8a93a"/><circle cx="212" cy="215" r="3" fill="#b08d57"/>`;
      }
      return wrap(s);
    },

    room(after) {
      let s = `<rect width="400" height="300" fill="${after ? '#9fb59a' : '#cfc3a8'}"/>`;
      if (after) s += `<rect x="0" y="0" width="120" height="230" fill="#315c49"/>`;
      s += `<rect y="230" width="400" height="70" fill="${after ? '#c9a57a' : '#9c8e76'}"/>`;
      s += `<rect y="224" width="400" height="8" fill="${after ? '#fff' : '#b5aa92'}"/>`;
      s += `<rect x="190" y="50" width="120" height="80" fill="${after ? '#f4ecdc' : '#bdb095'}" stroke="${after ? '#b08d57' : '#8b8069'}" stroke-width="5"/>`;
      if (after) s += `<path d="M195 120 l30 -35 l25 25 l20 -15 l35 25 z" fill="#dd7656" opacity=".8"/><circle cx="280" cy="75" r="9" fill="#e8a93a"/>`;
      s += `<rect x="150" y="170" width="200" height="50" rx="10" fill="${after ? '#f3ede2' : '#8a7a62'}"/><rect x="140" y="160" width="220" height="24" rx="10" fill="${after ? '#e7dfcf' : '#7a6b55'}"/>`;
      s += `<rect x="160" y="218" width="6" height="14" fill="#333"/><rect x="334" y="218" width="6" height="14" fill="#333"/>`;
      if (!after) {
        s += range(7, i => `<path d="M${30 + i * 55} ${60 + (i * 41) % 120} q8 4 14 -2" stroke="#9c8f73" stroke-width="3" fill="none"/>`);
        s += `<rect x="30" y="0" width="340" height="3" fill="#b5aa92"/>`;
      } else {
        s += `<rect x="40" y="150" width="8" height="80" fill="#333"/><path d="M24 150 h40 l-8 -30 h-24z" fill="#f3ede2"/>`;
        s += `<rect x="180" y="150" width="30" height="24" rx="6" fill="#dd7656"/><rect x="290" y="150" width="30" height="24" rx="6" fill="#e8a93a"/>`;
        s += `<rect x="360" y="190" width="20" height="40" fill="#b07a4c"/><circle cx="370" cy="178" r="18" fill="#4f8a55"/>`;
      }
      return wrap(s);
    },

    floor(after) {
      let s = `<rect width="400" height="300" fill="${after ? '#f3ede2' : '#d6cdb9'}"/>`;
      s += `<rect x="150" y="40" width="100" height="120" fill="${after ? '#cfe3ea' : '#c5ccd0'}" stroke="${after ? '#fff' : '#aaa'}" stroke-width="6"/>`;
      s += `<path d="M0 160 H400 V300 H0 Z" fill="${after ? '#b98a5a' : '#8f8466'}"/>`;
      if (!after) {
        s += range(30, i => `<circle cx="${(i * 71) % 400}" cy="${170 + (i * 37) % 125}" r="${2 + (i % 3)}" fill="#7d7258" opacity=".7"/>`);
        s += `<ellipse cx="200" cy="240" rx="60" ry="14" fill="#6e6450" opacity=".5"/><ellipse cx="90" cy="200" rx="30" ry="8" fill="#6e6450" opacity=".4"/>`;
      } else {
        s += range(12, i => { const y = 160 + i * 12 + i * i * .6; return `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#9b6f43" stroke-width="1.2"/>`; });
        s += range(12, i => range(4, j => { const y = 160 + i * 12 + i * i * .6; const x = ((j * 113 + i * 57) % 400); return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 12 + i * 1.2}" stroke="#9b6f43"/>`; }));
        s += `<polygon points="150,160 250,160 300,300 100,300" fill="#fff" opacity=".12"/>`;
        s += `<rect x="0" y="154" width="400" height="8" fill="#fff"/>`;
        s += `<ellipse cx="200" cy="250" rx="90" ry="20" fill="#e7dfcf"/>`;
      }
      return wrap(s);
    }
  };

  function scene(type, after) {
    return (scenes[type] || scenes.room)(after);
  }

  window.ART = { icon, scene };
})();
