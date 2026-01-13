// calc.js - Modül 19 
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

  const IPE_GEOMETRY = {
    "IPE A 100": { d: 98, bf: 55, tw: 3.6, tf: 4.7 },
    "IPE 100": { d: 100, bf: 55, tw: 4.1, tf: 5.7 },

    "IPE A 120": { d: 117.6, bf: 64, tw: 3.8, tf: 5.1 },
    "IPE 120": { d: 120, bf: 64, tw: 4.4, tf: 6.3 },

    "IPE A 140": { d: 137.4, bf: 73, tw: 3.8, tf: 5.6 },
    "IPE 140": { d: 140, bf: 73, tw: 4.7, tf: 6.9 },

    "IPE A 160": { d: 157, bf: 82, tw: 4.0, tf: 5.9 },
    "IPE 160": { d: 160, bf: 82, tw: 5.0, tf: 7.4 },

    "IPE A 180": { d: 177, bf: 91, tw: 4.3, tf: 6.5 },
    "IPE 180": { d: 180, bf: 91, tw: 5.3, tf: 8.0 },
    "IPE O 180": { d: 182, bf: 92, tw: 6.0, tf: 9.0 },

    "IPE A 200": { d: 197, bf: 100, tw: 4.5, tf: 7.0 },
    "IPE 200": { d: 200, bf: 100, tw: 5.6, tf: 8.5 },
    "IPE O 200": { d: 202, bf: 102, tw: 6.2, tf: 9.5 },

    "IPE A 220": { d: 217, bf: 110, tw: 5.0, tf: 7.7 },
    "IPE 220": { d: 220, bf: 110, tw: 5.9, tf: 9.2 },
    "IPE O 220": { d: 222, bf: 112, tw: 6.6, tf: 10.2 },

    "IPE A 240": { d: 237, bf: 120, tw: 5.2, tf: 8.3 },
    "IPE 240": { d: 240, bf: 120, tw: 6.2, tf: 9.8 },
    "IPE O 240": { d: 242, bf: 122, tw: 7.0, tf: 10.8 },

    "IPE A 270": { d: 267, bf: 135, tw: 5.5, tf: 8.7 },
    "IPE 270": { d: 270, bf: 135, tw: 6.6, tf: 10.2 },
    "IPE O 270": { d: 274, bf: 136, tw: 7.5, tf: 12.2 },

    "IPE A 300": { d: 297, bf: 150, tw: 6.1, tf: 9.2 },
    "IPE 300": { d: 300, bf: 150, tw: 7.1, tf: 10.7 },
    "IPE O 300": { d: 304, bf: 152, tw: 8.0, tf: 12.7 },

    "IPE A 330": { d: 327, bf: 160, tw: 6.5, tf: 10.0 },
    "IPE 330": { d: 330, bf: 160, tw: 7.5, tf: 11.5 },
    "IPE O 330": { d: 334, bf: 162, tw: 8.5, tf: 13.5 },

    "IPE A 360": { d: 357.6, bf: 170, tw: 6.6, tf: 11.5 },
    "IPE 360": { d: 360, bf: 170, tw: 8.0, tf: 12.7 },
    "IPE O 360": { d: 364, bf: 172, tw: 9.2, tf: 14.7 },

    "IPE A 400": { d: 397, bf: 180, tw: 7.0, tf: 12.0 },
    "IPE 400": { d: 400, bf: 180, tw: 8.6, tf: 13.5 },
    "IPE O 400": { d: 404, bf: 182, tw: 9.7, tf: 15.5 },

    "IPE A 450": { d: 447, bf: 190, tw: 7.6, tf: 13.1 },
    "IPE 450": { d: 450, bf: 190, tw: 9.4, tf: 14.6 },
    "IPE O 450": { d: 456, bf: 192, tw: 11.0, tf: 17.6 },

    "IPE A 500": { d: 497, bf: 200, tw: 8.4, tf: 14.5 },
    "IPE 500": { d: 500, bf: 200, tw: 10.2, tf: 16.0 },
    "IPE O 500": { d: 506, bf: 202, tw: 12.0, tf: 19.0 },

    "IPE A 550": { d: 547, bf: 210, tw: 9.0, tf: 15.7 },
    "IPE 550": { d: 550, bf: 210, tw: 11.1, tf: 17.2 },
    "IPE O 550": { d: 556, bf: 212, tw: 12.7, tf: 20.2 },

    "IPE A 600": { d: 597, bf: 220, tw: 9.8, tf: 17.5 },
    "IPE 600": { d: 600, bf: 220, tw: 12.0, tf: 19.0 },
    "IPE O 600": { d: 610, bf: 224, tw: 15.0, tf: 24.0 },

    "IPE 750 x 147": { d: 753, bf: 265, tw: 13.2, tf: 17.0 },
    "IPE 750 x 173": { d: 762, bf: 267, tw: 14.4, tf: 21.6 },
    "IPE 750 x 196": { d: 770, bf: 268, tw: 15.6, tf: 25.4 }
  };

  const halfIPEGeometries = {};
  for (const e in IPE_GEOMETRY) {
    const geo = IPE_GEOMETRY[e];
    halfIPEGeometries[e] = {
      d: geo.d / 2,
      bf: geo.bf,
      tw: geo.tw,
      tf: geo.tf
    };
  }


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

  // Bulon sınıfı – kesme hesabı için Fub_MPa buradan alınır
  const BULON_SINIFLARI = [
    { bulonSınıfı: "4.6", Fyb_MPa: 240, Fub_MPa: 400 },
    { bulonSınıfı: "4.8", Fyb_MPa: 320, Fub_MPa: 400 },
    { bulonSınıfı: "5.6", Fyb_MPa: 300, Fub_MPa: 500 },
    { bulonSınıfı: "5.8", Fyb_MPa: 400, Fub_MPa: 500 },
    { bulonSınıfı: "6.8", Fyb_MPa: 480, Fub_MPa: 600 },
    { bulonSınıfı: "8.8", Fyb_MPa: 640, Fub_MPa: 800 },
    { bulonSınıfı: "10.9", Fyb_MPa: 900, Fub_MPa: 1000 }
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
      if (id === "anaProfil" && item === "IPE 360") opt.selected = true;
      if (id === "taliProfil" && item === "IPE 270") opt.selected = true;
      if (id === "arayuzProfil" && item === "IPE 200") opt.selected = true;
      if (id === "anaMalzeme" && item === "S355") opt.selected = true;
      if (id === "taliMalzeme" && item === "S355") opt.selected = true;
      if (id === "arayuzMalzeme" && item === "S355") opt.selected = true;
    });
  }

  populateSelect("anaProfil", Object.keys(anaProfilVerileri));
  populateSelect("taliProfil", Object.keys(anaProfilVerileri));
  populateSelect("arayuzProfil", Object.keys(halfIPEGeometries));
  populateSelect("anaMalzeme", Object.keys(malzemeListesi));
  populateSelect("taliMalzeme", Object.keys(malzemeListesi));
  populateSelect("arayuzMalzeme", Object.keys(malzemeListesi));

  const boltSelect = document.getElementById('boltSelect');
  bulonList.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.db;
    opt.textContent = b.text;
    if (b.db === 20) opt.selected = true;
    boltSelect.appendChild(opt);
  });

  // Bulon sınıfı select doldurma (varsayılan 6.8)
  const boltClassSel = document.getElementById("boltClass");
  if (boltClassSel && !boltClassSel.options.length) {
    BULON_SINIFLARI.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.bulonSınıfı;
      opt.textContent = b.bulonSınıfı;
      if (b.bulonSınıfı === "6.8") opt.selected = true;
      boltClassSel.appendChild(opt);
    });
  }



  //Tabloyu dolduran yardımcılar
  // Limit durum isimleri
  const LIMIT_LABELS = {
    block: "Blok kırılma",
    bearing: "Bulon deliği ezilme",
    boltShear: "Bulon kesme kuvveti",
    shearYield: "Kayma etkisinde akma",
    shearFracture: "Kayma etkisinde kırılma",
    weld: "Kaynak dayanımı"
  };

  // Özet değerlerini tutacağımız obje
  const LIMIT_SUMMARY = {};

  // Her limit durumu hesabından sonra çağır:
  function setSummary(key, value_kN) {
    if (!isFinite(value_kN)) return;
    LIMIT_SUMMARY[key] = Number(value_kN);
  }

  // Tabloyu güncelle
  function renderSummaryTable() {
    const tbody = document.getElementById("summaryBody");
    const minSpan = document.getElementById("summaryMin");
    if (!tbody) return;

    tbody.innerHTML = "";

    let minKey = null;
    let minVal = Infinity;
    const rows = [];

    Object.keys(LIMIT_LABELS).forEach((key) => {
      const val = LIMIT_SUMMARY[key];
      if (!isFinite(val)) return; // hesaplanmamış ise satır yok

      if (val < minVal) {
        minVal = val;
        minKey = key;
      }

      rows.push({ key, label: LIMIT_LABELS[key], val });
    });

    if (!rows.length) {
      tbody.innerHTML = `
      <tr>
        <td colspan="2" style="text-align:center; color:var(--muted);">
          Henüz hesaplama yapılmadı.
        </td>
      </tr>`;
      if (minSpan) minSpan.textContent = "-";
      return;
    }

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      if (row.key === minKey) tr.classList.add("critical");

      const tdName = document.createElement("td");
      tdName.textContent = row.label;

      const tdVal = document.createElement("td");
      tdVal.textContent = row.val.toFixed(3) + " kN";

      tr.appendChild(tdName);
      tr.appendChild(tdVal);
      tbody.appendChild(tr);
    });

    if (minSpan && isFinite(minVal)) {
      minSpan.textContent = `${LIMIT_LABELS[minKey]} — ${minVal.toFixed(3)} kN`;
    }
  }



  // --- Hesaplama -------------------------------------------------------------
  function calculate() {
    const anaMalzeme = document.getElementById('anaMalzeme').value;
    const taliMalzeme = document.getElementById('taliMalzeme').value;
    const arayuzMalzeme = document.getElementById('arayuzMalzeme').value;
    if (!anaMalzeme || !taliMalzeme || !arayuzMalzeme) {
      alert("Lütfen tüm malzeme türlerini seçin.");
      return;
    }

    // zayıf malzeme belirle
    let zayıfMalzeme = (malzemeListesi[arayuzMalzeme].Fy < malzemeListesi[anaMalzeme].Fy)
      ? arayuzMalzeme : anaMalzeme;
    let { Fy, Fu, Fy2, Fu2 } = malzemeListesi[zayıfMalzeme];


    const db = parseFloat(document.getElementById('boltSelect').value);
    const Ubs = parseFloat(document.getElementById('Ubs').value);
    const phi = parseFloat(document.getElementById('phi').value);
    const shearWidths = document.getElementById('shearWidths').value.split(',').map(x => parseFloat(x.trim()));
    const tensionWidth = parseFloat(document.getElementById('tensionWidth').value);
    const shearHoleCount = parseFloat(document.getElementById('shearHoleCount').value);
    const tensionHoleFactor = parseFloat(document.getElementById('tensionHoleFactor').value);


    // Blok kırılma dayanımı (13.4.3) — 1/2 I kesit ara yüz elemanı
    // 1) Geometri – ana kiriş / ara yüz için kalınlık seçimi
    const anaProfil = document.getElementById('anaProfil').value;
    const arayuzProfil = document.getElementById('arayuzProfil').value;

    const tAna = anaProfilVerileri[anaProfil] || 0;                         // ana IPE gövde kalınlığı
    const tArayuz = (halfIPEGeometries[arayuzProfil] || {}).tw || 0;       // 1/2 I kesit gövde kalınlığı

    // Blok kırılma için kritik kalınlık: daha ince olan
    const t_block = (tAna && tArayuz) ? Math.min(tAna, tArayuz) : (tArayuz || tAna);

    if (!t_block || !shearWidths.length) {
      document.getElementById('vars').innerHTML =
        'Blok kırılma hesabı için geçerli kesme yolu / kalınlık verisi giriniz.';
    } else {
      // 2) Malzeme – kalınlığa göre Fy/Fu seçimi
      let Fy_use = Fy;
      let Fu_use = Fu;

      if (t_block > 40) {          // kalınlık 40 mm üstünde ise ikinci grup değerleri kullan
        if (Fy2) Fy_use = Fy2;
        if (Fu2) Fu_use = Fu2;
      }

      // 3) Alanlar
      const dh = db + 2; // delik çapı
      const sumShear = shearWidths.reduce((s, w) => s + w, 0);   // ör: 120 mm
      const t = t_block;

      const Agv = sumShear * t;                                 // brüt kesme alanı
      const Anv = Agv - shearHoleCount * dh * t;                // net kesme alanı
      const Ant = (tensionWidth * t) - (tensionHoleFactor * dh * t); // net çekme alanı

      // 4) Dayanımlar
      const Rn1 = 0.60 * Fu_use * Anv + Ubs * Fu_use * Ant;     // N
      const Rn2 = 0.60 * Fy_use * Agv + Ubs * Fu_use * Ant;     // N
      const Rn = Math.min(Rn1, Rn2);                           // N
      const Rd = phi * Rn;                                     // N
      const Rd_kN = Rd / 1000.0;

      // 5) KaTeX – kullanılan değişkenler
      const varsHTML = String.raw`
$$
t = ${t.toFixed(2)}\,\text{mm},\quad
d_b = ${db}\,\text{mm},\quad
d_h = d_b + 2 = ${dh}\,\text{mm} \\
\sum b_{\text{kesme}} = ${shearWidths.join(' + ')} = ${sumShear}\,\text{mm},\quad
b_{\text{çekme}} = ${tensionWidth}\,\text{mm} \\
F_y = ${Fy_use}\,\text{MPa},\quad
F_u = ${Fu_use}\,\text{MPa},\quad
U_{bs} = ${Ubs},\ \varphi = ${phi}
$$
`;

      // 6) KaTeX – işlem basamakları
      const stepsHTML = String.raw`
$$
\begin{aligned}
A_{gv} &= \sum b_i\,t = (${shearWidths.join(' + ')})\times ${t.toFixed(2)}
        = ${Agv.toFixed(2)}\ \text{mm}^2 \\
A_{nv} &= A_{gv} - n_{\text{kesme}}\,d_h\,t
        = ${Agv.toFixed(2)} - ${shearHoleCount}\times ${dh}\times ${t.toFixed(2)}
        = ${Anv.toFixed(2)}\ \text{mm}^2 \\
A_{nt} &= b_{\text{çekme}}\,t - n_{\text{çekme}}\,d_h\,t
        = ${tensionWidth}\times ${t.toFixed(2)} - ${tensionHoleFactor}\times ${dh}\times ${t.toFixed(2)}
        = ${Ant.toFixed(2)}\ \text{mm}^2 \\
R_{n1} &= 0.60\,F_u\,A_{nv} + U_{bs}F_uA_{nt} \\
       &= 0.60\times ${Fu_use}\times ${Anv.toFixed(2)} + ${Ubs}\times ${Fu_use}\times ${Ant.toFixed(2)}
        = ${Rn1.toFixed(2)}\ \text{N} \\
R_{n2} &= 0.60\,F_y\,A_{gv} + U_{bs}F_uA_{nt} \\
       &= 0.60\times ${Fy_use}\times ${Agv.toFixed(2)} + ${Ubs}\times ${Fu_use}\times ${Ant.toFixed(2)}
        = ${Rn2.toFixed(2)}\ \text{N} \\
R_n &= \min(R_{n1},R_{n2})
     = ${Rn.toFixed(2)}\ \text{N}
     = ${(Rn / 1000).toFixed(2)}\ \text{kN}
\end{aligned}
$$
$$
R_d = \varphi R_n = ${phi}\times ${(Rn / 1000).toFixed(2)} = \mathbf{${Rd_kN.toFixed(2)}\ \text{kN}}
$$
`;

      // 7) Sonuç alanını doldur
      const resHTML = String.raw`
$$
R_{d,\text{blok}} = ${Rd_kN.toFixed(2)}\ \text{kN}
$$
`;

      const v1 = document.getElementById('vars');
      const s1 = document.getElementById('calcSteps');
      const r1 = document.getElementById('results');

      if (v1) v1.innerHTML = varsHTML;
      if (s1) s1.innerHTML = stepsHTML;
      if (r1) r1.innerHTML = resHTML;

      // Hesaplama özetine yaz
      setSummary('block', Rd_kN);
    }

    // 19.4.2 — Bulon Deliği Ezilme Kuvveti Dayanımı (½ IPE + IPE)
    (function bearingCrushingJoint19() {
      const varsEl = document.getElementById("vars2");
      const stepsEl = document.getElementById("calcSteps2");
      const resultEl = document.getElementById("results2");
      if (!varsEl || !stepsEl || !resultEl) return;

      // Sayısal okuma helper
      const num = (v) => {
        const n = (typeof v === "string") ? v.replace(",", ".") : v;
        return Number(n);
      };

      const matDB = (typeof malzemeListesi !== "undefined") ? malzemeListesi : null;

      function pickFuFromMaterial(selectId, thk) {
        const sel = document.getElementById(selectId);
        const key = sel ? sel.value : null;
        if (!key || !matDB || !matDB[key]) return NaN;
        const rec = matDB[key];

        // t<40 için Fu , yoksa Fu2
        let Fu = thk < 40 ? rec.Fu : rec.Fu2;
        Fu = Number(Fu) || Number(rec.Fu) || NaN;
        return Fu;
      }

      const db = num(document.getElementById("boltSelect")?.value) || 20;
      const dh = db + 2;
      const phi = num(document.getElementById("phi")?.value) || 0.75;

      // ==========================================================
      // 1) ½ IPE ARAYÜZ TARAFI
      // ==========================================================

      // Arayüz profil seçimi (½ I kesit)
      const arayuzSel = document.getElementById("arayuzProfil");
      const arayuzName = arayuzSel ? arayuzSel.value : null;

      // İster tabloda, ister manuel girişte tanımlı olsun
      const t_int_manual =
        num(document.getElementById("arayuz_t")?.value);

      let t_int = t_int_manual;
      if (!isFinite(t_int) || t_int <= 0) {
        if (arayuzName && halfIPEGeometries[arayuzName]) {
          t_int = halfIPEGeometries[arayuzName].tw;   // gövde kalınlığı
        } else {
          t_int = 5.6; // örnek için emniyetli varsayılan
        }
      }

      let Fu_int = pickFuFromMaterial("arayuzMalzeme", t_int);
      if (!Number.isFinite(Fu_int)) Fu_int = 510; // örnekteki gibi

      // ½ IPE arayüzde kenar ve aralık mesafeleri
      const e1_int = num(document.getElementById("leg_e1")?.value) || 40.0; // Bulon 1 kenar mesafesi
      const p_int = num(document.getElementById("leg_p")?.value) || 80.0; // Bulonlar arası mesafe

      // lc değerleri (½ IPE200 örneğindeki gibi)
      const lc1_int = e1_int - dh / 2.0;  // Bulon 1
      const lc2_int = p_int - dh;        // Bulon 2

      function bearingRn_kN(lc, t, Fu, dbVal) {
        const R1 = 1.2 * lc * t * Fu;
        const R2 = 2.4 * dbVal * t * Fu;
        return Math.min(R1, R2) * 1e-3; // kN
      }

      const Rn1_int = bearingRn_kN(lc1_int, t_int, Fu_int, db);
      const Rn2_int = bearingRn_kN(lc2_int, t_int, Fu_int, db);

      // ½ IPE arayüzde tek eleman → direkt toplam
      const Rn_int_sum = Rn1_int + Rn2_int;
      const Rd_int = phi * Rn_int_sum;

      // ==========================================================
      // 2) IPE TARAFI — ana ve tali IPE’den zayıf olan
      // ==========================================================

      const anaProfilSel = document.getElementById("anaProfil");
      const taliProfilSel = document.getElementById("taliProfil");
      const anaName = anaProfilSel ? anaProfilSel.value : null;
      const taliName = taliProfilSel ? taliProfilSel.value : null;

      function getIpeCandidate(name, matSelectId) {
        if (!name || !IPE_GEOMETRY[name]) return null;
        const geo = IPE_GEOMETRY[name];
        const Fu = pickFuFromMaterial(matSelectId, geo.tw);
        if (!Number.isFinite(Fu)) return null;
        const index = geo.tw * Fu; // tw·Fu küçük olan daha zayıf
        return { name, geo, Fu, index };
      }

      const candAna = getIpeCandidate(anaName, "anaMalzeme");
      const candTali = getIpeCandidate(taliName, "taliMalzeme");

      let ipe;
      if (candAna && candTali) {
        ipe = (candAna.index <= candTali.index) ? candAna : candTali;
      } else if (candAna || candTali) {
        ipe = candAna || candTali;
      } else {
        ipe = getIpeCandidate("IPE 270", "anaMalzeme"); // örneğe uygun fallback
      }
      if (!ipe) return;

      const profilName = ipe.name;
      const d = ipe.geo.d;
      const bf = ipe.geo.bf;
      const tw = ipe.geo.tw;
      const tf = ipe.geo.tf;
      const Fu_ipe = ipe.Fu;

      const s_ipe =
        num(document.getElementById("ipe_s")?.value) || 80.0; // bulonlar arası düşey mesafe

      const lc1_ipe = (d / 2.0 - tf + bf / 2.0) - dh / 2.0 - s_ipe / 2.0;
      const lc2_ipe = s_ipe - dh;

      const Rn1_ipe = bearingRn_kN(lc1_ipe, tw, Fu_ipe, db);
      const Rn2_ipe = bearingRn_kN(lc2_ipe, tw, Fu_ipe, db);
      const Rn_ipe_sum = Rn1_ipe + Rn2_ipe;
      const Rd_ipe = phi * Rn_ipe_sum;

      // ==========================================================
      // 3) KaTeX çıktıları
      // ==========================================================

      const varsTex = String.raw`
$$
\text{½ IPE arayüz:}\;
t = ${t_int.toFixed(2)}\,\text{mm},\;
F_u = ${Fu_int.toFixed(0)}\,\text{MPa},\;
e_1 = ${e1_int.toFixed(2)}\,\text{mm},\;
p = ${p_int.toFixed(2)}\,\text{mm} \\
\text{IPE (kontrol eden):}\;
\text{${profilName}},\;
d = ${d.toFixed(1)}\,\text{mm},\;
b_f = ${bf.toFixed(1)}\,\text{mm},\;
t_w = ${tw.toFixed(2)}\,\text{mm},\;
t_f = ${tf.toFixed(2)}\,\text{mm},\;
F_u = ${Fu_ipe.toFixed(0)}\,\text{MPa} \\
d_b = ${db}\,\text{mm},\;
d_h = d_b+2 = ${dh}\,\text{mm},\;
s = ${s_ipe.toFixed(2)}\,\text{mm},\;
\varphi = ${phi}
$$
`;

      const stepsTex = String.raw`
$$
\textbf{½ IPE arayüz kontrolü} \\
l_{c,1} = e_1 - \frac{d_h}{2}
= ${e1_int.toFixed(2)} - \frac{${dh}}{2}
= ${lc1_int.toFixed(2)}\,\text{mm} \\
l_{c,2} = p - d_h
= ${p_int.toFixed(2)} - ${dh}
= ${lc2_int.toFixed(2)}\,\text{mm} \\
R_{n,1}^{\text{arayüz}} = \min(1.2\,l_{c,1}\,t\,F_u,\; 2.4\,d_b\,t\,F_u)
= \min(${(1.2 * lc1_int * t_int * Fu_int * 1e-3).toFixed(2)},\;
       ${(2.4 * db * t_int * Fu_int * 1e-3).toFixed(2)})\ \text{kN} \\
R_{n,2}^{\text{arayüz}} = \min(1.2\,l_{c,2}\,t\,F_u,\; 2.4\,d_b\,t\,F_u)
= \min(${(1.2 * lc2_int * t_int * Fu_int * 1e-3).toFixed(2)},\;
       ${(2.4 * db * t_int * Fu_int * 1e-3).toFixed(2)})\ \text{kN} \\
R_{n,\text{arayüz}} = R_{n,1}^{\text{arayüz}} + R_{n,2}^{\text{arayüz}}
= ${Rn1_int.toFixed(2)}+${Rn2_int.toFixed(2)}
= ${Rn_int_sum.toFixed(2)}\ \text{kN}
$$

$$
\textbf{IPE kontrolü (zayıf IPE seçildi)} \\
l_{c,1}^{\text{IPE}} =
\left(\frac{d}{2} - t_f + \frac{b_f}{2}\right) - \frac{d_h}{2} - \frac{s}{2}
= ${lc1_ipe.toFixed(2)}\,\text{mm} \\
l_{c,2}^{\text{IPE}} = s - d_h
= ${s_ipe.toFixed(2)} - ${dh}
= ${lc2_ipe.toFixed(2)}\,\text{mm} \\
R_{n,1}^{\text{IPE}} =
\min(1.2\,l_{c,1}^{\text{IPE}}\,t_w\,F_u,\; 2.4\,d_b\,t_w\,F_u)
= \min(${(1.2 * lc1_ipe * tw * Fu_ipe * 1e-3).toFixed(2)},\;
       ${(2.4 * db * tw * Fu_ipe * 1e-3).toFixed(2)})\ \text{kN} \\
R_{n,2}^{\text{IPE}} =
\min(1.2\,l_{c,2}^{\text{IPE}}\,t_w\,F_u,\; 2.4\,d_b\,t_w\,F_u)
= \min(${(1.2 * lc2_ipe * tw * Fu_ipe * 1e-3).toFixed(2)},\;
       ${(2.4 * db * tw * Fu_ipe * 1e-3).toFixed(2)})\ \text{kN} \\
R_{n,\text{IPE}} = R_{n,1}^{\text{IPE}}+R_{n,2}^{\text{IPE}}
= ${Rn1_ipe.toFixed(2)}+${Rn2_ipe.toFixed(2)}
= ${Rn_ipe_sum.toFixed(2)}\ \text{kN}
$$
`;

      const Rd_crit = Math.min(Rd_int, Rd_ipe);
      const critText =
        (Rd_int < Rd_ipe)
          ? "Kritik taraf ½ IPE arayüz elemanıdır."
          : `Kritik taraf IPE (${profilName})'dir.`;

      const resultsTex = String.raw`
$$
R_{d,\text{arayüz}} = \varphi\,R_{n,\text{arayüz}}
= ${phi}\times ${Rn_int_sum.toFixed(2)}
= \mathbf{${Rd_int.toFixed(2)}\ \text{kN}} \\
R_{d,\text{IPE}} = \varphi\,R_{n,\text{IPE}}
= ${phi}\times ${Rn_ipe_sum.toFixed(2)}
= \mathbf{${Rd_ipe.toFixed(2)}\ \text{kN}}
$$
<div style="margin-top:6px; text-align:center;">
${critText} Seçilen tasarım kesme kuvveti:
<b>${Rd_crit.toFixed(2)} kN</b>.
</div>
`;

      varsEl.innerHTML = varsTex;
      stepsEl.innerHTML = stepsTex;
      resultEl.innerHTML = resultsTex;

      if (typeof setSummary === "function" && isFinite(Rd_crit)) {
        setSummary("bearing", Rd_crit);
      }
    })();




    // 19.4.3 — Bulonların Kesme Kuvveti Dayanımı (13.3.9)
    (function boltShearCapacity19() {
      const varsEl = document.getElementById("vars3");
      const stepsEl = document.getElementById("calcSteps3");
      const resultEl = document.getElementById("results3");
      if (!varsEl || !stepsEl || !resultEl) return;

      const num = (v) => {
        const n = (typeof v === "string") ? v.replace(",", ".") : v;
        return Number(n);
      };

      // geometrik ve malzeme parametreleri
      const db = num(document.getElementById("boltSelect")?.value) || 20; // mm

      // Bulon sınıfından Fub
      const boltClassSel = document.getElementById("boltClass");
      const boltClassVal = boltClassSel ? boltClassSel.value : "";
      let Fub = 600; // MPa (varsayılan)

      if (boltClassVal && Array.isArray(BULON_SINIFLARI)) {
        const rec = BULON_SINIFLARI.find(b => b.bulonSınıfı === boltClassVal);
        if (rec && isFinite(rec.Fub_MPa)) Fub = rec.Fub_MPa;
      }

      const Fnv = 0.45 * Fub; // MPa

      // kesme düzlemi sayısı (n) ve bulon sayısı (örnekte 2 adet)
      const nPlane = num(document.getElementById("n_shearPlanes")?.value) || 1;
      const nBolt = num(document.getElementById("boltCount")?.value) || 2;

      const phi = num(document.getElementById("phi_bolt")?.value) ||
        num(document.getElementById("phi")?.value) || 0.75;

      // kesit alanı
      const Ab = Math.PI * db * db / 4.0; // mm²

      // dayanımlar
      const Rn_perBolt_kN = nPlane * Fnv * Ab * 1e-3;  // kN, 1 bulon
      const Rn_total_kN = Rn_perBolt_kN * nBolt;     // tüm bulonlar
      const Rd_kN = phi * Rn_total_kN;         // tasarım kesme kuvveti

      // --- KaTeX: kullanılan değişkenler
      const varsTex = String.raw`
$$
d_b = ${db}\,\text{mm},\quad
A_b = \frac{\pi d_b^2}{4} = ${Ab.toFixed(2)}\,\text{mm}^2,\\
F_{ub} = ${Fub.toFixed(0)}\,\text{MPa},\quad
F_{nv} = 0.45\,F_{ub} = ${Fnv.toFixed(0)}\,\text{MPa},\\
n = ${nPlane}\ \text{(kesme düzlemi / bulon)},\quad
n_b = ${nBolt}\ \text{(bulon sayısı)},\quad
\varphi = ${phi}
$$
`;

      // --- KaTeX: işlem basamakları
      const stepsTex = String.raw`
$$
\begin{aligned}
R_{n,b} &= n\,F_{nv}\,A_b
       = ${nPlane}\times ${Fnv.toFixed(0)}\times ${Ab.toFixed(2)}\times 10^{-3}
       = ${Rn_perBolt_kN.toFixed(2)}\ \text{kN} \\
R_n &= n_b\,R_{n,b}
    = ${nBolt}\times ${Rn_perBolt_kN.toFixed(2)}
    = ${Rn_total_kN.toFixed(2)}\ \text{kN}
\end{aligned}
$$
`;

      // --- KaTeX: sonuç
      const resultsTex = String.raw`
$$
R_d = \varphi R_n
    = ${phi}\times ${Rn_total_kN.toFixed(2)}
    = \mathbf{${Rd_kN.toFixed(2)}\ \text{kN}}
$$
`;

      varsEl.innerHTML = varsTex;
      stepsEl.innerHTML = stepsTex;
      resultEl.innerHTML = resultsTex;

      // Hesaplama özet tablosu
      if (typeof setSummary === "function" && isFinite(Rd_kN)) {
        setSummary("boltShear", Rd_kN);
      }
    })();


    // 19.4.4 — Kayma Etkisinde Akma (13.4.2)
    (function shearYield19() {
      const varsEl = document.getElementById("vars4");
      const stepsEl = document.getElementById("calcSteps4");
      const resultEl = document.getElementById("results4");
      if (!varsEl || !stepsEl || !resultEl) return;

      const num = (v) => {
        const n = (typeof v === "string") ? v.replace(",", ".") : v;
        return Number(n);
      };

      function pickFyFromMaterial(selectId, thk) {
        const sel = document.getElementById(selectId);
        const key = sel ? sel.value : null;
        const db = (typeof malzemeListesi !== "undefined") ? malzemeListesi : null;
        if (!key || !db || !db[key]) return NaN;
        const rec = db[key];

        // Bu projede diğer bölümlerdeki mantıkla uyumlu: thk > 40 ise Fy2, değilse Fy
        let Fy = (thk > 40 && rec.Fy2) ? rec.Fy2 : rec.Fy;
        Fy = Number(Fy) || Number(rec.Fy) || Number(rec.Fy2);
        return Fy;
      }

      const arayuzProfilSel = document.getElementById("arayuzProfil");
      const arayuzName = arayuzProfilSel ? arayuzProfilSel.value : "";
      const geoHalf = arayuzName && halfIPEGeometries[arayuzName]
        ? halfIPEGeometries[arayuzName]
        : null;
      if (!geoHalf) return;

      const tw = geoHalf.tw; // web kalınlığı (mm)

      // --- Lgv (Lw): brüt kesme yolu uzunluğu --------------------------------
      // 1) Kullanıcı override girdiyse onu kullan
      let Lgv =
        num(document.getElementById("AgvWidth")?.value) ||
        num(document.getElementById("shearYieldLen")?.value);

      // 2) Override yoksa shearWidths yorumlama:
      //    - "40,80"   => e1=40, p=80  => Lgv = 2*e1 + p = 160
      //    - "40,80,40"=> e1=40, p=80, eEnd=40 => Lgv = e1+p+eEnd = 160 (toplam)
      if (!Number.isFinite(Lgv) || Lgv <= 0) {
        const txt = document.getElementById("shearWidths")?.value || "";
        const parts = txt
          .split(",")
          .map(s => num(s.trim()))
          .filter(v => Number.isFinite(v) && v > 0);

        if (parts.length === 2) {
          const e1 = parts[0];
          const p = parts[1];
          Lgv = 2 * e1 + p;
        } else if (parts.length >= 3) {
          Lgv = parts.reduce((s, v) => s + v, 0);
        }
      }

      // Son emniyetli varsayılan (görseldeki tipik değer)
      if (!Number.isFinite(Lgv) || Lgv <= 0) Lgv = 160;

      const Agv = Lgv * tw; // mm²

      const Fy = pickFyFromMaterial("arayuzMalzeme", tw);

      const phi =
        num(document.getElementById("phi_shear_y")?.value) ||
        num(document.getElementById("phi_shear")?.value) ||
        1.0;

      const Rn_kN = 0.60 * Fy * Agv * 1e-3;
      const Rd_kN = phi * Rn_kN;

      const varsTex = String.raw`
$$
\text{Kritik eleman: } \tfrac{1}{2}\,\text{${arayuzName}} \\
F_y = ${Fy.toFixed(0)}\,\text{MPa},\quad
t_w = ${tw.toFixed(2)}\,\text{mm},\quad
L_{w}\,(=L_{gv}) = ${Lgv.toFixed(0)}\,\text{mm} \\
A_{gv} = L_{gv}\,t_w
       = ${Lgv.toFixed(0)}\times ${tw.toFixed(2)}
       = ${Agv.toFixed(0)}\,\text{mm}^2,\quad
\varphi = ${phi}
$$
`;

      const stepsTex = String.raw`
$$
R_n = 0.60\,F_y\,A_{gv}
    = 0.60\times ${Fy.toFixed(0)}\times ${Agv.toFixed(0)}\times 10^{-3}
    = ${Rn_kN.toFixed(2)}\ \text{kN}
$$
`;

      const resultsTex = String.raw`
$$
R_d = \varphi R_n
    = ${phi}\times ${Rn_kN.toFixed(2)}
    = \mathbf{${Rd_kN.toFixed(2)}\ \text{kN}}
$$
`;

      varsEl.innerHTML = varsTex;
      stepsEl.innerHTML = stepsTex;
      resultEl.innerHTML = resultsTex;

      if (typeof setSummary === "function" && isFinite(Rd_kN)) {
        setSummary("shearYield", Rd_kN);
      }
    })();




    // 19.4.5 — Kayma Etkisinde Kırılma (13.4.2) — 1/2 IPE arayüz için
    (function shearFracture19() {
      const varsEl = document.getElementById("vars5");
      const stepsEl = document.getElementById("calcSteps5");
      const resultEl = document.getElementById("results5");
      if (!varsEl || !stepsEl || !resultEl) return;

      const num = (v) => {
        const n = (typeof v === "string") ? v.replace(",", ".") : v;
        return Number(n);
      };

      // Malzemeden Fu çek (thk > 40 ise Fu2, değilse Fu) — proje standardı
      function pickFuFromMaterial(selectId, thk) {
        const sel = document.getElementById(selectId);
        const key = sel ? sel.value : null;
        const db = (typeof malzemeListesi !== "undefined") ? malzemeListesi : null;
        if (!key || !db || !db[key]) return NaN;
        const rec = db[key];

        let Fu = (thk > 40 && rec.Fu2) ? rec.Fu2 : rec.Fu;
        Fu = Number(Fu) || Number(rec.Fu) || Number(rec.Fu2);
        return Fu;
      }

      // --- Kritik eleman: 1/2 IPE arayüz profili ---
      const arayuzProfilSel = document.getElementById("arayuzProfil");
      const arayuzName = arayuzProfilSel ? arayuzProfilSel.value : "";
      const geoHalf = arayuzName && halfIPEGeometries[arayuzName]
        ? halfIPEGeometries[arayuzName]
        : null;
      if (!geoHalf) return;

      const tw = geoHalf.tw; // gövde kalınlığı (mm)

      // --- Bulon verileri ---
      const db = num(document.getElementById("boltSelect")?.value) || 20;
      const dh = db + 2; // delik çapı (mm)

      // --- Kesme yolu uzunluğu ve delik sayısı (görsel mantığı) ---
      const shearTxt = document.getElementById("shearWidths")?.value || "";
      const vals = shearTxt
        .split(",")
        .map(s => num(s.trim()))
        .filter(v => Number.isFinite(v) && v > 0);

      let Lgv = NaN;          // brüt kesme yolu uzunluğu (mm)
      let nHoles = NaN;       // kesme yolundaki delik sayısı
      let LgvDecompTex = "";  // KaTeX için gösterim

      if (vals.length === 2) {
        // Kullanıcı "40,80" girdiyse: pratik okuma → (e1, p) kabul edip Lgv = 2*e1 + p
        const e1 = vals[0];
        const p = vals[1];
        Lgv = 2 * e1 + p;   // 40,80 -> 160
        nHoles = 2;         // iki bulon
        LgvDecompTex = String.raw`L_{gv} = 2e_1 + p = 2\times ${e1} + ${p} = ${Lgv.toFixed(0)}\ \text{mm}`;
      } else if (vals.length >= 3) {
        // Kullanıcı "40,80,40" veya "40,70,70,40" gibi girdiyse:
        // Görsel mantığı → Lgv = toplam uzunluk
        Lgv = vals.reduce((s, v) => s + v, 0);
        // Delik sayısı = bulon adedi = (parça sayısı - 1)
        // Örn: 40,80,40 -> 3-1 = 2 bulon
        //      40,70,70,40 -> 4-1 = 3 bulon
        nHoles = vals.length - 1;

        LgvDecompTex = String.raw`L_{gv} = ${vals.join(" + ")} = ${Lgv.toFixed(0)}\ \text{mm}`;
      }

      // Kullanıcı isterse delik sayısını elle geçersiz kılabilsin
      // Not: Bu bölüm (19.4.5) için delik sayısı n, "bulon adedi" olduğu için TAMSAYI olmalıdır.
      // description.html'deki 1.5 varsayılanı blok kırılma içindir; burada override ETMEMELİ.
      const nUserRaw = num(document.getElementById("shearHoleCount")?.value);

      // sadece tamsayıysa override et
      if (Number.isFinite(nUserRaw) && nUserRaw > 0 && Math.abs(nUserRaw - Math.round(nUserRaw)) < 1e-9) {
        nHoles = Math.round(nUserRaw);
      }
      // değilse (örn 1.5) otomatik bulunan nHoles aynen kalsın


      // Emniyetli fallback
      if (!Number.isFinite(Lgv) || Lgv <= 0) Lgv = 160;
      if (!Number.isFinite(nHoles) || nHoles <= 0) nHoles = 2;

      // --- Alanlar (görsel ile bire bir) ---
      const Agv = Lgv * tw;                 // mm²
      const Anv = Agv - nHoles * dh * tw;   // mm²  (görsel: 896 - 2*22*5.6)

      // --- Malzeme ve katsayı ---
      const Fu = pickFuFromMaterial("arayuzMalzeme", tw) || 510;

      const phi =
        num(document.getElementById("phi_shear_u")?.value) ||
        num(document.getElementById("phi_shear")?.value) ||
        0.75;

      // --- Dayanım ---
      const Rn_kN = 0.60 * Fu * Anv * 1e-3;  // kN
      const Rd_kN = phi * Rn_kN;             // kN

      // --- KaTeX: Değişkenler ---
      const varsTex = String.raw`
$$
\text{Kritik eleman: } \tfrac{1}{2}\,\text{${arayuzName}} \\
F_u = ${Fu.toFixed(0)}\,\text{MPa},\quad
t_w = ${tw.toFixed(2)}\,\text{mm} \\
${LgvDecompTex || String.raw`L_{gv} = ${Lgv.toFixed(0)}\ \text{mm}`} \\
A_{gv} = L_{gv}\,t_w
       = ${Lgv.toFixed(0)}\times ${tw.toFixed(2)}
       = ${Agv.toFixed(2)}\,\text{mm}^2 \\
n = ${nHoles},\quad d_h = d_b+2 = ${dh.toFixed(0)}\,\text{mm} \\
A_{nv} = A_{gv} - n\,d_h\,t_w
       = ${Agv.toFixed(2)} - ${nHoles}\times ${dh.toFixed(0)}\times ${tw.toFixed(2)}
       = ${Anv.toFixed(2)}\,\text{mm}^2,\quad
\varphi = ${phi}
$$
`;

      // --- KaTeX: İşlem Basamakları ---
      const stepsTex = String.raw`
$$
R_n = 0.60\,F_u\,A_{nv}
    = 0.60\times ${Fu.toFixed(0)}\times ${Anv.toFixed(2)}\times 10^{-3}
    = ${Rn_kN.toFixed(2)}\ \text{kN}
$$
`;

      // --- Sonuç ---
      const resultsTex = String.raw`
$$
R_d = \varphi R_n
    = ${phi}\times ${Rn_kN.toFixed(2)}
    = \mathbf{${Rd_kN.toFixed(2)}\ \text{kN}}
$$
`;

      varsEl.innerHTML = varsTex;
      stepsEl.innerHTML = stepsTex;
      resultEl.innerHTML = resultsTex;

      if (typeof setSummary === "function" && isFinite(Rd_kN)) {
        setSummary("shearFracture", Rd_kN);
      }
    })();





    // 13.2.4 — Kaynak Dayanımı
    (function weldStrengthCalc() {
      const phi = Number(document.getElementById('phi')?.value) || 0.75;
      const a = Number(document.getElementById('weld_a')?.value) || 6;
      const rawList = (document.getElementById('shearWidths')?.value || "")
        .split(",")
        .map(s => Number(String(s).trim()))
        .filter(v => Number.isFinite(v) && v > 0);

      const spansFull = rawList.slice();
      if (spansFull.length >= 2) {
        const userHasTrailing = spansFull.length >= 4 && spansFull[0] === spansFull[spansFull.length - 1];
        if (!userHasTrailing) spansFull.push(spansFull[0]);
      }
      const totalLength = spansFull.reduce((s, w) => s + w, 0); // L

      const nWeld = Number(document.getElementById('weld_count')?.value) || 2;
      const FE = Number(document.getElementById('weld_FE')?.value) || 550;

      const Fnw = 0.60 * FE; // MPa

      // DOĞRU FORMÜL:
      const Awe = a * (totalLength - 2 * a) * nWeld; // mm²

      const Rnw = Fnw * Awe * 1e-3; // kN
      const Rd = phi * Rnw;         // kN

      // Özet için kaydet
      const Rd_weld_kN = Rd.toFixed(2);
      setSummary("weld", Rd_weld_kN);

      const vars8HTML = String.raw`
$$
a = ${a}\,\text{mm},\quad
F_E = ${FE}\,\text{MPa},\quad
F_{nw} = 0.60\,F_E = ${Fnw}\,\text{MPa} \\
L = ${spansFull.join(" + ")} = ${totalLength}\,\text{mm},\quad
n_\text{dikiş} = ${nWeld},\quad
\varphi = ${phi}
$$
`;

      const steps8HTML = String.raw`
$$
\begin{aligned}
A_{we} &= a\,(L - 2a)\,n_\text{dikiş}
= ${a}\,(${totalLength} - 2\times${a})\times${nWeld}
= ${Awe.toFixed(0)}\ \text{mm}^2 \\
R_{nw} &= F_{nw}\,A_{we}\times10^{-3}
= ${Fnw}\times${Awe.toFixed(0)}\times10^{-3}
= ${Rnw.toFixed(2)}\ \text{kN}
\end{aligned}
$$
`;

      const results8HTML = String.raw`
$$
R_d = \varphi\,R_{nw}
= ${phi}\times${Rnw.toFixed(2)}
= \mathbf{${Rd.toFixed(2)}\ \text{kN}}
$$
`;

      const v8 = document.getElementById('vars8');
      const s8 = document.getElementById('calcSteps8');
      const r8 = document.getElementById('results8');
      if (v8) v8.innerHTML = vars8HTML;
      if (s8) s8.innerHTML = steps8HTML;
      if (r8) r8.innerHTML = results8HTML;
    })();

    // KaTeX render
    if (window.renderMathInElement) renderMathInElement(document.body);
    // Özet tabloyu güncelle
    renderSummaryTable();
  }

  document.getElementById('calcBtn').addEventListener('click', calculate);
  document.getElementById('resetBtn').addEventListener('click', () => location.reload());

})();




