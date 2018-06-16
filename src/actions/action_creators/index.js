import * as resourceActionCreators from './resources';
import { getUser } from './users';
import { setActiveBlueprint, setModeledResource } from './user_interaction';
import { signupUser, setUser } from './auth';
import { addResourceToBlueprint, addBlueprint, getBlueprints, deleteResourceFromBlueprint } from './blueprints'


export default   {
  resourceActionCreators,
  getUser,
  setActiveBlueprint,
  signupUser,
  addResourceToBlueprint,
  setUser,
  addBlueprint,
  getBlueprints,
  deleteResourceFromBlueprint,
  setModeledResource
}
