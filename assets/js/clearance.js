/* Progressive enhancement: all content, navigation and enquiry links work without the story. */
(() => {
  'use strict';
  // Protect Tab navigation from fixed bars without moving pointer-clicked controls.
  let pendingTabFocus = false;
  document.addEventListener('keydown', event => {
    pendingTabFocus = event.key === 'Tab';
  }, true);
  document.addEventListener('pointerdown', () => {
    pendingTabFocus = false;
  }, true);
  document.addEventListener('focusin', event => {
    const fromTab = pendingTabFocus;
    pendingTabFocus = false;
    if (!fromTab) return;
    const target = event.target;
    if (!target.matches('input,select,textarea,button,a,summary,[tabindex]') || target.closest('.site-header,.mobile-contact')) return;
    requestAnimationFrame(() => {
      if (document.activeElement !== target) return;
      const header = document.querySelector('.site-header').getBoundingClientRect();
      const contact = document.querySelector('.mobile-contact');
      const bar = contact && getComputedStyle(contact).display !== 'none' ? contact.getBoundingClientRect().top : innerHeight;
      const rect = target.getBoundingClientRect();
      const available = bar - Math.max(0,header.bottom) - 24;
      if (rect.height <= available && (rect.top < header.bottom + 8 || rect.bottom > bar - 8)) target.scrollIntoView({block:'center',behavior:'instant'});
      else if (rect.height > available && rect.top < header.bottom + 8) target.scrollIntoView({block:'start',behavior:'instant'});
    });
  });
  const mobileMenu = document.querySelector('.mobile-nav');
  const navGroups = [...document.querySelectorAll('.site-header .nav-group')];
  navGroups.forEach(group => group.addEventListener('toggle', () => {
    if (!group.open) return;
    navGroups.forEach(other => {
      if (other !== group && other.closest('nav') === group.closest('nav')) other.open = false;
    });
  }));
  if (mobileMenu) {
    mobileMenu.addEventListener('toggle', () => {
      if (!mobileMenu.open) mobileMenu.querySelectorAll('.nav-group').forEach(group => { group.open = false; });
    });
  }
  document.addEventListener('focusin', event => {
    navGroups.forEach(group => { if (group.open && !group.contains(event.target)) group.open = false; });
    if (mobileMenu && mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('.site-header a');
    navGroups.forEach(group => {
      if (link || !group.contains(event.target)) group.open = false;
    });
    if (mobileMenu && (link || !mobileMenu.contains(event.target))) mobileMenu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const group = event.target.closest('.nav-group');
    if (group && group.open) {
      group.open = false;
      group.querySelector('summary').focus();
    } else if (mobileMenu && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    } else {
      const openGroup = navGroups.find(item => item.open);
      if (openGroup) {
        openGroup.open = false;
        openGroup.querySelector('summary').focus();
      }
    }
  });

  const visual = document.querySelector('[data-moving-visual]');
  if (visual) {
    const frames = [...visual.querySelectorAll('[data-moving-frame]')];
    const controls = visual.querySelector('.moving-controls');
    const buttons = [...visual.querySelectorAll('[data-moving-step]')];
    const sceneStatus = visual.querySelector('[data-moving-status]');
    const labels = ['Verpacken', 'Transportieren', 'Ankommen'];
    let request = 0;
    controls.dataset.ready = 'true';
    buttons.forEach(button => { button.disabled = false; });
    buttons.forEach((button, index) => button.addEventListener('click', async () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      const current = ++request;
      const frame = frames[index];
      frame.loading = 'eager';
      button.disabled = true;
      try {
        if (frame.decode) await frame.decode();
        if (current !== request) return;
        frames.forEach((item, i) => {
          item.hidden = i !== index;
          item.classList.toggle('is-active', i === index);
          item.classList.remove('is-entering');
        });
        frame.classList.add('is-entering');
        buttons.forEach((item, i) => item.setAttribute('aria-pressed', String(i === index)));
        sceneStatus.textContent = labels[index] + ': ' + frame.alt;
      } catch (_) {
        sceneStatus.textContent = 'Die Illustration konnte nicht geladen werden. Sie können Ihre Anfrage trotzdem stellen.';
      } finally { button.disabled = false; }
    }));
  }

  document.querySelectorAll('[data-comparison]').forEach(comparison => {
    const range = comparison.querySelector('[data-comparison-range]');
    const after = comparison.querySelector('.comparison-after');
    const enable = () => { range.hidden = false; };
    if (after.complete && after.naturalWidth) enable();
    else after.addEventListener('load', enable, { once: true });
    range.addEventListener('input', () => {
      comparison.style.setProperty('--reveal', range.value + '%');
      range.setAttribute('aria-valuetext', (100 - Number(range.value)) + ' Prozent nach der Räumung sichtbar');
    });
  });

  document.querySelectorAll('[data-catalog-search]').forEach(input => {
    const items = [...document.querySelectorAll('[data-catalog-item]')];
    const empty = document.querySelector('[data-no-results]');
    const disclosures = [...document.querySelectorAll('[data-catalog-disclosure]')];
    let filtering = false;
    let priorOpen = new Map();
    const searchStatus = document.querySelector('[data-catalog-status]');
    let searchAnnouncement;
    disclosures.forEach(item => { const label = item.querySelector('[data-guide-count]'); if (label) label.textContent = item.querySelectorAll('[data-catalog-item]').length + ' Ratgeber'; });
    input.addEventListener('input', () => {
      const query = input.value.trim().toLocaleLowerCase('de');
      if (query && !filtering) priorOpen = new Map(disclosures.map(item => [item, item.open]));
      let count = 0;
      items.forEach(item => {
        const matches = item.textContent.toLocaleLowerCase('de').includes(query);
        item.hidden = !matches;
        if (matches) count++;
      });
      document.querySelectorAll('[data-catalog-group]').forEach(group => {
        group.hidden = ![...group.querySelectorAll('[data-catalog-item]')].some(item => !item.hidden);
      });
      document.querySelectorAll('[data-catalog-disclosure]').forEach(disclosure => {
        disclosure.hidden = ![...disclosure.querySelectorAll('[data-catalog-item]')].some(item => !item.hidden);
        if (query && !disclosure.hidden) disclosure.open = true;
        else if (!query && filtering) disclosure.open = priorOpen.get(disclosure) || false;
        const label = disclosure.querySelector('[data-guide-count]');
        if (label) {
          const visible = [...disclosure.querySelectorAll('[data-catalog-item]')].filter(item => !item.hidden).length;
          label.textContent = visible + (query ? ' Treffer' : ' Ratgeber');
        }
      });
      filtering = Boolean(query);
      if (empty) empty.hidden = count > 0;
      if (searchStatus) {
        clearTimeout(searchAnnouncement);
        searchAnnouncement = setTimeout(() => { searchStatus.textContent = count > 0 ? count + (count === 1 ? ' passender Eintrag.' : ' passende Einträge.') : ''; }, 250);
      }
    });
  });

  const footerMedia = matchMedia('(max-width: 760px)');
  const setFooterGroups = () => document.querySelectorAll('.footer-group').forEach(group => { group.open = !footerMedia.matches; });
  setFooterGroups();
  footerMedia.addEventListener('change', setFooterGroups);

  const form = document.querySelector('#contactForm');
  if (!form) return;
  const status = document.querySelector('#formResponse');
  const photos = form.querySelector('#form-photos');
  const offer = form.querySelector('#form-offer');
  const offerError = form.querySelector('#offer-error');
  const offerRemove = form.querySelector('#offer-remove');
  let comparisonOffer = null;
  let offerRead = Promise.resolve();

  const previews = form.querySelector('#file-preview-container');
  const uploadError = form.querySelector('#upload-error');
  const message = form.querySelector('#form-message');
  const submit = form.querySelector('[type=submit]');
  const service = form.querySelector('#form-service');
  const movingFields = form.querySelector('[data-moving-fields]');
  const clearanceFields = form.querySelector('[data-clearance-fields]');
  const serviceNames = { umzug: 'Umzug', entruempelung: 'Entrümpelung', raeumung: 'Räumung' };
  function setService() {
    const moving = service.value === 'umzug';
    movingFields.hidden = !moving;
    clearanceFields.hidden = moving;
    movingFields.querySelectorAll('input,select').forEach(input => { input.disabled = !moving; });
    form.querySelector('#form-origin').required = moving;
    form.querySelector('#form-destination').required = moving;
    const postcode = form.querySelector('#form-postcode');
    postcode.disabled = moving; postcode.required = !moving;
    form.querySelector('[name=subject]').value = serviceNames[service.value] + 'sanfrage über Sicher Team';
    message.placeholder = moving
      ? 'Etagen und Lift an beiden Adressen, gewünschte Verpackung oder Montage, besondere Möbel …'
      : 'Was soll entfernt werden? Etage, Lift, Zugang und gewünschter Termin …';
    form.querySelector('[data-message-label]').textContent = moving ? 'Was sollten wir wissen?' : 'Was soll weg?';
    const introHeading = document.querySelector('[data-quote-intro-heading]');
    const introDescription = document.querySelector('[data-quote-intro-description]');
    if (introHeading) introHeading.textContent = moving ? 'Ein guter Umzug beginnt mit einem Gespräch.' : 'Wieder Platz. Gemeinsam geplant.';
    if (introDescription) introDescription.textContent = moving
      ? 'Nennen Sie uns Start, Ziel und Ihren Wunschtermin. Wir besprechen Transport, Verpackung und Montage sowie die nächsten Schritte persönlich mit Ihnen.'
      : 'Nennen Sie uns den Standort, die Bereiche und Ihren Wunschtermin. Wir klären, was bleiben soll, was entfernt werden darf und welche Arbeiten Sie benötigen.';
    form.querySelectorAll('[aria-invalid=true]').forEach(field => { if (field.disabled) { field.removeAttribute('aria-invalid'); document.getElementById(field.id + '-error').textContent = ''; } });
  }
  const params = new URLSearchParams(location.search);
  const requestedService = params.get('service');
  let sourcePage = location.origin + location.pathname;
  const from = params.get('from');
  // Only accept an internal path; never forward an arbitrary external URL.
  if (from && from.startsWith('/') && !from.startsWith('//') && !from.includes('\\')) {
    const source = new URL(from, location.origin);
    if (source.origin === location.origin) sourcePage = source.origin + source.pathname;
  } else if (document.referrer) {
    try { const referrer = new URL(document.referrer); if (referrer.origin === location.origin) sourcePage = referrer.origin + referrer.pathname; } catch (_) {}
  }
  form.querySelectorAll('input:not([type=hidden]):not([type=file]),select,textarea').forEach(field => {
    if (!field.id || field.id === 'form-website') return;
    const error = document.createElement('small'); error.id = field.id + '-error'; error.className = 'field-error';
    field.insertAdjacentElement('afterend', error);
    field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
    field.addEventListener('invalid', () => { field.setAttribute('aria-invalid', 'true'); error.textContent = field.validity.valueMissing ? 'Bitte dieses Feld ausfüllen.'
      : field.id === 'form-postcode' ? 'Bitte eine vierstellige österreichische Postleitzahl eingeben, zum Beispiel 1120.'
      : field.validity.typeMismatch && field.type === 'email' ? 'Bitte eine vollständige E-Mail-Adresse eingeben, zum Beispiel name@beispiel.at.'
      : field.validity.tooShort ? 'Bitte mindestens ' + field.minLength + ' Zeichen eingeben.'
      : field.validity.tooLong ? 'Bitte höchstens ' + field.maxLength + ' Zeichen eingeben.'
      : 'Bitte die Eingabe prüfen und das angegebene Format verwenden.'; });
    field.addEventListener('input', () => { if (field.validity.valid) { field.removeAttribute('aria-invalid'); error.textContent = ''; } });
  });
  if (Object.hasOwn(serviceNames, requestedService)) service.value = requestedService;
  const toolSources = new Set(['kosten', 'kartons', 'planer', 'volumen', 'vergleich', 'budget', 'uebergabe', 'halteplatz', 'adressen', 'etiketten', 'raeumungscheck']);
  const planning = form.querySelector('#form-planning');
  const planningBlock = form.querySelector('#tool-quote-source');
  const cleanParam = (key, max) => (params.get(key) || '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, max);
  if (planning && planningBlock && toolSources.has(params.get('tool'))) {
    planning.value = cleanParam('tool_summary', 3000);
    planningBlock.hidden = !planning.value;
    for (const [param, id] of [['origin', 'form-origin'], ['destination', 'form-destination']]) {
      const value = cleanParam(param, 160);
      if (value) form.querySelector('#' + id).value = value;
    }
    const date = cleanParam('preferred_date', 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) form.querySelector('#form-date').value = date;
    form.querySelector('#tool-quote-remove').addEventListener('click', () => { planning.value = ''; planningBlock.hidden = true; service.focus(); });
  }
  setService();
  service.addEventListener('change', setService);
  if (params.get('guarantee') === '1') form.querySelector('#comparison-upload').open = true;

  let files = [];
  let urls = [];
  let sending = false;
  const maxBytes = 20 * 1024 * 1024;
  const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);
  function clearOffer() {
    comparisonOffer = null; offer.value = ''; offerRemove.hidden = true;
  }
  offerRemove.addEventListener('click', () => { clearOffer(); offerError.textContent = ''; offer.focus(); });
  let offerVersion = 0;
  offer.addEventListener('change', () => {
    const version = ++offerVersion;
    const candidate = offer.files[0];
    comparisonOffer = null; offerError.textContent = ''; offerRemove.hidden = true;
    offerRead = (async () => {
      if (!candidate) return;
      const typeAllowed = ['application/pdf','image/jpeg','image/png','image/webp'].includes(candidate.type);
      const header = new Uint8Array(await candidate.slice(0, 5).arrayBuffer());
      if (version !== offerVersion) return;
      const isPDF = candidate.type === 'application/pdf';
      const validPDF = !isPDF || String.fromCharCode(...header) === '%PDF-';
      if (!typeAllowed || !validPDF || !candidate.size || candidate.size > 10 * 1024 * 1024 || candidate.size + files.reduce((n, file) => n + file.size, 0) > maxBytes) {
        clearOffer();
        offerError.textContent = 'Bitte ein PDF, JPG, PNG oder WebP bis 10 MB auswählen. Zusammen mit Fotos sind höchstens 20 MB möglich.';
        return;
      }
      comparisonOffer = candidate; offerRemove.hidden = false;
    })().catch(() => { if (version === offerVersion) { clearOffer(); offerError.textContent = 'Die Datei konnte nicht gelesen werden. Bitte erneut auswählen.'; } });
  });
  function renderFiles() {
    urls.forEach(url => URL.revokeObjectURL(url));
    urls = [];
    previews.replaceChildren();
    files.forEach((file, index) => {
      const wrap = document.createElement('div'); wrap.className = 'file-preview';
      const img = document.createElement('img');
      const url = URL.createObjectURL(file); urls.push(url);
      img.src = url; img.alt = file.name;
      img.addEventListener('error', () => { img.remove(); wrap.append(document.createTextNode(file.name.slice(0, 10))); }, { once: true });
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×';
      remove.setAttribute('aria-label', `${file.name} entfernen`);
      remove.addEventListener('click', () => { files.splice(index, 1); renderFiles(); photos.focus(); });
      wrap.append(img, remove); previews.append(wrap);
    });
    photos.value = '';
    form.querySelector('#file-count').textContent = files.length ? `${files.length} Foto${files.length === 1 ? '' : 's'} ausgewählt` : 'Bis zu 8 Fotos · insgesamt 20 MB';
  }
  photos.addEventListener('change', () => {
    const candidates = [...photos.files];
    const rejected = [];
    candidates.forEach(file => {
      const duplicate = files.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified);
      if (duplicate) return;
      if (!allowedTypes.has(file.type) || files.length >= 8 || files.reduce((sum, item) => sum + item.size, 0) + file.size + (comparisonOffer ? comparisonOffer.size : 0) > maxBytes) rejected.push(file.name);
      else files.push(file);
    });
    uploadError.textContent = rejected.length ? 'Einige Dateien konnten nicht hinzugefügt werden. Bitte JPG, PNG, WebP oder HEIC verwenden, höchstens 8 Fotos und zusammen mit dem Vergleichsangebot höchstens 20 MB.' : '';
    renderFiles();
  });
  message.addEventListener('input', () => { form.querySelector('#form-message-counter').textContent = `${message.value.length} / 1000`; });
  const phone = form.querySelector('#form-phone');
  phone.addEventListener('input', () => phone.setCustomValidity(''));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const digits = phone.value.replace(/\D/g, '');
    const validPhone = /^\+?[\d\s()./\-]+$/.test(phone.value.trim()) && digits.length >= 5 && digits.length <= 15;
    phone.setCustomValidity(validPhone ? '' : 'Bitte geben Sie eine Telefonnummer mit 5 bis 15 Ziffern ein.');
    if (sending || !form.reportValidity() || form.querySelector('#form-website').value) return;
    sending = true;
    await offerRead; submit.disabled = true; form.setAttribute('aria-busy', 'true');
    status.className = 'form-status'; status.textContent = 'Ihre Anfrage wird gesendet …';
    const body = new FormData(form);
    body.delete('photos[]');
    body.delete('comparison_offer');
    if (comparisonOffer) body.append('files', comparisonOffer);
    files.forEach(file => body.append('files', file));
    // Keep the established handler fields; include all moving details in the message.
    const details = ['Leistung: ' + serviceNames[service.value]];
    if (service.value === 'umzug') {
      const origin = form.querySelector('#form-origin').value.trim();
      details.push('Start: ' + origin, 'Ziel: ' + form.querySelector('#form-destination').value.trim());
      const date = form.querySelector('#form-date').value;
      if (date) details.push('Wunschtermin: ' + date);
      const size = form.querySelector('#form-size').value;
      if (size) details.push('Umfang: ' + size);
      const postcode = origin.match(/(?:^|\s)([0-9]{4})(?:\s|$)/);
      body.set('postcode', postcode ? postcode[1] : origin);
    }
    body.set('message', details.join('\n') + (message.value.trim() ? '\n\n' + message.value.trim() : '') + (planning && planning.value.trim() ? '\n\nPlanungsangaben:\n' + planning.value.trim().slice(0, 3000) : ''));
    body.delete('planning_summary');
    body.set('source_page', sourcePage);
    body.set('page_title', document.title);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(form.action, { method: 'POST', body, signal: controller.signal });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('submission-failed');
      form.dispatchEvent(new CustomEvent('sicher:enquiry-success', { bubbles: true, detail: { service: service.value, sourcePage } }));
      form.hidden = true;
      status.className = 'form-status is-success';
      status.textContent = 'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns persönlich, um die nächsten Schritte zu besprechen.';
      files = []; renderFiles(); clearOffer();
    } catch (error) {
      status.className = 'form-status is-error';
      status.textContent = error.name === 'AbortError'
        ? 'Die Bestätigung dauert zu lange. Bitte klären Sie telefonisch oder per WhatsApp, ob Ihre Anfrage angekommen ist. Ihre Eingaben bleiben erhalten.'
        : 'Die Anfrage konnte nicht bestätigt werden. Ihre Eingaben bleiben erhalten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch oder per WhatsApp.';
    } finally {
      clearTimeout(timeout); sending = false; submit.disabled = false; form.removeAttribute('aria-busy');
      status.tabIndex = -1; status.focus();
    }
  });
})();
