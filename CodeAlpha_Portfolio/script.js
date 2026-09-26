const navLinks = document.querySelectorAll('.side-nav a');
const sections = document.querySelectorAll('.block');

function highlightActiveLink() {
  let currentId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentId}`) {
      link.style.color = '#B08D3F';
    }
  });
}

window.addEventListener('scroll', highlightActiveLink);
highlightActiveLink();