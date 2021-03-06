import images from './js/gallery-items';
import './css/styles.css';

const galleryRef = document.querySelector('.js-gallery');

const modalRef = document.querySelector('.js-lightbox');
const modalBtnRef = document.querySelector('[data-action="close-lightbox"]');
const modalImgRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
          </a>
          </li>`;
    })
    .join('');
}

const markup = createGalleryMarkup(images);
galleryRef.insertAdjacentHTML('beforeend', markup);

function openModal(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();
  modalRef.classList.add('is-open');
  modalImgRef.src = e.target.dataset.source;
  modalImgRef.alt = e.target.alt;
}

function closeModal() {
  modalRef.classList.remove('is-open');
  modalImgRef.src = '#';
  modalImgRef.alt = '#';
}

galleryRef.addEventListener('click', openModal);

modalBtnRef.addEventListener('click', closeModal);
modalOverlayRef.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.keyCode === 27) closeModal();
});

document.addEventListener('keydown', e => {
  console.log(e.keyCode);
});
//console.log();
// left 37
// right 39
