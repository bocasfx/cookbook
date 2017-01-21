import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import FontAwesome from 'react-fontawesome';

const styles = {
  recipeList: {
    margin: '50px auto'
  },
  nothing: {
    fontSize: '2em'
  }
};

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes() {
    if (!this.props.done) {
      return <FontAwesome name="cog" size="2x" spin/>;
    }

    if (!this.props.recipes.length && this.props.done) {
      return <div style={styles.nothing}>Nothing to see here. Try adding a recipe.</div>;
    }
    
    return this.props.recipes.map((recipe)=> {
      let label = capitalize(recipe.title);
      let url = this.props.baseUrl + '/' + recipe._id;
      return (
        <li key={recipe._id}>
          <Link to={url}>{label}</Link>
        </li>
      );
    });
  }

  render() {
    let newUrl = this.props.baseUrl + '/new';
    return (
      <div>
        <Subheader rightUrl={newUrl} rightLabel="Add Recipe"/>
        <ul style={styles.recipeList}>
          {this.getRecipes()}
        </ul>
      </div>
    );
  }
}

module.exports = RecipeList;
