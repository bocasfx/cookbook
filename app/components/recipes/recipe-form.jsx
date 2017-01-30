import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import Button from '../button.jsx';
import Ingredients from './ingredients.jsx';
import Steps from './steps.jsx';

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
  }
};

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.showImage = this.showImage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.getRef = this.getRef.bind(this);
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

  render() {
    return (
      <div>
        <div style={styles.formEntry}>
          <h2>Title</h2>
          <input name="title" type="text" value={this.props.recipe.title} onChange={this.props.onChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Image</h2>
          <Dropzone style={styles.dropzone} ref={this.getRef} onDrop={this.props.onDrop}>
            {this.showImage()}
          </Dropzone>
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
        <div style={styles.buttonBar}>
          <Button type="button" value="Cancel" onClick={this.onCancel}/>
          <Button type="submit" value={this.props.submitLabel} onClick={this.props.handleSubmit} disabled={this.props.disabled}/>
        </div>
      </div>
    );
  }
}

module.exports = RecipeForm;
