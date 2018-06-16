import { ADD_RESOURCE, EDIT_RESOURCE, GET_RESOURCES } from '../types';
import axios from 'axios';


export function addResource(payload, blueprintId) {
  return { type: ADD_RESOURCE, payload, blueprintId }
}

export function editResource(payload, blueprintId, resourceId) {
  return { type: EDIT_RESOURCE, payload, resourceId }
}

const getResources = (userId, blueprintId) => async dispatch => {
  const res = axios.get(`http://localhost:5000/api/users/${userId}/blueprints/${blueprintId}`)

  dispatch( { type: GET_RESOURCES, bluePrint: JSON.parse(res.data) })
}
