/**
 * vpv-navbar.js — Via Per Via Education
 *
 * Inietta automaticamente la barra di navigazione del sito in qualsiasi
 * pagina HTML, indipendentemente dalla struttura grafica della pagina stessa.
 *
 * Utilizzo (prima della chiusura </body>):
 *   <script src="../../../vpv-navbar.js" data-root="../../../"></script>
 *
 * data-root: percorso relativo alla radice del sito rispetto alla pagina.
 *   Esempi:
 *     /sito/index.html                            → data-root=""
 *     /sito/mappa.html                            → data-root=""
 *     /sito/starter-kit/guida-insegnanti.html     → data-root="../"
 *     /sito/scuole/torino-deamicis/via-micca/     → data-root="../../../"
 *   Per pagine alla radice usare data-root="" oppure omettere l'attributo.
 */
(function () {

  var _script = document.currentScript ||
    document.querySelector('script[src*="vpv-navbar"]');
  var ROOT = _script ? (_script.getAttribute('data-root') || '') : '';

  /* ── 1. Inietta vpv.css ── */
  if (!document.querySelector('link[href*="vpv.css"]')) {
    var cssLink = document.createElement('link');
    cssLink.rel  = 'stylesheet';
    cssLink.href = ROOT + 'vpv.css';
    document.head.appendChild(cssLink);
  }

  /* ── 2. Inietta Google Fonts ── */
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    var fontsLink = document.createElement('link');
    fontsLink.rel  = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap';
    document.head.appendChild(fontsLink);
  }

  /* ── 3. Inietta popup UDA ── */
  var udaHtml =
    '<div id="uda-popup" role="dialog" aria-modal="true" aria-label="Scarica le UDA" style="' +
      'display:none;position:fixed;inset:0;z-index:900;' +
      'background:rgba(10,42,64,0.72);align-items:center;justify-content:center;padding:1.5rem;">' +
    '<div style="background:#fff;border-radius:16px;max-width:420px;width:100%;padding:2rem 2rem 1.5rem;position:relative;">' +
      '<button onclick="closeUdaPopup()" aria-label="Chiudi" style="' +
        'position:absolute;top:1rem;right:1rem;background:none;border:none;' +
        'font-size:1.4rem;cursor:pointer;color:#666;line-height:1;">&#x2715;</button>' +
      '<p style="font-size:0.68rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;' +
        'color:#0B6E9E;margin-bottom:0.5rem;">Kit didattico</p>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:1.3rem;color:#0A2A40;' +
        'margin-bottom:0.4rem;font-weight:700;">Unità di Apprendimento</h2>' +
      '<p style="font-size:0.82rem;color:#666;line-height:1.6;margin-bottom:1.4rem;">' +
        'Tre UDA pronte all\'uso, una per ogni ordine e grado scolastico.</p>' +
      '<div style="display:flex;flex-direction:column;gap:0.6rem;">' +
        '<a href="' + ROOT + 'UDA/UDA_ViaPerVia_Primaria.pdf" target="_blank" rel="noopener noreferrer" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">📄</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Scuola Primaria</div>' +
          '<div style="font-size:0.74rem;color:#666;">Classi 4ª–5ª · 12–16 ore</div></div></a>' +
        '<a href="' + ROOT + 'UDA/UDA_ViaPerVia_SecondariaPrimoGrado.pdf" target="_blank" rel="noopener noreferrer" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">📄</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Secondaria di I grado</div>' +
          '<div style="font-size:0.74rem;color:#666;">Classi 1ª–3ª · 15–20 ore</div></div></a>' +
        '<a href="' + ROOT + 'UDA/UDA_ViaPerVia_SecondariaSecondoGrado.pdf" target="_blank" rel="noopener noreferrer" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">📄</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Secondaria di II grado</div>' +
          '<div style="font-size:0.74rem;color:#666;">Biennio/triennio · 20–25 ore</div></div></a>' +
      '</div>' +
    '</div></div>';

  window.openUdaPopup = function () {
    var p = document.getElementById('uda-popup');
    if (p) { p.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  };
  window.closeUdaPopup = function () {
    var p = document.getElementById('uda-popup');
    if (p) { p.style.display = 'none'; document.body.style.overflow = ''; }
  };

  /* ── 4. Inietta popup Kit insegnanti ── */
  var kitHtml =
    '<div id="kit-popup" role="dialog" aria-modal="true" aria-label="Kit per gli insegnanti" style="' +
      'display:none;position:fixed;inset:0;z-index:900;' +
      'background:rgba(10,42,64,0.72);align-items:center;justify-content:center;padding:1.5rem;">' +
    '<div style="background:#fff;border-radius:16px;max-width:420px;width:100%;padding:2rem 2rem 1.5rem;position:relative;">' +
      '<button onclick="closeKitPopup()" aria-label="Chiudi" style="' +
        'position:absolute;top:1rem;right:1rem;background:none;border:none;' +
        'font-size:1.4rem;cursor:pointer;color:#666;line-height:1;">&#x2715;</button>' +
      '<p style="font-size:0.68rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;' +
        'color:#0B6E9E;margin-bottom:0.5rem;">Kit didattico</p>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:1.3rem;color:#0A2A40;' +
        'margin-bottom:0.4rem;font-weight:700;">Per gli insegnanti</h2>' +
      '<p style="font-size:0.82rem;color:#666;line-height:1.6;margin-bottom:1.4rem;">' +
        'La guida completa e il template HTML per costruire la pagina della vostra via.</p>' +
      '<div style="display:flex;flex-direction:column;gap:0.6rem;">' +
        '<a href="' + ROOT + 'starter-kit/guida-insegnanti.html" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">📖</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Guida per gli insegnanti</div>' +
          '<div style="font-size:0.74rem;color:#666;">Come portare Via Per Via in classe, passo per passo</div></div></a>' +
        '<a href="' + ROOT + 'starter-kit/_template.html" download="_template.html" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">📄</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Template HTML</div>' +
          '<div style="font-size:0.74rem;color:#666;">File base opzionale per la pagina della via · scarica</div></div></a>' +
        '<a href="' + ROOT + 'starter-kit/toponomastica-difficile.html" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">🗺️</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Toponomastica difficile</div>' +
          '<div style="font-size:0.74rem;color:#666;">Vie rinominate, figure discusse, toponomastica femminile</div></div></a>' +
        '<a href="' + ROOT + 'starter-kit/kit-privacy.html" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">🔒</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Kit privacy e liberatorie</div>' +
          '<div style="font-size:0.74rem;color:#666;">Moduli pronti e regola dei soli nomi di battesimo</div></div></a>' +
        '<a href="' + ROOT + 'starter-kit/tabella-indicazioni-2025.html" style="' +
          'display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;' +
          'background:#F0F7FF;border:1px solid #CCE8F8;border-radius:10px;' +
          'text-decoration:none;transition:background 0.2s;">' +
          '<span style="font-size:1.4rem;">📊</span>' +
          '<div><div style="font-weight:700;font-size:0.88rem;color:#0A2A40;">Tabella Indicazioni 2025</div>' +
          '<div style="font-size:0.74rem;color:#666;">Mappa di corrispondenza per PTOF e collegio docenti</div></div></a>' +
      '</div>' +
    '</div></div>';

  window.openKitPopup = function () {
    var p = document.getElementById('kit-popup');
    if (p) { p.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  };
  window.closeKitPopup = function () {
    var p = document.getElementById('kit-popup');
    if (p) { p.style.display = 'none'; document.body.style.overflow = ''; }
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { window.closeUdaPopup(); window.closeKitPopup(); }
  });

  /* ── 4. Costruisci HTML navbar ── */
  var html = [
    '<div class="mobile-menu" id="mobileMenu">',
    '  <a href="' + ROOT + 'index.html">Home</a>',
    '  <a href="' + ROOT + 'index.html#progetto">Il progetto</a>',
    '  <a href="' + ROOT + 'index.html#insegnanti">Per gli insegnanti</a>',
    '  <a href="' + ROOT + 'mappa.html">Mappa</a>',
    '  <a class="mobile-menu-cta" href="' + ROOT + 'index.html#simulazione">Simulazione \u2192</a>',
    '</div>',
    '<header>',
    '  <a class="logo-wrap" href="' + ROOT + 'index.html">',
    '    <img class="logo-img" src="' + ROOT + 'ViaPerViaLogo-400.png" alt="Via Per Via Education">',
    '    <div class="logo-text">',
    '      <span class="logo-name">Via Per Via</span>',
    '      <span class="logo-tagline">progetto educativo</span>',
    '    </div>',
    '  </a>',
    '  <nav aria-label="Navigazione principale">',
    '    <a href="' + ROOT + 'index.html">Home</a>',
    '    <a href="' + ROOT + 'index.html#progetto">Il progetto</a>',
    '    <a href="' + ROOT + 'index.html#insegnanti">Per gli insegnanti</a>',
    '    <a href="' + ROOT + 'mappa.html">Mappa</a>',
    '    <a href="' + ROOT + 'index.html#simulazione" class="nav-cta">Simulazione \u2192</a>',
    '  </nav>',
    '  <button class="hamburger" id="hamburgerBtn" aria-label="Apri menu">',
    '    <span></span><span></span><span></span>',
    '  </button>',
    '</header>'
  ].join('\n');

  /* ── 5. Inserisci in cima al body ── */
  function injectNavbar() {
    var frag = document.createDocumentFragment();
    var tmp  = document.createElement('div');
    tmp.innerHTML = udaHtml + kitHtml + html;
    while (tmp.firstChild) frag.appendChild(tmp.firstChild);
    document.body.insertBefore(frag, document.body.firstChild);

    /* ── 6. Hamburger menu ── */
    document.getElementById('hamburgerBtn').addEventListener('click', function () {
      var menu = document.getElementById('mobileMenu');
      var btn  = document.getElementById('hamburgerBtn');
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    /* ── 7. Layout responsive ── */
    function updateLayout() {
      var nav  = document.querySelector('header nav');
      var btn  = document.getElementById('hamburgerBtn');
      var menu = document.getElementById('mobileMenu');
      if (!nav || !btn) return;
      if (window.innerWidth <= 768) {
        nav.style.display  = 'none';
        btn.style.display  = 'flex';
      } else {
        nav.style.display  = 'flex';
        btn.style.display  = 'none';
        menu.classList.remove('open');
        btn.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
    window.addEventListener('resize', updateLayout);
    updateLayout();

    /* ── 8. Carica vpv-data.js → vpv-search.js ──
       Se vpv-data.js è già stato caricato dalla pagina (es. mappa.html),
       salta il caricamento e vai direttamente a vpv-search.js. */
    function loadVpvSearch() {
      if (!document.querySelector('script[src*="vpv-search"]')) {
        var s = document.createElement('script');
        s.src = ROOT + 'vpv-search.js';
        s.setAttribute('data-root', ROOT);
        document.body.appendChild(s);
      }
    }

    if (typeof window.VPV_SCUOLE === 'undefined') {
      loadScript(ROOT + 'vpv-data.js', loadVpvSearch);
    } else {
      loadVpvSearch();
    }
  }

  function loadScript(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    if (callback) s.onload = callback;
    document.body.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavbar);
  } else {
    injectNavbar();
  }

})();
