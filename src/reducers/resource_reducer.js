import { ADD_RESOURCE, EDIT_RESOURCE } from '../actions/types';

const resources = [];

export default function(state = { resources }, action) {
  // do not mutate state, do not nest resources
  switch (action.type) {

    case ADD_RESOURCE:
      const { blueprintId } = action;

      return {
        ...state,
        resources: [...resources, action.payload]
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
  }
  return state
}
