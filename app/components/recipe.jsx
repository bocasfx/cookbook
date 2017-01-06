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

    return (
      <div>
        <div className="recipeHeader">
          <span className="recipeTitle">{this.state.recipe.title}</span>
          <Link to={editUrl}><FontAwesome className="editIcon" name='pencil'/></Link>
        </div>
        <pre className="preFormatted">{this.state.recipe.description}</pre>
      </div>
    );
  }
}

module.exports = Recipe;
