// ==============================
// Portfolio – JS unificado
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  /* === Volver al inicio al pulsar el logo === */
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      // si ya es <a href="#home"> no hace falta prevenir
      const isAnchor = logo.tagName === 'A' && logo.getAttribute('href')?.startsWith('#');
      if (!isAnchor) e.preventDefault();
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    });
    logo.style.cursor = 'pointer';
  }

  /* === SKILLS interactivas + barra con nivel === */
  const skills = document.querySelectorAll('.skill');



  skills.forEach(skill => {
    skill.addEventListener('click', () => {
      if (skill.classList.contains('active')) {
        skill.classList.remove('active');
        skill.querySelector('p')?.remove();
      } else {
        skills.forEach(s => { s.classList.remove('active'); s.querySelector('p')?.remove(); });
        skill.classList.add('active');

        const info = document.createElement('p');
        info.textContent = getSkillDescription(skill.dataset.name);
        info.style.marginTop = '0.6em';
        info.style.fontSize = '1rem';
        info.style.fontWeight = '400';
        info.style.color = 'hsl(0 0% 85%)';
        info.style.opacity = '0';
        info.style.transition = 'opacity .25s ease-in-out';

        skill.appendChild(info);
        requestAnimationFrame(() => { info.style.opacity = '1'; });
      }
    });
  });

  function getSkillDescription(name) {
  const descriptions = {
    html: 'Estructura semántica, formularios accesibles, SEO técnico básico.',
    css: 'Flexbox, Grid, variables CSS, animaciones y responsive.',
    javascript: 'ES6+, fetch, DOM, modales, validación, SPA ligera.',
    react: 'Componentes, props/estado, SPA y JSX (en progreso).',
    github: 'Repos, issues, PRs, GitHub Pages, workflows básicos.'
  };
  return descriptions[name] || 'Próximamente...';
}


  /* === Animaciones al hacer scroll (opcional) === */
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in-element, .slide-in-element').forEach(el => observer.observe(el));

  /* === Contadores "Sobre mí" al entrar en vista === */
  (function () {
    const nums = document.querySelectorAll('#about .metric-number');
    if (!nums.length) return;

    const animate = (el, target) => {
      const dur = 900; // ms
      const start = performance.now();
      const from = 0;
      const to = Number(target) || 0;

      const step = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const val = Math.floor(from + (to - from) * p);
        el.textContent = val;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const onIntersect = (entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          nums.forEach(n => animate(n, n.getAttribute('data-target')));
          obs.disconnect();
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    const about = document.getElementById('about');
    if (about) io.observe(about);
  })();

  /* === PROYECTOS: datos y render dinámico === */
  const projectsData = [
    {
      title: 'Streamio – Clon de Netflix',
      desc: 'App SPA con catálogo, búsqueda TMDB, detalle y login simulado.',
      tech: ['HTML', 'CSS', 'JavaScript', 'TMDB API'],
      logo: '../media/imagenes/logostreamio.png',
      gif: '../media/imagenes/gifStreamio.gif',
      demo: 'https://tu-demo-streamio.com',
      code: 'https://github.com/tuusuario/streamio',
      logoFit: 'contain'
    },
    {
      title: 'El Restaurante',
      desc: 'App El Restaurante con catálogo y sistema de reservas.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      logo: '../media/imagenes/logo1.png',
      gif: '../media/imagenes/gifRestaurante.gif',
      demo: 'https://tu-demo-proyecto2.com',
      code: 'https://github.com/tuusuario/proyecto2',
      logoFit: 'cover'
    },
    {
      title: 'JobTrackr',
      desc: 'Gestor de candidaturas laborales: añade, organiza y controla tus aplicaciones en un panel intuitivo.',
      tech: ['React', 'Vite', 'Tailwind'],
      logo: '../media/imagenes/logojobtrackr.png',
      gif: '../media/imagenes/gifjobtrackr.gif',
      demo: 'https://jobtrackr-five.vercel.app',
      code: 'https://github.com/Gabriel15gabi/jobtrackr',
      logoFit: 'contain'
    }
  ];

  const icons = {
    external: `
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 3h7v7m0-7L10 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M21 21H3V3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>`,
    github: `
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.16 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.47 5.93.43.38.82 1.11.82 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>
      </svg>`
  };

  const container = document.querySelector('.projects-container');

  function projectCardTemplate(p) {
    const techChips = p.tech.map(t => `<li>${t}</li>`).join('');
    const logoFitClass = p.logoFit === 'contain' ? 'fit-contain' : 'fit-cover';
    return `
      <article class="project-card" tabindex="0">
        <div class="project-media">
          <img class="thumb static ${logoFitClass}" src="${p.logo}" alt="Logo de ${p.title}" loading="lazy" decoding="async">
          <img class="thumb animated" src="${p.gif}" alt="Vista previa animada de ${p.title}" loading="lazy" decoding="async">
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <ul class="project-tags" aria-label="Tecnologías empleadas">${techChips}</ul>
        <div class="project-actions">
          <a class="btn" href="${p.demo}" target="_blank" rel="noopener noreferrer">
            ${icons.external} Ver demo
          </a>
          <a class="btn btn-outline" href="${p.code}" target="_blank" rel="noopener noreferrer">
            ${icons.github} Ver código
          </a>
        </div>
      </article>
    `;
  }

  function renderProjects(list) {
    if (!container) return;
    container.innerHTML = list.map(projectCardTemplate).join('');
  }
  renderProjects(projectsData);

  // Soporte touch (mostrar gif con tap en móvil)
  container?.addEventListener('touchstart', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    e.preventDefault();
    card.classList.toggle('show-gif');
  }, { passive: false });
});

