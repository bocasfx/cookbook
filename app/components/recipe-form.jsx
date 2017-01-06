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
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <h2>Title</h2>
            <input name="title" type="text" value={this.props.title} onChange={this.props.handleChange}/>
          </div>
          <div>
            <h2>Category</h2>
            <input name="category" type="text" className="categoryInput" value={this.props.category}  onChange={this.props.handleChange}/>
          </div>
          <textarea name="description" type="text" className="recipeTextArea" value={this.props.description} onChange={this.props.handleChange}/>
          <input type="submit" className="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = RecipeForm;
