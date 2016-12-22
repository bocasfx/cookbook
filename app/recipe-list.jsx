import React from 'react';
import { Link } from 'react-router';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.recipes.map((recipe)=> {
            let recipeUrl = '/recipes/' + recipe._id;
            return <Link key={recipe._id} to={recipeUrl}><div>{recipe.title}</div></Link>;
          })
        }
      </div>
    );
  }
}

module.exports = RecipeList;
