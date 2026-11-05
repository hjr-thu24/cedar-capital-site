const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const year = document.querySelector("#year");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

year.textContent = new Date().getFullYear();
updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

const inquiryForm = document.querySelector('#inquiry-form');
const serviceSelect = document.querySelector('#inquiry-service');
const formStatus = document.querySelector('#form-status');
const submitButton = inquiryForm.querySelector('button[type="submit"]');
const recipient = 'daphne.zeng@ourcedar.com';

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => { serviceSelect.value = link.dataset.service; });
});

// Until a delivery endpoint is configured, make the email handoff explicit.
// Never report a successful delivery for a mailto handoff or failed request.
if (inquiryForm.dataset.endpoint) {
  submitButton.textContent = 'Send inquiry';
  document.querySelector('#delivery-note').textContent = 'This form uses FormSubmit to forward your inquiry to our email. Please share only non-confidential information.';
}

inquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const data = new FormData(inquiryForm);
  if (data.get('_honey')) return;
  const subject = `Cedar Capital inquiry: ${data.get('service')}`;
  const body = [
    `Name: ${data.get('name')}`, `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`, `Company: ${data.get('company') || 'Not provided'}`,
    `Service: ${data.get('service')}`, `Location / jurisdiction: ${data.get('location') || 'Not provided'}`,
    '', String(data.get('message')), '', 'Contact notice acknowledged: Yes'
  ].join('\n');
  if (!inquiryForm.dataset.endpoint) {
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = 'Continue in your email app and press Send. This page cannot confirm delivery. If no email app opens, contact us directly using the email address beside this form.';
    return;
  }
  submitButton.disabled = true;
  formStatus.textContent = 'Sending your inquiry…';
  try {
    const response = await fetch(inquiryForm.dataset.endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(data.entries()))
    });
    if (!response.ok) throw new Error('Delivery failed');
    const result = await response.json();
    if (result.success !== true && result.success !== 'true') throw new Error('Delivery not confirmed');
    formStatus.textContent = 'Thank you. Your inquiry has been submitted. If your matter is urgent or you do not hear back, please call or email us directly. Representation requires a written engagement agreement.';
    inquiryForm.reset();
  } catch {
    formStatus.textContent = 'Your inquiry could not be submitted. Please try again or email us directly. Your entries have been kept.';
  } finally { submitButton.disabled = false; }
});
