import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    success: false
  };

  submitForm = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.dispatch(loginUser(this.state));
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.user.login.isAuth) {
      this.props.history.push("/user");
    }
  };

  render() {
    let user = this.props.user;
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Login here</h2>
          <div className="form_element">
            <input
              type="email"
              placeholder="please enter email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="please enter password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <button type="submit">Login</button>
          <div className="error">
            {user.login ? <div>{user.login.messsage}</div> : null}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login);
