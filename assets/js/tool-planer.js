(() => {
  'use strict';
  const form = document.querySelector('[data-moving-planner]');
  if (!form) return;
  const dateInput = document.getElementById('planner-date');
  const result = document.getElementById('planner-result');
  const tasksContainer = document.getElementById('planner-tasks');
  const summary = document.getElementById('planner-summary');
  const progress = document.getElementById('planner-progress');
  const status = document.getElementById('planner-status');
  const save = document.getElementById('planner-save');
  const key = 'sicher-team-umzugsplaner-v1';
  const flags = ['children', 'pets', 'car'];
  const sources = {
    before: 'https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/umzug/3/Seite.180510',
    after: 'https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/umzug/3/Seite.180520',
    register: 'https://www.oesterreich.gv.at/de/themen/persoenliche_dokumente_und_bestaetigungen/an__abmeldung_des_wohnsitzes/Seite.1180200',
    orf: 'https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/umzug/1/Seite.180406'
  };
  let current = null;
  let completed = new Set();
  let activeTaskIds = new Set();

  // Local noon and calendar-day arithmetic avoid UTC date shifts and DST-hour errors.
  function parseDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    if (year < 1900 || year > 2200) return null;
    const date = new Date(year, month, day, 12);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
  }
  function offsetDate(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12);
  }
  function displayDate(date) {
    return date.toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function isoDate(date) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }
  function task(id, text, href, linkText, flag) { return { id, text, href, linkText, flag }; }
  function groups() {
    return [
      { title: '6 Wochen vorher: Grundlagen klären', offset: -42, tasks: [
        task('contracts', 'Mietvertrag, Kündigungsfristen und Übergabetermine prüfen. Bei kurzfristigem Umzug zuerst offene Vertragsfragen klären.', sources.before, 'Offizielle Vorbereitung'),
        task('inventory', 'Festhalten, welche Möbel mitkommen, und Tragewege, Etagen sowie Liftmaße an beiden Adressen prüfen.', '/umzugsvolumen-rechner/', 'Möbelliste erstellen'),
        task('quote', 'Transport, Verpackung und Montage abgrenzen. Ein schriftliches Angebot mit dem gewünschten Umzugstermin anfragen.', '/umzugskosten-rechner/', 'Kosten vorbereiten'),
        task('children', 'Kinderbetreuung oder Schule am Zielort kontaktieren und den Betreuungsbedarf am Umzugstag planen.', sources.before, 'Offizielle Checkliste', 'children')
      ]},
      { title: '3 Wochen vorher: Versorgung & Material', offset: -21, tasks: [
        task('energy', 'Strom, Gas oder Fernwärme und Internet für beide Adressen mit den Anbietern abstimmen.', '/ratgeber/strom-gas-ummelden-umzug-oesterreich/', 'Energie beim Umzug'),
        task('insurance', 'Haushaltsversicherung vorab informieren und Schutz für Übersiedlung und neue Wohnung mit dem Versicherer klären.', sources.before, 'Offizielle Checkliste'),
        task('post', 'Nachsendeauftrag für den passenden Zeitraum organisieren. Wichtige Stellen trotzdem direkt über die neue Adresse informieren.', sources.before, 'Offizielle Checkliste'),
        task('cartons', 'Kartons, Polstermaterial und Beschriftung besorgen. Selten benötigte Dinge zuerst einpacken.', '/umzugskarton-rechner/', 'Kartons abschätzen'),
        task('pets', 'Ruhigen Aufenthaltsort für Haustiere am Umzugstag und sicheren Transport vorbereiten.', null, null, 'pets')
      ]},
      { title: '1 Woche vorher: Ablauf bestätigen', offset: -7, tasks: [
        task('loading', 'Zufahrt, Ladeplatz und eine eventuell nötige Halteverbotszone rechtzeitig klären. Zuständige Stelle und Vorlauf prüfen.', '/ratgeber/halteverbotszone-umzug-oesterreich/', 'Ladeplatz planen'),
        task('contacts', 'Uhrzeit, Schlüssel, Kontaktpersonen und vereinbarte Arbeiten mit allen Beteiligten bestätigen.'),
        task('pack', 'Kartons nach Zielraum beschriften, Zerbrechliches polstern und Geräte nach Herstellerangaben vorbereiten.'),
        task('essentials', 'Dokumente, Medikamente, Wertsachen, Ladegeräte und Dinge für die erste Nacht getrennt bereithalten.')
      ]},
      { title: 'Am Umzugstag', offset: 0, tasks: [
        task('walkthrough', 'Zeigen, was mitkommt und was bleibt. Wege freihalten und empfindliche Oberflächen gemeinsam prüfen.'),
        task('meters', 'Zählerstände an beiden Adressen fotografieren und mit den jeweiligen Vertragspartnern dokumentieren.', sources.before, 'Offizielle Checkliste'),
        task('handover', 'Wohnungszustand, übergebene Schlüssel und offene Punkte im Übergabeprotokoll festhalten.', '/ratgeber/wohnungsuebergabeprotokoll-oesterreich-muster/', 'Übergabe vorbereiten'),
        task('arrival', 'Möbel und Kartons den Zielräumen zuordnen. Vereinbarte Montage und offene Arbeiten besprechen.')
      ]},
      { title: 'Nach dem Einzug: Meldungen erledigen', offset: 1, tasks: [
        task('registration', 'Wohnsitzanmeldung prüfen und erledigen. Die Anmeldung ist grundsätzlich innerhalb von drei Tagen nach tatsächlichem Bezug erforderlich. Der Transporttag muss nicht Ihr Einzugstag sein.', sources.register, 'Frist und Voraussetzungen prüfen'),
        task('addresses', 'Arbeitgeber, Bank, Versicherungen, Abos und weitere relevante Stellen über die neue Adresse informieren.', sources.after, 'Offizielle Liste der Adressänderungen'),
        task('orf', 'Adress- oder Haushaltsänderung beim ORF-Beitrags Service prüfen und gegebenenfalls melden.', sources.orf, 'ORF-Beitrag bei Adressänderung'),
        task('car', 'Zulassung, zuständige Behörde und mögliche Änderungen bei Kennzeichen, Parkberechtigung oder digitaler Vignette prüfen.', sources.after, 'Offizielle Fahrzeughinweise', 'car'),
        task('animal-registration', 'Bei einem Hund die Anmeldung am neuen Wohnort und Abmeldung am bisherigen Wohnort mit den zuständigen Gemeinden klären.', sources.after, 'Offizielle Checkliste', 'pets')
      ]},
      { title: '1 Woche danach: Gut abschließen', offset: 7, tasks: [
        task('bills', 'Übergabeunterlagen, Rechnungen und Zählerstände aufbewahren. Alte Daueraufträge und Schlussabrechnungen prüfen.'),
        task('remaining', 'Offene Adressänderungen abschließen, Namensschilder aktualisieren und Verpackungsmaterial weiterverwenden oder passend entsorgen.')
      ]}
    ];
  }
  function deleteStored() {
    try { localStorage.removeItem(key); return true; }
    catch (_) { status.textContent = 'Der Browser erlaubt derzeit keinen Zugriff auf den Gerätespeicher.'; return false; }
  }
  function persist() {
    if (!save.checked || !current) return;
    try {
      localStorage.setItem(key, JSON.stringify({ version: 1, ...current, completed: [...completed] }));
      status.textContent = 'Ihr Plan und Fortschritt sind in diesem Browser gespeichert.';
    } catch (_) {
      save.checked = false;
      status.textContent = 'Speichern ist in diesem Browser nicht möglich. Sie können den Plan weiter nutzen oder drucken.';
    }
  }
  function updateProgress() {
    const count = [...completed].filter(id => activeTaskIds.has(id)).length;
    progress.textContent = count + ' von ' + activeTaskIds.size + ' Aufgaben erledigt';
  }
  function render(config) {
    const movingDate = parseDate(config.date);
    if (!movingDate) return false;
    current = { date: config.date, children: !!config.children, pets: !!config.pets, car: !!config.car };
    dateInput.value = current.date;
    flags.forEach(flag => { form.elements[flag].checked = current[flag]; });
    tasksContainer.replaceChildren();
    activeTaskIds = new Set();
    const today = new Date();
    const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
    groups().forEach(group => {
      const section = document.createElement('section');
      section.className = 'tool-task-group';
      const heading = document.createElement('h3');
      heading.textContent = group.title;
      const date = offsetDate(movingDate, group.offset);
      const time = document.createElement('time');
      time.dateTime = isoDate(date);
      time.textContent = displayDate(date);
      time.className = 'tool-task-date';
      if (date < localToday && group.offset < 0) {
        const note = document.createElement('span');
        note.textContent = ' · Falls noch offen, jetzt angehen';
        time.append(note);
      }
      const list = document.createElement('ul');
      list.className = 'tool-task-list';
      group.tasks.filter(item => !item.flag || current[item.flag]).forEach(item => {
        activeTaskIds.add(item.id);
        const row = document.createElement('li');
        row.className = 'tool-task';
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed.has(item.id);
        const text = document.createElement('span');
        text.className='tool-task-text';
        text.textContent = item.text;
        row.classList.toggle('is-complete',checkbox.checked);
        label.append(checkbox, text);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) completed.add(item.id); else completed.delete(item.id);
          row.classList.toggle('is-complete',checkbox.checked);
          updateProgress();
          persist();
        });
        row.append(label);
        if (item.href) {
          const link = document.createElement('a');
          link.href = item.href;
          link.textContent = item.linkText;
          row.append(link);
        }
        list.append(row);
      });
      section.append(heading, time, list);
      tasksContainer.append(section);
    });
    completed = new Set([...completed].filter(id => activeTaskIds.has(id)));
    summary.textContent = 'Umzugstermin: ' + displayDate(movingDate) + '. Haken Sie ab, was Sie schon erledigt haben.';
    updateProgress();
    const url = new URL('/angebot/', window.location.origin);
    const household = flags.filter(flag => current[flag]).map(flag => ({children: 'Kinder', pets: 'Haustiere', car: 'Auto'}[flag]));
    url.searchParams.set('service', 'umzug');
    url.searchParams.set('tool', 'planer');
    url.searchParams.set('from', '/umzugsplaner/');
    url.searchParams.set('preferred_date', isoDate(movingDate));
    url.searchParams.set('tool_summary', 'Umzugsplaner: gewünschter Umzugstermin ' + displayDate(movingDate) + (household.length ? '; Haushalt: ' + household.join(', ') : '') + '. Termin noch persönlich bestätigen.');
    url.hash = 'angebot-form';
    document.getElementById('planner-enquiry').href = url.pathname + url.search + url.hash;
    result.hidden = false;
    return true;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    dateInput.setCustomValidity('');
    if (!parseDate(dateInput.value)) {
      dateInput.setCustomValidity('Bitte wählen Sie ein gültiges Datum zwischen 1900 und 2200.');
      dateInput.reportValidity();
      return;
    }
    const config = { date: dateInput.value };
    flags.forEach(flag => { config[flag] = form.elements[flag].checked; });
    if (!current || current.date !== config.date) completed.clear();
    render(config);
    result.focus();result.scrollIntoView({block:'start',behavior:'auto'});
    status.textContent = 'Ihr Zeitplan ist erstellt. Sie können Aufgaben abhaken, drucken oder optional auf diesem Gerät speichern.';
    persist();
  });
  dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
  form.addEventListener('input', () => { if (current) { result.hidden=true; status.textContent='Angaben geändert. Bitte erstellen Sie den Zeitplan erneut.'; } });
  save.addEventListener('change', () => {
    if (save.checked) persist();
    else if (deleteStored()) status.textContent = 'Die gespeicherten Daten wurden gelöscht. Ihr aktueller Plan bleibt bis zum Schließen der Seite sichtbar.';
  });
  document.getElementById('planner-print').addEventListener('click', () => window.print());
  document.getElementById('planner-reset').addEventListener('click', () => {
    const removed = deleteStored();
    form.reset();
    dateInput.setCustomValidity('');
    save.checked = false;
    current = null;
    completed.clear();
    tasksContainer.replaceChildren();
    result.hidden = true;
    status.textContent = removed ? 'Plan und gespeicherter Fortschritt wurden gelöscht. Sie können einen neuen Plan erstellen.' : 'Der sichtbare Plan ist zurückgesetzt. Der Browser hat das Löschen gespeicherter Daten blockiert.';
    dateInput.focus();
  });
  try {
    const stored = JSON.parse(localStorage.getItem(key) || 'null');
    if (stored && stored.version === 1 && parseDate(stored.date)) {
      completed = new Set(Array.isArray(stored.completed) ? stored.completed.filter(id => typeof id === 'string') : []);
      if (render(stored)) {
        save.checked = true;
        status.textContent = 'Ihr gespeicherter Plan wurde aus diesem Browser geladen.';
      }
    }
  } catch (_) { /* The planner remains fully usable without browser storage. */ }
})();
