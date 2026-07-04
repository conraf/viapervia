# TODO — contenuti placeholder da rimuovere alla prima adesione reale

Le due scuole/pagine attualmente presenti sul sito sono **immaginarie**, create
solo per verificare che il sistema (mappa, schede, template) funzioni. Quando
arriverà la prima adesione reale, ricordarsi di:

1. **`vpv-data.js`** — rimuovere (o spostare in fondo, chiaramente etichettate)
   le voci fittizie con `id: 12` (Spello, "Giovanni Spagna") e tutte quelle di
   Torino/Venezia/Firenze/Roma/Napoli che non hanno un contributo reale dietro.
   Tenere solo le scuole che hanno effettivamente aderito.

2. **`scuole/spello-spagna/`** e **`scuole/torino-deamicis/`** — cancellare
   queste due cartelle di esempio (o spostarle fuori da `scuole/` in un
   archivio di riferimento per il template) quando non servono più come demo.

3. **`index.html`** — sezione "Esempio dimostrativo" (dopo la simulazione):
   se in quel momento esistono già contributi reali, ripristinare un testo
   tipo "Lavoro autentico" / "contributi reali delle scuole partecipanti" e
   far puntare `goToRandomSchoolPage()` solo a pagine vere.

4. **`mappa.html`** — rimuovere la nota nella sidebar
   *"Tutti gli inserimenti sono esemplificativi, presenti a scopo dimostrativo
   in attesa delle adesioni."* (riga vicino a `#statsRow`) non appena i dati
   in `vpv-data.js` rappresentano solo scuole reali.

5. **`chi-siamo.html`** — rimuovere il banner *"il comitato scientifico è in
   via di costituzione..."* e sostituire i `placeholder-text` (nomi, università,
   patrocini) con i dati reali non appena disponibili.

Nel frattempo, ogni pagina di esempio riporta già un avviso in-pagina
("📝 Pagina di esempio...") — vedi commit che ha introdotto questo file.
