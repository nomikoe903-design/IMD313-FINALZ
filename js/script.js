
// Light / Dark Mode: remembers the visitor's choice across all pages.
const themeButton = document.querySelector('.theme-toggle');
if (themeButton) {
  const setTheme = (theme) => {
    const isLight = theme === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
    themeButton.setAttribute('aria-pressed', String(isLight));
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeButton.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
    themeButton.querySelector('.theme-icon').textContent = isLight ? '☾' : '☀';
    themeButton.querySelector('.theme-label').textContent = isLight ? 'Dark mode' : 'Light mode';
  };

  setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try { localStorage.setItem('adam-najmi-theme', nextTheme); } catch (error) { /* Browsing with storage disabled. */ }
  });
}

// Original JavaScript for Adam Najmi's IMD318 website.
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);
  });
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
// Live date/time in Sarawak, Malaysia (MYT / UTC+8).
// Uses a fixed time zone so it is correct even if the website is opened overseas.
const clocks = document.querySelectorAll('[data-clock]');
const dateDisplays = document.querySelectorAll('[data-local-date]');
if (clocks.length || dateDisplays.length) {
  const timeFormat = new Intl.DateTimeFormat('en-MY', {
    timeZone: 'Asia/Kuching', hour: '2-digit', minute: '2-digit',
    second: '2-digit', hour12: true
  });
  const dateFormat = new Intl.DateTimeFormat('en-MY', {
    timeZone: 'Asia/Kuching', weekday: 'short', day: 'numeric',
    month: 'short', year: 'numeric'
  });
  const updateLocalTime = () => {
    const now = new Date();
    const currentTime = timeFormat.format(now);
    const currentDate = dateFormat.format(now);
    clocks.forEach(element => { element.textContent = currentTime; });
    dateDisplays.forEach(element => { element.textContent = currentDate; });
  };
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
}

// Accessible interactive photo gallery: filter, enlarge, and close.
const galleryFilters = document.querySelectorAll('[data-gallery-filter]');
const galleryCards = document.querySelectorAll('[data-gallery-category]');
for (const filterButton of galleryFilters) {
  filterButton.addEventListener('click', () => {
    const category = filterButton.dataset.galleryFilter;
    galleryFilters.forEach(button => {
      const selected = button === filterButton;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    galleryCards.forEach(card => { card.hidden = category !== 'all' && card.dataset.galleryCategory !== category; });
  });
}
const photoDialog = document.querySelector('#photo-dialog');
if (photoDialog && typeof photoDialog.showModal === 'function') {
  const dialogImg = photoDialog.querySelector('#dialog-img');
  const dialogCaption = photoDialog.querySelector('#dialog-caption');
  document.querySelectorAll('.photo-open').forEach(button => {
    button.addEventListener('click', () => {
      dialogImg.src = button.dataset.photoSrc;
      dialogImg.alt = button.dataset.photoAlt;
      dialogCaption.textContent = button.dataset.photoCaption;
      photoDialog.showModal();
    });
  });
  photoDialog.querySelector('.dialog-close').addEventListener('click', () => photoDialog.close());
  photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
}
