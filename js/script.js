// =========================
// DOM READY
// =========================
document.addEventListener('DOMContentLoaded', function() {

  // =========================
  // HEADER SCROLL EFFECT
  // =========================
  const header = document.getElementById('header');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // =========================
  // MOBILE MENU
  // =========================
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // =========================
  // DARK MODE
  // =========================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      this.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      this.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });

  // =========================
  // PORTFOLIO FILTERS
  // =========================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // =========================
  // BACK TO TOP
  // =========================
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================
  // REVEAL ON SCROLL
  // =========================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================
  // FLOATING CTA BAR - CLOSABLE (stays closed after close)
  // Show after scrolling 30% of hero
  // =========================
  const ctaBar = document.getElementById('ctaFloatBar');
  const ctaClose = document.getElementById('ctaClose');

  // Check if user closed it before (session only)
  const ctaClosed = sessionStorage.getItem('ctaBarClosed') === 'true';

  // If not closed, show it after scrolling
  if (!ctaClosed) {
    let ctaShown = false;
    window.addEventListener('scroll', function() {
      const heroHeight = document.querySelector('.hero').offsetHeight;
      const scrollPosition = window.pageYOffset;
      
      // Changed from 0.7 (70%) to 0.3 (30%)
      if (scrollPosition > heroHeight * 0.3 && !ctaShown) {
        ctaBar.classList.add('visible');
        ctaShown = true;
      }
    });
  }

  // Close CTA bar and remember for this session
  ctaClose.addEventListener('click', function() {
    ctaBar.classList.remove('visible');
    sessionStorage.setItem('ctaBarClosed', 'true');
  });

  // =========================
  // TOAST NOTIFICATION - CLOSABLE & STAYS
  // =========================
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  const toastMessage = toast.querySelector('.toast-message');

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
  }

  // Close toast manually
  toastClose.addEventListener('click', function() {
    toast.classList.remove('show');
  });

  // Show welcome toast after page loads
  setTimeout(() => {
    showToast('👋 Welcome to Balagi Printing & Design!');
  }, 1500);

});