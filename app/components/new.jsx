import React from 'react';
import _ from 'lodash';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RecipeForm from './recipe-form.jsx';


class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      description: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newRecipe = [this.state];
    request.post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .send(newRecipe)
      .end((err) => {
        browserHistory.push('/');
      });
  }

  handleChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    this.setState(state);
  }

  render() {
    return (
      <RecipeForm 
        title={this.state.title}
        category={this.state.category}
        description={this.state.description}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

module.exports = New;
