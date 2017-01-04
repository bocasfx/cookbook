const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dal = require('./dal');
const utils = require('./utils');
const objectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

const app = express();
const dbUrl = 'mongodb://localhost:27017/recipes';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/recipes', (req, res)=> {
  MongoClient
    .connect(dbUrl)
    .then((db)=> {
      dal.findDocuments(db, (docs)=> {
        db.close();
        res.status(200).send(docs);
      });
    })
    .catch((err)=> {
      errorHandler(err);
    });
});

app.get('/recipes/:id', (req, res)=> {
  MongoClient
    .connect(dbUrl)
    .then((db)=> {
      dal.findDocument(objectId(req.params.id), db, (docs)=> {
        db.close();
        res.status(200).send(docs);
      });
    })
    .catch((err)=> {
      errorHandler(err);
    });
});

app.post('/recipes', (req, res)=> {
  MongoClient
    .connect(dbUrl)
    .then((db)=> {
      dal.insertDocuments(req.body, db, ()=> {
        db.close();
        res.status(201).send('Recipe added.');
      });
    })
    .catch((err)=> {
      errorHandler(err);
    });
});

app.delete('/drop', (req, res)=> {
  MongoClient
    .connect(dbUrl)
    .then((db)=> {
      dal.drop(db, ()=> {
        db.close();
        res.status(200).send('Dropped DB');
      });
    })
    .catch((err)=> {
      errorHandler(err);
    });
});

app.post('/initialize', (req, res)=> {
  MongoClient
    .connect(dbUrl)
    .then((db)=> {
      let recipes = utils.loadRecipes();
      dal.insertDocuments(recipes, db, ()=> {
        db.close();
        res.status(200).send('POST request to homepage');
      });
    })
    .catch((err)=> {
      errorHandler(err);
    });
});

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});

// app.put('/recipes', (req, res)=> {
//   MongoClient
//     .connect(dbUrl)
//     .then((db)=> {
//       dal.updateDocument(db, ()=> {
//         db.close();
//         res.send('PUT request to homepage');
//       });
//     })
//     .catch((err)=> {
//       errorHandler(err);
//     });
// });
// 
// app.delete('/recipes', (req, res)=> {
//   MongoClient
//     .connect(dbUrl)
//     .then((db)=> {
//       dal.removeDocument(db, ()=> {
//         db.close();
//         res.send('DELETE request to homepage');
//       });
//     })
//     .catch((err)=> {
//       errorHandler(err);
//     });
// });
