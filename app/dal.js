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
    // _id: category.split(' ').join('').toLowerCase(),
    category
  };

  collection.insert(categoryObj, (err) => {
    assert.equal(err, null);
    callback();
  });
}

function insertRecipe(doc, db, callback) {
  var collection = db.collection('recipes');
  collection.insert(doc, (err, result)=> {
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

function findRecipe(id, db, callback) {
  var collection = db.collection('recipes');
  collection.find({_id: id}).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function updateRecipe(id, doc, db, callback) {
  var collection = db.collection('recipes');
  collection.updateOne({_id: id}, { $set: { title: doc.title, category: doc.category, description: doc.description } }, (err, result)=> {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });  
}

function drop(db, callback) {
  var collection = db.collection('recipes');
  collection.drop((err, result)=> {
    assert.equal(err, null);
    callback(result);
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
