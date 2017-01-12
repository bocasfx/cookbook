import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header">
          <Link to="/" className="maintitle">COOKBOOK</Link>
        </div>
      </header>
    );
  }
}

module.exports = Header;
