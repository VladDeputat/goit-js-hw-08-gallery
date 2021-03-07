import images from './js/gallery-items';
import './css/styles.css';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalBtnRef = document.querySelector('[data-action="close-lightbox"]');
const modalImgRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index=${index}
            alt="${description}"
          />
          </a>
          </li>`;
    })
    .join('');
}

const markup = createGalleryMarkup(images);
galleryRef.insertAdjacentHTML('beforeend', markup);

let currentIndex = 0;

function openModal(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();
  modalRef.classList.add('is-open');
  modalImgRef.src = e.target.dataset.source;
  modalImgRef.alt = e.target.alt;
  currentIndex = Number(e.target.dataset.index);
  document.addEventListener('keydown', pressKey);
  modalBtnRef.addEventListener('click', closeModal);
  modalOverlayRef.addEventListener('click', closeModal);
}

function closeModal() {
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
  modalImgRef.alt = '';
  document.removeEventListener('keydown', pressKey);
  modalBtnRef.removeEventListener('click', closeModal);
  modalOverlayRef.removeEventListener('click', closeModal);
}

galleryRef.addEventListener('click', openModal);

function pressKey(e) {
  if (e.keyCode === 27) closeModal();
  if (e.keyCode === 37) {
    if (currentIndex === 0) return;
    currentIndex -= 1;
  }
  if (e.keyCode === 39) {
    if (currentIndex === images.length - 1) return;
    currentIndex += 1;
  }
  modalImgRef.src = images[currentIndex].original;
}
