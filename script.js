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

// Usa a imagem original enviada, preservada em Base64 sem recompressao.
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function applyOriginalLogo() {
  try {
    window.GD_LOGO_B64 = '';
    await loadScript('assets/logo-part-01.js?v=4');
    await loadScript('assets/logo-part-02.js?v=4');
    await loadScript('assets/logo-part-03.js?v=4');

    if (!window.GD_LOGO_B64) return;
    const originalLogo = `data:image/jpeg;base64,${window.GD_LOGO_B64}`;
    document.querySelectorAll('img[src*="logo-gd"]').forEach((img) => {
      img.src = originalLogo;
      img.removeAttribute('srcset');
    });
  } catch (error) {
    console.error('Nao foi possivel carregar a logo original da Estetica GD.', error);
  }
}

const logoStyle = document.createElement('style');
logoStyle.textContent = `
  .brand{gap:14px!important}
  .brand img{width:64px!important;height:64px!important;object-fit:contain!important;border-radius:12px!important;background:#ded5ca!important;border:0!important;padding:0!important;box-shadow:none!important}
  .brand span{font-size:22px!important;color:#2a2724!important}
  .header-inner{height:86px!important}
  .hero-logo-badge{width:150px!important;height:150px!important;border-radius:22px!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:hidden!important}
  .hero-logo-badge img{width:100%!important;height:100%!important;object-fit:contain!important;border-radius:22px!important;background:#ded5ca!important}
  .contact-card>img{width:190px!important;height:190px!important;object-fit:contain!important;border-radius:22px!important;background:#ded5ca!important;border:0!important}
  .footer-brand img{width:64px!important;height:64px!important;object-fit:contain!important;border-radius:12px!important;background:#ded5ca!important;border:0!important}
  @media(max-width:640px){
    .brand img{width:52px!important;height:52px!important}
    .brand span{font-size:20px!important}
    .header-inner{height:76px!important}
    .hero-logo-badge{width:112px!important;height:112px!important;left:8px!important;top:26px!important}
  }
`;
document.head.appendChild(logoStyle);

applyOriginalLogo();
