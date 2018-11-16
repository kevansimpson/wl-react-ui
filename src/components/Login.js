import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const REST_URL = process.env.REST_URL || 'http://localhost:4000';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
//    alert('A name was submitted: ' + JSON.stringify(this.state));
    fetch(REST_URL + '/auth/login', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(this.state),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(function(response) {
      console.log("Login Status: " + response.status);
      if (response.ok) {
        console.log('Login successful');
        window.location = 'winelist';
        window.temptkn = response.body.token;
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    })
    .catch(rejected => {
      alert('Failed: ' + rejected.statusText);
      console.log(rejected);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <MuiThemeProvider>
            <div>
              <div className="App-bar">
                <h3>Winelist Login</h3>
              </div>
              <div>
                <TextField hintText="Enter your username" floatingLabelText="Username" style={styleML}
                           onChange={(event,newValue) => this.setState({username: newValue})} />
                <br/>
                <TextField hintText="Enter your password" floatingLabelText="Password" style={styleML}
                           onChange={(event,newValue) => this.setState({password: newValue})} />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style}
                              onClick={(event) => this.handleSubmit(event)} />
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    )
  }
}

const style = {
  margin: 15,
};

const styleML = {
  marginLeft: 15,
};

export default Login;

