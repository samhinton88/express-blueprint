import { SET_ACTIVE_BLUEPRINT, SET_MODELED_RESOURCE } from '../types';

export function setActiveBlueprint(blueprintId) {

  return { type: SET_ACTIVE_BLUEPRINT, payload: blueprintId }
}

export function setModeledResource(resource) {

  return { type: SET_MODELED_RESOURCE, payload: resource }
}

export function getActiveBlueprint() {}
