(function () {
  'use strict';
  const root = document.getElementById('offers-tool');
  if (!root) return;
  const form = document.getElementById('offers-form');
  const result = document.getElementById('offers-result');
  const error = document.getElementById('offers-error');
  const fields = { transport: 'Transport und Tragearbeiten', packing: 'Ein- und Auspacken', assembly: 'Demontage und Montage', material: 'Verpackungsmaterial', parking: 'Ladeplatz und Halteverbotsorganisation', insurance: 'Haftung, Versicherung und Schadenmeldung' };
  const states = { included: 'Enthalten', excluded: 'Nicht enthalten', unknown: 'Unklar' };
  const types = { fixed: 'Schriftlicher Fixpreis', hourly: 'Schätzung bei Stundenabrechnung', unknown: 'Unklar' };
  const money = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' });
  function value(name) { return form.elements[name].value; }
  function read(key) {
    const offer = { amount: Number(value(key + '_amount')), extraText: value(key + '_extras'), type: value(key + '_type'), features: {} };
    offer.extras = offer.extraText === '' ? 0 : Number(offer.extraText);
    Object.keys(fields).forEach(function (field) { offer.features[field] = value(key + '_' + field); });
    return offer;
  }
  function valid(offer) {
    return [offer.amount, offer.extras].every(function (amount) { return Number.isFinite(amount) && amount >= 0 && amount <= 100000; }) &&
      Object.hasOwn(types, offer.type) && Object.values(offer.features).every(function (state) { return Object.hasOwn(states, state); });
  }
  function row(label, a, b) {
    const tr = document.createElement('tr');
    [label, a, b].forEach(function (text, index) {
      const cell = document.createElement(index ? 'td' : 'th');
      if (!index) cell.scope = 'row';
      cell.textContent = text;
      tr.appendChild(cell);
    });
    document.getElementById('offers-table').appendChild(tr);
  }
  function question(text) {
    const li = document.createElement('li');
    li.textContent = text;
    document.getElementById('offers-questions').appendChild(li);
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const a = read('a');
    const b = read('b');
    const scope = value('scope');
    if (!form.checkValidity() || !valid(a) || !valid(b) || !['same', 'different', 'unknown'].includes(scope)) {
      result.hidden = true;
      error.textContent = 'Bitte tragen Sie für beide Angebote einen Gesamtbetrag inkl. USt ein. Beträge müssen zwischen 0 und 100.000 Euro liegen und dürfen höchstens zwei Nachkommastellen haben.';
      error.hidden = false;
      const invalid = form.querySelector(':invalid');
      if (invalid) invalid.focus();
      return;
    }
    error.hidden = true;
    const totals = [a.amount + a.extras, b.amount + b.extras];
    const difference = Math.abs(totals[0] - totals[1]);
    document.getElementById('offers-difference').textContent = difference < 0.005
      ? 'Die eingetragenen bekannten Summen sind gleich: jeweils ' + money.format(totals[0]) + '.'
      : 'Die bekannte Summe von Angebot ' + (totals[0] < totals[1] ? 'A' : 'B') + ' liegt um ' + money.format(difference) + ' niedriger. Daraus folgt keine Empfehlung für einen Anbieter.';
    document.getElementById('offers-context').textContent = scope === 'same'
      ? 'Sie haben den Umfang als gleich angegeben. Prüfen Sie trotzdem Bedingungen und offene Leistungen. Geschätzte Stundenbeträge können sich ändern.'
      : 'Der Leistungsumfang ist ' + (scope === 'different' ? 'unterschiedlich' : 'noch nicht abgeglichen') + '. Die Beträge sind deshalb kein Vergleich gleichwertiger Leistungen.';
    document.getElementById('offers-table').replaceChildren();
    row('Angegebener Betrag inkl. USt', money.format(a.amount), money.format(b.amount));
    row('Zusatzkosten separat eingetragen', a.extraText === '' ? 'Nicht eingetragen' : money.format(a.extras), b.extraText === '' ? 'Nicht eingetragen' : money.format(b.extras));
    row('Bekannte Summe inkl. USt', money.format(totals[0]), money.format(totals[1]));
    row('Preisvereinbarung', types[a.type], types[b.type]);
    Object.keys(fields).forEach(function (field) {
      const display = field === 'insurance' ? { included: 'Schriftlich erläutert', excluded: 'Nicht erläutert', unknown: 'Unklar' } : states;
      row(fields[field], display[a.features[field]], display[b.features[field]]);
    });
    document.getElementById('offers-questions').replaceChildren();
    question('Sind Strecke, Inventar, Termin, Etagen, Lift und Tragewege an beiden Adressen identisch beschrieben?');
    [a, b].forEach(function (offer, index) {
      const letter = index ? 'B' : 'A';
      if (offer.type !== 'fixed') question('Angebot ' + letter + ': Abrechnung, erwartete Stunden, Fahrzeiten, Mindestzeiten und mögliche Mehrkosten schriftlich klären.');
      if (offer.extraText === '') question('Angebot ' + letter + ': Zusatzkosten sind nicht eingetragen. Nachfragen, ob weitere Kosten anfallen können.');
      const open = Object.keys(fields).filter(function (field) { return field !== 'insurance' && offer.features[field] !== 'included'; });
      if (open.length) question('Angebot ' + letter + ': Bedarf und Kosten für ' + open.map(function (field) { return fields[field]; }).join(', ') + ' klären. „Nicht enthalten“ und „unklar“ sind in der Tabelle getrennt ausgewiesen.');
    });
    question('Für beide Angebote: Haftungs- und Versicherungsbedingungen, Ausschlüsse, Zuständigkeit und Vorgehen bei einem Schaden schriftlich prüfen. Die Auswahl im Tool ist kein Versicherungsnachweis.');
    const summary = 'Angebotsvergleich (eigene Angaben, inkl. USt): A ' + money.format(totals[0]) + ' (' + types[a.type] + '), B ' + money.format(totals[1]) + ' (' + types[b.type] + '). Umfang: ' + ({ same: 'als gleich angegeben', different: 'unterschiedlich', unknown: 'noch offen' }[scope]) + '. Ungeklärte Kosten oder Leistungen sind nicht als kostenlos bewertet. Bitte ein eigenes schriftliches Angebot mit Leistungen und Bedingungen erstellen.';
    const link = document.getElementById('offers-enquiry');
    const url = new URL(link.getAttribute('href'), window.location.origin);
    url.searchParams.set('service', 'umzug');
    url.searchParams.set('from', window.location.pathname);
    url.searchParams.set('tool', 'vergleich');
    url.searchParams.set('tool_summary', summary);
    url.hash = 'angebot-form';
    link.href = url.pathname + url.search + url.hash;
    result.hidden = false;
  });
  form.addEventListener('input', function () { result.hidden = true; });
  form.addEventListener('reset', function () { result.hidden = true; error.hidden = true; });
  document.getElementById('offers-print').addEventListener('click', function () { if (!result.hidden) window.print(); });
})();
