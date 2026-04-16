/**
 * vpv-data.js — Via Per Via Education
 * Unica sorgente di dati delle scuole partecipanti.
 * Questo file viene incluso in tutte le pagine del sito.
 *
 * Per aggiungere una scuola: inserisci un nuovo oggetto nell'array.
 * Il campo `pagina` (facoltativo) è il percorso relativo alla radice
 * del sito (es. "scuole/nome-scuola/nome-via/").
 */
window.VPV_SCUOLE = [

  // ── TORINO ──
  {
    id: 1,
    nome: 'Scuola Primaria "Edmondo De Amicis"',
    istituto: 'I.C. "Carducci – De Amicis"',
    citta: "Torino",
    provincia: "Torino", sigla: "TO",
    regione: "Piemonte",
    lat: 45.0744, lng: 7.6825,
    classe: "4ª A", grado: "primaria", anno: "2025/2026",
    via: "Via Pietro Micca",
    pagina: "scuole/torino-deamicis/via-pietro-micca/"
  },
  {
    id: 11,
    nome: 'Scuola Primaria "Giosuè Carducci"',
    istituto: 'I.C. "Carducci – De Amicis"',
    citta: "Torino",
    provincia: "Torino", sigla: "TO",
    regione: "Piemonte",
    lat: 45.0701, lng: 7.6758,
    classe: "5ª B", grado: "primaria", anno: "2025/2026",
    via: "Via Carlo Alberto"
  },
  {
    id: 2,
    nome: 'Scuola Sec. I grado "Niccolò Tommaseo"',
    istituto: 'I.C. "Vanchiglia"',
    citta: "Torino",
    provincia: "Torino", sigla: "TO",
    regione: "Piemonte",
    lat: 45.0682, lng: 7.6971,
    classe: "2ª B", grado: "sec1", anno: "2025/2026",
    via: "Corso San Maurizio"
  },

  // ── VENEZIA ──
  {
    id: 3,
    nome: 'Scuola Primaria "Antonio Vivaldi"',
    istituto: 'I.C. "Cannaregio"',
    citta: "Venezia",
    provincia: "Venezia", sigla: "VE",
    regione: "Veneto",
    lat: 45.4384, lng: 12.3190,
    classe: "5ª C", grado: "primaria", anno: "2025/2026",
    via: "Fondamenta della Misericordia"
  },
  {
    id: 4,
    nome: 'Scuola Sec. II grado "Marco Polo"',
    istituto: 'Istituto Superiore "Marco Polo"',
    citta: "Venezia",
    provincia: "Venezia", sigla: "VE",
    regione: "Veneto",
    lat: 45.4345, lng: 12.3255,
    classe: "3ª A", grado: "sec2", anno: "2025/2026",
    via: "Riva degli Schiavoni"
  },

  // ── FIRENZE ──
  {
    id: 5,
    nome: 'Scuola Primaria "Leonardo da Vinci"',
    istituto: 'I.C. "Oltrarno"',
    citta: "Firenze",
    provincia: "Firenze", sigla: "FI",
    regione: "Toscana",
    lat: 43.7674, lng: 11.2491,
    classe: "3ª B", grado: "primaria", anno: "2025/2026",
    via: "Via dei Servi"
  },
  {
    id: 6,
    nome: 'Scuola Sec. I grado "Dante Alighieri"',
    istituto: 'I.C. "Centro Storico"',
    citta: "Firenze",
    provincia: "Firenze", sigla: "FI",
    regione: "Toscana",
    lat: 43.7713, lng: 11.2542,
    classe: "1ª C", grado: "sec1", anno: "2025/2026",
    via: "Via Tornabuoni"
  },

  // ── ROMA ──
  {
    id: 7,
    nome: 'Scuola Primaria "Giacomo Leopardi"',
    istituto: 'I.C. "Prati"',
    citta: "Roma",
    provincia: "Roma", sigla: "RM",
    regione: "Lazio",
    lat: 41.9073, lng: 12.4647,
    classe: "4ª D", grado: "primaria", anno: "2025/2026",
    via: "Via della Conciliazione"
  },
  {
    id: 8,
    nome: 'Liceo Classico "Virgilio"',
    istituto: 'Liceo Classico Statale "Virgilio"',
    citta: "Roma",
    provincia: "Roma", sigla: "RM",
    regione: "Lazio",
    lat: 41.8985, lng: 12.4739,
    classe: "2ª E", grado: "sec2", anno: "2025/2026",
    via: "Via delle Terme di Caracalla"
  },

  // ── NAPOLI ──
  {
    id: 9,
    nome: 'Scuola Primaria "Giambattista Vico"',
    istituto: 'I.C. "Posillipo"',
    citta: "Napoli",
    provincia: "Napoli", sigla: "NA",
    regione: "Campania",
    lat: 40.8272, lng: 14.2158,
    classe: "5ª A", grado: "primaria", anno: "2025/2026",
    via: "Via Posillipo"
  },
  {
    id: 10,
    nome: 'Istituto Comprensivo "Enrico Scarpetta"',
    istituto: 'I.C. "Quartieri Spagnoli"',
    citta: "Napoli",
    provincia: "Napoli", sigla: "NA",
    regione: "Campania",
    lat: 40.8378, lng: 14.2494,
    classe: "2ª A", grado: "sec1", anno: "2025/2026",
    via: "Via dei Tribunali"
  }

];
