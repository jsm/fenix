import * as ActionModel from '../actions/model';
import { isA } from '../actions';

export interface UserState {
  readonly userId?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly authToken?: string;
}

export default (state = {}, action: UserState) => {
  if (isA.updateUserFirstName) {
    return { ...state, firstName: action.firstName };
  }
  return state;
};
