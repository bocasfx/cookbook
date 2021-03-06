import React from 'react';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';
import SectionHeader from '../section-header.jsx';
import IngredientList from './ingredient-list.jsx';
import StepList from './step-list.jsx';

let styles = {
  title: {
    margin: '70px auto',
    display: 'table'
  },
  header: {
    margin: '25px 0 70px 0',
    width: '100%',
    display: 'table'
  },
  ingredients: {
    float: 'left',
    width: '50%'
  },
  image: {
    margin: '0',
    boxShadow: '0px 0px 1px 1px gainsboro',
    border: '7px solid white',
    float: 'right',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '250px',
    height: '250px'
  },
  body: {
    marginBottom: '70px'
  },
  notes: {
    fontFamily: '\'Anonymous Pro\', monospace',
    lineHeight: '2em',
    margin: '30px 0',
    textAlign: 'justify'
  },
  container: {
    margin: '50px 0'
  },
  translation: {
    textAlign: 'center',
    fontSize: '1.5em'
  }
};

class Recipe extends React.Component {
  renderImage() {
    if (this.props.recipe.image === '') {
      return null;
    }

    styles.image.backgroundImage = 'url(' + this.props.recipe.image + ')';

    return <div style={styles.image}></div>;
  }

  recipe() {
    if (!this.props.recipe || this.props.error) {
      return (
        <div style={styles.container}>
          <Spinner error={this.props.error} spin={!this.props.done} staticMessage="Nothing to see here. Try adding a recipe."/>
        </div>
      );
    }

    let recipesUrl = '/categories/' + this.props.recipe.category + '/recipes';
    let editUrl = recipesUrl + '/edit/' + this.props.recipe._id;
    let translation = this.props.recipe.translation ? '(' + this.props.recipe.translation + ')' : null;

    return (
      <div>
        <Subheader leftUrl={recipesUrl} leftLabel="Recipes" rightUrl={editUrl} rightLabel="Edit"/>
        <div style={styles.title}>
          <SectionHeader text={this.props.recipe.title} size="big"/>
          <div style={styles.translation}>{translation}</div>
        </div>
        <div style={styles.header}>
          <div style={styles.ingredients}>
            <SectionHeader text="Ingredients"/>
            <IngredientList
              ingredients={this.props.recipe.ingredients}
              editButton={false}
              removeButton={false}/>
          </div>
          {this.renderImage()}
        </div>
        <div style={styles.body}>
          <SectionHeader text="Preparation"/>
          <div style={styles.notes}>{this.props.recipe.notes}</div>
          <StepList
            steps={this.props.recipe.steps}
            editButton={false}
            removeButton={false}/>
          <div style={styles.notes}>{this.props.recipe.footnotes}</div>
        </div>
      </div>
    );
  }

  render() {
    return this.recipe();
  }
}

module.exports = Recipe;
