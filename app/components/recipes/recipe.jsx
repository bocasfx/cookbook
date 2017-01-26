import React from 'react';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';
import SectionHeader from '../section-header.jsx';

let styles = {
  title: {
    margin: '70px auto',
    display: 'table'
  },
  header: {
    margin: '25px 0',
    width: '100%',
    display: 'table'
  },
  ingredients: {
    float: 'left',
    maxWidth: '50%'
  },
  image: {
    margin: '0 0 70px 0',
    boxShadow: '2px 2px 7px 0px rgba(117,117,117,1)',
    border: '7px solid white',
    float: 'right',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '300px',
    height: '300px'
  },
  body: {
    marginBottom: '70px'
  },
  description: {
    marginTop: '50px'
  },
  preFormatted: {
    fontFamily: '\'Anonymous Pro\', monospace',
    fontSize: '0.9em',
    lineHeight: '2em'
  },
  container: {
    margin: '50px 0'
  }
};

class Recipe extends React.Component {
  getImageStyle() {
    let imageStyle = JSON.parse(JSON.stringify(styles.image));
    imageStyle.backgroundImage = 'url(' + this.props.recipe.image + ')';
    return imageStyle;
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

    return (
      <div>
        <Subheader leftUrl={recipesUrl} leftLabel="Recipes" rightUrl={editUrl} rightLabel="Edit"/>
        <div style={styles.title}>
          <SectionHeader text={this.props.recipe.title} size="big"/>
        </div>
        <div style={styles.header}>
          <div style={styles.ingredients}>
            <SectionHeader text="Ingredients"/>
            <pre style={styles.preFormatted}>{this.props.recipe.ingredients}</pre>
          </div>
          <div style={this.getImageStyle()}></div>
        </div>
        <div style={styles.body}>
          <SectionHeader text="Preparation"/>
          <pre style={styles.preFormatted}>{this.props.recipe.description}</pre>
        </div>
      </div>
    );
  }

  render() {
    return this.recipe();
  }
}

module.exports = Recipe;
