import React from 'react';
import request from 'superagent';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }
  
  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          recipe: response.body[0]
        });
      });
  }

  render() {
    if (!this.state.recipe.ingredients) {
      return null;
    }

    let editUrl = '/edit/' + this.props.params.recipeid;

    return (
      <div>
        <div className="recipeHeader">
          <span className="recipeTitle">{this.state.recipe.title}</span>
          <Link to={editUrl}><FontAwesome className="editIcon" name='pencil'/></Link>
        </div>
        <ul className="ingredients">
        {
          this.state.recipe.ingredients.map((ingredient, idx)=> {
            return (
              <li key={idx}>
                <span className="ammount">{ingredient.ammount}</span>
                <span className="units">{ingredient.units}</span>
                <span className="ingredient">{ingredient.ingredient}</span>
              </li>
            );
          })
        }
        </ul>
        <ol className="steps">
        {
          this.state.recipe.steps.map((step, idx)=> {
            return (
              <li key={idx}>
                <span>{step.description}</span>
              </li>
            );
          })
        }
        </ol>
      </div>
    );
  }
}

module.exports = Recipe;
