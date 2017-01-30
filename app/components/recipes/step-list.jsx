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
    maxWidth: '500px',
    wordWrap: 'break-word'
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

    return (
      <div style={styles.ol}>
        <ol>
          {
            this.props.steps.map((step, idx) => {
              return (
                <li style={styles.row} key={idx}>
                  <span style={styles.step}>{step}</span>
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
