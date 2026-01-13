// app.js
(async function () {
    const listEl = document.getElementById("moduleList");
    const filterEl = document.getElementById("filter");
    const frame = document.getElementById("moduleFrame");
    const placeholder = document.getElementById("placeholder");

    /** State */
    let modules = [];
    let activeId = null;

    /** Helpers */
    const byId = (id) => modules.find((m) => m.id === id);
    const el = (tag, attrs = {}, ...children) => {
        const n = document.createElement(tag);
        Object.entries(attrs).forEach(([k, v]) => {
            if (k === "class") n.className = v;
            else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.substring(2), v);
            else n.setAttribute(k, v);
        });
        children.forEach((c) => n.append(c));
        return n;
    };

    /** Sticky Aside */

    // IFRAME içinde sticky aside konfigürasyonu ve yerleşimi
    function ensureStickyAsideStyles(doc) {
        if (doc.getElementById("sticky-aside-style")) return;
        const st = doc.createElement("style");
        st.id = "sticky-aside-style";
        st.textContent = `
    .has-sticky-aside { padding-right: 360px; } /* içerik sağında yer aç */
    .aside.aside-sticky {
      position: fixed;
      right: 16px;
      width: 320px;
      z-index: 50;
      max-height: calc(100vh - 24px); /* güvenli sınır */
      overflow: auto;
      box-shadow: 0 6px 18px rgba(20,24,40,0.08);
    }
    /* Küçük ekranlar: sabitliği kaldır, akışa dön */
    @media (max-width: 980px) {
      .has-sticky-aside { padding-right: 0; }
      .aside.aside-sticky {
        position: static;
        width: auto;
        max-height: none;
        box-shadow: none;
      }
    }
  `;
        doc.head.appendChild(st);
    }

    /**
     * Aside'ı sabitle ve üstten boşluğu başlık+slider yüksekliğine göre ayarla.
     * - slider varsa, onun altına 16px boşlukla yerleşir.
     * - yoksa üstten 16px.
     */
    function positionStickyAside(doc, asideEl) {
        const header = doc.querySelector('[data-injected="moduleHeader"]');
        const slider = doc.querySelector('[data-injected="moduleSlider"]');

        // Varsayılan üst boşluk
        let top = 16;

        // Header/slider konumu: container iç koordinattan relative viewport'a
        // offsetTop zinciri (iframe içi) ile hesaplıyoruz
        function cumOffsetTop(el) {
            let t = 0, n = el;
            while (n) { t += n.offsetTop || 0; n = n.offsetParent; }
            return t;
        }

        if (slider) {
            const y = cumOffsetTop(slider);
            top = y + slider.clientHeight + 16;
        } else if (header) {
            const y = cumOffsetTop(header);
            top = y + header.clientHeight + 16;
        }

        asideEl.style.top = `${top}px`;
    }



    /**   Görseller  */

    // IFRAME içine modül başlığı ve görsel slider enjekte eder
    function injectHeaderAndSlider(doc, mod, meta) {
        // Eski başlık/slider varsa kaldır
        doc.querySelectorAll("[data-injected='moduleHeader'],[data-injected='moduleSlider'],#imageModal")
            .forEach(el => el.remove());

        // Basit, mevcut stile uyumlu bir CSS (hafif dokunuş, mevcut temayı bozmaz)
        const styleId = "module-header-slider-style";
        if (!doc.getElementById(styleId)) {
            const st = doc.createElement("style");
            st.id = styleId;
            st.textContent = `
      .module-header{display:flex;gap:16px;align-items:center;margin:12px 0 16px 0}
      .module-header .meta{font-size:14px;color:var(--muted, #6b7280)}
      .visual{position:relative;display:flex;justify-content:center;align-items:center;background:#fafafa;border:1px solid #eee;border-radius:12px;padding:8px;overflow:hidden}
      .visual img{max-width:50%;height:auto;border-radius:8px;cursor:zoom-in}
      .slider-nav{position:absolute;top:50%;transform:translateY(-50%);font-size:28px;cursor:pointer;user-select:none;padding:6px 10px;border-radius:8px;background:rgba(255,255,255,.8)}
      #sliderPrev{left:8px} #sliderNext{right:8px}
      #imageModal{display:none;position:fixed;z-index:9999;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.7)}
      #imageModal .modal-content{display:block;max-width:92%;max-height:82%;margin:4% auto;border-radius:12px}
      #imageModal .close{position:absolute;right:24px;top:16px;font-size:32px;color:#fff;cursor:pointer}
      @media (max-width:768px){ .module-header{gap:12px} .visual{padding:6px} .slider-nav{font-size:24px} }
    `;
            doc.head.appendChild(st);
        }

        // Başlığı oluştur
        const header = doc.createElement("div");
        header.className = "module-header";
        header.setAttribute("data-injected", "moduleHeader");
        header.innerHTML = `
    <div style="width:64px;height:64px;border-radius:12px;background:linear-gradient(135deg,#fef3c7,#fee2e2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#b45309" id="moduleIcon">${mod.id}</div>
    <div>
      <h2 id="moduleTitle"></h2>
      <div class="meta" id="moduleDesc"></div>
    </div>
  `;

        // Slider alanı
        const slider = doc.createElement("div");
        slider.className = "visual";
        slider.setAttribute("data-injected", "moduleSlider");
        slider.innerHTML = `
    <span id="sliderPrev" class="slider-nav">&#10094;</span>
    <img id="sliderImage" class="zoomable" src="" alt="Birleşim görseli" />
    <span id="sliderNext" class="slider-nav">&#10095;</span>
  `;

        // Modal
        const modal = doc.createElement("div");
        modal.id = "imageModal";
        modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="modalImg">
  `;

        // Nereye koyacağız? .container varsa en başına, yoksa body başına
        const container = doc.querySelector(".container") || doc.body;
        container.insertBefore(slider, container.firstChild);
        container.insertBefore(header, container.firstChild);
        doc.body.appendChild(modal);

        // Başlık metinleri (module.json > modules.json > fallback)
        const title = meta?.title || mod.title || `Modül ${mod.id}`;
        const desc = meta?.desc || mod.desc || "";
        header.querySelector("#moduleTitle").textContent = title;
        header.querySelector("#moduleDesc").textContent = desc;

        // Görseller (module.json içinden al: meta.images[]; yol yoksa modül klasörü kökünden bekler)
        const images = Array.isArray(meta?.images) ? meta.images : [];
        let idx = 0;

        const imgEl = slider.querySelector("#sliderImage");
        const prev = slider.querySelector("#sliderPrev");
        const next = slider.querySelector("#sliderNext");
        const modalImg = modal.querySelector("#modalImg");
        const closeBtn = modal.querySelector(".close");

        function setImage(i) {
            if (!images.length) {
                imgEl.alt = "Görsel bulunamadı";
                imgEl.style.opacity = 0.5;
                imgEl.src = "";
                prev.style.display = next.style.display = "none";
                return;
            }
            idx = (i + images.length) % images.length;

            // YOL ÇÖZÜMLEME — ÇİFT "modules/01" HATASINI ENGELLE
            const p = String(images[idx] || "");

            // 1) mutlak URL ise direkt kullan
            if (/^https?:\/\//i.test(p)) {
                imgEl.src = p;
            }
            // 2) kök-relative ise ("/modules/01/images/1.png") direkt kullan
            else if (p.startsWith("/")) {
                imgEl.src = p;
            }
            // 3) "modules/…" ile başlıyorsa bunu köke bağla (çiftlenmeyi önler)
            else if (p.startsWith("modules/")) {
                imgEl.src = "/" + p;
            }
            // 4) kalan her şey iframe sayfasının klasörüne göredir (ör. "images/1.png" veya "1.png")
            else {
                imgEl.src = new URL(p, doc.baseURI).href;
            }

            imgEl.style.opacity = 1;
            prev.style.display = next.style.display = images.length > 1 ? "block" : "none";
        }


        prev.addEventListener("click", () => setImage(idx - 1));
        next.addEventListener("click", () => setImage(idx + 1));

        // Modal aç/kapat
        imgEl.addEventListener("click", () => {
            if (!images.length || !imgEl.src) return;
            modal.style.display = "block";
            modalImg.src = imgEl.src;
        });
        closeBtn.addEventListener("click", () => modal.style.display = "none");
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });

        setImage(0);
    }

    /** Load module list */
    async function loadModules() {
        const res = await fetch("modules.json");
        modules = await res.json();
        renderList(modules);
        // Restore last opened
        const last = localStorage.getItem("lastModuleId");
        if (last) openModule(Number(last), false);
    }

    /** Render left list */
    function renderList(items) {
        listEl.innerHTML = "";
        items.forEach((m) => {
            const item = el(
                "div",
                { class: "module-item" + (m.id === activeId ? " active" : ""), onclick: () => openModule(m.id) },
                el("h3", {}, `${m.id}. ${m.title}`),
                el("p", {}, (m.desc || "").slice(0, 120) + (m.desc && m.desc.length > 120 ? "…" : ""))
            );
            listEl.appendChild(item);
        });
    }

    /** Filter */
    filterEl.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase().trim();
        const filtered = modules.filter(
            (m) =>
                String(m.id).includes(q) ||
                (m.title && m.title.toLowerCase().includes(q)) ||
                (m.desc && m.desc.toLowerCase().includes(q))
        );
        renderList(filtered);
    });

    /** Open a module in iframe, then inject aside using module.json */
    async function openModule(id, scrollToTop = true) {
        const mod = byId(id);
        if (!mod) return;
        activeId = id;
        renderList(modules);

        const url = `modules/${mod.folder}/description.html`;
        placeholder.style.display = "none";
        frame.style.display = "block";
        frame.src = url;

        // wait for iframe load
        frame.onload = async () => {
            try {
                // 1) module meta
                const metaRes = await fetch("modules/" + mod.folder + "/module.json");
                const meta = await metaRes.json();

                // 2) IFRAME dokümanı
                const doc = frame.contentDocument;

                // 3) Varsa eski enjekte öğeleri temizle
                const oldNodes = doc.querySelectorAll("[data-injected='moduleHeader'],[data-injected='moduleSlider'],.aside[data-injected='1'],#imageModal");
                oldNodes.forEach(n => n.remove());

                // 4) Başlık + Slider
                injectHeaderAndSlider(doc, mod, meta);

                // 5) Sticky aside için stil (tek seferlik)
                if (!doc.getElementById("sticky-aside-style")) {
                    const st = doc.createElement("style");
                    st.id = "sticky-aside-style";
                    st.textContent =
                        ".has-sticky-aside{padding-right:360px;}" +
                        ".aside.aside-sticky{position:fixed;right:16px;width:320px;z-index:50;max-height:calc(100vh - 24px);overflow:auto;box-shadow:0 6px 18px rgba(20,24,40,0.08);background:#f5f4f8;border-radius:10px;}" +
                        "a:link { text-decoration:none; }" +
                        "@media(max-width:980px){.has-sticky-aside{padding-right:0;}.aside.aside-sticky{position:static;width:auto;max-height:none;box-shadow:none;}}";
                    doc.head.appendChild(st);
                }

                // 6) Aside içeriğini hazırla
                const limits = Array.isArray(meta.limits) ? meta.limits : [];
                const similar = Array.isArray(meta.similar) ? meta.similar : [];

                const aside = doc.createElement("div");
                aside.className = "aside aside-sticky";
                aside.setAttribute("data-injected", "1");

                // --- iç HTML ---
                let limitsHtml = "<h4>Sınırlılıklar</h4>";
                if (limits.length) {
                    limitsHtml += "<ul>" + limits.map(x => "<li>" + x + "</li>").join("") + "</ul>";
                } else {
                    limitsHtml += "<div>-</div>";
                }

                let similarHtml = "<h4>Benzer Birleşimler</h4>";
                if (similar.length) {
                    similarHtml += "<ul class='similar-list'>" +
                        similar.map(sid => {
                            const sm = byId(Number(sid));
                            const label = sm ? (sm.title) : ("Modül " + sid);
                            return "<li><a href='#' data-sim-id='" + sid + "'>" + label + "</a></li>";
                        }).join("") +
                        "</ul>";
                } else {
                    similarHtml += "<div>-</div>";
                }

                aside.innerHTML = limitsHtml + similarHtml;

                // 7) Body'e ekle ve boşluk aç
                doc.body.appendChild(aside);
                const container = doc.querySelector(".container") || doc.body;
                container.classList.add("has-sticky-aside");

                // 8) Benzer birleşim tıklamaları
                aside.querySelectorAll("a[data-sim-id]").forEach(a => {
                    a.addEventListener("click", ev => {
                        ev.preventDefault();
                        const targetId = Number(a.getAttribute("data-sim-id"));
                        openModule(targetId);
                    });
                });

                // 9) Konumlandırma (header/slider yüksekliği)
                function getOffsetTop(el) {
                    let t = 0, n = el;
                    while (n) { t += n.offsetTop || 0; n = n.offsetParent; }
                    return t;
                }
                function positionStickyAside() {
                    const header = doc.querySelector("[data-injected='moduleHeader']");
                    const slider = doc.querySelector("[data-injected='moduleSlider']");
                    let top = 0;

                    aside.style.top = top + "px";
                }
                positionStickyAside();
                doc.defaultView.addEventListener("resize", positionStickyAside);

                // 10) Son seçim kaydı ve kaydırma
                localStorage.setItem("lastModuleId", String(id));
                if (scrollToTop) {
                    frame.contentWindow.scrollTo({ top: 0, behavior: "instant" });
                }
            } catch (err) {
                console.error(err);
            }
        };
    }

    // Başlat

    loadModules();
})();
