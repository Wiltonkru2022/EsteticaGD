const menuButton=document.querySelector('.menu-btn');const nav=document.querySelector('.header nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.textContent=open?'✕':'☰'})}

document.querySelectorAll('.compare-card').forEach((card)=>{const range=card.querySelector('.compare-range');if(!range)return;const update=()=>card.style.setProperty('--position',`${range.value}%`);range.addEventListener('input',update);update()});

// A logo é exatamente o JPG original enviado: os três arquivos abaixo guardam os bytes originais em Base64, sem recompressão.
if(window.GD_LOGO_B64){const originalLogo=`data:image/jpeg;base64,${window.GD_LOGO_B64}`;document.querySelectorAll('.gd-logo').forEach((img)=>{img.src=originalLogo;img.removeAttribute('srcset')})}
