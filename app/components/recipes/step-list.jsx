import React from 'react';
import FontAwesome from 'react-fontawesome';

const styles = {
  ol: {
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Anonymous Pro", monospace',
    width: '100%',
    padding: '10px'
  },
  row: {
    marginBottom: '30px'
  },
  cell: {
    display: 'inline-block',
    width: '30px',
    textAlign: 'center'
  },
  step: {
    display: 'block',
    textAlign: 'justify',
    paddingRight: '15px',
    width: '500px',
    wordWrap: 'break-word',
    verticalAlign: 'top'
  }
};

class StepList extends React.Component {

  editButton(idx) {
    if (!this.props.editButton) {
      return null;
    }

    return (
      <span onClick={this.props.loadStep.bind(this, idx)} style={styles.cell}><FontAwesome name="pencil"/></span>
    );
  }

  removeButton(idx) {
    if (!this.props.removeButton) {
      return null;
    }

    return (
      <span onClick={this.props.removeStep.bind(this, idx)} style={styles.cell}><FontAwesome name="times"/></span>
    );
  }

  render() {
    if (!this.props.steps.length) {
      return null;
    }

    let stepStyle = styles.step;

    if (this.props.editButton || this.props.removeButton) {
      stepStyle.display = 'inline-block';
    }

    return (
      <div style={styles.ol}>
        <ol>
          {
            this.props.steps.map((step, idx) => {
              return (
                <li style={styles.row} key={idx}>
                  <span style={stepStyle}>{step}</span>
                  {this.editButton(idx)}
                  {this.removeButton(idx)}
                </li>
              );
            })
          }
        </ol>
      </div>
    );
  }
}

module.exports = StepList;
