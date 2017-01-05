import React from 'react';
import { Link } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <h2>Header</h2>
          </Link>
        </header>
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
