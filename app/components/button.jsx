import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      focused: false
    };

    this.style = this.style.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  style() {
    let buttonStyle = {
      backgroundColor: 'silver',
      borderRadius: '5px',
      color: '#fff',
      fontSize: '20px',
      textDecoration: 'none',
      cursor: 'pointer',
      border: 'none',
      width: '120px',
      margin: '25px 0 25px 10px',
      fontFamily: '\'Amatic SC\', cursive',
      outline: 'none'
    };

    if (this.state && this.state.hovered) {
      buttonStyle.backgroundColor = 'mistyrose';
      buttonStyle.color = 'dimgray';
    }

    if (this.props.disabled) {
      buttonStyle.cursor = 'not-allowed';
      buttonStyle.backgroundColor = '#eee';
    }

    return buttonStyle;
  }

  onMouseOver() {
    this.setState({ hovered:true });
  }

  onMouseOut() {
    this.setState({ hovered:false });
  }

  render() {
    let disabled = {};
    if (this.props.disabled) {
      disabled = {
        disabled: 'disabled'
      };
    }

    return (
      <input
        style={this.style()}
        type={this.props.type}
        value={this.props.value}
        onClick={this.props.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        {...disabled}/>
    );
  }
}

module.exports = Button;
