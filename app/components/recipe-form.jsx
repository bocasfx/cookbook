import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
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
            <h2>Category</h2>
            <input name="category" type="text" value={this.props.category}  onChange={this.props.handleChange}/>
          </div>
          <div className="formEntry">
            <h2>Image</h2>
            <Dropzone className="dropzone" ref={(node) => { this.dropzone = node; }} onDrop={this.props.onDrop}>
              {(this.props.images && this.props.images.length > 0) ? <div>{this.props.images.map((image) => <img name="image" className="newRecipeImage" key={image.name} src={image.preview} /> )}</div> : <div className="newRecipeImage"><FontAwesome className="imageIcon" name='picture-o'/></div>}
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
