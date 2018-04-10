import axios from 'axios';
import * as H from 'history';
import * as _ from 'lodash';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import SocialLogin, * as SocialLoginTypes from 'react-social-login';

import * as Model from '../models';
import * as authStyle from '../styles/auth.scss';

interface User {
  id: number;
}

interface State {
  redirectToReferrer: boolean;
  phase: string;
  email: string;
  password: string;
  user: User;
  jwt: string;
}

interface Props {
  location: H.Location;
  onSignIn: (fakeToken: string) => void;
}

const defaultPath: Model.Route = '/dashboard';

const SocialButton = SocialLogin(({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    {children}
  </button>
));

const initialState: State = {
  redirectToReferrer: false,
  phase: 'initial',
  email: '',
  password: '',
  user: null,
  jwt: '',
};

class Auth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  handleLoggedIn = (user: User, jwt: string) => {
    this.setState({
      user,
      jwt,
      phase: 'logged_in',
    });
    this.props.onSignIn(jwt);
  };

  handleLoginOrSignupEmail = async () => {
    const response = await axios.post(
      'http://localhost:8080/v1/auth/login_or_signup_email',
      { email: this.state.email },
    );
    const data = response.data.data;
    this.setState({
      phase: data.action,
      email: data.email,
    });
  };

  handleSignupEmail = async () => {
    const response = await axios.post(
      'http://localhost:8080/v1/auth/signup_email',
      { email: this.state.email, password: this.state.password },
    );
    const data = response.data.data;
    this.handleLoggedIn(data.user, data.jwt);
  };

  handleLoginEmail = async () => {
    const response = await axios.post(
      'http://localhost:8080/v1/auth/login_email',
      { email: this.state.email, password: this.state.password },
    );
    const data = response.data.data;
    this.handleLoggedIn(data.user, data.jwt);
  };

  handleGoogleSignin = async (user: SocialLoginTypes.UserResponseGoogle) => {
    const token = user._token.idToken;
    const response = await axios.post(
      'http://localhost:8080/v1/auth/login_or_signup_sso',
      { token, provider: user._provider },
    );
    const data = response.data.data;
    this.handleLoggedIn(data.user, data.jwt);
  };

  handleLinkedInSignin = async (
    user: SocialLoginTypes.UserResponseLinkedIn,
  ) => {
    const token = user._token.accessToken;
    const response = await axios.post(
      'http://localhost:8080/v1/auth/login_or_signup_sso',
      { token, provider: user._provider },
    );
    const data = response.data.data;
    this.handleLoggedIn(data.user, data.jwt);
  };

  handleChange = (field: 'email' | 'password') => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (field === 'email') {
      this.setState({ email: event.target.value });
    } else if (field === 'password') {
      this.setState({ password: event.target.value });
    }
  };

  logout = () => {
    this.setState(initialState);
  };

  test = () => {
    axios({
      url: 'http://localhost:8080/v1/auth/test',
      headers: { JWT: this.state.jwt },
    });
  };

  renderInitialPhase() {
    return (
      <div>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </label>
        <button onClick={this.handleLoginOrSignupEmail}>
          Login/Signup via Email
        </button>
        <SocialButton
          provider="google"
          appId="267153149984-lhlv4uc709681kh1e5jv0qf78mpd9iep"
          onLoginSuccess={this.handleGoogleSignin}
        >
          Login with Google
        </SocialButton>
        <SocialButton
          provider="linkedin"
          appId="77ua3vzzii2bzq"
          onLoginSuccess={this.handleLinkedInSignin}
        >
          Login with LinkedIn
        </SocialButton>
        <SocialButton
          provider="facebook"
          appId="988885377935265"
          onLoginSuccess={this.handleGoogleSignin}
        >
          Login with Facebook
        </SocialButton>
      </div>
    );
  }

  renderSignupPhase() {
    return (
      <div>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </label>
        <button onClick={this.handleSignupEmail}>Signup via Email</button>
      </div>
    );
  }

  renderLoginPhase() {
    return (
      <div>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </label>
        <button onClick={this.handleLoginEmail}>Login via Email</button>
      </div>
    );
  }

  renderLoggedInPhase() {
    return (
      <div>
        <label>{this.state.user.id}</label>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.test}>Test</button>
      </div>
    );
  }

  renderPhase() {
    if (this.state.phase === 'initial') {
      return this.renderInitialPhase();
    }
    if (this.state.phase === 'signup') {
      return this.renderSignupPhase();
    }
    if (this.state.phase === 'login') {
      return this.renderLoginPhase();
    }
    if (this.state.phase === 'logged_in') {
      return this.renderLoggedInPhase();
    }
  }

  render() {
    const requestedPath: Model.Route | undefined = _.get(
      this.props,
      ['location', 'state', 'from', 'pathname'],
      undefined,
    );

    if (this.state.redirectToReferrer) {
      return <Redirect to={requestedPath || defaultPath} />;
    }

    return (
      <div className={authStyle.container}>
        <div>
          {requestedPath && (
            <p>You must log in to view the page at {requestedPath}</p>
          )}
          {this.renderPhase()}
        </div>
      </div>
    );
  }
}

export default Auth;
