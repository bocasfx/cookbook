const assert = require('assert');

function insertDocuments(docs, db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany(docs, (err, result)=> {
    assert.equal(err, null);
    assert.equal(docs.length, result.result.n);
    assert.equal(docs.length, result.ops.length);
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
  ).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function findDocument(id, db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({_id: id}).toArray((err, docs)=> {
    assert.equal(err, null);
    callback(docs);
  });
}

function updateDocument(id, doc, db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({_id: id}, { $set: { title: doc.title, category: doc.category, description: doc.description } }, (err, result)=> {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });  
}

function drop(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.drop((err, result)=> {
    assert.equal(err, null);
    callback(result);
  });    
}

module.exports = {
  insertDocuments,
  findDocuments,
  findDocument,
  updateDocument,
  drop
};

// function removeDocument(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.deleteOne({ a : 1 }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     callback(result);
//   });    
// }
// 

