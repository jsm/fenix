import * as ActionModel from '../actions/model';
import { isA } from '../actions';

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
    console.log('action', action, isA.signInUser);
    return { ...state, authToken: action.authToken };
  } else if (isA.signOutUser(action)) {
    return { ...state, authToken: null };
  }
  return state;
};
