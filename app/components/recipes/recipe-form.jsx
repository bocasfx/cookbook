import React from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import Button from '../button.jsx';

const styles = {
  formEntry: {
    marginTop: '50px'
  },
  dropzone: {
    width: '300px',
    height: '200px',
    border: '1px solid #ccc',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 2px 7px 0px rgba(117,117,117,1)',
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
    height: '50%',
    borderColor: '#ccc',
    height: '200px',
    fontFamily: '\'Anonymous Pro\', monospace',
    fontSize: '1em',
    outline: 'none',
    padding: '7px'
  },
  input: {
    outline: 'none',
    paddingLeft: '7px'
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
    let images = this.props.images;

    if (images.length === 0) {
    return (
        <div style={styles.image}><FontAwesome style={styles.icon} name='picture-o'/></div>
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
          <input style={styles.input} name="title" type="text" value={this.props.title} onChange={this.props.handleChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Image</h2>
          <Dropzone style={styles.dropzone} ref={this.getRef} onDrop={this.props.onDrop}>
            {this.showImage()}
          </Dropzone>
        </div>
        <div style={styles.formEntry}>
          <h2>Ingredients</h2>
          <textarea name="ingredients" type="text" style={styles.textArea} value={this.props.ingredients} onChange={this.props.handleChange}/>
        </div>
        <div style={styles.formEntry}>
          <h2>Description</h2>
          <textarea name="description" type="text" style={styles.textArea} value={this.props.description} onChange={this.props.handleChange}/>
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
