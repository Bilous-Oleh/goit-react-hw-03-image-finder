import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledApp } from './App.styled';
import { fetchImagesByQuery, getPerPage } from 'components/Api';
import { Loader } from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    largeImage: '',
    alt: '',
    loading: false,
    showModal: false,
    showLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query.toLowerCase() !== this.state.query.toLowerCase()) {
      this.fetchImages();
    }
    if (prevState.page < this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ loading: true });

      const { hits, totalHits } = await fetchImagesByQuery(query, page);
      if (page === 1 && totalHits === 0) {
        toast.warn('Nothing to fetched', {
          position: 'top-right',
          // autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      if (page === 1 && totalHits !== 0) {
        toast.success('Wow! It is so easy!', {
          position: 'top-right',
          // autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));

      this.showLoadMoreBtn(totalHits, hits.length);
    } catch (error) {
      alert(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = query => {
    if (query.toLowerCase() === this.state.query.toLowerCase()) {
      toast.info(`You are already viewing images ${query}`, {
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
    this.setState({
      query: query,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showLoadMoreBtn = (totalHits, hitsLength) => {
    const perPage = getPerPage();
    const totalPages = Math.ceil(totalHits / perPage);
    if (!hitsLength || totalPages === this.state.page) {
      this.setState({ showLoadMore: false });
      return;
    }
    this.setState({ showLoadMore: true });
  };

  largeImageLoaded = () => {
    this.setState({ loading: false });
  };

  handleImageClick = (largeImageUrl, tags) => {
    this.setState({
      largeImage: largeImageUrl,
      alt: tags,
      loading: true,
    });

    this.handleToggleModal();
  };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, largeImage, alt, loading, showModal, showLoadMore } =
      this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}

        {loading && <Loader />}
        {showLoadMore && !loading && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal onClose={this.handleToggleModal}>
            <img
              src={largeImage}
              alt={alt}
              onLoad={this.largeImageLoaded}
              width={800}
              height={600}
            />
          </Modal>
        )}
        <ToastContainer autoClose="2000" />
      </StyledApp>
    );
  }
}
