import * as React from 'react';
import { CookieComponentProps, withCookies } from 'react-cookie';
import { connect, Dispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from 'react-router-dom';

import * as Model from '../models';

import Dashboard from './dashboard';
import Login from './login';

const Settings = () => <h3>Settings</h3>;
const settingRoute: Model.Route = '/settings';
const authRoute: Model.Route = '/auth';
const dashboardRoute: Model.Route = '/dashboard';

interface PrivateRouteProps {
  component: any;
  isAuthed: boolean;
  path: Model.Route;
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({
  isAuthed,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthed ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: authRoute,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

interface StateToProps {}

interface DispatchToProps {}

type Props = StateToProps & DispatchToProps & CookieComponentProps;

class AppRouter extends React.Component<Props> {
  signOutUser = () => {
    this.props.cookies.remove('auth_token');
  };

  isAuthed(): boolean {
    console.log(this.props.cookies.get('auth_token'));
    return !!this.props.cookies.get('auth_token');
  }

  render() {
    const isAuthed = this.isAuthed();

    return (
      <Router>
        <div>
          {!isAuthed ? (
            <Link to={authRoute}>Login</Link>
          ) : (
            <button onClick={this.signOutUser}>Sign Out</button>
          )}{' '}
          <Link to={dashboardRoute}>Dashboard</Link>{' '}
          <Link to={settingRoute}>Settings</Link>
          <Route path={authRoute} render={props => <Login {...props} />} />
          <PrivateRoute
            path={dashboardRoute}
            component={Dashboard}
            isAuthed={isAuthed}
          />
          <PrivateRoute
            path={settingRoute}
            component={Settings}
            isAuthed={isAuthed}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: Model.ReduxState): StateToProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => {
  return {};
};

const AppConnected: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(AppRouter));

export default AppConnected;
