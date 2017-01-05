import React from 'react';
import Ingredient from './ingredient.jsx';
import Step from './step.jsx';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        
        <h1>New Recipe</h1>
        
        <form onSubmit={this.props.handleSubmit}>

          <div>
            <h2>Title</h2>
            <input name="title" type="text" value={this.props.title} onChange={this.props.handleChange}/>
          </div>

          <div>
            <h2>Category</h2>
            <input name="category" type="text" className="categoryInput" value={this.props.category}  onChange={this.props.handleChange}/>
          </div>

          <div className="ingredientsHeader">
            <h2>Ingredients</h2>
            <span onClick={this.props.addIngredient}>+</span>
          </div>

          {
            this.props.ingredients.map((ingredient, idx) => {
              let closeBtn = idx !== 0;
              return <Ingredient 
                        key={idx}
                        idx={idx}
                        ammount={ingredient.ammount}
                        units={ingredient.units}
                        ingredient={ingredient.ingredient} 
                        closeBtn={closeBtn}
                        onChange={this.props.handleIngredientsChange}/>;
            })
          }

          <div className="stepsHeader">
            <h2>Steps</h2>
            <span onClick={this.props.addStep}>+</span>
          </div>

          {
            this.props.steps.map((step, idx) => {
              let closeBtn = idx !== 0;
              return <Step
                        key={idx}
                        idx={idx}
                        description={step.description}
                        closeBtn={closeBtn}
                        onChange={this.props.handleStepsChange}/>;
            })
          }
          
          <input type="submit" className="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = RecipeForm;
