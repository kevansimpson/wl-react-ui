import React from 'react';
import '../tailwind.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state);
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Winelist Login</h1><br/>
        <div class="float-left mx-5 bg-blue">
        <form onSubmit={this.handleSubmit}>
          <label>
            UserName:
            <input class="ml-2 mt-5 mb-5 mr-5"
                   type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          </label>
          <br/>
          <label>
            Password:
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <br/>
          <input class="justify-center" type="submit" value="Submit" />
        </form>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;

