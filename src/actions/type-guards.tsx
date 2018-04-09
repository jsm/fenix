import * as A from './model';
import * as T from './types';

export const updateUserFirstName = (
  action: A.Action,
): action is A.UpdateUserFirstName => action.type === T.UPDATE_USER_FIRST_NAME;

export const signInUser = (action: A.Action): action is A.SignInUser =>
  action.type === T.SIGN_IN_USER;
export const signOutUser = (action: A.Action): action is A.SignOutUser =>
  action.type === T.SIGN_OUT_USER;
