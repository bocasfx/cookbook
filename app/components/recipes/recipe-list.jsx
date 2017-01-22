import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';

const styles = {
  recipeList: {
    margin: '50px auto'
  },
  nothing: {
    fontSize: '2em'
  },
  spinner: {
    fontSize: '1.2em',
    color: 'gainsboro',
    border: '1px dashed gainsboro',
    padding: '10px 12px',
    borderRadius: '50px'
  }
};

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes() {
    
    if (!this.props.done) {
      return <Spinner message="Food will be ready soon..." spin={true}/>;
    }

    if (!this.props.recipes.length && this.props.done) {
      return <Spinner message="Nothing to see here. Try adding a recipe." spin={false}/>;
    }
    
    return this.props.recipes.map((recipe)=> {
      let label = capitalize(recipe.title);
      let url = this.props.baseUrl + '/' + recipe._id;
      return (
        <li key={recipe._id}>
          <Link to={url}>{label}</Link>
        </li>
      );
    });
  }

  render() {
    let newUrl = this.props.baseUrl + '/new';
    return (
      <div>
        <Subheader rightUrl={newUrl} rightLabel="Add Recipe"/>
        <ul style={styles.recipeList}>
          {this.getRecipes()}
        </ul>
      </div>
    );
  }
}

module.exports = RecipeList;
