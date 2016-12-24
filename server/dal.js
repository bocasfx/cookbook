const assert = require('assert');

function insertDocuments(docs, db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany(docs, function(err, result) {
    assert.equal(err, null);
    assert.equal(docs.length, result.result.n);
    assert.equal(docs.length, result.ops.length);
    console.log(`Inserted ${docs.length} documents into the collection`);
    callback(result);
  });
}

function findDocuments(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents

  collection.aggregate(
    [
      { 
        $group : {
          _id : '$category',
          recipes: {
            $push: {
              title: '$title',
              id: '$_id'
            }
          }
        }
      }, {
        $sort: {_id: 1}
      }
    ]
  ).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(`Found ${docs.length} records`);
    callback(docs);
  });

  // collection.find({}, {title: 1, _id: 1, category: 1}).toArray(function(err, docs) {
  //   assert.equal(err, null);
  //   console.log(`Found ${docs.length} records`);
  //   callback(docs);
  // });
}

function findDocument(id, db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({_id: id}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(`Found ${docs.length} records`);
    callback(docs);
  });
}

function removeDocument(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.deleteOne({ a : 1 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log('Removed the document with the field a equal to 3');
    callback(result);
  });    
}

function drop(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.drop(function(err, result) {
    assert.equal(err, null);
    callback(result);
  });    
}

function updateDocument(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log('Updated the document with the field a equal to 2');
    callback(result);
  });  
}

module.exports = {
  insertDocuments,
  findDocuments,
  findDocument,
  removeDocument,
  updateDocument,
  drop
};
