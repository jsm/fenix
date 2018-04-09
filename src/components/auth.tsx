import * as React from 'react';
import * as _ from 'lodash';
import { Redirect } from 'react-router-dom';
import * as authStyle from '../styles/auth.scss';
import * as Model from '../models';

interface Props {
  location: any; // TODO: find types
  onSignIn: (fakeToken: string) => void;
}

const defaultPath: Model.Route = '/dashboard';
// TODO: type path names

interface State {
  redirectToReferrer: boolean;
}
class Auth extends React.Component<Props, State> {
  state = {
    redirectToReferrer: false,
  };

  login = () => {
    this.props.onSignIn('123'); // TODO: Fake Token
    this.setState({ redirectToReferrer: true });
  };

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
          <button onClick={this.login}>Log in</button>
        </div>
      </div>
    );
  }
}

export default Auth;
