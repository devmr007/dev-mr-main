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

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const container = document.getElementById("projectsContainer");

container.innerHTML = projects.map(project => `
  <article class="project-card new-layout">

    <div class="project-slider">
      <div class="slides">
        ${project.images.map(img => `<img src="${img}" />`).join('')}
      </div>
    </div>

    <div class="project-body">
      <div class="project-top">
        <h3>${project.title}</h3>
        <span class="tag">${project.tag}</span>
      </div>

      <p class="project-desc">
        ${project.desc}
      </p>

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
`).join('');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));

window.addEventListener("load", () => {
  document.querySelectorAll('.project-slider').forEach(slider => {
    const slides = slider.querySelector('.slides');

    slides.innerHTML += slides.innerHTML;

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

      if (position >= slides.scrollHeight / 2) {
        position = 0;
      }

      if (position < 0) {
        position = slides.scrollHeight / 2;
      }

      slides.style.transform = `translateY(-${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  });
}); 
