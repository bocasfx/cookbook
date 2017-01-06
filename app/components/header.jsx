import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header">
          <Link to="/"><div className="maintitle">Recetas</div></Link>
          <Link className="new" to="/new">+</Link>
        </div>
      </header>
    );
  }
}

module.exports = Header;
