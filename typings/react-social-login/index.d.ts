declare module 'react-social-login' {
  import * as React from 'react';

  export type UserResponse = UserResponseGoogle | UserResponseLinkedIn;

  export interface UserResponseBase {
    _provider: SocialLoginProviders;
  }

  export interface UserResponseGoogle extends UserResponseBase {
    _token: {
      idToken: string;
    };
  }

  export interface UserResponseLinkedIn extends UserResponseBase {
    _token: {
      accessToken: string;
    };
  }

  interface SocialLoginProps extends React.Props<{}> {
    triggerLogin: React.MouseEventHandler<{}>;
  }

  type SocialLoginFN = (props: SocialLoginProps) => JSX.Element;

  type SocialLoginProviders =
    | 'amazon'
    | 'facebook'
    | 'github'
    | 'google'
    | 'instagram'
    | 'linkedin';

  interface SocialButtonProps extends React.Props<{}> {
    appId: string;
    autoCleanUri?: boolean;
    autoLogin?: boolean;
    gatekeeper?: string;
    getInstance?: (ref: Element) => void;
    onLoginFailure?: (user: UserResponse) => void;
    onLoginSuccess?: (user: UserResponse) => void;
    onLogoutFailure?: (user: UserResponse) => void;
    onLogoutSuccess?: (user: UserResponse) => void;
    provider: SocialLoginProviders;
    redirect?: string;
    scope?: Array<string> | string;
  }

  export default function SocialLogin(
    fn: SocialLoginFN,
  ): React.ComponentClass<SocialButtonProps>;
}
