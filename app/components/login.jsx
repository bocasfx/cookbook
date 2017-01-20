import React from 'react';
import Button from './button.jsx';
import request from 'superagent';
import assert from 'assert';
import { browserHistory } from 'react-router';

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
    outline: 'none',
    paddingLeft: '7px'
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.usernameRef = this.usernameRef.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  usernameRef(input) {
    this.usernameInput = input;
  }

  onSubmit(event) {
    event.preventDefault();
    request.post('/api/v1/authenticate')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .end((err, response) => {
        assert.equal(err, null);
        window.sessionStorage.accessToken = response.body.token;
        browserHistory.push(this.props.location.query.pathname);
      });
  }

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    this.setState(state);
  }

  render() {
    return (
      <div style={styles.container}>
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
          onChange={this.onChange}/>
        <div style={styles.buttonBar}>
          <Button type="submit" value="Login" onClick={this.onSubmit}/>
        </div>
        <div style={styles.warning}></div>
      </div>
    );
  }
}

module.exports = Login;
