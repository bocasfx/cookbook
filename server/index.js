const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dal = require('./dal');
const utils = require('./utils');
const objectId = require('mongodb').ObjectID;

const app = express();
const mongoUrl = 'mongodb://localhost:27017/recipes';

app.use(express.static('public'));

app.get('/recipes', function (req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    dal.findDocuments(db, function(docs) {
      db.close();
      res.send(docs);
    });
  });
});

app.get('/recipes/:id', function (req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    console.log('Retrieving record with id: ' + req.params.id);
    dal.findDocument(objectId(req.params.id), db, function(docs) {
      db.close();
      res.send(docs);
    });
  });
});

app.post('/recipes', function(req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    let docs = {a:1};

    dal.insertDocuments(docs, db, function() {
      db.close();
      res.send('POST request to homepage');
    });
  });
});

app.delete('/recipes', function(req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    dal.removeDocument(db, function() {
      db.close();
      res.send('DELETE request to homepage');
    });
  });
});

app.delete('/drop', function(req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    dal.drop(db, function() {
      db.close();
      res.send('Dropped DB');
    });
  });
});

app.put('/recipes', function(req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    dal.updateDocument(db, function() {
      db.close();
      res.send('PUT request to homepage');
    });
  });
});

app.post('/initialize', function(req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    let recipes = utils.loadRecipes();
    dal.insertDocuments(recipes, db, function() {
      db.close();
      res.send('POST request to homepage');
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
