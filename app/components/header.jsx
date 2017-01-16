import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header">
          <Link to="/" className="maintitle">COOKBOOK<FontAwesome className="logo" name="cutlery"/></Link>
        </div>
      </header>
    );
  }
}

module.exports = Header;
