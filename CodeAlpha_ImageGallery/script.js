const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let imagesArray = [];

function updateImagesArray() {
  imagesArray = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
}

function openLightbox(index) {
  updateImagesArray();
  currentIndex = index;
  lightboxImg.src = imagesArray[currentIndex].src;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function showNext() {
  currentIndex = (currentIndex + 1) % imagesArray.length;
  lightboxImg.src = imagesArray[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
  lightboxImg.src = imagesArray[currentIndex].src;
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    updateImagesArray();
    const img = item.querySelector('img');
    const clickedIndex = imagesArray.indexOf(img);
    openLightbox(clickedIndex);
  });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.classList.remove('hidden');
        item.style.display = '';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });
  });
});