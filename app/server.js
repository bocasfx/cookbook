import path from 'path';
import Express from 'express';
import React from 'react'; // eslint-disable-line no-unused-vars
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes.jsx';
import NotFoundPage from './not-found-page.jsx';
import { MongoClient, ObjectID } from 'mongodb';
import dal from './dal.js';
import errorHandler from './error-handler.js';
import bodyParser from 'body-parser';
import multer from 'multer';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/static/images/');
  },
  filename: function (req, file, cb) {
    let extension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

let upload = multer({ storage: storage });
const dbUrl = 'mongodb://localhost:27017/recipes';
const urlPrefix = '/api/v1';

const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json({limit: '50mb'}));

function connect(callback) {
  MongoClient
    .connect(dbUrl)
    .then(callback)
    .catch((err)=> {
      errorHandler(err);
    });
}

app.get(urlPrefix + '/categories', (req, res)=> {
  connect((db)=> {
    dal.findCategories(db, (docs)=> {
      db.close();
      res.status(200).send(docs);
    });
  });
});

app.get(urlPrefix + '/categories/:category', (req, res)=> {
  connect((db)=> {
    dal.searchCategories(db, req.params.category, (docs)=> {
      db.close();
      res.status(200).send(docs);
    });
  });
});

app.post(urlPrefix + '/categories', (req, res) => {
  let category = req.body.category;
  connect((db) => {
    dal.insertCategory(db, category, () => {
      db.close();
      res.status(200).send('Category added.');
    });
  });
});

app.get(urlPrefix + '/categories/:categoryid/recipes', (req, res) => {
  connect((db)=> {
    dal.findRecipesInCategory(db, req.params.categoryid, (docs)=> {
      db.close();
      res.status(200).send(docs);
    });
  });
});

app.get(urlPrefix + '/recipes/:id', (req, res)=> {
  connect((db)=> {
    dal.findRecipe(db, ObjectID(req.params.id), (docs)=> { // eslint-disable-line new-cap
      db.close();
      res.status(200).send(docs);
    });
  });
});

app.post(urlPrefix + '/recipes', upload.single('image'), (req, res)=> {
  let recipe = req.body;
  recipe.imagePath = '/images/' + path.basename(req.file.path);
  connect((db)=> {
    dal.insertRecipe(db, recipe, (result)=> {
      db.close();
      res.status(201).send(result);
    });
  });
});

app.patch(urlPrefix + '/recipes/:id', upload.single('image'), (req, res)=> {
  let recipe = req.body;
  if (req.file) {
    recipe.imagePath = '/images/' + path.basename(req.file.path);
  }
  connect((db)=> {
    dal.updateRecipe(db, ObjectID(req.params.id), recipe, (result)=> { // eslint-disable-line new-cap
      db.close();
      res.status(201).send(result);
    });
  });
});

app.delete('/drop', (req, res)=> {
  connect((db)=> {
    dal.drop(db, ()=> {
      db.close();
      res.status(200).send('Dropped DB');
    });
  });
});

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});
