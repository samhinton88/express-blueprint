import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import resourceReducer from './resource_reducer';
import blueprintReducer from './blueprint_reducer';
import authReducer from './auth_reducer';
import uiReducer from './ui_reducer';



const rootReducer = combineReducers({
  resourceReducer,
  blueprintReducer,
  form: formReducer,
  authReducer,
  uiReducer
})

export default rootReducer;
