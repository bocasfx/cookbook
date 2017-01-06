import React from 'react';
import RecipeForm from './recipe-form.jsx';
import request from 'superagent';
import { browserHistory } from 'react-router';

class Edit extends React.Component {
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

  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        let recipe = response.body[0];
        this.setState({
          title: recipe.title,
          category: recipe.category,
          description: recipe.description
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
    let updatedRecipe = this.state;
    request.patch('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Content-Type', 'application/json')
      .send(updatedRecipe)
      .end((err) => {
        browserHistory.push('/recipes/' + this.props.params.recipeid);
      });
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

module.exports = Edit;
