(() => {
  'use strict';
  const input = document.querySelector('[data-city-search]');
  const directory = document.getElementById('service-city-directory');
  if (!input || !directory) return;
  const normalize = value => value.toLocaleLowerCase('de-AT').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').trim();
  const items = [...directory.querySelectorAll('[data-city-item]')];
  const groups = [...directory.querySelectorAll('[data-city-group]')];
  const empty = document.querySelector('[data-city-empty]');
  input.addEventListener('input', () => {
    const words = normalize(input.value).split(/\s+/).filter(Boolean);
    let count = 0;
    items.forEach(item => {
      const region = item.closest('[data-city-group]').querySelector('h3').textContent;
      const text = normalize(item.textContent + ' ' + region);
      item.hidden = !words.every(word => text.includes(word));
      if (!item.hidden) count++;
    });
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll('[data-city-item]')].some(item => !item.hidden); });
    if (empty) empty.hidden = count > 0;
  });

  // Region shortcuts also work when a previous search hid their destination.
  document.querySelectorAll('[data-region-jump]').forEach(link => {
    link.addEventListener('click', () => {
      if (!input.value) return;
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
})();
