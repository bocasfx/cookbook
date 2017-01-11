import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import request from 'superagent';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/categories/' + this.props.params.categoryid + '/recipes')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          recipes: response.body
        });
      });
  }

  onGetData(docs) {
    this.setState({
      recipes: docs
    });
  }

  render() {
    return (
      <div className="recipeList">
        <ul>
          {
            this.state.recipes.map((recipe)=> {
              let label = capitalize(recipe.title);
              let url = '/recipes/' + recipe._id;
              return (
                <li key={recipe._id}>
                  <Link to={url} className="recipe">{label}</Link>
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
