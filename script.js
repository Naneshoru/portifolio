import { typeWrite } from "./typeWrite.js";

const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");

const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Evitar tela scrolar quando menu está aberto
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    setTimeout(() => {
      btnToggleNav.textContent = "fechar";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Animação ao scrollar

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.2 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle tema, salva o tema no localStorage

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Prender tab quando menu está aberto

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// next: Animação de rotação de logo

const xp1 = document.body.querySelector("#xp1");
const xp2 = document.body.querySelector("#xp2");
const g1 = document.body.querySelector("#g1");
const g2 = document.body.querySelector("#g2");

xp1.addEventListener("click", () => {
  g1.classList.add("active");
  g2.classList.remove("active");
  xp1.classList.add("active");
  xp2.classList.remove("active");
  applyAnimation(g2);
});

xp2.addEventListener("click", () => {
  g2.classList.add("active");
  g1.classList.remove("active");
  xp2.classList.add("active");
  xp1.classList.remove("active");
  applyAnimation(g1);
});

typeWrite(document.querySelector(".typewriter"));

// Redirecionar para mensagem no whats

const btns = document.querySelectorAll('.msg')

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    window.open('https://api.whatsapp.com/send?phone=5516994643295&text=Olá, Ricardo.', '_blank');
    console.log('clicou')
  });
});

// ajustar altura do logos container dinamicamente

const logosContainer = document.querySelector('.logos');
const logoGroups = document.querySelectorAll('.logo-group');

function updateLogosHeight() {
  const activeLogoGroup = document.querySelector('.logo-group.active');
  if (logosContainer && activeLogoGroup) {
    logosContainer.style.height = `${activeLogoGroup.offsetHeight}px`;
  }
}

const xpButtons = document.querySelectorAll('.xp-btns .h4');
xpButtons.forEach(button => {
  button.addEventListener('click', function() {
  
    logoGroups.forEach(group => group.classList.remove('active'));
    
    const targetId = this.id.replace('xp', 'g');
    document.getElementById(targetId).classList.add('active');
    
    updateLogosHeight();
  });
});

window.addEventListener('resize', updateLogosHeight);

const scrollToTopBtn = document.querySelector('.scroll-to-top');

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('active')
  } else {
    scrollToTopBtn.classList.remove('active')
  }
})