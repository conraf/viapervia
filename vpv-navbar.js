/**
 * vpv-navbar.js — Via Per Via Education
 *
 * Inietta automaticamente la barra di navigazione del sito in qualsiasi
 * pagina HTML, indipendentemente dalla struttura grafica della pagina stessa.
 *
 * Utilizzo (prima della chiusura </body>):
 *   <script src="../../../vpv-navbar.js" data-root="../../../"></script>
 *
 * data-root: percorso relativo alla radice del sito (es. "../../../").
 * Per pagine alla radice usare data-root="" oppure omettere l'attributo.
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

  /* ── 3. Costruisci HTML navbar ── */
  var html = [
    '<div class="mobile-menu" id="mobileMenu">',
    '  <a href="' + ROOT + 'index.html">Home</a>',
    '  <a href="' + ROOT + 'index.html">Il progetto</a>',
    '  <a href="' + ROOT + 'index.html">Per gli insegnanti</a>',
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
    '  <nav>',
    '    <a href="' + ROOT + 'index.html">Home</a>',
    '    <a href="' + ROOT + 'index.html">Il progetto</a>',
    '    <a href="' + ROOT + 'index.html">Per gli insegnanti</a>',
    '    <a href="' + ROOT + 'mappa.html">Mappa</a>',
    '    <a href="' + ROOT + 'index.html#simulazione" class="nav-cta">Simulazione \u2192</a>',
    '  </nav>',
    '  <button class="hamburger" id="hamburgerBtn" aria-label="Menu">',
    '    <span></span><span></span><span></span>',
    '  </button>',
    '</header>'
  ].join('\n');

  /* ── 4. Inserisci in cima al body ── */
  function injectNavbar() {
    var frag = document.createDocumentFragment();
    var tmp  = document.createElement('div');
    tmp.innerHTML = html;
    while (tmp.firstChild) frag.appendChild(tmp.firstChild);
    document.body.insertBefore(frag, document.body.firstChild);

    /* ── 5. Hamburger menu ── */
    document.getElementById('hamburgerBtn').addEventListener('click', function () {
      var menu = document.getElementById('mobileMenu');
      var btn  = document.getElementById('hamburgerBtn');
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    /* ── 6. Layout responsive ── */
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

    /* ── 7. Carica vpv-data.js → vpv-search.js ── */
    loadScript(ROOT + 'vpv-data.js', function () {
      var s = document.createElement('script');
      s.src = ROOT + 'vpv-search.js';
      s.setAttribute('data-root', ROOT);
      document.body.appendChild(s);
    });
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
