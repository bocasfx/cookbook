import React from 'react';
import { Link } from 'react-router';
import Header from './header.jsx';
import Footer from './footer.jsx';

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header/>
        <div className="app-content">{this.props.children}</div>
        <Footer/>
      </div>
    );
  }
}

module.exports = Layout;
