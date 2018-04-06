/* tslint:disable:object-shorthand-properties-first */
import * as A from './model';

export const updateUserFirstName = (
  firstName: string,
): A.UpdateUserFirstName => ({ type: 'UPDATE_USER_FIRST_NAME', firstName });
