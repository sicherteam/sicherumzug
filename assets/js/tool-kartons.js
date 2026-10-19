(function () {
  'use strict';

  const root = document.getElementById('carton-tool');
  if (!root) return;
  const form = document.getElementById('carton-form');
  const result = document.getElementById('carton-result');
  const error = document.getElementById('carton-error');
  const status = document.getElementById('carton-save-status');
  const storageKey = 'sicher-team-carton-plan-v1';
  let latest = null;

  function values() {
    return {
      people: Number(form.elements.people.value),
      rooms: Number(form.elements.rooms.value),
      density: Number(form.elements.density.value),
      books: Number(form.elements.books.value),
      kitchen: Number(form.elements.kitchen.value),
      tapePerBox: Number(form.elements.tapePerBox.value),
      tapeRoll: Number(form.elements.tapeRoll.value)
    };
  }

  function valid(v) {
    return Number.isInteger(v.people) && v.people >= 1 && v.people <= 12 &&
      Number.isInteger(v.rooms) && v.rooms >= 1 && v.rooms <= 15 &&
      [0.75, 1, 1.3].includes(v.density) &&
      Number.isFinite(v.books) && v.books >= 0 && v.books <= 50 && Number.isInteger(v.books * 2) &&
      [0, 8].includes(v.kitchen) && Number.isFinite(v.tapePerBox) && v.tapePerBox >= 0.5 && v.tapePerBox <= 10 && Number.isInteger(v.tapePerBox*2) && Number.isInteger(v.tapeRoll) && v.tapeRoll >= 10 && v.tapeRoll <= 200;
  }

  function estimate(v) {
    const midpoint = (8 * v.rooms + 5 * v.people) * v.density + 5 * v.books + v.kitchen;
    return {
      low: Math.max(5, Math.floor(midpoint * 0.8 / 5) * 5),
      high: Math.ceil(midpoint * 1.2 / 5) * 5,
      bookLow: Math.floor(4 * v.books),
      bookHigh: Math.ceil(6 * v.books)
    };
  }

  function render(v) {
    const count = estimate(v);
    document.getElementById('carton-range').textContent = count.low + ' bis ' + count.high + ' Kartons insgesamt';
    document.getElementById('carton-breakdown').textContent = v.books > 0
      ? 'Davon ungefähr ' + count.bookLow + ' bis ' + count.bookHigh + ' kleinere Bücherkartons für ' + String(v.books).replace('.', ',') + ' laufende Meter Bücher. Diese sind in der Gesamtspanne bereits enthalten.'
      : 'Sie haben keine Bücherregale eingetragen. Nutzen Sie kleinere Kartons auch für andere schwere Inhalte.';
    const tapeLow=Math.ceil(count.low*v.tapePerBox*1.15/v.tapeRoll),tapeHigh=Math.ceil(count.high*v.tapePerBox*1.15/v.tapeRoll);
    document.getElementById('carton-material').textContent = 'Materialliste: '+tapeLow+' bis '+tapeHigh+' Rollen Klebeband à '+v.tapeRoll+' m, gerechnet mit Ihren '+v.tapePerBox+' m je Karton und 15 % Planungsreserve. Zusätzlich geeignetes Packpapier, Polsterung, Stifte und Etiketten bereithalten. Kleiderboxen, Bilderverpackungen und Möbelschutz separat besprechen; deren Menge wird nicht automatisch geschätzt.';
    const summary = 'Kartonplanung: ' + v.people + ' Personen, ' + v.rooms + ' Wohn-/Schlafräume, ' +
      ({ '0.75': 'wenig', '1': 'normal', '1.3': 'viel' }[String(v.density)]) + ' Hausrat, ' + v.books +
      ' m Bücher, Küche ' + (v.kitchen ? 'umfangreich' : 'üblich') + '. Grobe Schätzung: ' + count.low + ' bis ' + count.high +
      ' Kartons. Klebebandplanung: '+tapeLow+' bis '+tapeHigh+' Rollen à '+v.tapeRoll+' m nach gewähltem Verbrauch. Material und Einpackhilfe bitte persönlich abstimmen.';
    const link = document.getElementById('carton-enquiry');
    const url = new URL(link.getAttribute('href'), window.location.origin);
    url.searchParams.set('service', 'umzug');
    url.searchParams.set('from', window.location.pathname);
    url.searchParams.set('tool', 'kartons');
    url.searchParams.set('tool_summary', summary);
    url.hash = 'angebot-form';
    link.href = url.pathname + url.search + url.hash;
    result.hidden = false;
    error.hidden = true;
    latest = v;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const v = values();
    if (!form.checkValidity() || !valid(v)) {
      result.hidden = true;
      latest = null;
      error.textContent = 'Bitte prüfen Sie Personen, Räume und Bücher sowie die Materialwerte: 0,5 bis 10 m je Karton in 0,5-m-Schritten und 10 bis 200 m je Rolle.';
      error.hidden = false;
      const invalid = form.querySelector(':invalid');
      if (invalid) invalid.focus();
      return;
    }
    status.textContent = '';
    render(v);
    result.focus();result.scrollIntoView({block:'start',behavior:'auto'});
  });

  form.addEventListener('input', function () {
    if (!result.hidden) {
      result.hidden = true;
      latest = null;
      status.textContent = 'Angaben geändert. Bitte berechnen Sie den Kartonbedarf erneut.';
    }
  });

  document.getElementById('carton-save').addEventListener('click', function () {
    if (!latest) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(latest));
      status.textContent = 'Ihre Angaben wurden nur in diesem Browser gespeichert. „Neu beginnen“ entfernt diese Speicherung.';
    } catch (_) {
      status.textContent = 'Ihr Browser erlaubt keine Speicherung. Die Berechnung bleibt ohne Speicherung nutzbar.';
    }
  });

  form.addEventListener('reset', function () {
    result.hidden = true;
    error.hidden = true;
    latest = null;
    try {
      window.localStorage.removeItem(storageKey);
      status.textContent = 'Die Angaben wurden zurückgesetzt und eine gespeicherte Kartonplanung wurde entfernt.';
    } catch (_) {
      status.textContent = 'Die Eingaben wurden zurückgesetzt. Ihr Browser erlaubt keinen Zugriff auf gespeicherte Angaben.';
    }
  });

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey));
    if(saved && typeof saved==='object'){saved.tapePerBox ??= 2;saved.tapeRoll ??= 50;}
    if (saved && valid(saved)) {
      Object.keys(saved).forEach(function (key) {
        if (form.elements[key]) form.elements[key].value = String(saved[key]);
      });
      render(saved);
      status.textContent = 'Ihre gespeicherte Kartonplanung wurde aus diesem Browser geladen. Prüfen Sie die Angaben vor der Materialbestellung.';
    }
  } catch (_) {
    // Private browsing or disabled storage does not affect calculation.
  }
})();
