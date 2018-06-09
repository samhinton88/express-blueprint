import { combineReducers } from 'redux';

import resourceReducer from './resource_reducer';
import blueprintReducer from './blueprint_reducer';

const rootReducer = combineReducers({
  resources: resourceReducer,
  blueprints: blueprintReducer
})

export default rootReducer;