/* === CONTACTO: copiar, contador y mailto === */
(function () {
  const toasts = document.getElementById('toast-wrap');
  const showToast = (msg, type = 'ok') => {
    if (!toasts) return;
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.textContent = msg;
    toasts.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(.3em)';
      setTimeout(() => el.remove(), 200);
    }, 2200);
  };

  // Copiar al portapapeles
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = btn.getAttribute('data-copy');
      const target = sel ? document.querySelector(sel) : null;
      if (!target) return;
      const text = target.textContent.trim();
      navigator.clipboard?.writeText(text).then(
        () => showToast('Copiado al portapapeles'),
        () => showToast('No se pudo copiar', 'error')
      );
    });
  });

  // Mailto rápido
  const mailtoBtn = document.getElementById('mailto-btn');
  if (mailtoBtn) {
    const to = document.getElementById('email-text')?.textContent.trim() || 'gabriel_gabiz@hotmail.com';
    const subject = encodeURIComponent('Contacto desde el portfolio');
    const body = encodeURIComponent('Hola Gabriel,\n\nTe escribo porque he visto tu portfolio y me gustaría hablar contigo.\n\nGracias,');
    mailtoBtn.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  // Contador + envío
  const form = document.getElementById('contact-form');
  const nameI = document.getElementById('name');
  const emailI = document.getElementById('email');
  const subjectI = document.getElementById('subject');
  const messageI = document.getElementById('message');
  const counter = document.getElementById('char-counter');

  function updateCounter() {
    if (!messageI || !counter) return;
    const len = messageI.value.length;
    counter.textContent = `${len}/600`;
  }
  messageI?.addEventListener('input', updateCounter);
  updateCounter();

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (nameI?.value || '').trim();
    const email = (emailI?.value || '').trim();
    const subject = (subjectI?.value || 'Mensaje desde el portfolio').trim();
    const message = (messageI?.value || '').trim();

    if (!name || !email || !message) {
      showToast('Completa nombre, email y mensaje.', 'error');
      return;
    }

    const mail = document.getElementById('email-text')?.textContent.trim() || 'gabriel_gabiz@hotmail.com';
    const mailto = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${name} <${email}>\n\n${message}`)}`;
    window.location.href = mailto;
    showToast('Abriendo tu cliente de correo…', 'ok');

    form.reset();
    updateCounter();
  });
})();
