import React from 'react';
import Button from './button.jsx';

const styles = {
  buttonBar: {
    float: 'right'
  },
  warning: {
    position: 'fixed',
    width: 'auto',
    marginTop: '25px',
    color: 'coral'
  },
  container: {
    margin: '70px 0'
  }, 
  title: {
    float: 'left',
    marginBottom: '25px'
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

    this.usernameRef = this.usernameRef.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  usernameRef(input) {
    this.usernameInput = input;
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div style={styles.container}>
        <span style={styles.title}>Username</span>
        <input
          type="text"
          name="username"
          ref={this.usernameRef}
          autocomplete="off"
          style={styles.input}/>
        <span style={styles.title}>Password</span>
        <input
          type="password"
          name="password"
          autocomplete="off"
          style={styles.input}/>
        <div style={styles.buttonBar}>
          <Button type="submit" value="Login" onClick={this.onSubmit}/>
        </div>
        <div style={styles.warning}></div>
      </div>
    );
  }
}

module.exports = Login;
