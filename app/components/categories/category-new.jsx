import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Button from '../button.jsx';

const styles = {
  buttonBar: {
    float: 'right'
  },
  warning: {
    position: 'fixed',
    width: 'auto',
    marginTop: '25px',
    color: 'coral'
  },
  container: {
    margin: '70px 0'
  }, 
  title: {
    float: 'left',
    marginBottom: '25px'
  },
  input: {
    width: '100%'
  }
};

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categoryList: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    request.post(this.props.categoriesUrl)
      .send(this.state)
      .end((err) => {
        browserHistory.push('/');
      });
  }

  onChange(event) {
    event.preventDefault();
    let category = event.target.value;

    if (category === '') {
      this.setState({
        category,
        categoryList: []
      });
      return;
    }

    request
      .get(this.props.categoriesUrl + category)
      .set('Accept', 'application/json')
      .send({category})
      .end((err, response)=> {
        this.setState({
          category,
          categoryList: response.body
        });
      });
  }

  componentDidMount() {
    this.textInput.focus();
  }

  onCancel(event) {
    event.preventDefault();
    browserHistory.push(this.props.cancelUrl);
  }

  render() {
    let disabled = this.state.categoryList.length || !this.state.category.length;
    let warningMessage = '';

    if (this.state.categoryList.length) {
      warningMessage = 'Category already exists';
    }

    return (
      <div>
        <div style={styles.container}>
          <span style={styles.title}>New category </span>
          <input 
            ref={(input) => {
              this.textInput = input;
            }}
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.onChange}
            autoComplete="off"
            style={styles.input}/>
          <div style={styles.buttonBar}>
            <Button type="button" value="Cancel" onClick={this.onCancel}/>
            <Button type="submit" value="Add" onClick={this.onSubmit} disabled={disabled}/>
          </div>
          <div style={styles.warning}>{warningMessage}</div>
        </div>
      </div>
    );
  }
}

module.exports = NewCategory;
