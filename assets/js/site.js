---
layout: null
---
var mobileMenu = document.getElementById('mobile-menu');
var faqButtons = document.querySelectorAll('[data-faq-toggle]');

function setBodyOverflow(hidden) {
  document.body.style.overflow = hidden ? 'hidden' : '';
}

window.mobileMenuToggle = function mobileMenuToggle() {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('hidden');
  var isHidden = mobileMenu.classList.contains('hidden');
  var openBtn = document.getElementById('mobile-menu-open');
  if(openBtn) openBtn.setAttribute('aria-expanded', !isHidden);
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
    var icon = btn.querySelector('svg');
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

  // Close mobile menu or desktop megamenus on Escape key press
  document.addEventListener('keydown', function handleEscapeKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
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

  // Dynamic aria-expanded synchronization for desktop mega menus
  var desktopMenuGroups = document.querySelectorAll('header nav .group');
  Array.prototype.forEach.call(desktopMenuGroups, function(group) {
    var btn = group.querySelector('button[aria-expanded]');
    if (!btn) return;

    function updateExpanded() {
      var isHovered = group.matches(':hover');
      var isFocusedWithin = group.contains(document.activeElement);
      btn.setAttribute('aria-expanded', (isHovered || isFocusedWithin) ? 'true' : 'false');
    }

    group.addEventListener('mouseenter', updateExpanded);
    group.addEventListener('mouseleave', updateExpanded);
    group.addEventListener('focusin', updateExpanded);
    group.addEventListener('focusout', function() {
      setTimeout(updateExpanded, 10);
    });
  });

  var yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  // Scroll to top button handler
  var scrollToTopButtons = document.querySelectorAll('[data-scroll-to-top]');
  Array.prototype.forEach.call(scrollToTopButtons, function(btn) {
    btn.addEventListener('click', function handleScrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      var mainEl = document.getElementById('main');
      if (mainEl) {
        mainEl.focus();
      }
    });
  });

  // Copy to clipboard buttons handler
  var copyButtons = document.querySelectorAll('[data-copy-text]');
  Array.prototype.forEach.call(copyButtons, function(btn) {
    btn.addEventListener('click', function handleCopy() {
      var textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;
      var feedbackEl = document.getElementById('footer-copy-feedback');
      navigator.clipboard.writeText(textToCopy).then(function() {
        if (feedbackEl) {
          feedbackEl.textContent = textToCopy + ' in die Zwischenablage kopiert.';
        }
        var origTitle = btn.getAttribute('title');
        btn.setAttribute('title', 'Kopiert!');
        btn.classList.add('text-amber-400');
        setTimeout(function() {
          btn.setAttribute('title', origTitle);
          btn.classList.remove('text-amber-400');
        }, 2000);
      }).catch(function() {});
    });
  });

  Array.prototype.forEach.call(faqButtons, function register(btn) {
    btn.addEventListener('click', function handleFaqToggle() {
      var answerId = btn.getAttribute('data-faq-toggle');
      var answer = document.getElementById(answerId);
      if (!answer) return;
      var isHidden = answer.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !isHidden);
      var icon = btn.querySelector('svg');
      if (icon) {
        if (!isHidden) {
          icon.classList.add('rotate-180');
        } else {
          icon.classList.remove('rotate-180');
        }
      }
    });
  });

  var photosInput = document.getElementById('form-photos');
  var previewContainer = document.getElementById('file-preview-container');
  if (photosInput && previewContainer) {
    var selectedFiles = [];
    function updateInputAndRender() {
      var dt = new DataTransfer();
      selectedFiles.forEach(function(f) { dt.items.add(f); });
      photosInput.files = dt.files;
      if (selectedFiles.length === 0) photosInput.value = '';
      renderPreviews();
    }
    function renderPreviews() {
      previewContainer.innerHTML = '';

      var countIndicator = document.getElementById('file-count-indicator');
      if (selectedFiles.length > 0) {
        if (!countIndicator) {
          countIndicator = document.createElement('p');
          countIndicator.id = 'file-count-indicator';
          countIndicator.className = 'mt-2 text-xs font-bold text-primary transition-all duration-200';
          previewContainer.parentNode.insertBefore(countIndicator, previewContainer.nextSibling);
        }
        countIndicator.textContent = selectedFiles.length === 1
          ? '1 Foto ausgewählt'
          : selectedFiles.length + ' Fotos ausgewählt';
        countIndicator.style.display = 'block';
      } else {
        if (countIndicator) {
          countIndicator.style.display = 'none';
        }
      }

      selectedFiles.forEach(function(file, index) {
        var wrapper = document.createElement('div');
        wrapper.className = 'relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 group';

        var img = document.createElement('img');
        img.className = 'h-full w-full object-cover';
        img.alt = file.name;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 z-10';
        btn.setAttribute('aria-label', 'Foto entfernen');
        btn.innerHTML = `{% include svg/close.svg class="w-4 h-4 shrink-0 !font-bold fill-current" %}`;
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

  // Live validation for form fields
  var nameInp = document.getElementById('form-name');
  var postcodeInp = document.getElementById('form-postcode');
  var phoneInp = document.getElementById('form-phone');
  var emailInp = document.getElementById('form-email');

  function setFieldError(input, errorMsg) {
    if (!input) return;
    var errorId = input.id + '-error';
    var errorEl = document.getElementById(errorId);

    // Clear postcode success region when error is present
    if (input.id === 'form-postcode' && errorMsg) {
      var regionEl = document.getElementById('form-postcode-region');
      if (regionEl) regionEl.remove();
    }

    if (errorMsg) {
      input.classList.remove('border-gray-200', 'focus:border-primary-light', 'focus:ring-primary-light/30');
      input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/30');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'mt-1.5 text-xs text-red-600 font-bold flex items-center gap-1 transition-all duration-200';
        input.parentNode.appendChild(errorEl);
      }
      errorEl.innerHTML = `{% include svg/warning.svg class="w-4 h-4 shrink-0 !font-bold inline fill-current" %}` + `<span>${errorMsg}</span>`;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
    } else {
      input.classList.add('border-gray-200', 'focus:border-primary-light', 'focus:ring-primary-light/30');
      input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/30');
      if (errorEl) {
        errorEl.remove();
      }
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  function updatePostcodeFeedback() {
    if (!postcodeInp) return;
    var val = postcodeInp.value;
    var regionId = 'form-postcode-region';
    var regionEl = document.getElementById(regionId);

    if (/^[0-9]{4}$/.test(val)) {
      var firstChar = val.charAt(0);
      var region = '';
      if (firstChar === '1') region = 'Wien';
      else if (firstChar === '2' || firstChar === '3') region = 'Niederösterreich';
      else if (firstChar === '4') region = 'Oberösterreich';
      else if (firstChar === '5') region = 'Salzburg';
      else if (firstChar === '6') region = 'Tirol / Vorarlberg';
      else if (firstChar === '7') region = 'Burgenland';
      else if (firstChar === '8') region = 'Steiermark';
      else if (firstChar === '9') region = 'Kärnten';

      if (region) {
        if (!regionEl) {
          regionEl = document.createElement('p');
          regionEl.id = regionId;
          regionEl.className = 'mt-1.5 text-xs text-emerald-600 font-bold flex items-center gap-1 transition-all duration-200';
          postcodeInp.parentNode.appendChild(regionEl);
        }
        regionEl.innerHTML = `{% include svg/check_circle.svg class="w-4 h-4 shrink-0 !font-bold inline fill-current" %}` + `<span>Region: ${region} (Service verfügbar)</span>`;
        postcodeInp.setAttribute('aria-describedby', regionId);
      } else {
        if (regionEl) regionEl.remove();
      }
    } else {
      if (regionEl) regionEl.remove();
    }
  }

  function validateName() {
    if (!nameInp) return true;
    var val = nameInp.value.trim();
    if (!val) {
      setFieldError(nameInp, 'Name ist ein Pflichtfeld.');
      return false;
    }
    setFieldError(nameInp, null);
    return true;
  }

  function validatePostcode() {
    if (!postcodeInp) return true;
    var val = postcodeInp.value;
    if (!val) {
      setFieldError(postcodeInp, 'PLZ ist ein Pflichtfeld.');
      return false;
    }
    if (!/^[0-9]{4}$/.test(val)) {
      setFieldError(postcodeInp, 'Geben Sie eine gültige 4-stellige PLZ ein (z.B. 1010).');
      return false;
    }
    setFieldError(postcodeInp, null);
    updatePostcodeFeedback();
    return true;
  }

  function validatePhone() {
    if (!phoneInp) return true;
    var val = phoneInp.value;
    if (!val) {
      setFieldError(phoneInp, 'Telefonnummer ist ein Pflichtfeld.');
      return false;
    }
    if (!/^[0-9\s\+\-\(\)]+$/.test(val)) {
      setFieldError(phoneInp, 'Ungültige Zeichen in der Telefonnummer.');
      return false;
    }
    if (val.replace(/[^0-9]/g, '').length < 5) {
      setFieldError(phoneInp, 'Bitte geben Sie eine gültige Telefonnummer ein (mind. 5 Ziffern).');
      return false;
    }
    setFieldError(phoneInp, null);
    return true;
  }

  function validateEmail() {
    if (!emailInp) return true;
    var val = emailInp.value;
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setFieldError(emailInp, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return false;
    }
    setFieldError(emailInp, null);
    return true;
  }

  if (nameInp) {
    nameInp.addEventListener('input', function() {
      if (nameInp.value.trim()) {
        setFieldError(nameInp, null);
      }
    });
    nameInp.addEventListener('blur', function() {
      validateName();
    });
  }

  if (postcodeInp) {
    postcodeInp.addEventListener('input', function() {
      var val = postcodeInp.value;
      if (val && !/^[0-9]{4}$/.test(val)) {
        if (val.length === 4 || !/^[0-9]*$/.test(val)) {
          setFieldError(postcodeInp, 'PLZ muss aus genau 4 Ziffern bestehen.');
        } else {
          setFieldError(postcodeInp, null);
          var regionEl = document.getElementById('form-postcode-region');
          if (regionEl) regionEl.remove();
        }
      } else if (/^[0-9]{4}$/.test(val)) {
        setFieldError(postcodeInp, null);
        updatePostcodeFeedback();
      } else {
        setFieldError(postcodeInp, null);
        var regionEl = document.getElementById('form-postcode-region');
        if (regionEl) regionEl.remove();
      }
    });
    postcodeInp.addEventListener('blur', function() {
      validatePostcode();
    });
  }

  if (phoneInp) {
    phoneInp.addEventListener('input', function() {
      var val = phoneInp.value;
      if (val && !/^[0-9\s\+\-\(\)]+$/.test(val)) {
        setFieldError(phoneInp, 'Ungültige Zeichen in der Telefonnummer.');
      } else {
        setFieldError(phoneInp, null);
      }
    });
    phoneInp.addEventListener('blur', function() {
      validatePhone();
    });
  }

  if (emailInp) {
    emailInp.addEventListener('input', function() {
      var val = emailInp.value;
      if (val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setFieldError(emailInp, null);
      }
    });
    emailInp.addEventListener('blur', function() {
      validateEmail();
    });
  }

  // Live character counter for Kurzbeschreibung
  var messageInp = document.getElementById('form-message');
  var messageCounter = document.getElementById('form-message-counter');
  if (messageInp && messageCounter) {
    var updateCounter = function() {
      var len = messageInp.value.length;
      messageCounter.textContent = len + ' / 1000';
      if (len >= 900) {
        messageCounter.className = 'text-xs text-primary-accent font-bold';
      } else {
        messageCounter.className = 'text-xs text-text-light';
      }
    };
    messageInp.addEventListener('input', updateCounter);
    updateCounter();
  }

  const WORKER_URL = 'https://form-handler.yasin2celik-62a.workers.dev';
  var quoteForm = document.getElementById('contactForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async function handleFormSubmit(e) {
      e.preventDefault();

      var isNameValid = validateName();
      var isPostcodeValid = validatePostcode();
      var isPhoneValid = validatePhone();
      var isEmailValid = validateEmail();

      if (!isNameValid || !isPostcodeValid || !isPhoneValid || !isEmailValid) {
        var firstInvalid = null;
        if (!isNameValid) firstInvalid = nameInp;
        else if (!isPhoneValid) firstInvalid = phoneInp;
        else if (!isPostcodeValid) firstInvalid = postcodeInp;
        else if (!isEmailValid) firstInvalid = emailInp;

        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      var submitBtn = quoteForm.querySelector('button[type="submit"]');
      const responseDiv = document.getElementById('formResponse');
      if (responseDiv) {
        responseDiv.innerText = 'Wird gesendet...';
        responseDiv.className = 'mt-4 text-center text-sm font-bold text-gray-700';
      }

      if (submitBtn) {
        var originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Wird gesendet...</span>';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        submitBtn.classList.remove('hover:bg-primary-accent', 'hover:-translate-y-0.5', 'hover:shadow-xl', 'cursor-pointer');
        submitBtn.disabled = true;
      }

      const formData = new FormData();
      if (nameInp) formData.append('name', nameInp.value);
      if (emailInp) formData.append('email', emailInp.value);
      if (phoneInp) formData.append('phone', phoneInp.value);
      if (postcodeInp) formData.append('postcode', postcodeInp.value);
      if (messageInp) formData.append('message', messageInp.value);
      formData.append('source_page', window.location.href);
      formData.append('page_title', document.title);

      var subjectInp = quoteForm.querySelector('input[name="subject"]');
      if (subjectInp) formData.append('subject', subjectInp.value);

      const fileInput = document.getElementById('form-photos');
      if (fileInput && fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append('files', fileInput.files[i]);
        }
      }

      try {
        const res = await fetch(WORKER_URL, {
          method: 'POST',
          body: formData
        });

        const data = await res.json();

        if (res.ok && data.success) {

          // Formular ausblenden
          quoteForm.classList.add('hidden');

          if (responseDiv) {
            responseDiv.className = 'mt-8 rounded-3xl bg-green-50 border-2 border-green-200 p-10 text-center shadow-lg animate-fade-in outline-none';
            responseDiv.setAttribute('tabindex', '-1');

            responseDiv.innerHTML = `
              <div class="flex justify-center">
                <div class="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
                  {% include svg/check_circle.svg class="w-12 h-12 shrink-0 text-green-600 fill-current mx-auto" %}
                </div>
              </div>

              <h3 class="mt-6 text-3xl font-extrabold text-gray-900">
                Vielen Dank!
              </h3>

              <p class="mt-4 text-lg font-semibold text-gray-700">
                Ihre Anfrage wurde erfolgreich übermittelt.
              </p>

              <p class="mt-3 text-base text-gray-600 leading-relaxed">
                Wir haben Ihre Nachricht erhalten und melden uns
                schnellstmöglich bei Ihnen.
              </p>

              <div class="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white font-bold shadow-md">
                {% include svg/phone_in_talk.svg class="w-[18px] h-[18px] shrink-0 fill-current" %}
                Wir kontaktieren Sie persönlich
              </div>
            `;
            responseDiv.focus();
          }

          
          if (typeof selectedFiles !== 'undefined') {
            selectedFiles = [];
            updateInputAndRender();
          }
        } else {
          if (responseDiv) {
            responseDiv.innerText = 'Fehler: ' + (data.message || 'Ein Fehler ist aufgetreten.');
            responseDiv.className = 'mt-4 text-center text-sm font-bold text-red-600';
          }
        }
      } catch (err) {
        if (responseDiv) {
          responseDiv.innerText = 'Es ist ein Verbindungsfehler aufgetreten.';
          responseDiv.className = 'mt-4 text-center text-sm font-bold text-red-600';
        }
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnContent;
          submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
          submitBtn.classList.add('hover:bg-primary-accent', 'hover:-translate-y-0.5', 'hover:shadow-xl', 'cursor-pointer');
          submitBtn.disabled = false;
        }
      }
    });
  }
});
