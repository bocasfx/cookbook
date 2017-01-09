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
      ingredients: '',
      description: '',
      images: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let image = this.state.images[0];

    request.post('/api/v1/recipes')
      .attach('image', image, image.name)
      .field('title', this.state.title)
      .field('category', this.state.category)
      .field('ingredients', this.state.ingredients)
      .field('description', this.state.description)
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

  onDrop(acceptedFiles) {
    let state = this.state;
    state.images = acceptedFiles;
    this.setState(state);
  }

  render() {
    return (
      <RecipeForm 
        title={this.state.title}
        category={this.state.category}
        ingredients={this.state.ingredients}
        description={this.state.description}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        images={this.state.images}
      />
    );
  }
}

module.exports = New;
