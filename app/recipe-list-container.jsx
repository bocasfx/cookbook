import React from 'react';
import RecipeList from './recipe-list.jsx';

class RecipeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch('/recipes').then((response)=> {
      return response.json();
    }).then((json)=> {
      this.setState({
        categories: json
      });
    });
  }

  render() {
    return (
      <RecipeList categories={this.state.categories}/>
    );
  }
}

module.exports = RecipeListContainer;
