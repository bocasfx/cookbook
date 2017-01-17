import React from 'react';
import Subheader from '../subheader.jsx';

let styles = {
  title: {
    fontSize: '3em',
    margin: '50px 0 70px 0',
    textAlign: 'center'
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
    margin: '25px 0 70px 0',
    boxShadow: '2px 2px 7px 0px rgba(117,117,117,1)',
    border: '7px solid white',
    float: 'right',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '300px',
    height: '200px'
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
  }
};

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

  getImageStyle() {
    let imageStyle = JSON.parse(JSON.stringify(styles.image));
    imageStyle.backgroundImage = 'url(' + this.props.recipe.imagePath + ')';
    return imageStyle;
  }

  render() {
    return (
      <div>
        <Subheader leftUrl={this.props.recipesUrl} leftLabel="Recipes" rightUrl={this.props.editUrl} rightLabel="Edit"/>
        <div style={styles.title}>{this.props.recipe.title}</div>
        <div style={styles.header}>
          <div style={styles.ingredients}>
            <h2>Ingredients</h2>
            <pre style={styles.preFormatted}>{this.props.recipe.ingredients}</pre>
          </div>
          <div style={this.getImageStyle()}></div>
        </div>
        <div style={styles.body}>
          <h2 style={styles.description}>Preparation</h2>
          <pre style={styles.preFormatted}>{this.props.recipe.description}</pre>
        </div>
      </div>
    );
  }
}

module.exports = Recipe;
