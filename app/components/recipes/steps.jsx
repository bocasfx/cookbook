import React from 'react';
import Microbutton from '../microbutton.jsx';
import StepList from './step-list.jsx';

const styles = {
  stepInput: {
    width: '575px',
    height: '180px'
  },
  container: {
    display: 'flex',
    marginBottom: '50px'
  },
  button: {
    marginLeft: '15px'
  },
  dashed: {
    border: '1px dashed mistyrose'
  }
};

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: '',
      icon: 'plus',
      disabled: true,
      steps: props.steps,
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
      <div style={styles.dashed}>
        <StepList
          steps={this.state.steps}
          loadStep={this.loadStep}
          removeStep={this.removeStep}
          editButton={true}
          removeButton={true}/>
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
