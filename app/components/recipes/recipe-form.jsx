import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.showImage = this.showImage.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  showImage() {
    let images = this.props.images;

    if (images.length === 0) {
    return (
        <div className="newRecipeImage"><FontAwesome className="imageIcon" name='picture-o'/></div>
      );
    }

    let imageSrc = '';

    if (typeof images[0] === 'string') {
      imageSrc = images[0];
    } else {
      imageSrc = images[0].preview;
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
      <div name="image" className="newRecipeImage" style={imgStyle}></div>
    );
    
  }

  onCancel() {
    browserHistory.push(this.props.cancelUrl);
  }

  render() {
    return (
      <div className="recipeForm">
        <form onSubmit={this.props.handleSubmit}>
          <div className="formEntry">
            <h2>Title</h2>
            <input name="title" type="text" value={this.props.title} onChange={this.props.handleChange}/>
          </div>
          <div className="formEntry">
            <h2>Image</h2>
            <Dropzone className="dropzone" ref={(node) => { this.dropzone = node; }} onDrop={this.props.onDrop}>
              {this.showImage()}
            </Dropzone>
          </div>
          <div className="formEntry">
            <h2>Ingredients</h2>
            <textarea name="ingredients" type="text" className="recipeTextArea" value={this.props.ingredients} onChange={this.props.handleChange}/>
          </div>
          <div className="formEntry">
            <h2>Description</h2>
            <textarea name="description" type="text" className="recipeTextArea" value={this.props.description} onChange={this.props.handleChange}/>
          </div>
          <div className="right">
            <input type="button" className="submit" value="Cancel" onClick={this.onCancel}/>
            <input type="submit" className="submit" value={this.props.submitLabel}/>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = RecipeForm;
