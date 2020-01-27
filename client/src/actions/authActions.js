import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actions from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(result => history.push('/login'))
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post('/api/user/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set the token
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode the token to get user data
      const decoded = jwt_decode(token);
      // Set current user and clear the previous errors
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: actions.GET_ERROR,
        payload: {}
      });
    })
    .catch(error =>
      dispatch({
        type: actions.GET_ERROR,
        payload: error.response.data.errors
      })
    );
};

// Set Logged In user
export const setCurrentUser = decoded => {
  return {
    type: actions.SET_CURRENT_USER,
    payload: decoded
  };
};

// Log out the user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set the current user to {} and isAuthenticated to false
  const clearUser = {};
  dispatch(setCurrentUser(clearUser));
};
