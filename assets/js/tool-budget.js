(function () {
  'use strict';
  const root = document.getElementById('budget-tool');
  if (!root) return;
  const form = document.getElementById('budget-form');
  const result = document.getElementById('budget-result');
  const error = document.getElementById('budget-error');
  const costs = { rental: 'Fahrzeugmiete', fuel: 'Kraftstoff und Fahrt', material: 'Verpackungsmaterial', parking: 'Ladeplatz und Parken', helpers: 'Helfer und Tragehilfen' };
  const types = { unknown: 'Noch unklar', fixed: 'Schriftlicher Fixpreis', estimate: 'Geschätzter Gesamtbetrag bei Stundenabrechnung' };
  const money = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' });
  const hours = new Intl.NumberFormat('de-AT', { maximumFractionDigits: 1 });
  function value(name) { return form.elements[name].value.trim(); }
  function euros(cents) { return money.format(cents / 100); }
  function readMoney(text) {
    if (text === '') return null;
    if (!/^\d+(?:\.\d{1,2})?$/.test(text)) throw new Error('Bitte Geldbeträge zwischen 0 und 100.000 Euro mit höchstens zwei Nachkommastellen eingeben.');
    const amount = Number(text);
    if (!Number.isFinite(amount) || amount > 100000) throw new Error('Ein einzelner Geldbetrag darf höchstens 100.000 Euro betragen.');
    return Math.round(amount * 100);
  }
  function readHours(text) {
    if (text === '') return null;
    const amount = Number(text);
    if (!Number.isFinite(amount) || amount < 0 || amount > 1000 || !Number.isInteger(amount * 2)) throw new Error('Personenstunden bitte zwischen 0 und 1.000 in halben oder ganzen Stunden angeben.');
    return amount;
  }
  function read() {
    const items = Object.keys(costs).map(function (key) { return { label: costs[key], cents: readMoney(value(key)) }; });
    [1, 2].forEach(function (index) {
      const label = value('custom_' + index + '_label').replace(/[\u0000-\u001f\u007f]/g, '');
      const cents = readMoney(value('custom_' + index + '_amount'));
      if (label.length > 60) throw new Error('Eine Zusatzposition darf höchstens 60 Zeichen lang sein.');
      if (label || cents !== null) items.push({ label: label || 'Zusatzposition ' + index, cents: cents });
    });
    const data = { items: items, quote: readMoney(value('quote')), extras: readMoney(value('extras')), deposit: readMoney(value('deposit')), advance: readMoney(value('advance')), diyHours: readHours(value('diy_hours')), proHours: readHours(value('pro_hours')), type: value('price_type'), scope: value('scope') };
    if (data.quote === null) throw new Error('Bitte zuerst einen vorhandenen Firmen-Gesamtbetrag inklusive Umsatzsteuer eintragen. Eine einzelne Stundenrate reicht nicht.');
    if (!items.some(function (item) { return item.cents !== null; })) throw new Error('Bitte mindestens eine DIY-Ausgabe beziffern. 0 ist möglich, wenn dafür tatsächlich keine Ausgabe vorgesehen ist.');
    if (!Object.hasOwn(types, data.type) || !['unknown', 'same', 'different'].includes(data.scope)) throw new Error('Bitte Preisvereinbarung und Leistungsumfang aus den angebotenen Möglichkeiten auswählen.');
    if (data.advance !== null && data.advance > data.quote) throw new Error('Die bereits im Gesamtbetrag enthaltene Anzahlung darf nicht höher als dieser Firmen-Gesamtbetrag sein. Zusätzliche Leistungen bitte separat erfassen.');
    return data;
  }
  function calculate(data) {
    return { diy: data.items.reduce(function (sum, item) { return sum + (item.cents === null ? 0 : item.cents); }, 0), pro: data.quote + (data.extras === null ? 0 : data.extras), open: data.items.filter(function (item) { return item.cents === null; }).map(function (item) { return item.label; }) };
  }
  function item(parent, text) { const li = document.createElement('li'); li.textContent = text; document.getElementById(parent).appendChild(li); }
  function row(label, diy, pro) {
    const tr = document.createElement('tr');
    [label, diy, pro].forEach(function (text, index) { const cell = document.createElement(index ? 'td' : 'th'); if (!index) cell.scope = 'row'; cell.textContent = text; tr.appendChild(cell); });
    document.getElementById('budget-table').appendChild(tr);
  }
  function show(data) {
    const model = calculate(data);
    const difference = Math.abs(model.diy - model.pro);
    const lower = model.diy < model.pro ? 'Die bekannten DIY-Ausgaben liegen' : 'Die bekannte Firmensumme liegt';
    document.getElementById('budget-difference').textContent = difference === 0
      ? 'Ihre bekannten Summen sind gleich: jeweils ' + euros(model.diy) + '.'
      : lower + ' um ' + euros(difference) + ' niedriger. Das ist eine rechnerische Differenz der eingetragenen Beträge, keine Empfehlung.';
    const scope = { same: 'Sie haben den Umfang als abgeglichen angegeben. Prüfen Sie dennoch Bedingungen und Eigenarbeit.', different: 'Die Leistungen unterscheiden sich teilweise. Die Summen beschreiben deshalb noch keinen gleichwertigen Umfang.', unknown: 'Der Leistungsumfang ist noch nicht geprüft. Gleichen Sie Strecke, Inventar, Zugänge und benötigte Arbeiten ab.' };
    const incomplete = model.open.length > 0 || data.extras === null;
    document.getElementById('budget-context').textContent = scope[data.scope] + (incomplete ? ' Es sind Kosten offen. Angezeigt werden bekannte Teilsummen, keine vollständigen Endpreise.' : ' Alle abgefragten Kostenfelder sind beziffert. Weitere, noch nicht erfasste Ausgaben können trotzdem hinzukommen.');
    document.getElementById('budget-table').replaceChildren();
    row('Bekannte Ausgaben inkl. USt, ohne rückerstattbare Kaution', euros(model.diy), euros(model.pro));
    row('Nicht bezifferte Ausgaben', model.open.length ? model.open.join(', ') : 'Alle erfassten Positionen beziffert', data.extras === null ? 'Zusatzkosten ungeklärt' : 'Zusatzkosten eingetragen: ' + euros(data.extras));
    row('Eigener Aufwand in Personenstunden', data.diyHours === null ? 'Nicht geschätzt' : hours.format(data.diyHours), data.proHours === null ? 'Nicht geschätzt' : hours.format(data.proHours));
    row('Grundlage', 'Eigene Planung und vorhandene Beträge', types[data.type]);
    document.getElementById('budget-costs').replaceChildren();
    data.items.forEach(function (entry) { item('budget-costs', entry.label + ': ' + (entry.cents === null ? 'nicht beziffert' : euros(entry.cents))); });
    document.getElementById('budget-cash').textContent = data.deposit === null
      ? 'Eine rückerstattbare Mietwagen-Kaution ist nicht beziffert. Klären Sie, welches verfügbare Geld oder Kartenlimit zusätzlich benötigt wird. Die Kaution ist nicht in den bekannten DIY-Ausgaben enthalten.'
      : 'Separat eingegebene rückerstattbare Mietwagen-Kaution: ' + euros(data.deposit) + '. Bekannte DIY-Ausgaben plus Kaution: ' + euros(model.diy + data.deposit) + '. Das ist ein vorübergehender Budgetbedarf, kein höherer Endpreis und kein Fälligkeitsplan. Rückgabe, Freigabe und mögliche Abzüge prüfen.';
    document.getElementById('budget-advance-note').textContent = data.advance === null
      ? 'Eine Firmen-Anzahlung ist nicht beziffert. Zahlungsweise und Fälligkeit im Angebot prüfen; daraus folgt nicht, dass keine Anzahlung verlangt wird.'
      : 'Firmen-Anzahlung, bereits im angegebenen Gesamtbetrag enthalten: ' + euros(data.advance) + '. Sie wird nicht erneut auf die bekannte Firmensumme addiert. Fälligkeit und Zahlungsbedingungen im Angebot prüfen.';
    document.getElementById('budget-time').textContent = data.diyHours === null || data.proHours === null
      ? 'Für einen Vergleich Ihrer Eigenarbeit fehlen noch Personenstunden. Die Zeit wird nicht in Euro umgerechnet.'
      : data.diyHours === data.proHours
        ? 'Ihr geschätzter eigener Aufwand ist bei beiden Wegen gleich. Die Zeit wird nicht in Euro umgerechnet.'
        : 'Sie planen beim ' + (data.diyHours > data.proHours ? 'selbst organisierten Umzug' : 'Umzug mit Firma') + ' ' + hours.format(Math.abs(data.diyHours - data.proHours)) + ' eigene Personenstunden mehr ein. Die Zeit wird nicht in Euro umgerechnet.';
    document.getElementById('budget-questions').replaceChildren();
    if (model.open.length) item('budget-questions', 'Noch beziffern oder ausdrücklich mit 0 bestätigen: ' + model.open.join(', ') + '. Leer bedeutet unbekannt, nicht kostenlos.');
    if (data.extras === null) item('budget-questions', 'Firmenangebot: Klären, ob außerhalb des angegebenen Gesamtbetrags noch Zusatzkosten entstehen.');
    if (data.type !== 'fixed') item('budget-questions', 'Firmenangebot: Abrechnung, Teamgröße, erwartete Stunden, Fahrt- und Mindestzeiten sowie Mehrkosten klären. Der eingetragene Betrag kann eine Schätzung sein.');
    item('budget-questions', 'Bei beiden Wegen denselben Umfang prüfen: Strecke, Inventar, Etagen, Lift, Tragewege, Packen und Möbelarbeiten. Klären, welche Aufgaben bei Ihnen bleiben.');
    item('budget-questions', 'Bei der Fahrzeugmiete Kilometerpaket, Mietdauer, Rückgabe, Nutzlast, Fahrzeugmaße und nötige weitere Fahrten prüfen. Bei Paketen jede Ausgabe nur einmal erfassen.');
    item('budget-questions', 'Haftung, Versicherungsbedingungen und Schadenmeldung für Mietfahrzeug, Helfer und Firmenauftrag jeweils konkret prüfen. Diese Übersicht ist kein Versicherungsnachweis.');
    const summary = 'DIY/Firmen-Budgetvergleich (eigene Bruttobeträge): bekannte DIY-Ausgaben ' + euros(model.diy) + '; bekannte Firmensumme ' + euros(model.pro) + ' (' + types[data.type] + '). Umfang: ' + ({ same: 'als abgeglichen angegeben', different: 'teilweise unterschiedlich', unknown: 'noch nicht geprüft' }[data.scope]) + '. Offene DIY-Positionen: ' + (model.open.join(', ') || 'keine in den erfassten Kostenfeldern') + '; Firmen-Zusatzkosten ' + (data.extras === null ? 'ungeklärt' : euros(data.extras)) + '. Rückerstattbare DIY-Kaution separat: ' + (data.deposit === null ? 'ungeklärt' : euros(data.deposit)) + '. Eigene Personenstunden DIY/Firma: ' + (data.diyHours === null ? 'offen' : hours.format(data.diyHours)) + '/' + (data.proHours === null ? 'offen' : hours.format(data.proHours)) + '. Bitte ein eigenes Angebot für denselben gewünschten Leistungsumfang besprechen.';
    const link = document.getElementById('budget-enquiry');
    const url = new URL(link.getAttribute('href'), window.location.origin);
    url.searchParams.set('service', 'umzug'); url.searchParams.set('from', window.location.pathname); url.searchParams.set('tool', 'budget'); url.searchParams.set('tool_summary', summary); url.hash = 'angebot-form';
    link.href = url.pathname + url.search + url.hash;
    result.hidden = false;
    result.tabIndex = -1;
    result.focus();
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    try {
      if (!form.checkValidity()) throw new Error('Bitte den Firmen-Gesamtbetrag ausfüllen und zulässige Beträge eingeben: Geldbeträge von 0 bis 100.000 Euro mit höchstens zwei Nachkommastellen; Personenstunden von 0 bis 1.000 in halben Stunden.');
      const data = read(); error.hidden = true; show(data);
    } catch (problem) {
      result.hidden = true; error.textContent = problem.message; error.hidden = false;
      const invalid = form.querySelector(':invalid'); if (invalid) invalid.focus();
    }
  });
  form.addEventListener('input', function () { result.hidden = true; error.hidden = true; });
  form.addEventListener('change', function () { result.hidden = true; error.hidden = true; });
  form.addEventListener('reset', function () { result.hidden = true; error.hidden = true; });
  document.getElementById('budget-print').addEventListener('click', function () { if (!result.hidden) window.print(); });
})();
