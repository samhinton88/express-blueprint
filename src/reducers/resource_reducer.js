import { ADD_RESOURCE, EDIT_RESOURCE, GET_RESOURCES } from '../actions/types';



export default function(state = {}, action) {
  // do not mutate state, do not nest resources
  switch (action.type) {
    // case ADD_RESOURCE2:
    //   return {
    //     ...state,
    //     [action.payload._id]:action.payload
    //   }

    case ADD_RESOURCE:
      const newResource = {...action.payload, blueprintId: action.blueprintId}
      const resources = state.blueprintReducer.map((b) => {
        if (b._id === action.blueprintId ) {
          return {...b, resources: [...b.resources, action.payload]};
        } else {
          return b;
        }
      })

      return {
        ...state,
        resources
      }

    case EDIT_RESOURCE:
      const { resourceID } = action;

      return {
        ...state,
        resources: resources.map((resource) => {
          if (resource.id === resourceID) {
            return {
              ...resource,
              ...action.payload
            }
          } else {
            return resource
          }
        })
      }

    case GET_RESOURCES:
      const { blueprintId } = action;
      const cache = [];
      state.resources.forEach((r) => {

        if (r.blueprintId === blueprintId) {

          cache.push(r);
        }
      });


      return {
        ...state,
        activeResources: cache
      }
  }
  return state
}
