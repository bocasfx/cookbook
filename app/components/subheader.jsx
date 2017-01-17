import React from 'react';
import { Link } from 'react-router';

const styles = {
  add: {
    marginLeft: 'auto'
  },
  subheader: {
    width: '640px',
    margin: '10px auto',
    fontSize: '0.9em',
    display: 'flex'
  }
};

class Subheader extends React.Component {
  constructor(props) {
    super(props);

    this.leftLink = this.leftLink.bind(this);
    this.rightLink = this.rightLink.bind(this);
  }

  leftLink() {
    if (this.props.leftUrl && this.props.leftLabel) {
      return(
        <Link to={this.props.leftUrl}>{this.props.leftLabel}</Link>
      );
    }
  }

  rightLink() {
    if (this.props.rightUrl && this.props.rightLabel) {
      return (
        <Link style={styles.add} to={this.props.rightUrl}>{this.props.rightLabel}</Link>
      );
    }
  }

  render() {
    return (
      <div style={styles.subheader}>
        {this.leftLink()}
        {this.rightLink()}
      </div>
    );
  }
}

module.exports = Subheader;
