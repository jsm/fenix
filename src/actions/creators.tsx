/* tslint:disable:object-shorthand-properties-first */
import * as A from './model';

export const updateUserFirstName = (
  firstName: string,
): A.UpdateUserFirstName => ({ type: 'UPDATE_USER_FIRST_NAME', firstName });

export const signInUser = (authToken: string): A.SignInUser => ({
  type: 'SIGN_IN_USER',
  authToken,
});

export const signOutUser = (): A.SignOutUser => ({ type: 'SIGN_OUT_USER' });
