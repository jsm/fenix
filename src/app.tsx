import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as style from './styles/styles.scss';
import { Actions } from './actions';
import * as Model from './models';

interface StateToProps {
  firstName: string;
}

interface DispatchToProps {
  updateUserFirstName: (firstName: string) => void;
}

type Props = StateToProps & DispatchToProps;

interface State {
  value: string;
}

class App extends React.Component<Props, State> {
  state = { value: '' };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.updateUserFirstName(this.state.value);
  };

  render() {
    return (
      <div className={style.panelDefault}>
        <h1> {`Hello ${this.props.firstName || 'World'}`!}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">
            Name:
            <input
              id="firstName"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: Model.ReduxState): StateToProps => ({
  firstName: state.user.firstName,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => {
  return {
    updateUserFirstName: (firstName: string) =>
      dispatch(Actions.updateUserFirstName(firstName)),
  };
};

const AppConnected: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppConnected;
