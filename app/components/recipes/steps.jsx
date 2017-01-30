import React from 'react';
import Microbutton from '../microbutton.jsx';
import FontAwesome from 'react-fontawesome';

const styles = {
  stepInput: {
    width: '575px',
    height: '180px'
  },
  ol: {
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Anonymous Pro", monospace',
    border: '1px dashed mistyrose',
    width: '100%',
    padding: '10px'
  },
  row: {
  },
  cell: {
    display: 'table-cell',
    width: '30px',
    textAlign: 'center'
  },
  step: {
    display: 'table-cell',
    textAlign: 'justify',
    paddingRight: '15px',
    maxWidth: '525px',
    wordWrap: 'break-word'
  },
  container: {
    display: 'flex',
    marginBottom: '50px'
  },
  button: {
    marginLeft: '15px'
  }
};

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: '',
      icon: 'plus',
      disabled: true,
      steps: [],
      idx: null,
      editing: false
    };

    this.renderSteps = this.renderSteps.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.loadStep = this.loadStep.bind(this);
    this.editStep = this.editStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
  }

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let state = this.state;

    state.currentStep = value;
    state.disabled = !this.state.currentStep.length;
    this.setState(state);
  }

  addStep() {
    if (this.state.disabled) {
      return;
    }

    let state = this.state;
    if (state.editing) {
      this.editStep();
      return;
    }
    state.steps.push(state.currentStep);
    state.currentStep = '';
    state.disabled = true;
    this.props.onChange(state.steps);
    this.setState(state);
  }

  loadStep(idx) {
    let state = this.state;
    state.idx = idx;
    state.currentStep = state.steps[idx];
    state.editing = true;
    state.icon = 'check';
    this.setState(state);
  }

  removeStep(idx) {
    let state = this.state;
    state.steps.splice(idx, 1);
    this.setState(state);
  }

  editStep() {
    let state = this.state;
    let idx = this.state.idx;
    state.steps[idx] = state.currentStep;
    state.currentStep = '';
    state.idx = null;
    state.editing = false;
    state.disabled = true;
    state.icon = 'plus';
    this.props.onChange(state.steps);
    this.setState(state);
  }

  renderSteps() {
    if (!this.state.steps.length) {
      return null;
    }

    return (
      <div style={styles.ol}>
        <ol>
          {
            this.state.steps.map((step, idx) => {
              return (
                <li style={styles.row} key={idx}>
                  <span style={styles.step}>{step}</span>
                  <span onClick={this.loadStep.bind(this, idx)} style={styles.cell}><FontAwesome name="pencil"/></span>
                  <span onClick={this.removeStep.bind(this, idx)} style={styles.cell}><FontAwesome name="times"/></span>
                </li>
              );
            })
          }
        </ol>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <textarea
            style={styles.stepInput}
            name="step"
            value={this.state.currentStep}
            onChange={this.onChange}
            autoComplete="off"/>
          <div style={styles.button}>
            <Microbutton
              icon={this.state.icon}
              onClick={this.addStep}
              disabled={this.state.disabled}/>
          </div>
        </div>
        {this.renderSteps()}
      </div>
    );
  }
}

module.exports = Steps;
