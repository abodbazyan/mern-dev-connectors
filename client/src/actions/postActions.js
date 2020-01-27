import axios from 'axios';
import * as actions from './types';

// Set Post Loading
export const setPostLoading = () => {
  return {
    type: actions.POST_LOADING
  };
};

// Set Post Loading
export const clearErrors = () => {
  return {
    type: actions.CLEAR_ERRORS
  };
};

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/post', postData)
    .then(res =>
      dispatch({
        type: actions.ADD_POST,
        payload: res.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Get All Posts
export const getAllPosts = postData => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/post')
    .then(res =>
      dispatch({
        type: actions.GET_POSTS,
        payload: res.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: actions.GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${id}`)
    .then(res =>
      dispatch({
        type: actions.GET_POST,
        payload: res.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: actions.GET_POST,
        payload: null
      })
    );
};

// Delete Post
export const deleteMyPost = id => dispatch => {
  axios
    .delete(`/api/post/${id}`)
    .then(res =>
      dispatch({
        type: actions.DELETE_POST,
        payload: id
      })
    )
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/post/like/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/post/unlike/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/post/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: actions.GET_POST,
        payload: res.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: actions.GET_POST,
        payload: res.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};
