import React from 'react';
import FontAwesome from 'react-fontawesome';

const styles = {
  container: {
    textAlign: 'center'
  },
  spinner: {
    fontSize: '1.2em',
    border: '1px dashed',
    padding: '10px 12px',
    borderRadius: '50px',
    marginBottom: '15px'
  },
  message: {
    fontSize: '1.2em'
  }
};

class Spinner extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <FontAwesome name="cutlery" spin={this.props.spin} style={styles.spinner}/>
        <div style={styles.message}>{this.props.message}</div>
      </div>
    );
  }
}

module.exports = Spinner;
