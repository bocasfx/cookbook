import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import Button from '../button.jsx';
import Ingredients from './ingredients.jsx';
import Steps from './steps.jsx';
import Dropdown from 'react-dropdown'

const styles = {
  formEntry: {
    marginTop: '50px'
  },
  dropzone: {
    width: '250px',
    height: '250px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 0px 1px 1px gainsboro',
    border: '7px solid white',
    backgroundColor: '#eee'
  },
  image: {
    maxHeight: '250px'
  },
  icon: {
    fontSize: '2em'
  },
  buttonBar: {
    textAlign: 'right',
    marginTop: '30px'
  },
  textArea: {
    width: '100%',
    height: '200px'
  },
  imageContainer: {
    position: 'relative'
  },
  removeImage: {
    position: 'absolute',
    left: '248px',
    top: '-20px',
    padding: '7px 8px',
    backgroundColor: 'white',
    border: '1px solid gainsboro',
    borderRadius: '20px',
    cursor: 'pointer'
  }
};

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.showImage = this.showImage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.getRef = this.getRef.bind(this);
    this.removeImageButton = this.removeImageButton.bind(this);
    this.getInitialCategory = this.getInitialCategory.bind(this);
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
      width: '250px',
      height: '250px'
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

  removeImageButton() {
    if (this.props.recipe.image === '') {
      return null;
    }

    return (
      <div style={styles.removeImage} onClick={this.props.onRemoveImage}>
        <FontAwesome name="times"/>
      </div>
    );
  }

  getInitialCategory() {
    let selectedOption = this.props.categories[0];
    this.props.categories.forEach((category) => {
      if (category.value === this.props.recipe.category) {
        selectedOption = category;
      }
    });
    return selectedOption;
  }

  render() {
    return (
      <div>
        <div style={styles.formEntry}>
          <h2>Title</h2>
          <input name="title" type="text" value={this.props.recipe.title} onChange={this.props.onChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Translation</h2>
          <input name="translation" type="text" value={this.props.recipe.translation} onChange={this.props.onChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Category</h2>
          <Dropdown options={this.props.categories} onChange={this.props.onCategoryChange} value={this.getInitialCategory()} placeholder="Category" />
        </div>
        <div style={styles.formEntry}>
          <h2>Image</h2>
          <div style={styles.imageContainer}>
            <Dropzone style={styles.dropzone} ref={this.getRef} onDrop={this.props.onDrop}>
              {this.showImage()}
            </Dropzone>
            {this.removeImageButton()}
          </div>
        </div>
        <div style={styles.formEntry}>
          <h2>Notes</h2>
          <textarea name="notes" style={styles.textArea} value={this.props.recipe.notes} onChange={this.props.onChange}/> 
        </div>
        <div style={styles.formEntry}>
          <h2>Ingredients</h2>
          <Ingredients
            ingredients={this.props.recipe.ingredients}
            onChange={this.props.onIngredientsChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Steps</h2>
          <Steps
            steps={this.props.recipe.steps}
            onChange={this.props.onStepsChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Footnotes</h2>
          <textarea name="footnotes" style={styles.textArea} value={this.props.recipe.footnotes} onChange={this.props.onChange}/> 
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
