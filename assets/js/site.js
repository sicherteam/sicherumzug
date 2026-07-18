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

  var photosInput = document.getElementById('form-photos');
  var previewContainer = document.getElementById('file-preview-container');
  if (photosInput && previewContainer) {
    var currentFiles = [];

    function renderPreviews() {
      previewContainer.innerHTML = '';
      if (currentFiles.length === 0) return;

      currentFiles.forEach(function(file, index) {
        if (!file.type.startsWith('image/')) return;
        var reader = new FileReader();
        reader.onload = function(e) {
          var wrapper = document.createElement('div');
          wrapper.className = 'relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105';

          var img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'h-full w-full object-cover';
          img.alt = file.name;

          var deleteBtn = document.createElement('button');
          deleteBtn.type = 'button';
          deleteBtn.className = 'absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 z-10 cursor-pointer';
          deleteBtn.setAttribute('aria-label', 'Foto entfernen');
          deleteBtn.innerHTML = '&times;';

          deleteBtn.addEventListener('click', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            removeFileAt(index);
          });

          wrapper.appendChild(img);
          wrapper.appendChild(deleteBtn);
          previewContainer.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
      });
    }

    function removeFileAt(indexToRemove) {
      currentFiles.splice(indexToRemove, 1);

      if (window.DataTransfer) {
        var dt = new DataTransfer();
        currentFiles.forEach(function(file) {
          dt.items.add(file);
        });
        photosInput.files = dt.files;
      }

      renderPreviews();
    }

    photosInput.addEventListener('change', function() {
      if (!photosInput.files) return;
      currentFiles = Array.prototype.slice.call(photosInput.files);
      renderPreviews();
    });
  }
});
