import React from 'react';
import RecipeList from './recipe-list.jsx';

class RecipeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch('/recipes').then((response)=> {
      return response.json();
    }).then((json)=> {
      this.setState({
        recipes: json
      });
    });
  }

  render() {
    return (
      <RecipeList recipes={this.state.recipes}/>
    );
  }
}

module.exports = RecipeListContainer;
