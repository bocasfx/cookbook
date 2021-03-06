import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

const styles = {
  header: {
    width: '640px',
    margin: 'auto',
    padding: '10px 0',
    display: 'table-cell',
    fontSize: '2em'
  },
  search: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  logo: {
    marginLeft: '15px',
    fontSize: '0.9em'
  },
  container: {
    display: 'table',
    width: '640px',
    margin: 'auto'
  },
  beta: {
    marginLeft: '15px',
    fontSize: '.4em'
  }
};

class Header extends React.Component {
  render() {
    return (
      <header>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link to="/" className="headerLink">
              <span>COOKBOOK</span>
              <FontAwesome style={styles.logo} name="cutlery"/>
              <span style={styles.beta}>(beta)</span>
            </Link>
          </div>
          <div style={styles.search}>
            <Link to="/search" className="headerLink"><FontAwesome name="search"/></Link>
          </div>
        </div>
      </header>
    );
  }
}

module.exports = Header;
