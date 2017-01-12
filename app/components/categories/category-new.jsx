import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categoryList: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    request.post('/api/v1/categories')
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
      .get('/api/v1/categories/' + category)
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
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    let disabled = {};
    let className = 'submit';
    let warningMessage = '';

    if (this.state.categoryList.length || !this.state.category.length) {
      disabled = {
        disabled: 'disabled'
      };

      className = 'submit disabled';
    }

    if (this.state.categoryList.length) {
      warningMessage = 'Category already exists';
    }

    return (
      <div className="NewCategory">
        <form onSubmit={this.onSubmit}>
          <span>New category </span>
          <input 
            ref={(input) => {
              this.textInput = input;
            }}
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.onChange}
            autoComplete="off"/>
          <div><input type="submit" className={className} value="Add" {...disabled}/></div>
        </form>
        <div className="warning">{warningMessage}</div>
      </div>
    );
  }
}

module.exports = NewCategory;
