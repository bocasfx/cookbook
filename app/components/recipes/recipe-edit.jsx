import React from 'react';
import RecipeForm from './recipe-form.jsx';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Spinner from '../spinner.jsx';

const styles = {
  container: {
    margin: '50px 0'
  }
};

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      error: false,
      done: false,
      disabled: false
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
        if (err) {
          return this.setState({
            error: true,
            done: true
          });
        }
        this.setState({
          recipe: response.body[0]
        });
      });
  }

  handleChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state.recipe[name] = value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let image = this.state.recipe.image;

    request.patch('/api/v1/recipes/' + this.props.params.recipeid)
      .attach('image', image, image.name)
      .field('title', this.state.recipe.title)
      .field('category', this.state.recipe.category)
      .field('ingredients', this.state.recipe.ingredients)
      .field('description', this.state.recipe.description)
      .end((err) => {
        if (err) {
          return this.setState({
            error: true,
            done: true
          });
        }
        this.setState({
          done: true
        });
        browserHistory.push('/recipes/' + this.props.params.recipeid);
      });
  }

  onDrop(acceptedFiles) {
    let state = this.state;
    state.recipe.image = acceptedFiles[0];
    this.setState(state);
  }

  render() {
    if (!this.state.recipe || this.error) {
      return (
        <div style={styles.container}>
          <Spinner error={this.props.error} spin={!this.props.done} staticMessage="Nothing to see here. Try adding a recipe."/>
        </div>
      );
    }

    let cancelUrl = '/categories/' + this.state.category + '/recipes/' + this.props.params.recipeid;
    return (
      <RecipeForm 
        recipe={this.state.recipe}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        cancelUrl={cancelUrl}
        submitLabel="Save"
        error={this.state.error}
        done={this.state.done}
        disabled={this.state.disabled}/>
    );
  }
}

module.exports = RecipeEdit;
