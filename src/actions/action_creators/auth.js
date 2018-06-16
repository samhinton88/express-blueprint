import { NEW_USER, SET_USER } from '../types';
import axios from 'axios';

export const signupUser = ({data}) => async dispatch => {
  const user = await axios.post('http://localhost:5000/api/users/', data);

  console.log('user in signup user action creator', user)

  dispatch( { type: NEW_USER, user: user.data })
}

export const setUser = (user) => {
  return { type: SET_USER, user}
}
