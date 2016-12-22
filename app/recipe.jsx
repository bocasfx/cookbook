import React from 'react';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recipe: {}
    };
  }
  
  componentDidMount() {
    fetch('/recipes/' + this.props.params.recipeid).then((response)=> {
      return response.json();
    }).then((json)=> {
      this.setState({
        recipe: json[0]
      });
    });
  }

  render() {
    if (!this.state.recipe.ingredients) {
      return null;
    }

    return (
      <div>
        <div>{this.state.recipe.title}</div>
        <ul>
        {
          this.state.recipe.ingredients.map((ingredient, idx)=> {
            return (
              <li key={idx}>
                <span>{ingredient.ammount}</span>
                <span>{ingredient.units}</span>
                <span>{ingredient.ingredient}</span>
              </li>
            );
          })
        }
        </ul>
        <ul>
        {
          this.state.recipe.steps.map((step, idx)=> {
            return (
              <li key={idx}>
                <span>{step.description}</span>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

module.exports = Recipe;
