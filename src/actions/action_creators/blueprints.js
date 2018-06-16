import { ADD_BLUEPRINT, EDIT_BLUEPRINT, SET_ACTIVE_BLUEPRINT, ADD_RESOURCE_TO_BLUEPRINT, GET_BLUEPRINTS, DELETE_RESOURCE } from '../types';
import axios from 'axios'

export const addBlueprint = (id) => async dispatch => {
    const payload = {blueprintName: 'click to edit name...', resources: []};
    const res = await axios.post(`http://localhost:5000/api/users/${id}/blueprints`, payload);

    dispatch({ type: ADD_BLUEPRINT, payload: res.data });
}

export const getBlueprints =  (userId) => async dispatch => {
  const res = await axios.get(`http://localhost:5000/api/users/${userId}/blueprints`);

  console.log("response data",res.data)
  const processedBlueprints = res.data.map((bp) => {
    return {
      ...bp,
      resources: bp.resources.map((r) => JSON.parse(r))
    }
  })

  dispatch({ type: GET_BLUEPRINTS, payload: processedBlueprints } )
}

export function editBlueprint(payload) {
  return { type: EDIT_BLUEPRINT, payload, blueprintId }
}

export const addResourceToBlueprint = (resource, blueprintId, userId) => async dispatch => {
  console.log('resource on addResourceToBlueprint action creator', resource)

  console.log('stringified resource', JSON.stringify(resource))
  const resourceAsString = JSON.stringify(resource);

  const res = await axios
      .post(`http://localhost:5000/api/users/${userId}/blueprints/${blueprintId}/resources`,
        {resourceAsString})

  dispatch({ type: ADD_RESOURCE_TO_BLUEPRINT, payload: res.data, blueprintId })
}

export const deleteResourceFromBlueprint = (userId, blueprintId, resourceName) => async dispatch => {
  console.log('deleteResourceFromBlueprint action creator fired with params', userId, blueprintId, resourceName);
  const res = await axios.delete(`http://localhost:5000/api/users/${userId}/blueprints/${blueprintId}/resources/${resourceName}`);


  dispatch({ type: DELETE_RESOURCE, blueprintId, resourceName });
}