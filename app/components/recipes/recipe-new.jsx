import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RecipeForm from './recipe-form.jsx';
import assert from 'assert';

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: props.params.categoryid,
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
      .set('x-access-token', sessionStorage.getItem('accessToken'))
      .field({
        title: this.state.title,
        category: this.state.category,
        ingredients: this.state.ingredients,
        description: this.state.description
      })
      .end((err, response) => {
        assert.equal(err, null);
        let recipeId = response.body._id;
        browserHistory.push('/categories/' + this.state.category + '/recipes/' + recipeId);
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
    let cancelUrl = '/categories/' + this.state.category + '/recipes';
    return (
      <RecipeForm 
        title={this.state.title}
        ingredients={this.state.ingredients}
        description={this.state.description}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        images={this.state.images}
        cancelUrl={cancelUrl}
        submitLabel="Add"/>
    );
  }
}

module.exports = NewRecipe;
