import { fetchGallery } from './Api/AxiosAPI';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';
import { Loader } from './Loader/Loader';
import { LoadMore } from './ButtonLoadMore/Button';

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    page: 1,
    images: [],
    largeImageURL: '',
    showModal: false,
    totalHits: 0,
    showbegin: false,
  };
  componentDidUpdate = (_, prevState) => {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      fetchGallery(this.state.query, this.state.page)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalHits: data.totalHits,
          }));
          if (
            this.state.showbegin &&
            this.state.page <= Math.ceil(this.state.totalHits / 12)
          ) {
            this.setState({ showbegin: false });
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  toggleModal = largeImageURL => {
    if (!largeImageURL) {
      this.setState({ largeImageURL: '', showModal: false });
      return;
    }
    this.setState({ largeImageURL, showModal: true });
  };
  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
    console.log(this.state.page);
  };

  render() {
    const { handleFormSubmit, toggleModal, handleLoadMore } = this;
    const { isLoading, images, totalHits, showModal, modalImage } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={handleFormSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={toggleModal} />
        {!!totalHits && <LoadMore onLoadMore={handleLoadMore} />}
        {showModal && (
          <Modal closeModal={toggleModal} modalImage={modalImage} />
        )}
        <ToastContainer autoClose={2500} />
      </Container>
    );
  }
}
