// calc.js - Modül 01 (tablo destekli sürüm)
(function () {

  // --- Tablo verileri -------------------------------------------------------
  const anaProfilVerileri = {
    "IPE A 100": 3.6, "IPE 100": 4.1,
    "IPE A 120": 3.8, "IPE 120": 4.4,
    "IPE A 140": 3.8, "IPE 140": 4.7,
    "IPE A 160": 4.0, "IPE 160": 5.0,
    "IPE A 180": 4.3, "IPE 180": 5.3, "IPE O 180": 6.0,
    "IPE A 200": 4.5, "IPE 200": 5.6, "IPE O 200": 6.2,
    "IPE A 220": 5.0, "IPE 220": 5.9, "IPE O 220": 6.6,
    "IPE A 240": 5.2, "IPE 240": 6.2, "IPE O 240": 7.0,
    "IPE A 270": 5.5, "IPE 270": 6.6, "IPE O 270": 7.5,
    "IPE A 300": 6.1, "IPE 300": 7.1, "IPE O 300": 8.0,
    "IPE A 330": 6.5, "IPE 330": 7.5, "IPE O 330": 8.5,
    "IPE A 360": 6.6, "IPE 360": 8.0, "IPE O 360": 9.2,
    "IPE A 400": 7.0, "IPE 400": 8.6, "IPE O 400": 9.7,
    "IPE A 450": 7.6, "IPE 450": 9.4, "IPE O 450": 11.0,
    "IPE A 500": 8.4, "IPE 500": 10.2, "IPE O 500": 12.0,
    "IPE A 550": 9.0, "IPE 550": 11.1, "IPE O 550": 12.7,
    "IPE A 600": 9.8, "IPE 600": 12.0, "IPE O 600": 15.0,
    "IPE 750 x 147": 13.2, "IPE 750 x 173": 14.4, "IPE 750 x 196": 15.6
  };

  const taliProfilVerileri = {
    "UPN 100": 6, "UPN 120": 7, "UPN 140": 7, "UPN 160": 7.5,
    "UPN 180": 8, "UPN 200": 8.5, "UPN 220": 9, "UPN 240": 9.5,
    "UPN 260": 10, "UPN 280": 10, "UPN 300": 10, "UPN 320": 14,
    "UPN 350": 14, "UPN 380": 13.5, "UPN 400": 14
  };

  const malzemeListesi = {
    "S235": { Fy: 235, Fu: 360, Fy2: 215, Fu2: 360 },
    "S275": { Fy: 275, Fu: 430, Fy2: 255, Fu2: 410 },
    "S355": { Fy: 355, Fu: 510, Fy2: 335, Fu2: 470 },
    "S450": { Fy: 450, Fu: 570, Fy2: 410, Fu2: 550 }
  };

  const bulonList = [
    { text: "M10", db: 10 }, { text: "M12", db: 12 }, { text: "M16", db: 16 },
    { text: "M20", db: 20 }, { text: "M24", db: 24 }, { text: "M27", db: 27 },
    { text: "M30", db: 30 }, { text: "M33", db: 33 }, { text: "M36", db: 36 }
  ];

  // --- Select doldurma ------------------------------------------------------
  function populateSelect(id, items) {
    const sel = document.getElementById(id);
    sel.innerHTML = '<option value="">Seçiniz...</option>';
    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      sel.appendChild(opt);
      if (id === "anaProfil" && item === "IPE 400") opt.selected = true;
      if (id === "taliProfil" && item === "UPN 300") opt.selected = true;
      if (id === "anaMalzeme" && item === "S355") opt.selected = true;
      if (id === "taliMalzeme" && item === "S355") opt.selected = true;
      if (id === "kosebentMalzeme" && item === "S355") opt.selected = true;
    });
  }

  populateSelect("anaProfil", Object.keys(anaProfilVerileri));
  populateSelect("taliProfil", Object.keys(taliProfilVerileri));
  populateSelect("anaMalzeme", Object.keys(malzemeListesi));
  populateSelect("taliMalzeme", Object.keys(malzemeListesi));
  populateSelect("kosebentMalzeme", Object.keys(malzemeListesi));

  const boltSelect = document.getElementById('boltSelect');
  bulonList.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.db;
    opt.textContent = b.text;
    if (b.db === 20) opt.selected = true;
    boltSelect.appendChild(opt);
  });

  // Köşebent et kalınlığı değişirse t'ye yansıt
  document.getElementById('kosebent_t').addEventListener('change', e => {
    const t = parseFloat(e.target.value);
    if (t) document.getElementById('t').value = t;
  });

  // --- Hesaplama -------------------------------------------------------------
  function calculate() {
    const anaMalzeme = document.getElementById('anaMalzeme').value;
    const taliMalzeme = document.getElementById('taliMalzeme').value;
    const kosebentMalzeme = document.getElementById('kosebentMalzeme').value;
    if (!anaMalzeme || !taliMalzeme || !kosebentMalzeme) {
      alert("Lütfen tüm malzeme türlerini seçin.");
      return;
    }

    // zayıf malzeme belirle
    let zayıfMalzeme = (malzemeListesi[anaMalzeme].Fy < malzemeListesi[taliMalzeme].Fy)
      ? anaMalzeme : taliMalzeme;
    let { Fy, Fu, Fy2, Fu2 } = malzemeListesi[zayıfMalzeme];
    const t = parseFloat(document.getElementById('kosebent_t').value);
    if (t > 40) { Fy = Fy2; Fu = Fu2; }
    document.getElementById('t').value = t;

    const db = parseFloat(document.getElementById('boltSelect').value);
    const Ubs = parseFloat(document.getElementById('Ubs').value);
    const phi = parseFloat(document.getElementById('phi').value);
    const shearWidths = document.getElementById('shearWidths').value.split(',').map(x => parseFloat(x.trim()));
    const tensionWidth = parseFloat(document.getElementById('tensionWidth').value);
    const shearHoleCount = parseFloat(document.getElementById('shearHoleCount').value);
    const tensionHoleFactor = parseFloat(document.getElementById('tensionHoleFactor').value);

    const dh = db + 2;
    const Agv = shearWidths.reduce((a, b) => a + b, 0) * t;
    const Anv = Agv - shearHoleCount * dh * t;
    const Ant = (tensionWidth * t) - (tensionHoleFactor * dh * t);

    const expr1 = 0.6 * Fu * Anv + Ubs * Fu * Ant;
    const expr2 = 0.6 * Fy * Agv + Ubs * Fu * Ant;
    const Rn = Math.min(expr1, expr2);
    const Rd = phi * Rn;

    // çıktı alanları
    const varsHTML = `
      $$t = ${t}\\text{ mm},\\quad d_b = ${db}\\text{ mm},\\quad d_h = d_b + 2 = ${dh}\\text{ mm}$$
      $$U_{bs} = ${Ubs},\\quad \\phi = ${phi}$$
      $$F_y = ${Fy}\\text{ MPa},\\quad F_u = ${Fu}\\text{ MPa}$$
      $$b_{kesme} = [${shearWidths.join(', ')}],\\quad b_{cekme} = ${tensionWidth}$$
      $$n_{kesme} = ${shearHoleCount},\\quad n_{cekme} = ${tensionHoleFactor}$$
    `;

    const stepsHTML = `
      $$A_{gv} = \\sum b_i \\cdot t = (${shearWidths.join('+')})\\times${t} = ${Agv.toFixed(1)}\\text{ mm}^2$$
      $$A_{nv} = A_{gv} - n_{kesme}\\, d_h\\, t = ${Agv.toFixed(1)} - ${shearHoleCount}\\times${dh}\\times${t} = ${Anv.toFixed(1)}\\text{ mm}^2$$
      $$A_{nt} = b_{cekme}\\,t - n_{cekme}\\, d_h\\, t = ${tensionWidth}\\times${t} - ${tensionHoleFactor}\\times${dh}\\times${t} = ${Ant.toFixed(1)}\\text{ mm}^2$$
      $$R_n = \\min(0.6F_uA_{nv} + U_{bs}F_uA_{nt},\\; 0.6F_yA_{gv} + U_{bs}F_uA_{nt})$$
      $$= \\min(${(expr1).toFixed(1)},\\; ${(expr2).toFixed(1)}) = ${Rn.toFixed(1)}\\text{ N} = ${(Rn / 1000).toFixed(2)}\\text{ kN}$$
      $$R_d = \\phi R_n = ${phi}\\times${Rn.toFixed(1)} = ${Rd.toFixed(1)}\\text{ N} = ${(Rd / 1000).toFixed(2)}\\text{ kN}$$
    `;

    const resultsHTML = `
      $$\\quad R_d = ${(Rd / 1000).toFixed(2)}\\text{ kN}$$
    `;

    document.getElementById('vars').innerHTML = varsHTML;
    document.getElementById('calcSteps').innerHTML = stepsHTML;
    document.getElementById('results').innerHTML = resultsHTML;

    if (window.renderMathInElement) renderMathInElement(document.body);
  }

  document.getElementById('calcBtn').addEventListener('click', calculate);
  document.getElementById('resetBtn').addEventListener('click', () => location.reload());

})();
