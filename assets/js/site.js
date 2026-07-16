var mobileMenu = document.getElementById('mobile-menu');
var faqButtons = document.querySelectorAll('[data-faq-toggle]');

function setBodyOverflow(hidden) {
  document.body.style.overflow = hidden ? 'hidden' : '';
}

window.mobileMenuToggle = function mobileMenuToggle() {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('hidden');
  var isHidden = mobileMenu.classList.contains('hidden');
  setBodyOverflow(!isHidden);
};

window.toggleSubMenu = function toggleSubMenu(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.classList.toggle('hidden');
};

document.addEventListener('DOMContentLoaded', function domReady() {
  mobileMenu = document.getElementById('mobile-menu');
  faqButtons = document.querySelectorAll('[data-faq-toggle]');

  var yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  Array.prototype.forEach.call(faqButtons, function register(btn) {
    btn.addEventListener('click', function handleFaqToggle() {
      var answerId = btn.getAttribute('data-faq-toggle');
      var answer = document.getElementById(answerId);
      if (!answer) return;
      var isHidden = answer.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !isHidden);
      var icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        if (!isHidden) {
          icon.classList.add('rotate-180');
        } else {
          icon.classList.remove('rotate-180');
        }
      }
    });
  });

  var toggleDistrictsBtn = document.getElementById('toggle-districts');
  if (toggleDistrictsBtn) {
    toggleDistrictsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var allItems = document.querySelectorAll('#districts-list .district-item');
      var isExpanded = toggleDistrictsBtn.getAttribute('data-expanded') === 'true';

      Array.prototype.forEach.call(allItems, function(item, index) {
        if (index >= 5) {
          if (isExpanded) {
            item.classList.add('hidden');
          } else {
            item.classList.remove('hidden');
          }
        }
      });

      if (isExpanded) {
        toggleDistrictsBtn.textContent = 'Mehr anzeigen ↓';
        toggleDistrictsBtn.setAttribute('data-expanded', 'false');
        toggleDistrictsBtn.setAttribute('aria-expanded', 'false');
      } else {
        toggleDistrictsBtn.textContent = 'Weniger anzeigen ↑';
        toggleDistrictsBtn.setAttribute('data-expanded', 'true');
        toggleDistrictsBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
});
