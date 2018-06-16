import { NEW_USER, SET_USER, GET_USER } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case NEW_USER:

      return {
        ...state,
        user: action.user
      }
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload
      }

  }
  return state;
}
