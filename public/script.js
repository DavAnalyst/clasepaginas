// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Counter animation
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Trigger counters when stats section enters viewport
const statsSection = document.querySelector('.stats');
let countersStarted = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, { threshold: 0.4 });

if (statsSection) observer.observe(statsSection);

// Animate elements on scroll
const animatedEls = document.querySelectorAll(
  '.service-card, .testimonial-card, .gallery-item, .stat-item'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// Set minimum date for booking form to today
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
  const today = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', today);
}

// Booking form submit
const form = document.getElementById('booking-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();

  const inputs = form.querySelectorAll('[required]');
  let valid = true;

  inputs.forEach(input => {
    input.style.borderColor = '';
    if (!input.value.trim()) {
      input.style.borderColor = '#e53935';
      valid = false;
    }
  });

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Confirmar reserva';
    btn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 4000);
  }, 1000);
});
