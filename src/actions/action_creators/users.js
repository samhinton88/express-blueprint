import { GET_USER, NEW_USER } from '../types';
import axios from 'axios';

export const getUser = (id) => async dispatch => {

  const user = await axios.get('http://localhost:5000/api/users/' + id);


  dispatch({ type: GET_USER, payload: user.data })
}

export const newUser = (data) => async dispatch => {
  const user = axios.post('api/users/', data);

  dispatch({ type: NEW_USER, payload: user})
}

export function signupUser({email, password}) {
  console.log('signupuser', email, password)
  return function(dispatch) {
    axios.post(`${ROOT_URL}/users`, {email, password})
      .then(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(({response}) => {
        // ran into issue here where, to get to the error on the object returned
        // by catch, you have to use response.response.data.error
        dispatch(authError(response.data.error))
      });
  };
}
