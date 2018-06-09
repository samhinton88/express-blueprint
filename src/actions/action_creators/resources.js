import { ADD_RESOURCE } from '../types';

export function addResource(payload, blueprintId) {
  return { type: ADD_RESOURCE, payload }
}

export function editResource(payload, blueprintId, resourceId) {
  return { type: EDIT_RESOURCE, payload, resourceId }
}
