/* Categorical, in-browser events only. Never include personal fields, files or query strings. */
(() => {
  'use strict';
  const services = new Set(['umzug', 'raeumung', 'entruempelung']);
  const tools = {
    kosten: '/umzugskosten-rechner/', kartons: '/umzugskarton-rechner/', planer: '/umzugsplaner/',
    volumen: '/umzugsvolumen-rechner/', vergleich: '/umzugsangebote-vergleichen/', budget: '/umzug-budget-vergleichen/',
    uebergabe: '/ratgeber/wohnungsuebergabeprotokoll-oesterreich-muster/', halteplatz: '/ratgeber/halteverbotszone-umzug-oesterreich/',
    adressen: '/adressaenderung-checkliste/', etiketten: '/umzugskarton-etiketten/', raeumungscheck: '/raeumungs-check/'
  };
  const params = new URLSearchParams(location.search);
  const sourceTool = Object.hasOwn(tools, params.get('tool')) ? params.get('tool') : null;
  const region = () => {
    const route = document.querySelector('#cost-route');
    if (route && ['wien', 'austria', 'international'].includes(route.value)) return route.value;
    const origin = document.querySelector('#form-origin');
    if (!origin || !origin.value.trim()) return 'unspecified';
    return /\bwien\b|\b1(?:0[1-9]|1[0-9]|2[0-3])0\b/i.test(origin.value) ? 'wien' : 'other';
  };
  const emit = (event, parameters = {}) => {
    const payload = { event, page_path: location.pathname, ...parameters };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    document.dispatchEvent(new CustomEvent('sicher:conversion', { detail: payload }));
  };
  const placement = el => el.closest('.site-header') ? 'header' : el.closest('.mobile-contact') ? 'mobile_bar' : el.closest('.site-footer') ? 'footer' : el.closest('.moving-hero') ? 'hero' : 'content';
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, location.origin); } catch (_) { return; }
    if (url.protocol === 'tel:') emit('contact_phone_click', { placement: placement(link) });
    else if (['wa.me', 'api.whatsapp.com'].includes(url.hostname)) emit('contact_whatsapp_click', { placement: placement(link) });
    else if (url.origin === location.origin && url.pathname === '/angebot/') {
      const id = url.searchParams.get('tool');
      const context = { placement: placement(link) };
      if (Object.hasOwn(tools, id)) {
        Object.assign(context, { tool_id: id, source_page: tools[id], service: url.searchParams.get('service') === 'raeumung' ? 'raeumung' : 'umzug', region: region() });
        emit('tool_to_enquiry', context);
        emit('send_to_quote', context);
      } else emit('enquiry_click', context);
    }
  });
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('input', () => emit('enquiry_start'), { once: true });
    let submitted = false;
    form.addEventListener('sicher:enquiry-success', () => {
      if (submitted) return;
      submitted = true;
      const selected = form.querySelector('#form-service').value;
      const context = { service: services.has(selected) ? selected : 'other', region: region() };
      if (sourceTool) Object.assign(context, { tool_id: sourceTool, source_page: tools[sourceTool] });
      emit('generate_lead', context);
      emit('quote_submitted', context);
    });
  }
  // Saved data alone does not count as completing a new run.
  document.addEventListener('DOMContentLoaded', () => {
    const meta = document.getElementById('tool-export-contact');
    const panel = document.querySelector('.tool-panel');
    if (!meta || !panel || !Object.hasOwn(tools, meta.dataset.tool)) return;
    const id = meta.dataset.tool;
    const context = () => {
      const selected = document.querySelector('#cost-service')?.value;
      const service = ['umzug', 'raeumung', 'kombi'].includes(selected) ? selected : id === 'raeumungscheck' ? 'raeumung' : 'umzug';
      return { tool_id: id, source_page: tools[id], service, region: region() };
    };
    emit('tool_view', context());
    let started = false, completed = false;
    const complete = () => {
      if (started && !completed && [...panel.querySelectorAll('.tool-result')].some(result => !result.hidden)) {
        completed = true;
        emit('tool_completed', context());
      }
    };
    const interact = event => {
      const target = event.target;
      if (target.closest('.tool-export-actions,.tool-reset-row,.tool-no-print') || target.closest('[id$="-reset"],button[type="reset"]')) return;
      if (!started) { started = true; emit('tool_started', context()); }
      queueMicrotask(complete);
    };
    panel.addEventListener('input', interact, true);
    panel.addEventListener('change', interact, true);
    panel.addEventListener('submit', interact, true);
    panel.addEventListener('click', event => { if (event.target.closest('button:not([type="submit"])')) interact(event); }, true);
    new MutationObserver(complete).observe(panel, { attributes: true, attributeFilter: ['hidden'], subtree: true });
  }, { once: true });
})();
