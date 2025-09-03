document.addEventListener('DOMContentLoaded', () => {
  /* === SKILLS INTERACTIVAS === */
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

  /* === INTERRUPTOR DE LUZ PARA PROYECTOS === */
  const lightSwitch = document.getElementById("project-light");
  const projectsContainer = document.querySelector(".projects-container");

  // Empieza apagado
  projectsContainer.classList.add("off");

  lightSwitch.addEventListener("change", () => {
    if (lightSwitch.checked) {
      projectsContainer.classList.remove("off");
    } else {
      projectsContainer.classList.add("off");
    }
  });

  /* === ANIMACIONES AL HACER SCROLL === */
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const animElements = document.querySelectorAll('.fade-in-element, .slide-in-element');
  animElements.forEach(el => observer.observe(el));

  /* === PROYECTOS: plantilla reusable + render dinámico (logoFit por proyecto) === */

  // 1) Rellena aquí tus proyectos
  const projectsData = [
    {
      title: "Streamio – SPA tipo Netflix",
      desc: "App SPA con catálogo, búsqueda TMDB, detalle y login simulado.",
      tech: ["HTML", "CSS", "JavaScript", "TMDB API"],
      logo: "../media/imagenes/logostreamio.png",
      gif: "../media/imagenes/gifStreamio.gif",
      demo: "https://gabriel15gabi.github.io/Streamio/",
      code: "https://github.com/Gabriel15gabi/Streamio",
      logoFit: "contain" // <<— para ver el logo completo sin recorte
    },
    {
      title: "El Restaurante",
      desc: "App El Restaurante con catalogo y sistema de reservas.",
      tech: ["HTML", "CSS", "JavaScript"],
      logo: "../media/imagenes/logo1.png",
      gif: "../media/imagenes/gifRestaurante.gif",
      demo: "https://gabriel15gabi.github.io/El-Restaurante/",
      code: "https://github.com/Gabriel15gabi/El-Restaurante",
      logoFit: "cover" // <<— si tu 'logo' es más bien una captura/screenshot
    }
  ];

  // 2) Iconos SVG inline
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

  // 3) Render de cards
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
    container.innerHTML = list.map(projectCardTemplate).join("");
  }

  renderProjects(projectsData);

  // 4) Soporte touch: tap para alternar (añade/quita show-gif a la card)
  container.addEventListener("touchstart", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    e.preventDefault(); // evita scroll en primer tap sobre la card
    card.classList.toggle("show-gif");
  }, { passive: false });
});
