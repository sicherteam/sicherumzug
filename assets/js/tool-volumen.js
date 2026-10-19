(function () {
  'use strict';
  var root = document.getElementById('volumen-tool');
  if (!root) return;
  var storageKey = 'sicher-team-volumen-v1';
  var maxPlanningVolume = 1000;
  var catalog = [
    { id: 'sofa2', room: 'wohnen', name: 'Sofa, 2 Sitze', volume: 1.3 },
    { id: 'sofa3', room: 'wohnen', name: 'Sofa, 3 Sitze', volume: 1.8 },
    { id: 'sessel', room: 'wohnen', name: 'Polstersessel', volume: 0.7 },
    { id: 'couchtisch', room: 'wohnen', name: 'Couchtisch', volume: 0.3 },
    { id: 'tvbank', room: 'wohnen', name: 'TV-Möbel', volume: 0.5 },
    { id: 'regal', room: 'wohnen', name: 'Regal, mittlere Größe', volume: 0.6 },
    { id: 'bett1', room: 'schlafen', name: 'Einzelbett mit Matratze', volume: 1.0 },
    { id: 'bett2', room: 'schlafen', name: 'Doppelbett mit Matratzen', volume: 1.8 },
    { id: 'schrank', room: 'schlafen', name: 'Kleiderschrank, 2 Türen', volume: 1.2 },
    { id: 'kommode', room: 'schlafen', name: 'Kommode', volume: 0.6 },
    { id: 'nacht', room: 'schlafen', name: 'Nachtkästchen', volume: 0.15 },
    { id: 'esstisch', room: 'essen', name: 'Esstisch', volume: 0.8 },
    { id: 'stuhl', room: 'essen', name: 'Esszimmerstuhl', volume: 0.2 },
    { id: 'kuehlschrank', room: 'essen', name: 'Kühlschrank, Standardgröße', volume: 0.7 },
    { id: 'waschmaschine', room: 'essen', name: 'Waschmaschine', volume: 0.3 },
    { id: 'schreibtisch', room: 'arbeiten', name: 'Schreibtisch', volume: 0.7 },
    { id: 'buerostuhl', room: 'arbeiten', name: 'Bürosessel', volume: 0.3 },
    { id: 'aktenschrank', room: 'arbeiten', name: 'Aktenschrank', volume: 0.6 },
    { id: 'fahrrad', room: 'neben', name: 'Fahrrad', volume: 0.5 },
    { id: 'gartentisch', room: 'neben', name: 'Gartentisch', volume: 0.6 },
    { id: 'gartenstuhl', room: 'neben', name: 'Gartenstuhl', volume: 0.2 },
    { id: 'koffer', room: 'neben', name: 'Großer Koffer', volume: 0.12 }
  ];
  var rooms = { wohnen: 'Wohnzimmer', schlafen: 'Schlafzimmer', essen: 'Küche & Esszimmer', arbeiten: 'Arbeitszimmer', neben: 'Keller & Nebenräume' };
  var entries = [];
  var sequence = 0;
  var cartons = 0;
  var numberFormat = new Intl.NumberFormat('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var byId = function (id) { return document.getElementById(id); };
  var roomSelect = byId('volume-room');
  var itemSelect = byId('volume-item');
  var quantityInput = byId('volume-quantity');
  var cartonInput = byId('volume-cartons');
  var list = byId('volume-inventory');
  var status = byId('volume-message');
  var result = byId('volume-result');
  var costLink = byId('volume-cost-link');
  var quoteLink = byId('volume-quote-link');
  var costPath = costLink.getAttribute('href');
  var quotePath = quoteLink.getAttribute('href').split('?')[0];
  function integer(value, min, max) {
    if (typeof value !== 'number' && (typeof value !== 'string' || value.trim() === '')) return null;
    var n = Number(value);
    return Number.isInteger(n) && n >= min && n <= max ? n : null;
  }
  function calculation(items, count) {
    var base = items.reduce(function (sum, item) { return sum + item.volume * item.quantity; }, 0) + count * 0.08;
    return { base: base, lower: base * 1.1, upper: base * 1.2 };
  }
  function announce(message) { status.textContent = message; }
  function fillItems() {
    itemSelect.replaceChildren();
    catalog.filter(function (item) { return item.room === roomSelect.value; }).forEach(function (item) {
      var option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name + ' (ca. ' + numberFormat.format(item.volume) + ' m³)';
      itemSelect.appendChild(option);
    });
  }
  function summaryText() {
    var estimate = calculation(entries, cartons);
    var lines = ['Möbelliste für meine Übersiedlung'];
    entries.forEach(function (item) { lines.push(rooms[item.room] + ': ' + item.quantity + ' × ' + item.name + (item.dimensions ? ' (' + item.dimensions.join(' × ') + ' cm)' : '')); });
    if (cartons) lines.push('Standardkartons: ' + cartons);
    lines.push('Geschätzter Planungsbereich: ' + (estimate.upper < 0.1 ? 'unter 0,1' : numberFormat.format(Math.max(0.1, Math.floor(estimate.lower * 10) / 10)) + '–' + numberFormat.format(Math.ceil(estimate.upper * 10) / 10)) + ' m³; Modellwerte, 10–20 % Reserve.');
    return lines.join('\n');
  }
  function renderRows() {
    list.replaceChildren();
    entries.forEach(function (item) {
      var row = document.createElement('li');
      row.className = 'tool-inventory-row';
      var label = document.createElement('label');
      var labelText = document.createElement('span');
      var details = document.createElement('small');
      var input = document.createElement('input');
      input.id = 'volume-entry-' + item.key;
      input.type = 'number'; input.min = '1'; input.max = '100'; input.step = '1'; input.inputMode = 'numeric'; input.value = item.quantity;
      input.setAttribute('aria-label', 'Anzahl: ' + item.name + ', ' + rooms[item.room]);
      label.htmlFor = input.id;
      labelText.textContent = item.name;
      details.textContent = rooms[item.room] + ' · ca. ' + numberFormat.format(item.volume) + ' m³ je Stück' + (item.dimensions ? ' · ' + item.dimensions.join(' × ') + ' cm' : '');
      label.appendChild(labelText); label.appendChild(details);
      input.addEventListener('input', function () {
        var value = integer(input.value, 1, 100);
        input.setCustomValidity(value === null ? 'Bitte eine ganze Anzahl von 1 bis 100 eingeben.' : '');
        if (value === null) { announce('Bitte die Anzahl für ' + item.name + ' korrigieren. Das Ergebnis ist bis dahin ausgeblendet.'); result.hidden = true; return; }
        item.quantity = value; updateResult(); announce(calculation(entries, cartons).upper > maxPlanningVolume ? 'Die Gesamtmenge überschreitet den Planungsbereich von 1.000 m³. Bitte Maße und Anzahl prüfen.' : 'Möbelliste aktualisiert.');
      });
      var remove = document.createElement('button');
      remove.type = 'button'; remove.className = 'tool-remove'; remove.textContent = '×';
      remove.setAttribute('aria-label', item.name + ' entfernen');
      remove.addEventListener('click', function () { entries = entries.filter(function (entry) { return entry.key !== item.key; }); renderRows(); updateResult(); announce(item.name + ' entfernt.'); var nextInput = list.querySelector('input'); (nextInput || quantityInput).focus(); });
      row.appendChild(label); row.appendChild(input); row.appendChild(remove); list.appendChild(row);
    });
    byId('volume-empty').hidden = entries.length > 0;
  }
  function fieldsValid() {
    if (integer(cartonInput.value, 0, 1000) === null) return false;
    return Array.prototype.every.call(list.querySelectorAll('input'), function (input) { return integer(input.value, 1, 100) !== null; }) && calculation(entries, cartons).upper <= maxPlanningVolume;
  }
  function updateResult() {
    if (!fieldsValid()) { result.hidden = true; return; }
    var estimate = calculation(entries, cartons);
    result.hidden = estimate.base <= 0;
    if (result.hidden) return;
    byId('volume-range').textContent = estimate.upper < 0.1 ? 'Unter 0,1 m³' : numberFormat.format(Math.max(0.1, Math.floor(estimate.lower * 10) / 10)) + '–' + numberFormat.format(Math.ceil(estimate.upper * 10) / 10) + ' m³';
    var itemCount = entries.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    byId('volume-base').textContent = 'Erfasste Basis: ' + (estimate.base < 0.1 ? 'unter 0,1' : numberFormat.format(estimate.base)) + ' m³ aus ' + itemCount + (itemCount === 1 ? ' Gegenstand und ' : ' Gegenständen und ') + cartons + (cartons === 1 ? ' Karton.' : ' Kartons.');
    costLink.href = costPath + '?volume=' + encodeURIComponent(Math.max(0.1, Math.ceil(estimate.upper * 10) / 10).toFixed(1));
    var text = summaryText();
    var prefix = quotePath + '?service=umzug&tool=volumen&from=' + encodeURIComponent('/umzugsvolumen-rechner/') + '&tool_summary=';
    var suffix = '#angebot-form';
    if ((prefix + encodeURIComponent(text) + suffix).length > 3000) {
      var notice = '\nListe gekürzt. Vollständige Liste bitte herunterladen und separat bereitstellen.';
      var characters = Array.from(text);
      while (characters.length && (prefix + encodeURIComponent(characters.join('') + notice) + suffix).length > 3000) characters.pop();
      text = characters.join('');
      text += notice;
    }
    quoteLink.href = prefix + encodeURIComponent(text) + suffix;
  }
  byId('volumen-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var quantity = integer(quantityInput.value, 1, 100);
    quantityInput.setCustomValidity(quantity === null ? 'Bitte eine ganze Anzahl von 1 bis 100 eingeben.' : '');
    if (quantity === null) { quantityInput.reportValidity(); return; }
    var selected = catalog.find(function (item) { return item.id === itemSelect.value && item.room === roomSelect.value; });
    if (!selected) return;
    var existing = entries.find(function (item) { return item.id === selected.id && item.room === selected.room; });
    if ((calculation(entries, cartons).base + selected.volume * quantity) * 1.2 > maxPlanningVolume) { announce('Der Planungsbereich darf höchstens 1.000 m³ betragen. Bitte Maße und Anzahl prüfen oder einen großen Transport persönlich besprechen.'); return; }
    if (existing && existing.quantity + quantity > 100) { announce('Maximal 100 Stück je Möbelposition. Bitte die bestehende Anzahl bearbeiten.'); return; }
    if (!existing && entries.length >= 60) { announce('Maximal 60 Positionen. Bitte ähnliche Stücke zusammenfassen oder die Liste herunterladen.'); return; }
    if (existing) existing.quantity += quantity;
    else entries.push({ key: ++sequence, id: selected.id, room: selected.room, name: selected.name, volume: selected.volume, quantity: quantity });
    renderRows(); updateResult(); announce(selected.name + ' zur Möbelliste hinzugefügt.');
  });
  byId('volume-custom-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var dimensions = ['volume-length', 'volume-width', 'volume-height'].map(function (id) { var input = byId(id); var value = integer(input.value, 1, 1000); input.setCustomValidity(value === null ? 'Bitte ein ganzzahliges Maß von 1 bis 1000 cm eingeben.' : ''); return value; });
    var nameInput = byId('volume-custom-name');
    var name = nameInput.value.trim();
    nameInput.setCustomValidity(name.length ? '' : 'Bitte den Gegenstand benennen.');
    var quantityField = byId('volume-custom-quantity');
    var quantity = integer(quantityField.value, 1, 100);
    quantityField.setCustomValidity(quantity === null ? 'Bitte eine ganze Anzahl von 1 bis 100 eingeben.' : '');
    if (!form.reportValidity() || dimensions.some(function (n) { return n === null; }) || quantity === null || !name) return;
    if (entries.length >= 60) { announce('Maximal 60 Positionen. Bitte die bestehende Liste bearbeiten.'); return; }
    var customVolume = dimensions[0] * dimensions[1] * dimensions[2] / 1000000;
    if ((calculation(entries, cartons).base + customVolume * quantity) * 1.2 > maxPlanningVolume) { announce('Der Planungsbereich darf höchstens 1.000 m³ betragen. Bitte Maße in Zentimetern und die Anzahl prüfen. Besonders große Transporte persönlich besprechen.'); return; }
    entries.push({ key: ++sequence, id: 'custom', room: roomSelect.value, name: name, dimensions: dimensions, volume: customVolume, quantity: quantity });
    renderRows(); updateResult(); announce(name + ' zur Möbelliste hinzugefügt.');
  });
  roomSelect.addEventListener('change', fillItems);
  cartonInput.addEventListener('input', function () {
    var value = integer(cartonInput.value, 0, 1000);
    cartonInput.setCustomValidity(value === null ? 'Bitte eine ganze Kartonanzahl von 0 bis 1000 eingeben.' : '');
    if (value === null) { result.hidden = true; announce('Bitte die Kartonanzahl korrigieren.'); return; }
    cartons = value; updateResult(); announce(calculation(entries, cartons).upper > maxPlanningVolume ? 'Die Gesamtmenge überschreitet den Planungsbereich von 1.000 m³. Bitte Maße und Anzahl prüfen.' : 'Kartonanzahl aktualisiert.');
  });
  byId('volume-export').addEventListener('click', function () {
    if (!fieldsValid()) { announce('Bitte die markierten Anzahlen korrigieren, bevor Sie die Liste herunterladen.'); return; }
    var content = 'Sicher Team\n' + summaryText() + '\n\nUnverbindliche Planungshilfe. Maße, Gewichte, Zugänge, Strecke und gewünschte Arbeiten für das Angebot ergänzen.\n\nKontakt Sicher Team\nTelefon: +43 660 6060775\nE-Mail: office@sicher-umzug.at\nWebsite: https://sicher-umzug.at\nUmzugsvolumen-Rechner: https://sicher-umzug.at/umzugsvolumen-rechner/\n';
    var url = URL.createObjectURL(new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8' }));
    var anchor = document.createElement('a'); anchor.href = url; anchor.download = 'sicher-team-moebelliste.txt'; document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    announce('Möbelliste als Textdatei heruntergeladen.');
  });
  byId('volume-save').addEventListener('click', function () {
    if (!fieldsValid()) { announce('Bitte die Anzahlen korrigieren, bevor Sie speichern.'); return; }
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, entries: entries, cartons: cartons })); announce('Möbelliste auf diesem Gerät gespeichert. Spätere Änderungen bitte erneut speichern.'); }
    catch (error) { announce('Der Browser erlaubt keine lokale Speicherung. Sie können Ihre Liste herunterladen.'); }
  });
  byId('volume-reset').addEventListener('click', function () {
    entries = []; cartons = 0; sequence = 0; cartonInput.value = '0'; cartonInput.setCustomValidity('');
    try { localStorage.removeItem(storageKey); } catch (error) { /* Current form can still be reset. */ }
    renderRows(); updateResult(); announce('Möbelliste und lokal gespeicherte Angaben dieses Rechners gelöscht.'); quantityInput.focus();
  });
  function restore() {
    try {
      var raw = localStorage.getItem(storageKey);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (!saved || saved.version !== 1 || !Array.isArray(saved.entries) || saved.entries.length > 60 || integer(saved.cartons, 0, 1000) === null) return;
      var restored = [];
      saved.entries.forEach(function (item) {
        if (!item || !Object.prototype.hasOwnProperty.call(rooms, item.room) || integer(item.quantity, 1, 100) === null) return;
        var standard = catalog.find(function (entry) { return entry.id === item.id && entry.room === item.room; });
        if (standard) restored.push({ key: ++sequence, id: standard.id, room: standard.room, name: standard.name, volume: standard.volume, quantity: Number(item.quantity) });
        else if (item.id === 'custom' && typeof item.name === 'string' && item.name.trim() && item.name.length <= 80 && Array.isArray(item.dimensions) && item.dimensions.length === 3 && item.dimensions.every(function (n) { return integer(n, 1, 1000) !== null; })) {
          var dimensions = item.dimensions.map(Number);
          restored.push({ key: ++sequence, id: 'custom', room: item.room, name: item.name.trim(), dimensions: dimensions, volume: dimensions[0] * dimensions[1] * dimensions[2] / 1000000, quantity: Number(item.quantity) });
        }
      });
      entries = restored; cartons = Number(saved.cartons); cartonInput.value = cartons;
      announce('Die zuletzt auf diesem Gerät gespeicherte Möbelliste wurde geladen.');
    } catch (error) { /* Invalid or blocked local storage leaves an empty working list. */ }
  }
  fillItems(); restore(); renderRows(); updateResult();
}());
