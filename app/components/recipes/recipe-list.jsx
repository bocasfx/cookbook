import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';
import SectionHeader from '../section-header.jsx';

const styles = {
  recipeListContainer: {
    margin: '50px auto'
  },
  recipeEntry: {
    margin: '0 0 0 40px'
  },
  section: {
    marginTop: '50px'
  },
  sectionHeader: {
    margin: '50px auto',
    display: 'table'
  },
  gt: {
    backgroundColor: 'mistyrose',
    padding: '6px 16px 6px 4px',
    fontSize: '0.5em',
    fontWeight: 'bolder',
    position: 'absolute',
    top: '7px',
    left: '5px',
    clipPath: 'polygon(100% 50%, 100% 50%, 0 100%, 0 0)'
  }
};

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.recipeIndex = this.recipeIndex.bind(this);
    this.recipes = this.recipes.bind(this);
  }

  recipes(key) {

    return (
      <ul className="recipeList">
        {
          this.props.recipeIdx[key].map((recipe) => {
            let label = capitalize(recipe.title);
            if (recipe.translation) {
              label = label + ' (' + capitalize(recipe.translation) + ')';
            }
            let url = '/recipes/' + recipe._id;
            return (
              <li key={recipe._id}>
                <Link to={url}>
                  <span style={styles.gt}>&gt;</span>
                  <div style={styles.recipeEntry}>{label}</div>
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
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
          <div>{this.recipes(key)}</div>
        </div>
      );
    });
  }

  render() {
    let newUrl = this.props.baseUrl + '/new';
    return (
      <div>
        <Subheader leftUrl='/' leftLabel="Categories" rightUrl={newUrl} rightLabel="Add Recipe"/>
         <div style={styles.sectionHeader}>
          <SectionHeader text="Recipes" size="big"/>
        </div>
        <div style={styles.recipeListContainer}>
          {this.recipeIndex()}
        </div>
      </div>
    );
  }
}

module.exports = RecipeList;
