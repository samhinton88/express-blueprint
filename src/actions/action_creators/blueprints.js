import { ADD_BLUEPRINT, EDIT_BLUEPRINT } from '../types';

export function addBlueprint(payload) {
  return { type: ADD_BLUEPRINT, payload }
}

export function editBlueprint(payload) {
  return { type: EDIT_BLUEPRINT, payload, blueprintId }
}
