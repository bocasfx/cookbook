import React from 'react';
import { browserHistory } from 'react-router';

const isLoggedIn = true;

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {

    if (!isLoggedIn) {
      browserHistory.replace('/login');
    }
  }

  render() {
    if (isLoggedIn) {
      return this.props.children;
    }
    
    return null;
  }
}

module.exports = EnsureLoggedInContainer;
