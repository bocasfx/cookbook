import React from 'react';
import Button from './button.jsx';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Toaster from './toaster.jsx';

const styles = {
  buttonBar: {
    textAlign: 'right',
  },
  warning: {
    position: 'fixed',
    width: 'auto',
    marginTop: '25px',
    color: 'coral'
  },
  container: {
    margin: '70px auto',
    width: '300px'
  }, 
  username: {
    float: 'left',
    marginBottom: '25px'
  },
  password: {
    float: 'left',
    margin: '25px 0'
  },
  input: {
    width: '100%',
    paddingLeft: '7px'
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMessage: '',
      disabled: true
    };

    this.usernameRef = this.usernameRef.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  usernameRef(input) {
    this.usernameInput = input;
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitRequest();
  }

  submitRequest() {
    request.post('/api/v1/authenticate')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .end((err, response) => {
        if (err) {
          let message = (response && response.body.message) ? response.body.message : 'Oops... something went wrong.';
          return this.setState({
            error: true,
            errorMessage: message
          });
        }
        this.setState({
          error: false,
          errorMessage: ''
        });
        window.sessionStorage.accessToken = response.body.token;
        let pathName = this.props.location.query.pathname;
        if (pathName) {
          return browserHistory.push(pathName);
        }

        browserHistory.push('/');
      });
  }

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    state.disabled = !(state.username && state.password);
    this.setState(state);
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.submitRequest();
    }
  }

  render() {
    let errorMessage = '';

    if (this.state.error) {
      errorMessage = <Toaster message={this.state.errorMessage}/>;
    }

    return (
      <div style={styles.container}>
        {errorMessage}
        <span style={styles.username}>Username</span>
        <input
          type="text"
          name="username"
          ref={this.usernameRef}
          autoComplete="off"
          style={styles.input}
          onChange={this.onChange}/>
        <span style={styles.password}>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="off"
          style={styles.input}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}/>
        <div style={styles.buttonBar}>
          <Button type="submit" value="Login" onClick={this.onSubmit} disabled={this.state.disabled}/>
        </div>
        <div style={styles.warning}></div>
      </div>
    );
  }
}

module.exports = Login;
