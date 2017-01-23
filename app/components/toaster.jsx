import React from 'react';

const styles = {
  toaster: {
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'indianred',
    padding: '10px',
    borderRadius: '5px',
    opacity: '0.8',
    margin: 'auto',
    position: 'absolute',
    top: '70px',
    left: '0',
    right: '0',
    height: '20px',
    width: '300px'
  }
};

class Toaster extends React.Component {
  render() {
    return (
      <div style={styles.toaster}>{this.props.message}</div>
    );
  }
}

module.exports = Toaster;
