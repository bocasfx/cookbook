import React from 'react';
import { browserHistory } from 'react-router';


class EnsureLoggedInContainer extends React.Component {
  isServer() {
   return ! (typeof window !== 'undefined' && window.document);
  }

  componentDidMount() {
    if (!this.isServer() && !sessionStorage.getItem('accessToken')) {
      let query = this.props.children.props.location.pathname;
      browserHistory.replace({pathname: '/login', query: {pathname: query}});
    }
  }

  render() {
    if (this.isServer()) {
      return null;
    }
    return sessionStorage.getItem('accessToken') ? this.props.children : null;
  }
}

module.exports = EnsureLoggedInContainer;
