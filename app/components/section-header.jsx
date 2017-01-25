import React from 'react';

const styles = {
  container: {
    fontSize: '2em',
  },
  skewed: {
    transform: 'skew(10deg)',
    backgroundColor: 'mistyrose',
    padding: '15px',
    position: 'absolute',
    clipPath: 'polygon(0 30%,90% 0,100% 94%,10% 100%)',
    width: '150px',
    margin: '7px -35px',
    zIndex: '-1'
  },
  text: {
    position: 'absolute'
  }
};

class SectionHeader extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.skewed}></div>
        <div>{this.props.text}</div>
      </div>
    );
  }
}

module.exports = SectionHeader;
