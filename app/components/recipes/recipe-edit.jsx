import React from 'react';
import RecipeForm from './recipe-form.jsx';
import request from 'superagent';
import { browserHistory } from 'react-router';

class RecipeEdit extends React.Component {
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

  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        let recipe = response.body[0];
        this.setState({
          title: recipe.title,
          category: recipe.category,
          ingredients: recipe.ingredients,
          description: recipe.description,
          images: [recipe.imagePath]
        });
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

  handleSubmit(event) {
    event.preventDefault();

    let image = this.state.images[0];

    request.patch('/api/v1/recipes/' + this.props.params.recipeid)
      .attach('image', image, image.name)
      .field('title', this.state.title)
      .field('category', this.state.category)
      .field('ingredients', this.state.ingredients)
      .field('description', this.state.description)
      .end((err) => {
        browserHistory.push('/categories/' + this.state.category + '/recipes/' + this.props.params.recipeid);
      });
  }

  onDrop(acceptedFiles) {
    let state = this.state;
    state.images = acceptedFiles;
    this.setState(state);
  }

  render() {
    let cancelUrl = '/categories/' + this.state.category + '/recipes/' + this.props.params.recipeid;
    return (
      <RecipeForm 
        title={this.state.title}
        ingredients={this.state.ingredients}
        description={this.state.description}
        images={this.state.images}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        cancelUrl={cancelUrl}
        submitLabel="Save"/>
    );
  }
}

module.exports = RecipeEdit;
