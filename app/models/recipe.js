import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let recipeModel = mongoose.model('Recipe', new Schema({ 
  title: String, 
  imagePath: String, 
  ingredients: String,
  description: String,
  category: String
}));

module.exports = recipeModel;
