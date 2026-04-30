document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll(
    '.hero, .section, .card, .experience-item, .carousel-panel'
  );

  if (reducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  const badge = document.querySelector('.hero-badge');
  const photo = document.querySelector('.profile-photo-frame');

  if (badge && !reducedMotion) {
    badge.classList.add('pulse');
    setInterval(() => {
      badge.classList.remove('pulse');
      void badge.offsetWidth;
      badge.classList.add('pulse');
    }, 6500);
  }

  if (photo && !reducedMotion) {
    photo.classList.add('float');
  }
});
