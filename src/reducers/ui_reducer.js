import { SET_ACTIVE_BLUEPRINT, SET_MODELED_RESOURCE } from '../actions/types';

export default function(state = {}, action) {

  switch(action.type) {
     case SET_ACTIVE_BLUEPRINT:
        return {
          ...state,
          activeBlueprint: action.payload
        }

      case SET_MODELED_RESOURCE:
        return {
          ...state,
          modeledResource: action.payload
        }
  }
  return state;
}
