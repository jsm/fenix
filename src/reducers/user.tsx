import { isA } from '../actions';
import * as ActionModel from '../actions/model';

export interface UserState {
  readonly userId?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly authToken?: string;
}

export default (state = {}, action: ActionModel.Action): UserState => {
  if (isA.updateUserFirstName(action)) {
    return { ...state, firstName: action.firstName };
  } else if (isA.signInUser(action)) {
    return { ...state, authToken: action.authToken };
  } else if (isA.signOutUser(action)) {
    return { ...state, authToken: null };
  }
  return state;
};
