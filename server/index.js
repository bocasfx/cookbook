const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dal = require('./dal');
const utils = require('./utils');
const objectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const mongoUrl = 'mongodb://localhost:27017/recipes';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/recipes', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');
      dal.findDocuments(db, (docs)=> {
        db.close();
        res.send(docs);
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.get('/recipes/:id', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');
      console.log('Retrieving record with id: ' + req.params.id);
      dal.findDocument(objectId(req.params.id), db, (docs)=> {
        db.close();
        res.send(docs);
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.post('/recipes', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');

      dal.insertDocuments(req.body, db, ()=> {
        db.close();

        let fileName = req.body[0].title;
        fileName = fileName.split(' ').join('-') + '.json';

        let filePath = path.join(__dirname, 'recipes', fileName);
        let jsonContent = JSON.stringify(req.body[0], null, 2);

        fs.writeFileSync(filePath, jsonContent);
        res.send('POST request to homepage');
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.delete('/recipes', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');

      dal.removeDocument(db, ()=> {
        db.close();
        res.send('DELETE request to homepage');
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.delete('/drop', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');

      dal.drop(db, ()=> {
        db.close();
        res.send('Dropped DB');
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.put('/recipes', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');

      dal.updateDocument(db, ()=> {
        db.close();
        res.send('PUT request to homepage');
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.post('/initialize', (req, res)=> {
  MongoClient.connect(mongoUrl)
    .then((db)=> {
      console.log('Connected successfully to server');

      let recipes = utils.loadRecipes();
      dal.insertDocuments(recipes, db, ()=> {
        db.close();
        res.send('POST request to homepage');
      });
    })
    .catch((err)=> {
      console.log(err);
    });
});

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});
