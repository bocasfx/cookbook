import React from 'react';
import request from 'superagent';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import Subheader from '../subheader.jsx';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        imagePath: '',
        title: '',
        ingredients: '',
        description: ''
      }
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

    let editUrl = '/categories/' + this.props.params.categoryid + '/recipes/edit/' + this.props.params.recipeid;
    let headerStyle = {
      backgroundImage: 'url(' + this.state.recipe.imagePath + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '300px',
      height: '200px'
    };

    let recipesUrl = '/categories/' + this.props.params.categoryid + '/recipes';

    return (
      <div>
        <Subheader leftUrl={recipesUrl} leftLabel="Recipes" rightUrl={editUrl} rightLabel="Edit"/>
        <div className="sectionBody">
          <div className="recipeTitle">{this.state.recipe.title}</div>
          <div className="recipeHeader" >
            <div className="recipeIngredients">
              <h2>Ingredients</h2>
              <pre className="preFormatted">{this.state.recipe.ingredients}</pre>
            </div>
            <div className="recipeImage" style={headerStyle}></div>
          </div>
          <div className="recipeBody">
            <h2 className="recipeDescription">Preparation</h2>
            <pre className="preFormatted">{this.state.recipe.description}</pre>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Recipe;
