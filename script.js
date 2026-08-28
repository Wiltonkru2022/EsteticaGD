const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.compare-card').forEach((card) => {
  const range = card.querySelector('.compare-range');
  if (!range) return;
  const update = () => card.style.setProperty('--position', `${range.value}%`);
  range.addEventListener('input', update);
  update();
});

// Ajuste visual da identidade GD: mantém o monograma nítido, sem recorte circular.
const logoStyle = document.createElement('style');
logoStyle.textContent = `
  .brand img{width:48px!important;height:48px!important;object-fit:contain!important;border-radius:12px!important;background:#ded5ca!important;box-shadow:0 5px 16px rgba(49,42,36,.10)!important}
  .brand span{font-size:22px!important;letter-spacing:.015em!important}
  .hero-logo-badge{width:126px!important;height:126px!important;border-radius:26px!important;padding:7px!important;background:rgba(250,247,243,.96)!important}
  .hero-logo-badge img{width:100%!important;height:100%!important;object-fit:contain!important;border-radius:20px!important}
  .contact-card>img{width:145px!important;height:145px!important;object-fit:contain!important;border-radius:24px!important;background:#ded5ca!important}
  .footer-brand img{width:54px!important;height:54px!important;object-fit:contain!important;border-radius:14px!important;background:#ded5ca!important}
  @media(max-width:640px){.brand img{width:42px!important;height:42px!important}.hero-logo-badge{width:96px!important;height:96px!important;border-radius:22px!important}}
`;
document.head.appendChild(logoStyle);
