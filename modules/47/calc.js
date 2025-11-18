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
      if (id === "anaProfil" && item === "IPE 400") opt.selected = true;
      if (id === "taliProfil" && item === "IPE 300") opt.selected = true;
      if (id === "anaMalzeme" && item === "S355") opt.selected = true;
      if (id === "taliMalzeme" && item === "S355") opt.selected = true;
      if (id === "kosebentMalzeme" && item === "S235") opt.selected = true;
    });
  }

  populateSelect("anaProfil", Object.keys(anaProfilVerileri));
  populateSelect("taliProfil", Object.keys(anaProfilVerileri));
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

  // Köşebent et kalınlığı değişirse t'ye yansıt
  document.getElementById('kosebent_t').addEventListener('change', e => {
    const t = parseFloat(e.target.value);
    if (t) document.getElementById('t').value = t;
  });

  //Tabloyu dolduran yardımcılar
  // Limit durum isimleri
  const LIMIT_LABELS = {
    block: "Blok kırılma",
    bearing: "Bulon deliği ezilme",
    boltShear: "Bulon kesme kuvveti",
    shearYield: "Kayma etkisinde akma",
    shearFracture: "Kayma etkisinde kırılma",
    bendYield: "Eğilmede akma",
    bendFracture: "Eğilmede kırılma",
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
    const kosebentMalzeme = document.getElementById('kosebentMalzeme').value;
    if (!anaMalzeme || !taliMalzeme || !kosebentMalzeme) {
      alert("Lütfen tüm malzeme türlerini seçin.");
      return;
    }

    // zayıf malzeme belirle
    let zayıfMalzeme = (malzemeListesi[kosebentMalzeme].Fy < malzemeListesi[anaMalzeme].Fy)
      ? kosebentMalzeme : anaMalzeme;
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


    // Blok kırılma dayanımı (13.4.3)

    const dh = db + 2;
    const Agv = shearWidths.reduce((a, b) => a + b, 0) * t;
    const Anv = Agv - shearHoleCount * dh * t;
    const Ant = (tensionWidth * t) - (tensionHoleFactor * dh * t);

    const expr1 = 0.6 * Fu * Anv + Ubs * Fu * Ant;
    const expr2 = 0.6 * Fy * Agv + Ubs * Fu * Ant;
    const Rn = Math.min(expr1, expr2);
    const Rd = phi * Rn * 2; //2 köşebentli birleşim

    // Tablo özeti için kaydet
    const Rd_block_kN = (Rd / 1000).toFixed(2);
    setSummary("block", Rd_block_kN);


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


    // --- Bulon Deliği Ezilme Kuvveti Dayanımı (13.3.13) ------------------------
    (function bearingCalc() {
      // calculate() içinde zaten okuduğumuz değişkenleri kullanıyoruz:
      // t, db, phi, Fu, shearWidths
      const dh = db + 2; // delik çapı
      const bolts = [];  // her bulon için: lc, Rn_i (N), R1, R2

      // shearWidths = [e1, p2, p3, ...]
      for (let i = 0; i < shearWidths.length; i++) {
        const w = Number(shearWidths[i]);
        const lc = Math.max(i === 0 ? (w - dh / 2) : (w - dh), 0); // negatifse sıfırla
        const R1 = 1.2 * lc * t * Fu;   // N
        const R2 = 2.4 * db * t * Fu;   // N
        const Rn_i = Math.min(R1, R2);  // N
        bolts.push({ idx: i + 1, lc, R1, R2, Rn_i });
      }

      // Toplam ve tasarım
      const Rn_total = bolts.reduce((s, b) => s + b.Rn_i, 0); // N
      const Rn_total_kN = Rn_total / 1000;
      const Rd_kN = phi * Rn_total_kN;

      // Özet için kaydet
      const Rd_bearing_kN = Rd_kN.toFixed(2); // zaten kN ise direkt
      setSummary("bearing", Rd_bearing_kN);

      // 1) Değişkenler (vars2)
      const vars2HTML = `
    $$t = ${t}\\text{ mm},\\quad d_b = ${db}\\text{ mm},\\quad d_h = d_b + 2 = ${dh}\\text{ mm}$$
    $$F_u = ${Fu}\\text{ MPa},\\quad \\phi = ${phi}$$
  `;

      // 2) İşlem basamakları (calcSteps2) — her bulon satır satır
      const lines = bolts.map(b => {
        const R1k = (b.R1 / 1000).toFixed(2);
        const R2k = (b.R2 / 1000).toFixed(2);
        const Rnk = (b.Rn_i / 1000).toFixed(2);
        return String.raw`Bulon\ ${b.idx}:\
\ l_c = ${b.lc.toFixed(2)}\ \text{mm},\ R_{n,${b.idx}} = \min(1.2\,l_c\,t\,F_u,\ 2.4\,d_b\,t\,F_u)\
= \min(${R1k},\ ${R2k}) = ${Rnk}\ \text{kN}`;
      }).join("<br/>");

      // 2) İşlem basamakları (calcSteps2) — her bulon satır satır (KaTeX aligned)
      const lineTex = bolts.map(b => {
        const R1k = (b.R1 / 1000).toFixed(2);
        const R2k = (b.R2 / 1000).toFixed(2);
        const Rnk = (b.Rn_i / 1000).toFixed(2);
        return String.raw`\text{Bulon ${b.idx}:}\quad l_c = ${b.lc.toFixed(2)}\,\text{mm},\;
  R_{n,${b.idx}} = \min(1.2\,l_c\,t\,F_u,\; 2.4\,d_b\,t\,F_u)
  = \min(${R1k},\; ${R2k}) = ${Rnk}\,\text{kN}`;
      }).join(String.raw` \\ `);

      const steps2HTML = String.raw`
$$
\begin{aligned}
R_n = \min(1.2\,l_c\,t\,F_u,\; 2.4\,d_b\,t\,F_u) \\
l_{c,1} = e_1 - \frac{d_h}{2},\quad l_{c,i} = p_i - d_h\ (i\ge 2) \\
${lineTex}
\end{aligned}
$$
`;

      document.getElementById('calcSteps2').innerHTML = steps2HTML;

      // 3) Sonuç (results2)
      const results2HTML = `
    $$R_n = ${Rn_total_kN.toFixed(2)}\\text{ kN}$$
    $$R_d = \\phi R_n = ${phi}\\times${Rn_total_kN.toFixed(2)}\
= ${Rd_kN.toFixed(2)}\\text{ kN}$$
  `;


      // DOM'a yaz
      document.getElementById('vars2').innerHTML = vars2HTML;
      document.getElementById('calcSteps2').innerHTML = steps2HTML;
      document.getElementById('results2').innerHTML = results2HTML;
    })();

    // 13.3.9 — Bulonların Kesme Kuvveti Dayanımı
    (function boltShearCalc() {
      // calculate() içinde zaten okunan: db, phi, shearWidths mevcut
      // Fub değeri için bulon sınıfını kullan
      const clsSel = document.getElementById('boltClass');
      const selectedClass = clsSel ? clsSel.value : "6.8";
      const cls = (typeof BULON_SINIFLARI !== "undefined")
        ? BULON_SINIFLARI.find(x => x.bulonSınıfı === selectedClass)
        : null;

      const Fub = cls ? cls.Fub_MPa : 600;     // MPa (varsayılan 6.8 → 600)
      const Fnv = 0.45 * Fub;                  // MPa (TBDY 13.3.9)
      const Ab = Math.PI * db * db / 4;       // mm², Ab = π d_b² / 4
      const nShearPlanes = 1;                  // tek kesme düzlemi (gerekirse input'a bağlanır)

      // Bulon sayısı: shearWidths uzunluğu kadar (ör. 40,70,70 ⇒ 3)
      const boltsCount = (Array.isArray(shearWidths) ? shearWidths : [])
        .filter(v => Number(v) > 0).length * 2;

      // Dayanımlar (N)
      const Rn_per = nShearPlanes * Fnv * Ab;     // bir bulonun nominal kesme
      const Rn_total = boltsCount * Rn_per;         // toplam
      const Rd = phi * Rn_total;              // tasarım


      // --- Kullanılan değişkenler (vars3)
      const vars3HTML = String.raw`
$$
\text{Bulon sınıfı: } ${selectedClass} \\
d_b = ${db}\,\text{mm},\quad n = ${nShearPlanes},\quad \#\text{bulon} = ${boltsCount} \\
F_{ub} = ${Fub}\,\text{MPa},\quad F_{nv} = 0.45\,F_{ub} = ${Fnv.toFixed(0)}\,\text{MPa} \\
A_b = \dfrac{\pi d_b^2}{4} = \dfrac{\pi\,${db}^2}{4} = ${Ab.toFixed(2)}\,\text{mm}^2,\quad \varphi = ${phi}
$$
`;

      // --- İşlem basamakları (calcSteps3)
      const steps3HTML = String.raw`
$$
\begin{aligned}
R_n &= n\,F_{nv}\,A_b \\
A_b &= \dfrac{\pi d_b^2}{4} = \dfrac{\pi\,${db}^2}{4} \\
F_{nv} &= 0.45\,F_{ub} = ${Fnv.toFixed(0)}\ \text{MPa}
\end{aligned}
$$
$$
R_{n,\text{bir bulon}} = ${nShearPlanes}\times ${Fnv.toFixed(0)} \times ${Ab.toFixed(2)} \times 10^{-3}
= ${(nShearPlanes * Fnv * Ab / 1000).toFixed(2)}\ \text{kN}
$$
`;

      // --- Sonuçlar (results3)
      const Rn_per_kN = (Rn_per / 1000).toFixed(2);
      const Rn_total_kN = (Rn_total / 1000).toFixed(2);
      const Rd_kN = (Rd / 1000).toFixed(2);

      // Özet için kaydet
      setSummary("boltShear", Rd_kN);

      const results3HTML = String.raw`
$$
R_n = ${Rn_per_kN}\ \text{kN/bulon} \times ${boltsCount} = ${Rn_total_kN}\ \text{kN} \\
R_d = \varphi R_n = ${phi}\times ${Rn_total_kN} = \mathbf{${Rd_kN}\ \text{kN}}
$$
`;

      // DOM'a yaz (elemanlar yoksa sessiz geç)
      const v3 = document.getElementById('vars3');
      const s3 = document.getElementById('calcSteps3');
      const r3 = document.getElementById('results3');
      if (v3) v3.innerHTML = vars3HTML;
      if (s3) s3.innerHTML = steps3HTML;
      if (r3) r3.innerHTML = results3HTML;
    })();


    // 13.4.2 — Kayma Etkisinde Akma
    (function shearYieldCalc() {
      const t = Number(document.getElementById('t')?.value) || 0;
      const phiDefault = 1.0;
      const phi_y = Number(document.getElementById('phi_yield')?.value) || phiDefault;

      // Kullanıcı girişi: [e1, p2, p3, ...]  (ör. 40,70,70)
      const rawList = (document.getElementById('shearWidths')?.value || "")
        .split(",")
        .map(s => Number(String(s).trim()))
        .filter(v => Number.isFinite(v) && v > 0);

      // ---- SADECE A_gv İÇİN: son uç mesafesini ekle (e_end = e1)
      // Kullanıcı ayrıca son ucu manuel girdiyse (ör. 40,70,70,40), aynen kullan.
      let spansAgv = rawList.slice();
      const userProvidedTrailing = spansAgv.length >= 2 && (spansAgv.length >= 4);
      if (!userProvidedTrailing && spansAgv.length >= 2) {
        spansAgv.push(spansAgv[0]); // e_end = e1 varsayımı
      }

      // A_gv = (∑b_i_full) * t
      const sum_b_full = spansAgv.reduce((s, w) => s + w, 0);
      const Agv = sum_b_full * t; // mm^2

      // --- F_y seçimi (köşebent öncelikli; t>40 ise Fy2)
      function pickFyFrom(id) {
        const sel = document.getElementById(id);
        if (!sel) return NaN;
        const key = sel.value;
        const db = (typeof malzemeListesi !== "undefined") ? malzemeListesi : null;
        if (!db || !db[key]) return NaN;
        const rec = db[key];
        return Number(t > 40 && rec.Fy2 ? rec.Fy2 : rec.Fy);
      }
      let Fy = pickFyFrom('kosebentMalzeme');
      if (!Number.isFinite(Fy)) {
        const fyA = pickFyFrom('anaMalzeme');
        const fyT = pickFyFrom('taliMalzeme');
        Fy = [fyA, fyT].filter(Number.isFinite).reduce((m, v) => Math.min(m, v), NaN);
      }
      if (!Number.isFinite(Fy)) Fy = 355;

      // Rn = 0.60 * Fy * Agv ; Rd = φ * Rn
      const Rn = 0.60 * Fy * Agv;
      const Rd = phi_y * Rn * 2; // 2 köşebentli birleşim

      // Özet için kaydet
      const Rd_shearYield_kN = (Rd / 1000).toFixed(2);
      setSummary("shearYield", Rd_shearYield_kN);

      // -------- KaTeX çıktı
      const listStr = spansAgv.join(" + ");
      const vars4HTML = String.raw`
$$
t = ${t}\,\text{mm},\quad F_y = ${Fy}\,\text{MPa},\quad
\sum b_i = ${listStr} = ${sum_b_full}\,\text{mm},\quad
A_{gv} = \left(\sum b_i\right) t = ${sum_b_full}\times ${t} = ${Agv.toFixed(0)}\,\text{mm}^2,\quad
\varphi = ${phi_y.toFixed(2)}
$$
`;
      const steps4HTML = String.raw`
$$
\begin{aligned}
R_n &= 0.60\,F_y\,A_{gv} \\
&= 0.60 \times ${Fy} \times ${Agv.toFixed(0)} \times 10^{-3}
= ${(0.60 * Fy * Agv / 1000).toFixed(2)}\ \text{kN}
\end{aligned}
$$
`;
      const results4HTML = String.raw`
$$
R_d = \varphi R_n = ${phi_y.toFixed(2)} \times ${(Rn / 1000).toFixed(2)} \times 2 (kösebent)
= \mathbf{${(Rd / 1000).toFixed(2)}\ \text{kN}}
$$
`;

      const v4 = document.getElementById('vars4');
      const s4 = document.getElementById('calcSteps4');
      const r4 = document.getElementById('results4');
      if (v4) v4.innerHTML = vars4HTML;
      if (s4) s4.innerHTML = steps4HTML;
      if (r4) r4.innerHTML = results4HTML;
    })();


    // 13.4.2 — Kayma Etkisinde Kırılma (A_nv ile)
    (function shearFractureCalc() {
      // girişler
      const t = Number(document.getElementById('t')?.value) || 0;
      const db = Number(document.getElementById('boltSelect')?.value) || 0;
      const phi = Number(document.getElementById('phi')?.value) || 1;

      // shearWidths: "40,70,70" → [40,70,70]
      const rawList = (document.getElementById('shearWidths')?.value || "")
        .split(",")
        .map(s => Number(String(s).trim()))
        .filter(v => Number.isFinite(v) && v > 0);

      // --- Fu okuma: köşebent malzemesinden; t<40 ise Fu2, aksi halde Fu.
      // Eğer seçilen alan yok veya değer 0/NaN ise "dolusu hangisiyse onu" kullan.
      function pickFuFromKosebent(thk) {
        const sel = document.getElementById('kosebentMalzeme');
        const key = sel ? sel.value : null;
        const dbMat = (typeof malzemeListesi !== "undefined") ? malzemeListesi : null;
        if (!key || !dbMat || !dbMat[key]) return NaN;
        const rec = dbMat[key];

        // senin talebine göre öncelik: t<40 ⇒ Fu2
        let fuPref = (thk > 40) ? rec.Fu2 : rec.Fu;

        // veri boşsa, dolu olanı yakala (geriye dönük emniyet)
        if (!Number.isFinite(Number(fuPref)) || Number(fuPref) === 0) {
          fuPref = Number(rec.Fu) || Number(rec.Fu2);
        }
        return Number(fuPref);
      }
      let Fu = pickFuFromKosebent(t);
      if (!Number.isFinite(Fu) || Fu === 0) Fu = 510; // son çare varsayılan

      // ---- A_nv için: son uç mesafesini ekle (e_end = e1)
      const spansFull = rawList.slice();
      if (spansFull.length >= 2) {
        const userHasTrailing = spansFull.length >= 4 && spansFull[0] === spansFull[spansFull.length - 1];
        if (!userHasTrailing) spansFull.push(spansFull[0]);
      }
      const sum_b_full = spansFull.reduce((s, w) => s + w, 0); // mm

      // delik sayısı
      const holeInput = Number(document.getElementById('shearHoleCount')?.value);
      const boltsCount = rawList.length; // 40,70,70 → 3
      const n_h = Number.isFinite(holeInput) && holeInput > 0 ? Math.round(holeInput) : boltsCount;

      const d_h = db + 2;                         // delik çapı
      const b_net = Math.max(sum_b_full - n_h * d_h, 0);
      const A_nv = b_net * t;                     // mm^2

      // dayanımlar
      const Rn = 0.60 * Fu * A_nv;                // N
      const Rd = phi * Rn * 2;                        // N

      // özet için kaydet
      const Rd_shearFracture_kN = (Rd / 1000).toFixed(2);
      setSummary("shearFracture", Rd_shearFracture_kN);

      // === KaTeX çıktıları ===
      const vars5HTML = String.raw`
$$
t = ${t}\,\text{mm},\quad F_u = ${Fu}\,\text{MPa},\quad
d_b = ${db}\,\text{mm},\ d_h = d_b + 2 = ${d_h}\,\text{mm},\quad
n_h = ${n_h} \\
\sum b_i^{\text{full}} = ${spansFull.join(" + ")} = ${sum_b_full}\,\text{mm},\quad
A_{nv} = \big(\sum b_i^{\text{full}} - n_h\,d_h\big)\,t
= (${sum_b_full} - ${n_h}\times${d_h})\times${t} = ${A_nv.toFixed(0)}\,\text{mm}^2,\quad
\varphi = ${phi}
$$
`;

      const steps5HTML = String.raw`
$$
\begin{aligned}
R_n &= 0.60\,F_u\,A_{nv} \\
&= 0.60 \times ${Fu} \times ${A_nv.toFixed(0)} \times 10^{-3}
= ${(0.60 * Fu * A_nv / 1000).toFixed(2)}\ \text{kN}
\end{aligned}
$$
`;

      const results5HTML = String.raw`
$$
R_d = \varphi\,R_n =
${phi} \times ${(Rn / 1000).toFixed(2)} \times 2 (kösebent)
= \mathbf{${(Rd / 1000).toFixed(2)}\ \text{kN}}
$$
`;

      // DOM yazımı
      const v5 = document.getElementById('vars5');
      const s5 = document.getElementById('calcSteps5');
      const r5 = document.getElementById('results5');
      if (v5) v5.innerHTML = vars5HTML;
      if (s5) s5.innerHTML = steps5HTML;
      if (r5) r5.innerHTML = results5HTML;
    })();



    // 2.4.6 — Kaynak Dayanımı (13.2.4) - Birleşim 2, çift köşebent
    (function weldCapacityJoint2() {
      const varsEl = document.getElementById("vars8");
      const stepsEl = document.getElementById("calcSteps8");
      const resEl = document.getElementById("results8");

      if (!varsEl || !stepsEl || !resEl) return; // ilgili bölüm yoksa çık

      // --- Girdiler ---

      // Kaynak boyutları: input varsa oku, yoksa örnekten varsay
      const a = Number(document.getElementById("weldSize")?.value) || 4;        // kaynak dikiş boyu (mm)

      // Boyuna (kuvvet doğrultusunda) kaynaklar
      const Lpar = Number(document.getElementById("weldL_parallel")?.value) || 200; // tek dikiş boyu (mm)
      const nPar = Number(document.getElementById("weldN_parallel")?.value) || 4;   // dikiş adedi (ör: 4×200)

      // Enine kaynaklar (kuvvete dik)
      // Örnekte: (90 - 4) * 4 * 2
      const LperpBase = Number(document.getElementById("weldL_perp")?.value) || 90; // toplam yükseklik benzeri (mm)
      const nPerp = Number(document.getElementById("weldN_perp")?.value) || 2;      // dik dikiş adedi

      // Elektrod dayanımı F_E (MPa)
      const FE = Number(document.getElementById("Fe_weld")?.value) || 550;

      // Dayanım katsayısı
      const phi = Number(document.getElementById("phi")?.value) || 0.75;

      // Köşebent sayısı (simetrik olduğu için 2)
      const nAngles = Number(document.getElementById("weldAnglesCount")?.value) || 2;

      // --- Temel kontroller ---
      if (!a || !Lpar || !nPar || !FE || !phi) {
        varsEl.textContent = "Girdi eksik. Kaynak boyu, uzunluklar ve elektrod dayanımı kontrol edilmeli.";
        stepsEl.textContent = "";
        resEl.textContent = "";
        return;
      }

      // --- Hesaplar ---

      // F_nw tasarım gerilmesi
      const Fnw = 0.60 * FE; // MPa

      // Boyuna kaynak efektif alanı (örnekte: [4 × 200] = 800 mm²)
      const Awel = a * Lpar * nPar; // mm²

      // Enine kaynak efektif alanı (örnekte: (90 - 4) × 4 × 2 = 688 mm²)
      const LperpEff = Math.max(LperpBase - a, 0);
      const Awet = a * LperpEff * nPerp; // mm²

      // Tek köşebent için nominal dayanımlar (kN)
      const Rnwl = Fnw * Awel * 1e-3;
      const Rnwt = Fnw * Awet * 1e-3;

      // Denklem 13.5 ve 13.6
      const Rnw_sum = Rnwl + Rnwt;
      const Rnw_comb = 0.85 * Rnwl + 1.5 * Rnwt;

      // Tek köşebent için kontrol eden R_nw
      const Rnw_single = Math.max(Rnw_sum, Rnw_comb);

      // Çift köşebent
      const Rnw_total = Rnw_single * nAngles; // kN

      // Tasarım dayanımı
      const Rd = phi * Rnw_total; // kN

      // --- KaTeX: Kullanılan Değişkenler ---
      const varsTex = String.raw`
$$
a = ${a}\,\text{mm},\quad
L_{\parallel} = ${Lpar}\,\text{mm},\ n_{\parallel} = ${nPar},\quad
L_{\perp,\text{baz}} = ${LperpBase}\,\text{mm},\ n_{\perp} = ${nPerp} \\
F_E = ${FE}\,\text{MPa},\quad
F_{nw} = 0.60 F_E = ${Fnw.toFixed(0)}\,\text{MPa},\quad
\varphi = ${phi},\quad
n_{\text{köşebent}} = ${nAngles}
$$
`;

      // --- KaTeX: İşlem Basamakları ---
      const stepsTex = String.raw`
$$
\begin{aligned}
A_{wel} &= a\,L_{\parallel}\,n_{\parallel}
= ${a}\times${Lpar}\times${nPar}
= ${Awel.toFixed(0)}\ \text{mm}^2 \\
A_{wet} &= a\,(L_{\perp,\text{baz}} - a)\,n_{\perp}
= ${a}\times(${LperpBase}-${a})\times${nPerp}
= ${Awet.toFixed(0)}\ \text{mm}^2 \\
R_{nwl} &= F_{nw}\,A_{wel}
= ${Fnw.toFixed(0)}\times${Awel.toFixed(0)}\times10^{-3}
= ${Rnwl.toFixed(2)}\ \text{kN} \\
R_{nwt} &= F_{nw}\,A_{wet}
= ${Fnw.toFixed(0)}\times${Awet.toFixed(0)}\times10^{-3}
= ${Rnwt.toFixed(2)}\ \text{kN} \\
R_{nw,1} &= R_{nwl} + R_{nwt}
= ${Rnw_sum.toFixed(2)}\ \text{kN} \\
R_{nw,2} &= 0.85R_{nwl} + 1.5R_{nwt}
= 0.85\times${Rnwl.toFixed(2)} + 1.5\times${Rnwt.toFixed(2)}
= ${Rnw_comb.toFixed(2)}\ \text{kN} \\
R_{nw,\text{tek}} &= \max(R_{nw,1}, R_{nw,2})
= ${Rnw_single.toFixed(2)}\ \text{kN} \\
R_{nw} &= n_{\text{köşebent}}\,R_{nw,\text{tek}}
= ${nAngles}\times${Rnw_single.toFixed(2)}
= ${Rnw_total.toFixed(2)}\ \text{kN}
\end{aligned}
$$
`;

      // --- KaTeX: Sonuç ---
      const resTex = String.raw`
$$
R_d = \varphi R_{nw}
= ${phi}\times${Rnw_total.toFixed(2)}
= \mathbf{${Rd.toFixed(2)}\ \text{kN}}
$$
`;

      // DOM yaz
      varsEl.innerHTML = varsTex;
      stepsEl.innerHTML = stepsTex;
      resEl.innerHTML = resTex;

      // Hesaplama özetine gönder
      if (typeof setSummary === "function" && isFinite(Rd)) {
        setSummary("weld", Rd);
      }
    })();


    // KaTeX render
    if (window.renderMathInElement) renderMathInElement(document.body);
    // Özet tabloyu güncelle
    renderSummaryTable();
  }

  document.getElementById('calcBtn').addEventListener('click', calculate);
  document.getElementById('resetBtn').addEventListener('click', () => location.reload());

})();




