document.addEventListener('DOMContentLoaded', function () {
    // Typewriter effect for tagline/skills
    const el = document.getElementById('element');
    if (!el) return;
    const words = ['Flutter', 'Java', 'Kotlin', 'Api Integration', 'UI/UX Design', 'Firebase',];
    let wordIndex = 0, letterIndex = 0, typing = true;
  
    function type() {
      if (typing) {
        if (letterIndex <= words[wordIndex].length) {
          el.textContent = words[wordIndex].slice(0, letterIndex);
          letterIndex++;
          setTimeout(type, 80);
        } else {
          typing = false;
          setTimeout(type, 1200);
        }
      } else {
        if (letterIndex > 0) {
          el.textContent = words[wordIndex].slice(0, letterIndex - 1);
          letterIndex--;
          setTimeout(type, 45);
        } else {
          typing = true;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 300);
        }
      }
    }
    type();
  
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (hash && hash.length > 1) {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  });
  
