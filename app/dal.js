const assert = require('assert');

function findCategories(db, callback) {
  var collection = db.collection('categories');
  collection.find().sort({category: 1}).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function searchCategories(db, category, callback) {
  var collection = db.collection('categories');
  collection.find({category}).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function insertCategory(db, category, callback) {
  let collection = db.collection('categories');
  let categoryObj = {
    category
  };

  collection.insert(categoryObj, (err) => {
    assert.equal(err, null);
    callback();
  });
}

function insertRecipe(db, recipe, callback) {
  var collection = db.collection('recipes');
  collection.insert(recipe, (err, result)=> {
    assert.equal(err, null);
    callback(result);
  });
}

function findRecipesInCategory(db, categoryId, callback) {
  var collection = db.collection('recipes');
  collection.find({'category': categoryId}).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function findRecipe(db, id, callback) {
  var collection = db.collection('recipes');
  collection.find({_id: id}).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function updateRecipe(db, id, recipe, callback) {
  var collection = db.collection('recipes');
  let newRecipe = {};
  Object.keys(recipe).forEach((key) => {
    newRecipe[key] = recipe[key];
  });
  collection.updateOne({_id: id}, { $set: newRecipe }, (err, result)=> {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });  
}

function drop(db, callback) {
  var collection = db.collection('recipes');
  collection.drop((err)=> {
    assert.equal(err, null);
    var categories = db.collection('categories');
    categories.drop((err2, result) => {
      callback(result);
    });
  });    
}

module.exports = {
  insertCategory,
  insertRecipe,
  findCategories,
  searchCategories,
  findRecipesInCategory,
  findRecipe,
  updateRecipe,
  drop
};
