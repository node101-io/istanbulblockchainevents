window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.intersectionRatio > 0) {
              document.querySelector(`body .all-content .istanbul-guide-bottom-section .istanbul-guide-side-bar .istanbul-guide-side-bar-links a[href="#${id}"]`).classList.add('side-bar-element-active');
          } else {
              document.querySelector(`body .all-content .istanbul-guide-bottom-section .istanbul-guide-side-bar .istanbul-guide-side-bar-links a[href="#${id}"]`).classList.remove('side-bar-element-active');
          }
      });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('div[id]').forEach((div) => {
      observer.observe(div);
  });
});