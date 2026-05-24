/* ============================================================
   SHARED APP.JS — theme, navbar, active link, SOS button
   ============================================================ */

// --- THEME ---
(function () {
  const stored = localStorage.getItem('echoaid-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // --- THEME TOGGLE ---
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('echoaid-theme', isDark ? 'dark' : 'light');
    });
  }

  // --- NAVBAR SCROLL ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- MOBILE MENU ---
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeMenu');
  const overlay = document.getElementById('mobileOverlay');
  const drawer = document.getElementById('mobileDrawer');

  function openDrawer() {
    overlay.classList.add('show');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    overlay.classList.remove('show');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close drawer on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // --- ACTIVE NAV LINK ---
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  function markActive(selector) {
    document.querySelectorAll(selector).forEach((link) => {
      const href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === path || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active');
      }
    });
  }

  markActive('.nav-link');
  markActive('.drawer-link');

});
