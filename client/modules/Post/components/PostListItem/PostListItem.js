import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
          {props.post.movieTitle}
        </Link>
      </h3>
      <p className={styles['post-desc']}>Release date: {props.post.releaseDate}</p>
      <p className={styles['post-desc']}>Duration: {props.post.duration}</p>
      <p className={styles['post-desc']}>Genre: {props.post.genre}</p>
      <p className={styles['post-desc']}>Synopsis: {props.post.synopsis}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    movieTitle: PropTypes.string.isRequired,
    releaseDate: PropTypes.PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
