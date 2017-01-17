import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

const styles = {
  mainSection: {
    width: '640px',
    margin: '0 auto'
  }
};

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div style={styles.mainSection}>{this.props.children}</div>
        <Footer/>
      </div>
    );
  }
}

module.exports = Layout;
