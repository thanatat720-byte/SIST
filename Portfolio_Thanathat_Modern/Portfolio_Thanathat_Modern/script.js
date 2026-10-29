const nav = document.getElementById('nav');
const menuButton = document.getElementById('menuButton');
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('nav a');

function showPage(hash) {
  const id = (hash || '#welcome').slice(1);
  const target = document.getElementById(id) || document.getElementById('welcome');
  pages.forEach(page => page.classList.toggle('active', page === target));
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + target.id));
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  event.preventDefault();
  if (location.hash !== hash) history.pushState(null, '', hash);
  showPage(hash);
}));
window.addEventListener('popstate', () => showPage(location.hash));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
showPage(location.hash || '#welcome');
