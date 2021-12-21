import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line
const createGalleryItemMarkup = ({ preview, description, original }) => {
  return ` 
    <li><a class="gallery__link" href=${original}>
      <img
        class="gallery__image"
        src=${preview}
       alt=${description}
      />
    </a> </li>`;
};

const galleryList = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join('');
galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

console.log(galleryMarkup);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
