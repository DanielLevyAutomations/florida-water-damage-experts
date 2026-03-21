// Supabase lead capture for floridawaterdamageexperts.com
(function() {
  var SUPABASE_URL = 'https://zqezhsnzleuxgwsdpcfv.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxZXpoc256bGV1eGd3c2RwY2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjkwOTAsImV4cCI6MjA4OTcwNTA5MH0.NXBpSU8Mx2e3kW6DPvQuBIl-GQoqvyEuiy4ciFqVp4w';

  document.addEventListener('DOMContentLoaded', function() {
    var forms = document.querySelectorAll('form[data-lead-form]');
    forms.forEach(function(form) {
      form.addEventListener('submit', handleSubmit);
    });
  });

  function handleSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;

    // Disable button during submission
    btn.disabled = true;
    btn.textContent = 'Sending...';

    var data = {
      name: form.querySelector('[name="name"]')?.value?.trim() || '',
      phone: form.querySelector('[name="phone"]')?.value?.trim() || '',
      email: form.querySelector('[name="email"]')?.value?.trim() || null,
      zip: form.querySelector('[name="zip"]')?.value?.trim() || null,
      emergency_type: form.querySelector('[name="emergency_type"]')?.value || null,
      urgency: form.querySelector('[name="urgency"]')?.value || null,
      description: form.querySelector('[name="description"]')?.value?.trim() || null,
      source_page: form.getAttribute('data-source') || window.location.pathname
    };

    fetch(SUPABASE_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Submission failed');
      showMessage(form, 'success', "Thank you! We'll contact you shortly. For immediate help, call (954) 701-4702.");
      form.reset();
    })
    .catch(function() {
      showMessage(form, 'error', 'Something went wrong. Please call us directly at (954) 701-4702.');
    })
    .finally(function() {
      btn.disabled = false;
      btn.textContent = originalText;
    });
  }

  function showMessage(form, type, text) {
    // Remove any existing message
    var existing = form.parentElement.querySelector('.form-message');
    if (existing) existing.remove();

    var msg = document.createElement('div');
    msg.className = 'form-message';
    msg.style.cssText = 'padding:16px;border-radius:8px;margin-top:16px;font-weight:600;font-size:.95rem;text-align:center;';
    if (type === 'success') {
      msg.style.background = '#d4edda';
      msg.style.color = '#155724';
      msg.style.border = '1px solid #c3e6cb';
    } else {
      msg.style.background = '#f8d7da';
      msg.style.color = '#721c24';
      msg.style.border = '1px solid #f5c6cb';
    }
    msg.textContent = text;
    form.parentElement.appendChild(msg);

    // Auto-remove after 8 seconds
    setTimeout(function() { msg.remove(); }, 8000);
  }
})();
