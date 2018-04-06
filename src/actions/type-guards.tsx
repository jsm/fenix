import * as A from './model';
import * as T from './types';

export const updateUserFirstName = (
  action: A.Action,
): action is A.UpdateUserFirstName => action.type === T.UPDATE_USER_FIRST_NAME;
