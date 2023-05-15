import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledSearchbar, StyledSearchForm } from './Searchbar.styled';
import { ReactComponent as Icon } from '../../search.svg';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Please enter a name', {
        position: 'top-right',
        // autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <StyledSearchbar>
        <StyledSearchForm onSubmit={this.handleSubmit}>
          <button type="submit" className="searchform__button">
            <Icon width="35" height="35" />
          </button>

          <input
            className="searchform__input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </StyledSearchForm>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
