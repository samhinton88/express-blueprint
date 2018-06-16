import {
  ADD_BLUEPRINT,
  EDIT_BLUEPRINT,
  SET_ACTIVE_BLUEPRINT,
  ADD_RESOURCE_TO_BLUEPRINT,
  GET_BLUEPRINTS,
  DELETE_RESOURCE
} from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case ADD_BLUEPRINT:

      return {
        ...state,
         blueprints: [...state.blueprints, action.payload]
      }

    case GET_BLUEPRINTS:

      return {
        ...state,
        blueprints: action.payload
      }

    case ADD_RESOURCE_TO_BLUEPRINT:
      console.log('state in add_resource_to_blueprint' , state)
      console.log('action in add_resource_to_blueprint', action)

      return {
        ...state,
        blueprints: state.blueprints.map((b) => {
          if (action.blueprintId === b._id) {
            return {
              ...b,
              resources: [...b.resources, action.payload]
            }
          } else {
            return b
          }
        })
      }

    case DELETE_RESOURCE:
      const { blueprintId, resourceName } = action;
      return {
        ...state,
        blueprints: state.blueprints.map((bp) => {
          if (bp._id === blueprintId) {
            return {
              ...bp,
              resources: bp.resources.filter((r) => r.resourceName !== resourceName)
            }


          } else {
            return bp;
          }
        })
      }



    // case EDIT_BLUEPRINT:

    //   return {
    //     ...state,
    //     blueprints: state.blueprints.map((blueprint) => {
    //       if (blueprint.id === action.blueprintId) {
    //         return {
    //           ...blueprint,
    //           ...action.payload
    //         }
    //       } else {
    //         return blueprint;
    //       }
    //     })
    //   }

  }
  return state;
}
