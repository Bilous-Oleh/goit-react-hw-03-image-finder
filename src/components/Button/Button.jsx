import PropTypes from 'prop-types';
import React from 'react';
import { StyledButton } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
