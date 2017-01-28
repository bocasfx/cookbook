import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Button from '../button.jsx';
import Toaster from '../toaster.jsx';

const styles = {
  buttonBar: {
    float: 'right'
  },
  container: {
    margin: '70px 0'
  }, 
  title: {
    float: 'left',
    marginBottom: '25px'
  },
  input: {
    width: '100%',
    paddingLeft: '7px'
  }
};

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categoryList: [],
      error: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.fetchCategoryList = this.fetchCategoryList.bind(this);

    this.keyDelay = 500;
    this.lastKeyStroke = 0;
  }

  onSubmit(event) {
    event.preventDefault();
    let payload = {
      category: this.state.category.toLowerCase(),
      token: sessionStorage.getItem('accessToken')
    };
    request.post(this.props.categoriesUrl)
      .send(payload)
      .end((err) => {
        if (err && err.status === 403) {
          browserHistory.push('/login');
          return;
        }
        browserHistory.push('/');
      });
  }

  onChange(event) {
    event.preventDefault();
    let category = event.target.value;

    this.setState({
      category: category
    });

    if (category === '') {
      this.setState({
        category,
        categoryList: []
      });
      return;
    }

    let elapsedTime = Date.now() - this.lastKeyStroke;

    if (elapsedTime < this.keyDelay && category.length > 1) {
      clearTimeout(this.timeout);
    }

    this.lastKeyStroke = Date.now();
    this.timeout = setTimeout(this.fetchCategoryList.bind(this, category), this.keyDelay);
  }

  fetchCategoryList(category) {
    category = category.toLowerCase();
    request
      .get(this.props.categoriesUrl + category)
      .set('Accept', 'application/json')
      .send({category})
      .end((err, response)=> {
        if (err) {
          return this.setState({
            error: true,
            errorMessage: 'Oops... Something went wrong.'
          });
        }
        this.setState({
          category,
          categoryList: response.body,
          error: false
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
    let disabled = this.state.categoryList.length || !this.state.category.length || this.state.error;
    let errorMessage = '';

    if (this.state.categoryList.length) {
      errorMessage = <Toaster message="A category with that name already exists."/>;
    }

    if (this.state.error) {
      errorMessage = <Toaster message={this.state.errorMessage}/>;
    }

    return (
      <div style={styles.container}>
        {errorMessage}
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
      </div>
    );
  }
}

module.exports = NewCategory;
