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
  },
  error: {
    color: 'indianred'
  }
};

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: props.errorMessage || 'Oops... it smells like something is burning.',
      spinMessage: props.spinMessage || 'The food will be ready soon...'
    };
  }

  render() {
    if (this.props.error) {
      return (
        <div style={styles.error}>
          <FontAwesome name="cutlery" style={styles.spinner}/>
          <div style={styles.message}>{this.state.errorMessage}</div>
        </div>
      );
    }

    if (this.props.spin) {
      return (
        <div style={styles.container}>
          <FontAwesome name="cutlery" spin style={styles.spinner}/>
          <div style={styles.message}>{this.state.spinMessage}</div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <FontAwesome name="cutlery" style={styles.spinner}/>
        <div style={styles.message}>{this.props.staticMessage}</div>
      </div>
    );
  }
}

module.exports = Spinner;
