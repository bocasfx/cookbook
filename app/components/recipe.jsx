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

    let editUrl = '/edit/' + this.props.params.recipeid;
    let headerStyle = {
      backgroundImage: 'url(' + this.state.recipe.imagePath + ')'
    };

    return (
      <div>
        <div className="recipeHeader" >
          <div className="recipeTitle">{this.state.recipe.title}</div>
          <Link to={editUrl}><FontAwesome className="editIcon" name='pencil'/></Link>
        </div>
        <div className="recipeImage" style={headerStyle}></div>
        <div className="recipeBody">
          <h2>Ingredients</h2>
          <pre className="preFormatted">{this.state.recipe.ingredients}</pre>
          <h2 className="recipeDescription">Description</h2>
          <pre className="preFormatted">{this.state.recipe.description}</pre>
        </div>
      </div>
    );
  }
}

module.exports = Recipe;
