document.addEventListener('DOMContentLoaded', () => {
  /* === SKILLS INTERACTIVAS (TU CÓDIGO) === */
  const skills = document.querySelectorAll(".skill");

  skills.forEach(skill => {
    skill.addEventListener("click", () => {
      if (skill.classList.contains("active")) {
        skill.classList.remove("active");
        skill.querySelector("p")?.remove();
      } else {
        skills.forEach(s => {
          s.classList.remove("active");
          s.querySelector("p")?.remove();
        });

        skill.classList.add("active");

        const info = document.createElement("p");
        info.textContent = getSkillDescription(skill.dataset.name);
        info.style.marginTop = "10px";
        info.style.fontSize = "0.9em";
        info.style.color = "#ccc";
        info.style.opacity = "0";
        info.style.transition = "opacity 0.3s ease-in-out";

        skill.appendChild(info);

        requestAnimationFrame(() => {
          info.style.opacity = "1";
        });
      }
    });
  });

  function getSkillDescription(name) {
    const descriptions = {
      html: "Lenguaje de marcado usado para estructurar páginas web.",
      css: "Estilos para diseño visual y animaciones.",
      javascript: "Lenguaje de programación para interactividad web.",
      react: "Librería para construir interfaces dinámicas.",
      git: "Sistema de control de versiones para gestionar código.",
    };
    return descriptions[name] || "Próximamente...";
  }

  /* === INTERRUPTOR DE LUZ PARA PROYECTOS (TU CÓDIGO) === */
  const lightSwitch = document.getElementById("project-light");
  const projectsContainer = document.querySelector(".projects-container");

  if (projectsContainer) projectsContainer.classList.add("off");

  if (lightSwitch) {
    lightSwitch.addEventListener("change", () => {
      if (!projectsContainer) return;
      if (lightSwitch.checked) {
        projectsContainer.classList.remove("off");
      } else {
        projectsContainer.classList.add("off");
      }
    });
  }

  /* === ANIMACIONES AL HACER SCROLL (TU CÓDIGO) === */
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const animElements = document.querySelectorAll('.fade-in-element, .slide-in-element');
  animElements.forEach(el => observer.observe(el));

  /* === PROYECTOS (TU CÓDIGO) === */
  const projectsData = [
    {
      title: "Streamio – SPA tipo Netflix",
      desc: "App SPA con catálogo, búsqueda TMDB, detalle y login simulado.",
      tech: ["HTML", "CSS", "JavaScript", "TMDB API"],
      logo: "../media/imagenes/logostreamio.png",
      gif: "../media/imagenes/gifStreamio.gif",
      demo: "https://gabriel15gabi.github.io/Streamio/",
      code: "https://github.com/Gabriel15gabi/Streamio",
      logoFit: "contain"
    },
    {
      title: "El Restaurante",
      desc: "App El Restaurante con catalogo y sistema de reservas.",
      tech: ["HTML", "CSS", "JavaScript"],
      logo: "../media/imagenes/logo1.png",
      gif: "../media/imagenes/gifRestaurante.gif",
      demo: "https://gabriel15gabi.github.io/El-Restaurante/",
      code: "https://github.com/Gabriel15gabi/El-Restaurante",
      logoFit: "cover"
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

  const container = document.querySelector(".projects-container");

  function projectCardTemplate(p) {
    const techChips = p.tech.map(t => `<li>${t}</li>`).join("");
    const logoFitClass = p.logoFit === "contain" ? "fit-contain" : "fit-cover";
    return `
      <article class="project-card" tabindex="0">
        <div class="project-media">
          <img class="thumb static ${logoFitClass}" src="${p.logo}" alt="Logo de ${p.title}" loading="lazy" decoding="async">
          <img class="thumb animated" src="${p.gif}" alt="Vista previa animada de ${p.title}" loading="lazy" decoding="async">
        </div>

        <h3>${p.title}</h3>
        <p>${p.desc}</p>

        <ul class="project-tags" aria-label="Tecnologías empleadas">
          ${techChips}
        </ul>

        <div class="project-actions">
          <a class="btn" href="${p.demo || '#'}" target="_blank" rel="noopener noreferrer">
            ${icons.external}
            Ver demo
          </a>
          <a class="btn btn-outline" href="${p.code || '#'}" target="_blank" rel="noopener noreferrer">
            ${icons.github}
            Ver código
          </a>
        </div>
      </article>
    `;
  }

  function renderProjects(list) {
    if (!container) return;
    container.innerHTML = list.map(projectCardTemplate).join("");
  }

  renderProjects(projectsData);

  // Touch/pointer: alterna el GIF solo si tocas la media y nunca bloquea enlaces
  (function () {
    var containerEl = document.querySelector(".projects-container");
    if (!containerEl) return;

    function safeClosest(el, sel) {
      if (!el) return null;
      if (el.closest) return el.closest(sel);
      while (el && el.nodeType === 1) {
        if (el.matches && el.matches(sel)) return el;
        el = el.parentElement;
      }
      return null;
    }

    containerEl.addEventListener("pointerdown", function (e) {
      try {
        var t = e.target;
        if (!t || t.nodeType !== 1) return;
        if (safeClosest(t, "a, button")) return;

        var media = safeClosest(t, ".project-media");
        if (!media) return;

        var card = safeClosest(media, ".project-card");
        if (!card) return;

        card.classList.toggle("show-gif");
      } catch (err) {
        console.error("[projects touch]", err);
      }
    }, { passive: true });
  })();

  /* === HEADER: hamburguesa + sombra al hacer scroll (NUEVO) === */
  (function(){
    const header = document.querySelector('.header');
    const btn = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');

    // inicial: estado de sombra
    const onScroll = () => header?.classList.toggle('scrolled', (window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // abrir/cerrar menú móvil
    btn?.addEventListener('click', () => {
      const open = menu?.classList.toggle('open');
      if (open !== undefined) btn.setAttribute('aria-expanded', String(open));
    });

    // cerrar al navegar
    menu?.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        if(menu.classList.contains('open')){
          menu.classList.remove('open');
          btn?.setAttribute('aria-expanded','false');
        }
      });
    });
  })();

  /* === CONTACTO: validación + envío con fetch (Formspree) (NUEVO) === */
  (function(){
    const form = document.getElementById('contact-form');
    if(!form) return;
    const statusEl = document.getElementById('form-status');

    function setError(input, msg){
      const small = input.closest('label')?.querySelector('.error');
      if(small) small.textContent = msg || "";
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    function validate(){
      let ok = true;
      [...form.elements].forEach(el=>{
        if(!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
        if(el.type === 'hidden' || el.name === '_gotcha') return;

        let msg = "";
        const val = el.value.trim();

        if(el.hasAttribute('required') && !val) msg = "Este campo es obligatorio.";
        if(!msg && el.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          msg = "Introduce un email válido.";
        if(!msg && el.hasAttribute('minlength')){
          const min = parseInt(el.getAttribute('minlength'),10);
          if(val.length < min) msg = `Mínimo ${min} caracteres.`;
        }

        setError(el, msg);
        if(msg) ok = false;
      });
      return ok;
    }

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      if(statusEl) statusEl.textContent = "";
      if(!validate()){
        if(statusEl) statusEl.textContent = "Revisa los campos marcados.";
        return;
      }

      const data = new FormData(form);
      try{
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if(res.ok){
          form.reset();
          if(statusEl) statusEl.textContent = "¡Mensaje enviado! Te responderé pronto.";
        }else{
          const out = await res.json().catch(()=>({}));
          if(statusEl) statusEl.textContent = out?.errors?.[0]?.message || "Hubo un problema al enviar. Inténtalo de nuevo.";
        }
      }catch(err){
        if(statusEl) statusEl.textContent = "No se pudo enviar. ¿Tienes conexión?";
      }
    });
  })();
});


/* === CONTACT FORM: envío con fetch + validación suave === */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');
  const btn = document.getElementById('cf-submit');
  const nameEl = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');
  const msgEl = document.getElementById('cf-message');

  function setStatus(msg, cls) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.classList.remove('ok', 'err');
    if (cls) statusEl.classList.add(cls);
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validación mínima
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = msgEl.value.trim();

    if (!name || !email || !message) {
      setStatus('Por favor, rellena todos los campos.', 'err');
      return;
    }
    if (!validEmail(email)) {
      setStatus('Introduce un email válido.', 'err');
      return;
    }

    // Enviando…
    btn.disabled = true;
    setStatus('Enviando…');

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        setStatus('¡Gracias! Tu mensaje se ha enviado correctamente. Te responderé pronto.', 'ok');
      } else {
        setStatus('No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.', 'err');
      }
    } catch (err) {
      setStatus('Hubo un problema de conexión. Revisa tu red e inténtalo otra vez.', 'err');
    } finally {
      btn.disabled = false;
    }
  });
})();
