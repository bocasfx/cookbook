import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let recipeModel = mongoose.model('Recipe', new Schema({ 
  title: String,
  translation: String,
  image: String,
  ingredients: [{
    ammount: String,
    units: String,
    ingredient: String
  }],
  steps: [String],
  category: String,
  notes: String,
  footnotes: String
}));

module.exports = recipeModel;
