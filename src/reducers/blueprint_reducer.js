import { ADD_BLUEPRINT, EDIT_BLUEPRINT } from '../actions/types';

const blueprints = [];

export default function(state = {blueprints}, action) {
  switch (action.type) {
    case ADD_BLUEPRINT:
      return {
        ...state,
        blueprints: [...state.blueprints, action.payload]
      }
    case EDIT_BLUEPRINT:
      return {
        ...state,
        blueprints: state.blueprints.map((blueprint) => {
          if (blueprint.id === action.blueprintId) {
            return {
              ...blueprint,
              ...action.payload
            }
          } else {
            return blueprint;
          }
        })
      }
  }
  return state;
}
