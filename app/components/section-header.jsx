import React from 'react';

const styles = {
  big: {
    container: {
      fontSize: '4em',
      position: 'relative'
    },
    skewed: {
      backgroundColor: 'mistyrose',
      padding: '15px',
      position: 'absolute',
      clipPath: 'polygon(0 30%,90% 0,100% 94%,10% 100%)',
      width: '250px',
      margin: '25px -35px',
      zIndex: '-1'
    }
  },
  small: {
    container: {
      fontSize: '2em',
      position: 'relative'
    },
    skewed: {
    },
    text: {
      color: 'dimgray',
      borderBottom: '2px dashed mistyrose'
    }
  }
};

class SectionHeader extends React.Component {
  render() {
    let size = this.props.size || 'small';
    return (
      <div style={styles[size].container}>
        <div style={styles[size].skewed}></div>
        <div style={styles[size].text}>{this.props.text}</div>
      </div>
    );
  }
}

module.exports = SectionHeader;
