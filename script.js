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

// Identidade GD: logo nítida, com contraste e sem recorte circular.
const logoStyle = document.createElement('style');
logoStyle.textContent = `
  .brand{gap:14px!important}
  .brand img{
    width:62px!important;height:62px!important;object-fit:contain!important;
    border-radius:14px!important;background:#d8cec2!important;
    border:1px solid #b8aa9b!important;padding:0!important;
    box-shadow:0 7px 20px rgba(49,42,36,.16)!important;
  }
  .brand span{font-size:23px!important;font-weight:600!important;color:#2a2724!important;letter-spacing:.015em!important}
  .header-inner{height:86px!important}

  .hero-logo-badge{
    width:136px!important;height:136px!important;border-radius:28px!important;
    padding:8px!important;background:#302d2a!important;
    border:1px solid rgba(255,255,255,.34)!important;
  }
  .hero-logo-badge img{
    width:100%!important;height:100%!important;object-fit:contain!important;
    border-radius:20px!important;background:#d8cec2!important;
  }

  .contact-card>img{
    width:165px!important;height:165px!important;object-fit:contain!important;
    border-radius:24px!important;background:#d8cec2!important;
    border:1px solid #b8aa9b!important;
  }
  .footer-brand img{
    width:62px!important;height:62px!important;object-fit:contain!important;
    border-radius:14px!important;background:#d8cec2!important;
    border:1px solid rgba(255,255,255,.30)!important;
  }

  .gd-logo-fallback{
    display:grid;place-items:center;width:62px;height:62px;border-radius:14px;
    background:#d8cec2;border:1px solid #b8aa9b;color:#fff;
    font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;
    box-shadow:0 7px 20px rgba(49,42,36,.16);
  }
  @media(max-width:640px){
    .brand img,.gd-logo-fallback{width:52px!important;height:52px!important}
    .brand span{font-size:20px!important}
    .header-inner{height:76px!important}
    .hero-logo-badge{width:106px!important;height:106px!important;border-radius:22px!important}
  }
`;
document.head.appendChild(logoStyle);

// Se algum arquivo de logo falhar, nunca deixa um espaço vazio.
document.querySelectorAll('img[src*="logo-gd"]').forEach((img) => {
  img.addEventListener('error', () => {
    const fallback = document.createElement('span');
    fallback.className = 'gd-logo-fallback';
    fallback.textContent = 'GD';
    fallback.setAttribute('aria-label', 'Estética GD');
    img.replaceWith(fallback);
  }, { once: true });
});
