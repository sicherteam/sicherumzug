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
        btn.innerHTML = '<span class="material-symbols-outlined !text-[14px] !leading-none !font-bold">close</span>';
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

  // Live character counter for Kurzbeschreibung
  var messageInp = document.getElementById('form-message');
  var messageCounter = document.getElementById('form-message-counter');
  if (messageInp && messageCounter) {
    messageInp.addEventListener('input', function() {
      var len = messageInp.value.length;
      messageCounter.textContent = len + ' / 1000 Zeichen';
      if (len >= 900) {
        messageCounter.classList.remove('text-text-light/60');
        messageCounter.classList.add('text-red-500', 'font-semibold');
      } else {
        messageCounter.classList.add('text-text-light/60');
        messageCounter.classList.remove('text-red-500', 'font-semibold');
      }
    });
  }

  function setFieldError(input, errorMsg) {
    if (!input) return;
    var errorId = input.id + '-error';
    var errorEl = document.getElementById(errorId);
    if (errorMsg) {
      input.classList.remove('border-gray-200', 'focus:border-primary-light', 'focus:ring-primary-light/30');
      input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/30');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'mt-1.5 text-xs text-red-600 font-bold flex items-center gap-1 transition-all duration-200';
        input.parentNode.appendChild(errorEl);
      }
      errorEl.innerHTML = '<span class="material-symbols-outlined !text-[14px] !leading-none !font-bold">warning</span><span>' + errorMsg + '</span>';
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
        }
      } else {
        setFieldError(postcodeInp, null);
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

  // Double-submit prevention and direct loading feedback on the quote form
  var quoteForm = document.querySelector('form[action*="formspree.io"]');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function handleFormSubmit(e) {
      var isNameValid = validateName();
      var isPostcodeValid = validatePostcode();
      var isPhoneValid = validatePhone();
      var isEmailValid = validateEmail();

      if (!isNameValid || !isPostcodeValid || !isPhoneValid || !isEmailValid) {
        e.preventDefault();
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
      if (!submitBtn) return;

      // Inject CSS-animated loading spinner SVG alongside 'Wird gesendet...' text
      submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Wird gesendet...</span>';

      // Apply disabled styles to make button visually disabled and prevent double submission
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      submitBtn.classList.remove('hover:bg-primary-accent', 'hover:-translate-y-0.5', 'hover:shadow-xl', 'cursor-pointer');

      // Asynchronously disable the button to allow native form action to submit the request
      setTimeout(function() {
        submitBtn.disabled = true;
      }, 0);
    });
  }
});
