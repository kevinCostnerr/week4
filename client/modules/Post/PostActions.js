import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function editPost(post, cuid) {
  return {
    type: EDIT_POST,
    post,
    cuid
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        movieTitle: post.movieTitle,
        releaseDate: post.releaseDate, 
        duration: post.duration,
        genre: post.genre,
        synopsis: post.synopsis,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function editPostRequest(post, cuid) {
  console.log(cuid);
  console.log(post);
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'post', {
      post: {
        movieTitle: post.movieTitle,
        releaseDate: post.releaseDate, 
        duration: post.duration,
        genre: post.genre,
        synopsis: post.synopsis,
      },
    }).then(res => dispatch(editPost(res.post, cuid)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
