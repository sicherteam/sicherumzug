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

  // Focus management
  if (!isHidden) {
    var closeBtn = document.getElementById('mobile-menu-close');
    if (closeBtn) {
      setTimeout(function() { closeBtn.focus(); }, 50);
    }
  } else {
    var openBtn = document.getElementById('mobile-menu-open');
    if (openBtn) {
      openBtn.focus();
    }
  }
};

window.toggleSubMenu = function toggleSubMenu(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.classList.toggle('hidden');
};

document.addEventListener('DOMContentLoaded', function domReady() {
  mobileMenu = document.getElementById('mobile-menu');
  faqButtons = document.querySelectorAll('[data-faq-toggle]');

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', function handleEscapeKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenuToggle();
      }
    }
  });

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
    var allFiles = [];

    function updateFileInput() {
      try {
        var dt = new DataTransfer();
        allFiles.forEach(function(file) {
          dt.items.add(file);
        });
        photosInput.files = dt.files;
      } catch (e) {
        console.error('DataTransfer not supported', e);
      }
    }

    photosInput.addEventListener('change', function() {
      if (!photosInput.files || photosInput.files.length === 0) return;
      var filesArray = Array.prototype.slice.call(photosInput.files);

      filesArray.forEach(function(file) {
        if (!file.type.startsWith('image/')) return;

        // Prevent exact duplicates
        var isDuplicate = allFiles.some(function(f) {
          return f.name === file.name && f.size === file.size && f.lastModified === file.lastModified;
        });
        if (isDuplicate) return;

        allFiles.push(file);

        // Create preview wrapper synchronously
        var wrapper = document.createElement('div');
        wrapper.className = 'relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 group';

        // Image element
        var img = document.createElement('img');
        img.className = 'h-full w-full object-cover opacity-0 transition-opacity duration-300';
        img.alt = file.name;

        // Loading placeholder
        var placeholder = document.createElement('div');
        placeholder.className = 'absolute inset-0 flex items-center justify-center bg-gray-50';
        placeholder.innerHTML = '<span class="material-symbols-outlined animate-spin text-gray-400">autorenew</span>';
        wrapper.appendChild(placeholder);

        // Delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-red-600/95 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-200 shadow-md focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:focus:opacity-100';
        deleteBtn.setAttribute('aria-label', 'Foto "' + file.name + '" entfernen');
        deleteBtn.innerHTML = '<span class="material-symbols-outlined text-sm leading-none">close</span>';

        deleteBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          var index = allFiles.indexOf(file);
          if (index > -1) {
            allFiles.splice(index, 1);
          }
          updateFileInput();
          wrapper.remove();
        });

        wrapper.appendChild(img);
        wrapper.appendChild(deleteBtn);
        previewContainer.appendChild(wrapper);

        // Asynchronously load image
        var reader = new FileReader();
        reader.onload = function(e) {
          img.src = e.target.result;
          img.onload = function() {
            img.classList.remove('opacity-0');
            placeholder.remove();
          };
        };
        reader.readAsDataURL(file);
      });

      updateFileInput();
    });
  }
});
