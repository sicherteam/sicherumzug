(() => {
  'use strict';
  const form = document.querySelector('[data-handover-generator]');
  if (!form) return;
  const result = document.getElementById('handover-result');
  const documentBody = document.getElementById('handover-document');
  const status = document.getElementById('handover-status');
  const roomList = document.getElementById('handover-rooms');
  const meterList = document.getElementById('handover-meters');
  const keyList = document.getElementById('handover-keys');
  const limits = { rooms: 20, meters: 12, keys: 20 };
  let sequence = 0;
  const clean = (value, maximum = 1500) => String(value || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maximum);
  const field = name => clean(form.elements.namedItem(name).value);
  function invalidate() {
    if (!result.hidden) {
      result.hidden = true;
      delete result.handoverData;
      status.textContent = 'Angaben geändert. Bitte erstellen Sie das Protokoll erneut.';
    }
  }
  function inputField(row, labelText, name, value, options = {}) {
    const box = document.createElement('div'); box.className = 'tool-field';
    const id = 'handover-field-' + (++sequence);
    const label = document.createElement('label'); label.htmlFor = id; label.textContent = labelText;
    const input = document.createElement(options.rows ? 'textarea' : 'input');
    input.id = id; input.dataset.field = name; input.value = value || '';
    input.maxLength = options.maxLength || 300;
    if (options.rows) input.rows = options.rows;
    else input.type = options.type || 'text';
    if (options.type === 'number') { input.min = '0'; input.max = '999'; input.step = '1'; }
    if (options.type === 'date') { input.min = '1900-01-01'; input.max = '2200-12-31'; }
    if (options.placeholder) input.placeholder = options.placeholder;
    box.append(label, input); row.append(box);
    return input;
  }
  function removeButton(row, name, list) {
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'tool-text-button';
    remove.textContent = 'Entfernen'; remove.setAttribute('aria-label', name + ' entfernen');
    remove.addEventListener('click', () => { row.remove(); invalidate(); updateAddButtons(); const suffix = list === roomList ? 'room' : list === meterList ? 'meter' : 'key'; const focusTarget = list.querySelector('input,textarea') || document.getElementById('handover-add-' + suffix); if (focusTarget) focusTarget.focus(); status.textContent = name + ' entfernt.'; });
    row.append(remove);
  }
  function updateAddButtons() {
    [['rooms', roomList, 'room'], ['meters', meterList, 'meter'], ['keys', keyList, 'key']].forEach(([type,list,suffix]) => {
      document.getElementById('handover-add-' + suffix).disabled = list.children.length >= limits[type];
    });
  }
  function addRoom(name = '', focus = false) {
    if (roomList.children.length >= limits.rooms) return;
    const row = document.createElement('div'); row.className = 'tool-handover-row';
    const input = inputField(row, 'Raum / Bereich', 'name', name, { maxLength: 100 });
    inputField(row, 'Beobachteter Zustand / Einrichtung / Fotoverweis', 'condition', '', { rows: 2, maxLength: 1000, placeholder: 'Wände, Boden, Fenster, Türen, Ausstattung und konkrete Beobachtungen' });
    removeButton(row, 'Raum', roomList); roomList.append(row); updateAddButtons(); if (focus) input.focus();
  }
  function addMeter(type = '', focus = false) {
    if (meterList.children.length >= limits.meters) return;
    const row = document.createElement('div'); row.className = 'tool-grid tool-handover-row';
    const input = inputField(row, 'Zählerart', 'type', type, { maxLength: 100, placeholder: 'z. B. Strom oder Kaltwasser' });
    inputField(row, 'Zählernummer', 'number', '', { maxLength: 100 });
    inputField(row, 'Abgelesener Stand mit Einheit', 'reading', '', { maxLength: 100, placeholder: 'z. B. 12.345,6 kWh' });
    inputField(row, 'Ablesedatum', 'date', '', { type: 'date' });
    removeButton(row, 'Zähler', meterList); meterList.append(row); updateAddButtons(); if (focus) input.focus();
  }
  function addKey(type = '', focus = false) {
    if (keyList.children.length >= limits.keys) return;
    const row = document.createElement('div'); row.className = 'tool-grid tool-handover-row';
    const input = inputField(row, 'Schlüsselart / Chip', 'type', type, { maxLength: 100 });
    inputField(row, 'Übergebene Anzahl', 'count', '', { type: 'number' });
    inputField(row, 'Bemerkung / fehlende Schlüssel', 'notes', '', { maxLength: 300 });
    removeButton(row, 'Schlüsselart', keyList); keyList.append(row); updateAddButtons(); if (focus) input.focus();
  }
  function rowValues(list) {
    return [...list.children].map(row => Object.fromEntries([...row.querySelectorAll('[data-field]')].map(input => [input.dataset.field, clean(input.value, input.maxLength)])));
  }
  function dateText(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    if (!match) return value;
    return match[3] + '.' + match[2] + '.' + match[1];
  }
  function model(blank) {
    if (blank) return {
      mode: 'blank', kind: '', address: '', top: '', date: '', time: '',
      parties: [{ role: 'Mieterseite', name: '' }, { role: 'Vermieterseite / Hausverwaltung', name: '' }, { role: 'Weitere anwesende Personen', name: '' }],
      rooms: ['Vorraum', 'Küche', 'Wohnzimmer', 'Schlafzimmer', 'Bad / WC', 'Weitere Räume / Keller / Balkon'].map(name => ({ name, condition: '' })),
      meters: ['Strom', 'Gas / Wärme', 'Wasser'].map(type => ({ type, number: '', reading: '', date: '' })),
      keys: ['Wohnung / Haustür', 'Postkasten', 'Keller / weitere Schlüssel oder Chips'].map(type => ({ type, count: '', notes: '' })),
      observations: '', openPoints: '', attachments: ''
    };
    return {
      mode: 'filled', kind: field('kind'), address: field('address'), top: field('top'), date: field('date'), time: field('time'),
      parties: [{ role: 'Mieterseite', name: field('tenant') }, { role: 'Vermieterseite / Hausverwaltung', name: field('landlord') }, { role: 'Weitere anwesende Personen', name: field('other') }],
      rooms: rowValues(roomList), meters: rowValues(meterList), keys: rowValues(keyList),
      observations: field('observations'), openPoints: field('openPoints'), attachments: field('attachments')
    };
  }
  function section(title, id) {
    const element = document.createElement('section'); element.className = 'tool-handover-section'; element.dataset.handoverSection = id;
    const h = document.createElement('h3'); h.textContent = title; element.append(h); documentBody.append(element); return element;
  }
  function line(parent, label, value, blankLines = 1) {
    const p = document.createElement('p'); p.className = 'tool-handover-line';
    const strong = document.createElement('strong'); strong.textContent = label + ': ';
    const span = document.createElement('span'); span.textContent = value || Array(blankLines).fill('________________________________').join('\n');
    span.style.whiteSpace = 'pre-wrap'; p.append(strong, span); parent.append(p);
  }
  function render(data) {
    documentBody.replaceChildren(); result.handoverData = data;
    const general = section('Wohnung und Termin', 'general');
    line(general, 'Art der Übergabe', data.kind); line(general, 'Adresse', data.address); line(general, 'Stiege / Stock / Top', data.top);
    line(general, 'Datum / Uhrzeit', [dateText(data.date),data.time].filter(Boolean).join(' · '));
    const parties = section('Beteiligte Personen', 'parties'); data.parties.forEach(p => line(parties,p.role,p.name));
    const rooms = section('Räume und beobachteter Zustand', 'rooms');
    if (!data.rooms.length) line(rooms,'Raum / Zustand','',2);
    data.rooms.forEach((room,index) => line(rooms, (index + 1) + '. ' + (room.name || 'Raum / Bereich'), room.condition, 2));
    const meters = section('Zählerstände', 'meters');
    if (!data.meters.length) line(meters,'Art / Nummer / Stand / Datum','',2);
    data.meters.forEach((meter,index) => {
      const p = document.createElement('p'); p.className = 'tool-handover-line';
      p.textContent = (index+1) + '. ' + (meter.type || 'Zählerart: __________') + ' · Nummer: ' + (meter.number || '____________') + ' · Stand / Einheit: ' + (meter.reading || '____________') + ' · Ablesedatum: ' + (dateText(meter.date) || '____________'); meters.append(p);
    });
    const keys = section('Übergebene Schlüssel und Chips', 'keys');
    if (!data.keys.length) line(keys,'Art / Anzahl / Bemerkung','',2);
    data.keys.forEach(key => line(keys,key.type || 'Schlüsselart', 'Anzahl: ' + (key.count === '' ? '________' : key.count) + ' · Bemerkung: ' + (key.notes || '________________')));
    line(section('Weitere Beobachtungen','observations'),'Festgehalten',data.observations,2);
    line(section('Offene Punkte / abweichende Auffassungen','openPoints'),'Was / wer / bis wann',data.openPoints,3);
    line(section('Anlagen und Fotoverweise','attachments'),'Zugehörige Unterlagen',data.attachments,2);
    const signatures = section('Prüfung und Unterschriften', 'signatures');
    const note = document.createElement('p'); note.textContent = 'Vor Unterzeichnung gemeinsam prüfen und gegebenenfalls ergänzen. Die rechtliche Wirkung einer Unterschrift hängt vom konkreten Inhalt und den Umständen ab. Eine Kopie mit den zugehörigen Anlagen für jede beteiligte Seite vorsehen.'; signatures.append(note);
    line(signatures,'Ort / Datum',''); line(signatures,'Unterschrift Mieterseite','',2); line(signatures,'Unterschrift Vermieterseite / Vertretung','',2); line(signatures,'Weitere Unterschrift / Funktion','',2);
    const url = new URL('/angebot/',window.location.origin); url.searchParams.set('service','umzug'); url.searchParams.set('tool','uebergabe'); url.searchParams.set('from','/ratgeber/wohnungsuebergabeprotokoll-oesterreich-muster/');
    const scope = data.mode === 'blank' ? 'Leere Protokollvorlage für eine Wohnungsübergabe erstellt. Übergabeart und tatsächliche Raumzahl noch offen.' : 'Wohnungsübergabe vorbereiten: ' + (data.kind || 'Art noch offen') + ', ' + data.rooms.length + ' erfasste Räume / Bereiche.';
    url.searchParams.set('tool_summary',scope + ' Möbeltransport vor der Übergabe persönlich abstimmen. Keine privaten Protokollangaben übernommen.'); url.hash = 'angebot-form';
    document.getElementById('handover-enquiry').href = url.pathname + url.search + url.hash;
    result.hidden = false; result.focus(); result.scrollIntoView({block:'start',behavior:'auto'});
    status.textContent = data.mode === 'blank' ? 'Leere Vorlage erstellt. Sie können sie als PDF herunterladen oder ausdrucken und von Hand ergänzen.' : 'Ihr Protokollentwurf ist erstellt. Prüfen Sie ihn gemeinsam und laden Sie Ihre eigene Kopie herunter.';
  }
  function resetRows() {
    roomList.replaceChildren(); meterList.replaceChildren(); keyList.replaceChildren();
    ['Vorraum', 'Küche', 'Wohnzimmer', 'Bad / WC'].forEach(name => addRoom(name));
    ['Strom', 'Wasser'].forEach(type => addMeter(type)); ['Wohnung / Haustür','Postkasten'].forEach(type => addKey(type));
  }
  form.addEventListener('submit',event => { event.preventDefault(); if (form.reportValidity()) render(model(false)); });
  form.addEventListener('input',invalidate);
  document.getElementById('handover-blank').addEventListener('click',() => render(model(true)));
  document.getElementById('handover-add-room').addEventListener('click',() => { addRoom('',true); invalidate(); });
  document.getElementById('handover-add-meter').addEventListener('click',() => { addMeter('',true); invalidate(); });
  document.getElementById('handover-add-key').addEventListener('click',() => { addKey('',true); invalidate(); });
  document.getElementById('handover-print').addEventListener('click',() => window.print());
  document.getElementById('handover-reset').addEventListener('click',() => { form.reset(); resetRows(); documentBody.replaceChildren(); delete result.handoverData; result.hidden = true; status.textContent = 'Alle eingegebenen Protokollangaben wurden aus dieser Seite gelöscht.'; document.getElementById('handover-kind').focus(); });
  resetRows();
})();
