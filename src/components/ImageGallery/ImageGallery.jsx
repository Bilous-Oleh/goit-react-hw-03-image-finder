import PropTypes from 'prop-types';
import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';

export default function ImageGallery({ images, onClick }) {
  return (
    <StyledGallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
      ))}
    </StyledGallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
