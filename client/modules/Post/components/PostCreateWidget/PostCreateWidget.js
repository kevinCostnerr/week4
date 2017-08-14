import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { LocalForm, Control } from 'react-redux-form';
import { observer } from 'mobx-react';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const movieRef = this.refs.movieTitle;
    const releaseDateRef = this.refs.releaseDate;
    const durationRef = this.refs.duration;
    const genreRef = this.refs.genre;
    const synopsisRef = this.refs.synopsis;
    console.log(movieRef.value);
    if (movieRef.value && releaseDateRef.value && durationRef.value && genreRef.value && synopsisRef.value) {
      this.props.addPost(movieRef.value, releaseDateRef.value, durationRef.value, genreRef.value, synopsisRef.value);
      movieRef.value = releaseDateRef.value = durationRef.value = genreRef.value = synopsisRef.value = '';
    }
  };

    
  export default observer(({ form }) => (
    <form>
      <label htmlFor={form.$('movieTitle').id} >
        {form.$('movieTitle').label}
      </label>
      <input {...form.$('movieTitle').bind()} ref="movieTitle"/>
      <p>{form.$('movieTitle').error}</p>

      <label htmlFor={form.$('releaseDate').id}>
        {form.$('releaseDate').label}
      </label>
      <input {...form.$('releaseDate').bind()} ref="releaseDate"/>
      <p>{form.$('releaseDate').error}</p>
      
      <label htmlFor={form.$('duration').id}>
        {form.$('duration').label}
      </label>
      <input {...form.$('duration').bind()} ref="duration"/>
      <p>{form.$('releaseDate').error}</p>
      
      <label htmlFor={form.$('genre').id}>
        {form.$('genre').label}
      </label>
      <input {...form.$('genre').bind()} ref="genre"/>
      <p>{form.$('genre').error}</p>
      
      <label htmlFor={form.$('synopsis').id}>
        {form.$('synopsis').label}
      </label>
      <input {...form.$('synopsis').bind()} ref="synopsis"/>
      <p>{form.$('synopsis').error}</p>

      <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>

      <p>{form.error}</p>
    </form>
));

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
