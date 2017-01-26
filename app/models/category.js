import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let categoryModel = mongoose.model('Category', new Schema({ 
  category: String,
  recipeCount: Number
}));

module.exports = categoryModel;
