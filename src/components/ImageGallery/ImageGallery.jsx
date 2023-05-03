import PropTypes from 'prop-types';
import { ImageItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from '../ImageGallery/ImageGallery.styled';
export const ImageGallery = ({ images, openModal }) => {};

export default ImageGallery;
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
