import React from 'react';
import Fontawesome from 'react-fontawesome';

const styles = {
  icon: {
    padding: '5px'
  }
};

class Microbutton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      focused: false
    };
  }

  render() {
    let disabled = '';
    if (this.props.disabled) {
      disabled = 'Disabled';
    }

    let cls = 'button' + disabled;

    return (
      <div className={cls} onClick={this.props.onClick}>
        <Fontawesome style={styles.icon} name={this.props.icon}/>
      </div>
    );
  }
}

module.exports = Microbutton;
