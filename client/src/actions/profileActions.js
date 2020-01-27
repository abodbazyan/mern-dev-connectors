import axios from 'axios';
import * as actions from './types';

// Profile loading
export const setProfileLoading = () => {
  return {
    type: actions.PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: actions.CLEAR_CURRENT_PROFILE
  };
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: {}
      });
    });
};

// Get current profile
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: null
      });
    });
};

// Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: actions.GET_PROFILES,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actions.GET_PROFILES,
        payload: null
      });
    });
};

// Create profile
export const createMyProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(result => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(result => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(result => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  if (window.confirm('Are you sure? this cannot be undone!')) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(result =>
        dispatch({
          type: actions.GET_PROFILE,
          payload: result.data.data
        })
      )
      .catch(error =>
        dispatch({
          type: actions.GET_ERROR,
          payload: error.response.data.errors
        })
      );
  }
};

// Delete Education
export const deleteEducation = id => dispatch => {
  if (window.confirm('Are you sure? this cannot be undone!')) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(result =>
        dispatch({
          type: actions.GET_PROFILE,
          payload: result.data.data
        })
      )
      .catch(error =>
        dispatch({
          type: actions.GET_ERROR,
          payload: error.response.data.errors
        })
      );
  }
};

// Delete account and profile
export const deleteMyAccount = () => dispatch => {
  if (window.confirm('Are you sure? this cannot be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => {
        dispatch({
          type: actions.SET_CURRENT_USER,
          payload: {}
        });
        dispatch(clearCurrentProfile());
      })
      .catch(error =>
        dispatch({
          type: actions.GET_ERROR,
          payload: error.response.data.errors
        })
      );
  }
};
