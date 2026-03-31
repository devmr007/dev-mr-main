// ===== NAV =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuBtn.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuBtn.textContent = '☰';
  });
});

// ===== PROJECT RENDER =====
const container = document.getElementById("projectsContainer");

let showAll = false;

function renderProjects() {

  const firstTwo = projects.slice(0, 2);
  const rest = projects.slice(2);

  // ALWAYS show first 2
  let html = firstTwo.map(project => createProjectHTML(project)).join('');

  // SHOW REST ONLY IF CLICKED
  if (showAll) {
    html += rest.map(project => createProjectHTML(project)).join('');
  }

  // ADD BUTTON
  html += `
    <div style="text-align:center; margin-top:20px;">
      <button id="viewMoreBtn" class="btn btn-primary">
        ${showAll ? "Show Less" : "View More"}
      </button>
    </div>
  `;

  container.innerHTML = html;

  document.getElementById("viewMoreBtn").addEventListener("click", () => {
    showAll = !showAll;
    renderProjects();
    initSlider();
  });

  initSlider();
}

renderProjects();

// ===== LAZY LOAD =====


// helper
function loadImage(img, observer) {
  img.src = img.dataset.src;

  img.onload = () => {
    img.classList.add('loaded');
  };

  if (observer) observer.unobserve(img);
}


function createProjectHTML(project) {
  return `
    <article class="project-card new-layout">

      <div class="project-slider">
        <div class="slides">
          ${project.images.map(img => `
           <img src="${img}" alt="" />
          `).join('')}
        </div>
      </div>

      <div class="project-body">
        <div class="project-top">
          <h3>${project.title}</h3>
          <span class="tag">${project.tag}</span>
        </div>

        <p class="project-desc">${project.desc}</p>

        <div class="platforms">
          <span class="platform">🤖 Android</span>
          <span class="platform">🍎 iOS</span>
        </div>

        <div class="project-links">
          <a class="project-link" href="#">Live</a>
          <a class="project-link" href="#">GitHub</a>
        </div>
      </div>

    </article>
    <br>
  `;
}
// ===== SLIDER =====
function initSlider() {
  document.querySelectorAll('.project-slider').forEach(slider => {
    const slides = slider.querySelector('.slides');

    if (!slides.dataset.duplicated) {
      slides.innerHTML += slides.innerHTML;
      slides.dataset.duplicated = "true";
    }

    let position = 0;
    let speed = 1;

    let isDragging = false;
    let startY = 0;
    let velocity = 0;

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      startY = e.touches[0].clientY;
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const delta = startY - currentY;

      position += delta;
      velocity = delta * 0.2;
      startY = currentY;
    });

    slider.addEventListener('touchend', () => {
      isDragging = false;
    });

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const delta = startY - e.clientY;
      position += delta;
      velocity = delta * 0.2;
      startY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    function animate() {
      if (!isDragging) {
        position += speed + velocity;
        velocity *= 0.95;
      }

      if (position >= slides.scrollHeight / 2) position = 0;
      if (position < 0) position = slides.scrollHeight / 2;

      slides.style.transform = `translateY(-${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  });
}

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a =>
        a.classList.toggle('active',
          a.getAttribute('href') === `#${entry.target.id}`)
      );
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));