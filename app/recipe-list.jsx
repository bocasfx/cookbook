import React from 'react';

class RecipeList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.recipes.map((recipe)=> {
            return <div key={recipe._id}>{recipe.title}</div>
          })
        }
      </div>
    );
  }
}

module.exports = RecipeList;
