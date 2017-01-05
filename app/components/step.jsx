import React from 'react';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: props.idx,
      description: props.description,
      closeBtn: props.closeBtn
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let state = this.state;
    let value = event.target.value;
    state.description = value;
    this.setState(state);
    this.props.onChange(state);
  }

  render() {
    let closeBtn = this.state.closeBtn ? <span className="remove">&times;</span> : null;
    return (
      <div className="stepComponent">
        <input type="text" className="stepDescription" defaultValue={this.state.description} onChange={this.onChange}/>
        {closeBtn}
      </div>
    );
  }
}

module.exports = Step;
