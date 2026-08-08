/**
 * SICHER TEAM - Master Plan UI/UX Modernization
 * Section 1 & 2 + Tailwind v4 + WCAG 2.2 AA
 */

var mobileMenu = document.getElementById('mobile-menu');
var faqButtons = document.querySelectorAll('[data-faq-toggle]');

function setBodyOverflow(hidden) {
  document.body.style.overflow = hidden ? 'hidden' : '';
}

// Global Mobile Menu Toggle
window.mobileMenuToggle = function mobileMenuToggle() {
  if (!mobileMenu) return;
  
  var openBtn = document.getElementById('mobile-menu-open');
  var closeBtn = document.getElementById('mobile-menu-close');
  
  mobileMenu.classList.toggle('hidden');
  var isHidden = mobileMenu.classList.contains('hidden');
  
  if (openBtn) {
    openBtn.setAttribute('aria-expanded', String(!isHidden));
  }
  
  setBodyOverflow(!isHidden);

  // WCAG Focus Management
  if (!isHidden && closeBtn) {
    setTimeout(function() { closeBtn.focus(); }, 50);
  } else if (isHidden && openBtn) {
    openBtn.focus();
  }
};

// Global SubMenu Toggle (Services/Districts)
window.toggleSubMenu = function toggleSubMenu(btn, targetId) {
  if (arguments.length === 1 || typeof btn === 'string') {
    targetId = btn;
    btn = null;
  }
  var target = document.getElementById(targetId);
  if (!target) return;
  
  var isHidden = target.classList.toggle('hidden');
  
  if (btn) {
    btn.setAttribute('aria-expanded', !isHidden);
    var icon = btn.querySelector('.material-symbols-outlined');
    if (icon) {
      if (!isHidden) {
        icon.classList.add('rotate-180');
      } else {
        icon.classList.remove('rotate-180');
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function domReady() {
  mobileMenu = document.getElementById('mobile-menu');
  faqButtons = document.querySelectorAll('[data-faq-toggle]');

  // File Upload Logic
  var selectedFiles = [];
  var photosInput = document.getElementById('form-photos');
  var previewContainer = document.getElementById('file-preview-container');

  // Escape key handling for Accessibility
  document.addEventListener('keydown', function handleEscapeKey(e) {
    if (e.key === 'Escape') {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenuToggle();
      } else {
        var activeEl = document.activeElement;
        if (activeEl && activeEl.closest('[data-mega-panel], .group')) {
          activeEl.blur();
        }
      }
    }
  });

  // Dynamic Year Footer
  var yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  // FAQ Accordion Logic
  Array.prototype.forEach.call(faqButtons, function register(btn) {
    btn.addEventListener('click', function handleFaqToggle() {
      var answerId = btn.getAttribute('data-faq-toggle');
      var answer = document.getElementById(answerId);
      if (!answer) return;
      
      var isHidden = answer.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !isHidden);
      
      var icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.style.transform = !isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  // Form Photo Preview Modernization
  if (photosInput && previewContainer) {
    var updateInputAndRender = function() {
      var dt = new DataTransfer();
      selectedFiles.forEach(function(f) { dt.items.add(f); });
      photosInput.files = dt.files;
      if (selectedFiles.length === 0) photosInput.value = '';
      renderPreviews();
    };

    function renderPreviews() {
      previewContainer.innerHTML = '';
      var countIndicator = document.getElementById('file-count-indicator');
      
      if (selectedFiles.length > 0) {
        if (!countIndicator) {
          countIndicator = document.createElement('p');
          countIndicator.id = 'file-count-indicator';
          countIndicator.className = 'mt-3 text-[11px] font-black text-primary uppercase tracking-widest animate-fadeUp';
          previewContainer.parentNode.insertBefore(countIndicator, previewContainer.nextSibling);
        }
        countIndicator.textContent = selectedFiles.length + ' Foto(s) bereit zum Senden';
      } else if (countIndicator) {
        countIndicator.remove();
      }

      selectedFiles.forEach(function(file, index) {
        var wrapper = document.createElement('div');
        // Modern Dark UI Card Style for Previews
        wrapper.className = 'relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-surface shadow-soft transition-all duration-300 hover:border-primary/40 group';

        var img = document.createElement('img');
        img.className = 'h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity';
        img.alt = file.name;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-danger text-white shadow-lg hover:scale-110 transition-all z-10';
        btn.setAttribute('aria-label', 'Foto entfernen');
        btn.innerHTML = '<span class="material-symbols-outlined !text-[14px] !font-black">close</span>';
        btn.addEventListener('click', function() {
          selectedFiles.splice(index, 1);
          updateInputAndRender();
        });

        wrapper.appendChild(img);
        wrapper.appendChild(btn);
        previewContainer.appendChild(wrapper);

        var r = new FileReader();
        r.onload = function(e) { img.src = e.target.result; };
        r.readAsDataURL(file);
      });
    }

    photosInput.addEventListener('change', function() {
      if (photosInput.files) {
        Array.prototype.forEach.call(photosInput.files, function(file) {
          if (file.type.startsWith('image/')) selectedFiles.push(file);
        });
        updateInputAndRender();
      }
    });
  }

  // Form Validation - Master Plan & WCAG 2.2 AA Standards
  var formInputs = {
    name: document.getElementById('form-name'),
    postcode: document.getElementById('form-postcode'),
    phone: document.getElementById('form-phone'),
    email: document.getElementById('form-email')
  };

  function setFieldError(input, errorMsg) {
    if (!input) return;
    var errorId = input.id + '-error';
    var errorEl = document.getElementById(errorId);

    if (errorMsg) {
      // Modern UI Hata Durumu (Section 1: Red -> Danger)
      input.classList.remove('border-border', 'focus:border-primary');
      input.classList.add('border-danger', 'focus:border-danger', 'ring-danger/20');
      
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'mt-2 text-[11px] text-danger font-black uppercase tracking-widest flex items-center gap-1.5 animate-fadeUp';
        input.parentNode.appendChild(errorEl);
      }
      
      errorEl.innerHTML = '<span class="material-symbols-outlined !text-[16px]">report</span> ';
      var textSpan = document.createElement('span');
      textSpan.textContent = errorMsg;
      errorEl.appendChild(textSpan);
      
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
    } else {
      // Başarılı Durum (Section 1: Border Default)
      input.classList.add('border-border');
      input.classList.remove('border-danger', 'focus:border-danger', 'ring-danger/20');
      if (errorEl) errorEl.remove();
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  function updatePostcodeFeedback() {
    if (!formInputs.postcode) return;
    var val = formInputs.postcode.value;
    var regionId = 'form-postcode-region';
    var regionEl = document.getElementById(regionId);

    if (/^[0-9]{4}$/.test(val)) {
      var firstChar = val.charAt(0);
      var regions = { '1': 'Wien', '2': 'NÖ', '3': 'NÖ', '4': 'OÖ', '5': 'Salzburg', '6': 'Tirol/VBG', '7': 'Burgenland', '8': 'Steiermark', '9': 'Kärnten' };
      var region = regions[firstChar];

      if (region) {
        if (!regionEl) {
          regionEl = document.createElement('p');
          regionEl.id = regionId;
          regionEl.className = 'mt-2 text-[11px] text-success font-black uppercase tracking-widest flex items-center gap-1.5 animate-fadeUp';
          formInputs.postcode.parentNode.appendChild(regionEl);
        }
        regionEl.innerHTML = '<span class="material-symbols-outlined !text-[16px]">check_circle</span> <span>Region: ' + region + ' (Service verfügbar)</span>';
      }
    } else if (regionEl) {
      regionEl.remove();
    }
  }

  // Live Input Observers
  if (formInputs.name) {
    formInputs.name.addEventListener('blur', function() {
      if (!this.value.trim()) setFieldError(this, 'Name ist erforderlich.');
      else setFieldError(this, null);
    });
  }

  if (formInputs.postcode) {
    formInputs.postcode.addEventListener('input', updatePostcodeFeedback);
    formInputs.postcode.addEventListener('blur', function() {
      if (!/^[0-9]{4}$/.test(this.value)) setFieldError(this, 'Ungültige PLZ (z.B. 1010).');
      else setFieldError(this, null);
    });
  }

  // Form Submission Logic (Cloudflare Worker Entegre)
  const WORKER_URL = 'https://form-handler.yasin2celik-62a.workers.dev';
  var quoteForm = document.getElementById('contactForm');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', async function handleFormSubmit(e) {
      e.preventDefault();

      var submitBtn = quoteForm.querySelector('button[type="submit"]');
      var responseDiv = document.getElementById('formResponse');
      
      // Basic Final Validation
      if (!formInputs.name.value.trim() || !/^[0-9]{4}$/.test(formInputs.postcode.value)) {
        formInputs.name.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> <span>Wird gesendet...</span>';
      }

      const formData = new FormData(quoteForm);
      formData.append('source_page', window.location.href);

      try {
        const res = await fetch(WORKER_URL, { method: 'POST', body: formData });
        const data = await res.json();

        if (res.ok && data.success) {
          quoteForm.classList.add('opacity-0');
          setTimeout(() => {
            quoteForm.innerHTML = `
              <div class="text-center py-10 animate-fadeUp">
                <span class="material-symbols-outlined !text-6xl text-success mb-6">task_alt</span>
                <h3 class="text-2xl font-black text-white mb-2">Anfrage erfolgreich!</h3>
                <p class="text-text-soft">Vielen Dank. Wir melden uns innerhalb von 24h bei Ihnen.</p>
              </div>`;
            quoteForm.classList.remove('opacity-0');
          }, 300);
        } else {
          throw new Error(data.message || 'Serverfehler');
        }
      } catch (err) {
        if (responseDiv) {
          responseDiv.className = 'mt-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-black uppercase tracking-widest text-center';
          responseDiv.textContent = 'Fehler beim Senden. Bitte versuchen Sie es erneut.';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Jetzt Fixpreis anfragen';
        }
      }
    });
  }
});
