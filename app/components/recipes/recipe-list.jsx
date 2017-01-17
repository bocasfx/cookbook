import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';

const styles = {
  recipeList: {
    margin: '50px auto'
  }
};

class RecipeList extends React.Component {
  render() {
    let newUrl = this.props.baseUrl + '/new';
    return (
      <div>
        <Subheader rightUrl={newUrl} rightLabel="Add Recipe"/>
        <ul style={styles.recipeList}>
          {
            this.props.recipes.map((recipe)=> {
              let label = capitalize(recipe.title);
              let url = this.props.baseUrl + '/' + recipe._id;
              return (
                <li key={recipe._id}>
                  <Link to={url}>{label}</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = RecipeList;
