import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userModel = mongoose.model('User', new Schema({ 
  name: String, 
  password: String, 
  admin: Boolean 
}));

module.exports = userModel;
