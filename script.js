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
const recipient = 'daphne.zeng@ourcedar.com';

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => { serviceSelect.value = link.dataset.service; });
});

// Use the provider's regular POST flow so activation, CAPTCHA, and delivery
// errors are shown by the provider rather than hidden behind an AJAX error.
inquiryForm.addEventListener('submit', (event) => {
  if (new FormData(inquiryForm).get('_honey')) {
    event.preventDefault();
    return;
  }
  formStatus.textContent = 'Opening the submission service. Complete any verification shown there. Your inquiry is not confirmed as delivered yet.';
});

const emailFallback = document.querySelector('#email-fallback');
emailFallback.addEventListener('click', () => {
  const data = new FormData(inquiryForm);
  const subject = `Cedar Capital inquiry: ${data.get('service') || 'Consultation'}`;
  const body = [
    `Name: ${data.get('name') || ''}`, `Email: ${data.get('email') || ''}`,
    `Phone: ${data.get('phone') || ''}`, `Company: ${data.get('company') || ''}`,
    `Service: ${data.get('service') || ''}`, `Location / jurisdiction: ${data.get('location') || ''}`,
    '', String(data.get('message') || '')
  ].join('\n');
  emailFallback.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
