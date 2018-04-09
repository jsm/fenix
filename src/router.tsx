import * as React from 'react';
import * as _ from 'lodash';
import { connect, Dispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import * as Model from './models';
import { Actions } from './actions';
import Auth from './components/auth';
import Dashboard from './components/dashboard';

const Settings = () => <h3>Settings</h3>;

interface PrivateRouteProps {
  component: any; // TODO: - how to type?
  isAuthed: boolean;
  path: Model.Route;
}

// TODO: How do we typecheck passed into <Route/>/ <Link/>, <Redirect/>?

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
            pathname: '/auth',
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

const App: React.SFC<Props> = ({ isAuthed, signOutUser, signInUser }) => (
  <Router>
    <div style={{ backgroundColor: 'lightblue' }}>
      {!isAuthed ? (
        <Link to="/auth">Login</Link>
      ) : (
        <button
          onClick={() => {
            signOutUser();
            // history.push('/');
          }}
        >
          Sign out
        </button>
      )}{' '}
      <Link to={{ pathname: '/dashboard' } as { [key: string]: Model.Route }}>
        Dashboard
      </Link>{' '}
      <Link to={'/settings' as Model.Route}>Settings</Link>
      {/* TODO: why does this not work? */}
      <Route
        path="/auth" // TODO: - how to type?
        render={props => <Auth {...props} onSignIn={signInUser} />}
      />
      <PrivateRoute
        path="/dashboard"
        component={Dashboard}
        isAuthed={isAuthed}
      />
      <PrivateRoute path="/settings" component={Settings} isAuthed={isAuthed} />
    </div>
  </Router>
);

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
)(App);

export default AppConnected;
