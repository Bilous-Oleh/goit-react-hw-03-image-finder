import PropTypes from 'prop-types';
import React from 'react';
import { StyledImageGalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ image, onClick }) {
  const { tags, webformatURL, largeImageURL } = image;

  return (
    <StyledImageGalleryItem>
      <img
        className="gallery__image"
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL, tags)}
      />
    </StyledImageGalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
