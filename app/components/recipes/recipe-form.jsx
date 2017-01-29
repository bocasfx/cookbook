import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import Button from '../button.jsx';
import Ingredient from './ingredient.jsx';

const styles = {
  formEntry: {
    marginTop: '50px'
  },
  dropzone: {
    width: '300px',
    height: '200px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 0px 1px 1px gainsboro',
    border: '7px solid white',
    backgroundColor: '#eee'
  },
  image: {
    maxHeight: '190px'
  },
  icon: {
    fontSize: '2em'
  },
  buttonBar: {
    textAlign: 'right'
  },
  textArea: {
    width: '100%',
    height: '200px'
  },
  table: {
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Anonymous Pro", monospace',
    border: '1px dashed mistyrose',
    width: '100%',
    padding: '10px'
  },
  tr: {
    verticalAlign: 'top'
  },
  ammount: {
    maxWidth: '50px',
    wordWrap: 'break-word'
  },
  units: {
    maxWidth: '50px',
    wordWrap: 'break-word'
  },
  ingredient: {
    wordWrap: 'break-word'
  }
};

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.showImage = this.showImage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.getRef = this.getRef.bind(this);
    this.getIngredientList = this.getIngredientList.bind(this);
    this.onAddIngredient = this.onAddIngredient.bind(this);
  }

  showImage() {
    let image = this.props.recipe.image;

    if (!image) {
    return (
        <div style={styles.image}><FontAwesome style={styles.icon} name='picture-o'/></div>
      );
    }

    let imageSrc = '';

    if (typeof image === 'string') {
      imageSrc = image;
    } else {
      imageSrc = image.preview;
    }

    let imgStyle = {
      backgroundImage: 'url(' + imageSrc + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '300px',
      height: '200px'
    };

    return (
      <div name="image" style={imgStyle}></div>
    );
    
  }

  onCancel() {
    browserHistory.push(this.props.cancelUrl);
  }

  getRef(node) { 
    this.dropzone = node; 
  }

  getIngredientList() {
    return (
      <table style={styles.table}>
        <tbody>
          {
            this.props.recipe.ingredients.map((ingredient, idx) => {
              return (
                <tr key={idx} style={styles.tr}>
                  <td style={styles.ammount}>{ingredient.ammount}</td>
                  <td style={styles.units}>{ingredient.units}</td>
                  <td style={styles.ingredient}>{ingredient.ingredient}</td>
                  <td onClick={this.props.onRemoveIngredient.bind(this, idx)}><FontAwesome name="times"/></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  onAddIngredient(ingredient) {
    this.props.onAddIngredient(ingredient);
  }

  render() {
    return (
      <div>
        <div style={styles.formEntry}>
          <h2>Title</h2>
          <input name="title" type="text" value={this.props.recipe.title} onChange={this.props.handleChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Image</h2>
          <Dropzone style={styles.dropzone} ref={this.getRef} onDrop={this.props.onDrop}>
            {this.showImage()}
          </Dropzone>
        </div>
        <div style={styles.formEntry}>
          <h2>Ingredients</h2>
          <Ingredient onAddIngredient={this.onAddIngredient}/>
          {this.getIngredientList()}
        </div>
        <div style={styles.formEntry}>
          <h2>Description</h2>
          <textarea name="description" type="text" style={styles.textArea} value={this.props.recipe.description} onChange={this.props.handleChange}/>
        </div>
        <div style={styles.buttonBar}>
          <Button type="button" value="Cancel" onClick={this.onCancel}/>
          <Button type="submit" value={this.props.submitLabel} onClick={this.props.handleSubmit} disabled={this.props.disabled}/>
        </div>
      </div>
    );
  }
}

module.exports = RecipeForm;
