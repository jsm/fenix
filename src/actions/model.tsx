export interface BaseAction {
  type: string;
}

export type Action = AutoGeneratedAction;

export type AutoGeneratedAction =
  | UpdateUserFirstName
  | SignInUser
  | SignOutUser; // $$CREATE_REDUX_ACTION_SCRIPT_IDENTIFIER$$ (please do not remove this comment!)

export interface UpdateUserFirstName extends BaseAction {
  type: 'UPDATE_USER_FIRST_NAME';
  firstName: string;
}

export interface SignInUser extends BaseAction {
  type: 'SIGN_IN_USER';
  authToken: string;
}

export interface SignOutUser extends BaseAction {
  type: 'SIGN_OUT_USER';
}
