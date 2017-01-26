import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';
import SectionHeader from '../section-header.jsx';

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
  },
  recipeEntry: {
    fontSize: '1.5em',
    margin: '15px 0 0 40px'
  },
  section: {
    marginTop: '30px'
  }
};

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.recipeIndex = this.recipeIndex.bind(this);
    this.recipes = this.recipes.bind(this);
  }

  recipes(key) {

    return this.props.recipeIdx[key].map((recipe) => {
      let label = capitalize(recipe.title);
      let url = '/recipes/' + recipe._id;
      return (
        <div style={styles.recipeEntry} key={recipe._id}>
          <Link to={url}>{label}</Link>
        </div>
      );
    });
  }

  recipeIndex() {
    
    if (!this.props.recipeIdx || this.props.error) {
      return <Spinner error={this.props.error} spin={!this.props.done} staticMessage="Nothing to see here. Try adding a recipe."/>;
    }

    let recipeIdx = this.props.recipeIdx;

    return Object.keys(recipeIdx).map((key) => {
      return(
        <div style={styles.section} key={key}>
          <SectionHeader text={key}/>
          <div>
            {this.recipes(key)}
          </div>
        </div>
      );
    });
  }

  render() {
    let newUrl = this.props.baseUrl + '/new';
    return (
      <div>
        <Subheader leftUrl='/' leftLabel="Categories" rightUrl={newUrl} rightLabel="Add Recipe"/>
        <div style={styles.recipeList}>
          {this.recipeIndex()}
        </div>
      </div>
    );
  }
}

module.exports = RecipeList;
