import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '640px',
    margin: 'auto'
  },
  title: {
    fontSize: '2em',
    fontWeight: '900',
    padding: '10px 0'
  },
  logo: {
    marginLeft: '15px',
    fontSize: '0.9em'
  }
};

class Header extends React.Component {
  render() {
    return (
      <header>
        <div style={styles.header}>
          <Link to="/" style={styles.title}>COOKBOOK<FontAwesome style={styles.logo} name="cutlery"/></Link>
        </div>
      </header>
    );
  }
}

module.exports = Header;
