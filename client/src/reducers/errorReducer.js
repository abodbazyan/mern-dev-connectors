import * as actions from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    //
    case actions.GET_ERROR:
      return action.payload;

    case actions.CLEAR_ERRORS:
      return {};

    default:
      return state;
  }
}
