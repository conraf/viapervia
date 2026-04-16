/**
 * vpv-search.js — Via Per Via Education
 * Ricerca globale per nome di via o piazza.
 *
 * Questo script è autocontenuto: inietta il proprio CSS, il pulsante
 * nella navbar e l'overlay di ricerca. Dipende da vpv-data.js
 * (window.VPV_SCUOLE).
 *
 * Utilizzo in ogni pagina:
 *   <script src="vpv-data.js"></script>
 *   <script src="vpv-search.js" data-root=""></script>
 *
 * Per le pagine nelle sottocartelle delle scuole:
 *   <script src="../../../vpv-data.js"></script>
 *   <script src="../../../vpv-search.js" data-root="../../../"></script>
 *
 * data-root: percorso relativo alla radice del sito (es. "../../../").
 */
(function () {
  /* ── Percorso radice (per i link ai risultati) ── */
  var _script = document.currentScript ||
    document.querySelector('script[src*="vpv-search"]');
  var VPV_ROOT = _script ? (_script.getAttribute('data-root') || '') : '';

  /* ── Costanti ── */
  var COLOR = { primaria: '#0B6E9E', sec1: '#D4801A', sec2: '#C75A3A' };
  var LABEL = { primaria: 'Primaria', sec1: 'Sec. I grado', sec2: 'Sec. II grado' };

  /* ── Inietta CSS ── */
  var css = [
    /* overlay */
    '.vpv-so{display:none;position:fixed;inset:0;z-index:900;',
    'background:rgba(10,42,64,0.82);backdrop-filter:blur(8px);',
    '-webkit-backdrop-filter:blur(8px);',
    'align-items:flex-start;justify-content:center;',
    'padding:4.5rem 1.25rem 2rem;overflow-y:auto;}',
    '.vpv-so.open{display:flex;animation:vpvSOFadeIn .2s ease;}',
    '@keyframes vpvSOFadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',

    /* panel */
    '.vpv-sp{width:100%;max-width:620px;background:#fff;border-radius:16px;',
    'overflow:hidden;box-shadow:0 24px 64px rgba(10,42,64,.32);}',

    /* header */
    '.vpv-sh{display:flex;align-items:center;gap:.7rem;',
    'padding:.95rem 1.2rem;border-bottom:1px solid #E0DBD0;}',
    '.vpv-si{flex:1;border:none;outline:none;',
    'font-family:"DM Sans",sans-serif;font-size:1rem;font-weight:500;',
    'color:#222;background:transparent;}',
    '.vpv-si::placeholder{color:#aaa;}',
    '.vpv-sc{background:none;border:none;cursor:pointer;color:#999;',
    'font-size:1.15rem;padding:.2rem .35rem;border-radius:6px;',
    'line-height:1;transition:color .15s,background .15s;}',
    '.vpv-sc:hover{color:#0A2A40;background:#F0F7FF;}',

    /* results */
    '.vpv-sr{max-height:58vh;overflow-y:auto;}',
    '.vpv-scount{padding:.55rem 1.2rem;font-size:.7rem;color:#888;',
    'border-bottom:1px solid #E0DBD0;letter-spacing:.02em;}',
    '.vpv-scount strong{color:#0A2A40;}',

    /* result card */
    '.vpv-rc{display:block;padding:.85rem 1.2rem;',
    'border-bottom:1px solid #EEE;',
    'text-decoration:none;color:inherit;transition:background .13s;}',
    '.vpv-rc:last-child{border-bottom:none;}',
    '.vpv-rc:hover{background:#F0F7FF;}',
    '.vpv-rv{font-size:.9rem;font-weight:700;color:#0A2A40;',
    'line-height:1.35;margin-bottom:.25rem;}',
    '.vpv-rv mark{background:#CCE8F8;color:#0B6E9E;border-radius:3px;',
    'padding:0 2px;font-weight:700;}',
    '.vpv-rbadge{display:inline-flex;align-items:center;',
    'padding:1px 8px;border-radius:100px;',
    'font-size:.6rem;font-weight:700;margin-left:.45rem;',
    'vertical-align:middle;position:relative;top:-1px;}',
    '.vpv-rm{font-size:.73rem;color:#777;line-height:1.55;margin-bottom:.3rem;}',
    '.vpv-rl{font-size:.72rem;font-weight:600;color:#0B6E9E;}',
    '.vpv-rl-none{font-size:.72rem;color:#bbb;font-style:italic;}',

    /* empty / hint */
    '.vpv-sempty{padding:2rem 1.2rem;text-align:center;',
    'font-size:.88rem;color:#888;line-height:1.7;}',
    '.vpv-sempty strong{color:#0A2A40;}',
    '.vpv-shint{padding:1.4rem 1.2rem;text-align:center;',
    'font-size:.82rem;color:#bbb;line-height:1.65;}',

    /* search button in navbar */
    '.vpv-nav-btn{background:none;border:none;cursor:pointer;',
    'display:inline-flex;align-items:center;justify-content:center;',
    'color:#888;padding:.28rem .4rem;border-radius:8px;',
    'transition:color .17s,background .17s;margin-right:.2rem;}',
    '.vpv-nav-btn:hover{color:#0B6E9E;background:rgba(11,110,158,.08);}',

    /* search link in mobile menu */
    '.vpv-mob-search{cursor:pointer !important;}',
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── SVG lente ── */
  var LENS_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>';

  /* ── Inietta overlay e pulsanti dopo DOMContentLoaded ── */
  function init() {
    injectOverlay();
    injectNavBtn();
    injectMobileBtn();
  }

  function injectOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'vpvSO';
    overlay.className = 'vpv-so';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Cerca una via o piazza');
    overlay.innerHTML =
      '<div class="vpv-sp">' +
        '<div class="vpv-sh">' +
          '<span style="color:#aaa;flex-shrink:0">' + LENS_SVG + '</span>' +
          '<input class="vpv-si" id="vpvSI" type="search" ' +
            'placeholder="Cerca una via o piazza\u2026" ' +
            'autocomplete="off" autocorrect="off" spellcheck="false" ' +
            'aria-label="Cerca una via o piazza">' +
          '<button class="vpv-sc" id="vpvSC" aria-label="Chiudi ricerca">&#x2715;</button>' +
        '</div>' +
        '<div class="vpv-sr" id="vpvSR">' +
          '<div class="vpv-shint">Digita il nome di una via o piazza, poi premi invio,<br>' +
          'per cercare tra tutti i contributi delle scuole partecipanti.</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    /* click sul backdrop */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) vpvClose();
    });

    /* input */
    document.getElementById('vpvSI').addEventListener('input', onSearch);

    /* pulsante chiudi */
    document.getElementById('vpvSC').addEventListener('click', vpvClose);

    /* ESC */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') vpvClose();
    });
  }

  function injectNavBtn() {
    var nav = document.querySelector('header nav');
    if (!nav) return;
    var btn = document.createElement('button');
    btn.className = 'vpv-nav-btn';
    btn.setAttribute('aria-label', 'Cerca una via');
    btn.setAttribute('title', 'via \u2026per via\u2026');
    btn.innerHTML = LENS_SVG;
    btn.addEventListener('click', vpvOpen);

    /* inserisci prima del link CTA (ultimo <a>) */
    var cta = nav.querySelector('.nav-cta');
    if (cta) nav.insertBefore(btn, cta);
    else nav.appendChild(btn);
  }

  function injectMobileBtn() {
    var menu = document.getElementById('mobileMenu');
    if (!menu) return;
    var a = document.createElement('a');
    a.className = 'vpv-mob-search';
    a.textContent = '\uD83D\uDD0D Cerca una via';
    a.addEventListener('click', function () {
      /* chiudi il menu mobile (funzione globale comune a tutte le pagine) */
      var mMenu = document.getElementById('mobileMenu');
      var hBtn  = document.getElementById('hamburgerBtn');
      if (mMenu) mMenu.classList.remove('open');
      if (hBtn)  hBtn.classList.remove('open');
      document.body.style.overflow = '';
      vpvOpen();
    });
    /* inserisci prima dell'ultimo elemento (CTA) */
    var items = menu.querySelectorAll('a');
    var last  = items[items.length - 1];
    menu.insertBefore(a, last);
  }

  /* ── Apri / Chiudi ── */
  function vpvOpen() {
    var overlay = document.getElementById('vpvSO');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var inp = document.getElementById('vpvSI');
      if (inp) inp.focus();
    }, 80);
  }

  window.vpvClose = function () {
    var overlay = document.getElementById('vpvSO');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    var inp = document.getElementById('vpvSI');
    if (inp) inp.value = '';
    resetResults();
  };

  /* ── Ricerca ── */
  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function onSearch(e) {
    var q = e.target.value.trim();
    renderResults(q);
  }

  function renderResults(q) {
    var el = document.getElementById('vpvSR');
    if (!el) return;

    if (!q) { resetResults(); return; }

    var qn   = normalize(q);
    var data = window.VPV_SCUOLE || [];
    var hits = data.filter(function (s) {
      return normalize(s.via).indexOf(qn) !== -1;
    });

    if (hits.length === 0) {
      el.innerHTML =
        '<div class="vpv-sempty">' +
        'Nessuna via trovata per <strong>\u00AB' + escHtml(q) + '\u00BB</strong>.<br>' +
        '<span style="font-size:.78rem;color:#bbb">Le ricerche crescono con le scuole partecipanti.</span>' +
        '</div>';
      return;
    }

    /* ordina per nome via */
    hits.sort(function (a, b) { return a.via.localeCompare(b.via, 'it'); });

    var html = '<div class="vpv-scount">' +
      hits.length + ' risultat' + (hits.length === 1 ? 'o' : 'i') +
      ' per <strong>\u00AB' + escHtml(q) + '\u00BB</strong></div>';

    hits.forEach(function (s) {
      var viaHl  = highlight(s.via, qn);
      var badge  = '<span class="vpv-rbadge" style="background:' +
        COLOR[s.grado] + '22;color:' + COLOR[s.grado] + '">' +
        LABEL[s.grado] + '</span>';
      var linkHtml = s.pagina
        ? '<span class="vpv-rl">Leggi la ricerca della classe \u2192</span>'
        : '<span class="vpv-rl-none">Ricerca in arrivo</span>';
      var href = s.pagina ? (VPV_ROOT + s.pagina) : null;

      html +=
        (href ? '<a class="vpv-rc" href="' + href + '">' : '<div class="vpv-rc">') +
          '<div class="vpv-rv">' + viaHl + badge + '</div>' +
          '<div class="vpv-rm">' +
            escHtml(s.citta) + ' (' + escHtml(s.sigla) + ')' +
            ' &nbsp;\u00B7&nbsp; ' + escHtml(s.nome) +
            ' &nbsp;\u00B7&nbsp; Classe ' + escHtml(s.classe) +
            ' &nbsp;\u00B7&nbsp; ' + escHtml(s.anno) +
          '</div>' +
          linkHtml +
        (href ? '</a>' : '</div>');
    });

    el.innerHTML = html;
  }

  function resetResults() {
    var el = document.getElementById('vpvSR');
    if (el) el.innerHTML =
      '<div class="vpv-shint">Digita il nome di una via o piazza, poi premi invio,<br>' +
      'per cercare tra tutti i contributi delle scuole partecipanti.</div>';
  }

  /* ── Highlight match insensibile ad accenti ── */
  function highlight(text, qNorm) {
    var tn  = normalize(text);
    var idx = tn.indexOf(qNorm);
    if (idx === -1) return escHtml(text);
    return escHtml(text.slice(0, idx)) +
      '<mark>' + escHtml(text.slice(idx, idx + qNorm.length)) + '</mark>' +
      escHtml(text.slice(idx + qNorm.length));
  }

  /* ── Escape HTML ── */
  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Avvio ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
