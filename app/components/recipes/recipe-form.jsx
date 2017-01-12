import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.showImage = this.showImage.bind(this);
  }

  showImage() {
    let images = this.props.images;

    if (typeof images[0] === 'string') {
      return (
        <img name="image" className="newRecipeImage" src={images[0]} />
      );
    } else if (images.length > 0) {
      return (
        <div>{this.props.images.map((image) => <img name="image" className="newRecipeImage" key={image.name} src={image.preview} /> )}</div>  
      );
    } else {
      return (
        <div className="newRecipeImage"><FontAwesome className="imageIcon" name='picture-o'/></div>
      );
    }
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
          <input type="submit" className="submit" value="Add"/>
        </form>
      </div>
    );
  }
}

module.exports = RecipeForm;
