import React from 'react';
import { Link } from 'react-router';
import Header from './header.jsx';

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header/>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            Footer
          </p>
        </footer>
      </div>
    );
  }
}

module.exports = Layout;
