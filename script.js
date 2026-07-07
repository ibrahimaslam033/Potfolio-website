/* =========================================================
   THEME TOGGLE
========================================================= */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  iconMoon.style.display = theme === 'light' ? 'block' : 'none';
  iconSun.style.display  = theme === 'light' ? 'none' : 'block';
}
applyTheme(localStorage.getItem('portfolio-theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

/* =========================================================
   NAV SCROLL STATE + MOBILE MENU
========================================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive:true });

const navBurger = document.getElementById('navBurger');
const mobileNav = document.getElementById('mobileNav');
navBurger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* =========================================================
   CUSTOM CURSOR (desktop only)
========================================================= */
const cursorDot = document.getElementById('cursorDot');
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  window.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
  });
}

/* =========================================================
   MAGNETIC BUTTONS
========================================================= */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

/* =========================================================
   SCROLL REVEAL
========================================================= */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* =========================================================
   STAT COUNT-UP
========================================================= */
const statEls = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });
statEls.forEach(el => statObserver.observe(el));

/* =========================================================
   SKILLS (icon-driven)
========================================================= */
const skills = [
  { name:'HTML5',      level:90, icon:'i-html'  },
  { name:'CSS3',        level:88, icon:'i-css'   },
  { name:'JavaScript',  level:85, icon:'i-js'    },
  { name:'Node.js',     level:75, icon:'i-node'  },
  { name:'MySQL',       level:75, icon:'i-mysql' },
  { name:'PHP',         level:65, icon:'i-php'   },
  { name:'Python',      level:60, icon:'i-python'},
{ name:'UI/UX Design', level:90, icon:'i-palette' },
];
const skillsGrid = document.getElementById('skillsGrid');
skills.forEach(s => {
  const card = document.createElement('div');
  card.className = 'skill-card reveal';
  card.innerHTML = `
    <div class="skill-icon"><svg width="22" height="22"><use href="#${s.icon}"/></svg></div>
    <div class="skill-name">${s.name}</div>
    <div class="skill-bar-track"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
    <div class="skill-pct">${s.level}% proficiency</div>`;
  skillsGrid.appendChild(card);
  revealObserver.observe(card);
});

// animate bars once their card is in view
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const bar = entry.target.querySelector('.skill-bar-fill');
      if (bar) bar.style.width = bar.dataset.level + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

/* =========================================================
   WORK / PROJECTS
========================================================= */
const projects = [
  { name:'Hospital Management System', desc:'Patients, appointments and staff records with role-based access control.', tags:['Python','MySQL','JavaScript'], link:'https://github.com/ibrahimaslam033/Hospital-Management-System.git' },
  { name:'Student Management System',  desc:'Enrollment, grades and attendance tracking with a clean admin dashboard.', tags:['PHP','MySQL','HTML/CSS'], link:'https://github.com/ibrahimaslam033/Hospital-Management-System.git' },
  { name:'Portfolio Website',           desc:'This site — animated, icon-driven, and fully responsive from scratch.', tags:['HTML','CSS','JavaScript'], link:'https://github.com/ibrahimaslam033/Potfolio-website.git' },
];
const workList = document.getElementById('workList');
projects.forEach((p, i) => {
  const item = document.createElement('a');
  item.href = p.link;
  item.target = '_blank';
  item.rel = 'noopener';
  item.className = 'work-item reveal';
  item.innerHTML = `
    <span class="work-index">0${i + 1}</span>
    <div>
      <div class="work-name">${p.name}</div>
    </div>
    <div class="work-tags-wrap">
      <p class="work-desc">${p.desc}</p>
      <div class="work-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <span class="work-link"><svg width="16" height="16"><use href="#i-arrow"/></svg></span>`;
  workList.appendChild(item);
  revealObserver.observe(item);
});
const roles=[
"Full Stack Developer",
"Software Engineer",
"Frontend Developer",
"Backend Developer"
];

const typing=document.getElementById("typing");

let role=0;
let char=0;
let deleting=false;

function type(){

let word=roles[role];

if(!deleting){

typing.textContent=word.substring(0,char++);

if(char>word.length){

deleting=true;

setTimeout(type,1200);

return;

}

}else{

typing.textContent=word.substring(0,char--);

if(char<0){

deleting=false;

role=(role+1)%roles.length;

}

}

setTimeout(type,deleting?50:100);

}

type();
/* =========================================================
   CONTACT FORM (EmailJS-ready, mailto fallback)
========================================================= */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const contactSubmit = document.getElementById('contactSubmit');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  const configured = EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID';

  if (!configured){
    const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:ibrahimaslam033@gmail.com?subject=${subject}&body=${body}`;
    formStatus.textContent = 'Opening your email client...';
    return;
  }

  contactSubmit.disabled = true;
  formStatus.textContent = 'Sending...';
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ service_id:EMAILJS_SERVICE_ID, template_id:EMAILJS_TEMPLATE_ID, user_id:EMAILJS_PUBLIC_KEY, template_params:data })
    });
    formStatus.textContent = 'Message sent — thank you!';
    contactForm.reset();
  } catch (err){
    formStatus.textContent = 'Something went wrong — please email me directly.';
  } finally {
    contactSubmit.disabled = false;
  }
});

/* =========================================================
   MISC
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();
