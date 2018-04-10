import * as _ from 'lodash';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from 'react-router-dom';

import { Actions } from '../actions';
import * as Model from '../models';

import Auth from './auth';
import Dashboard from './dashboard';

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

interface StateToProps {
  isAuthed: boolean;
}

interface DispatchToProps {
  signInUser: (fakeToken: string) => void;
  signOutUser: () => void;
}

type Props = StateToProps & DispatchToProps;

class AppRouter extends React.Component<Props> {
  render() {
    return (
      <Router>
        <div>
          {!this.props.isAuthed ? (
            <Link to={authRoute}>Login</Link>
          ) : (
            <button onClick={this.props.signOutUser}>Sign Out</button>
          )}{' '}
          <Link to={dashboardRoute}>Dashboard</Link>{' '}
          <Link to={settingRoute}>Settings</Link>
          <Route
            path={authRoute}
            render={props => (
              <Auth {...props} onSignIn={this.props.signInUser} />
            )}
          />
          <PrivateRoute
            path={dashboardRoute}
            component={Dashboard}
            isAuthed={this.props.isAuthed}
          />
          <PrivateRoute
            path={settingRoute}
            component={Settings}
            isAuthed={this.props.isAuthed}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: Model.ReduxState): StateToProps => ({
  isAuthed: _.get(state, ['user', 'authToken'], false),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => {
  return {
    signInUser: (fakeToken: string) => dispatch(Actions.signInUser(fakeToken)),
    signOutUser: () => dispatch(Actions.signOutUser()),
  };
};

const AppConnected: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRouter);

export default AppConnected;
