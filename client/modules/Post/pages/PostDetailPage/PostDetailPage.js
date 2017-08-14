import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost, editPostRequest } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

export class PostDetailPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      movieTitle: this.props.post.movieTitle,
      releaseDate: this.props.post.releaseDate,
      duration: this.props.post.duration,
      genre: this.props.post.genre,
      synopsis: this.props.post.synopsis
    }
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText = (event, type) => {
    var newState = {};
    newState[type] = event.target.value;
    this.setState(newState)
  }

  handleEditPost = (movieTitle, releaseDate, duration, genre, synopsis) => {
    const post = {
      movieTitle, 
      releaseDate, 
      duration, 
      genre, 
      synopsis 
    }
    this.props.dispatch(editPostRequest(post, this.props.params.cuid));
  };

  editPost = () => {
    const movieRef = this.refs.movieTitle;
    const releaseDateRef = this.refs.releaseDate;
    const durationRef = this.refs.duration;
    const genreRef = this.refs.genre;
    const synopsisRef = this.refs.synopsis;

    if (movieRef.value && releaseDateRef.value && durationRef.value && genreRef.value && synopsisRef.value) {
      this.handleEditPost(movieRef.value, releaseDateRef.value, durationRef.value, genreRef.value, synopsisRef.value);
      movieRef.value = releaseDateRef.value = durationRef.value = genreRef.value = synopsisRef.value = '';

    }
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.movieTitle} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <input placeholder="Movie Title" ref="movieTitle" onChange={(event) => this.handleChangeText(event, 'movieTitle')} className={styles['form-field']} value={this.state.movieTitle} type="text" />
          <input placeholder="Release Date" ref="releaseDate" onChange={(event) => this.handleChangeText(event, 'releaseDate')} className={styles['form-field']} value={this.state.releaseDate} type="text" />
          <input placeholder="Duration" ref="duration" onChange={(event) => this.handleChangeText(event, 'duration')} className={styles['form-field']} value={this.state.duration} type="text" />
          <input placeholder="Genre" ref="genre" onChange={(event) => this.handleChangeText(event, 'genre')} className={styles['form-field']} value={this.state.genre} type="text" />
          <textarea placeholder="Synopsis" ref="synopsis" onChange={(event) => this.handleChangeText(event, 'synopsis')} className={styles['form-field']} value={this.state.synopsis} type="text" />
          <a className={styles['post-submit-button']} href="#" onClick={this.editPost}><Link to="/" ><FormattedMessage id="submit" /></Link></a>
        </div>
      </div>
    )
  }
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    movieTitle: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
