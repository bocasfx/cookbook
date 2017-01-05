import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes.jsx';
import NotFoundPage from './not-found-page.jsx';
import { MongoClient, ObjectID } from 'mongodb';
import dal from './dal.js';
import errorHandler from './error-handler.js';

const dbUrl = 'mongodb://localhost:27017/recipes';

const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/v1/recipes', (req, res)=> {
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

app.get('/api/v1/recipes/:id', (req, res)=> {
  MongoClient
    .connect(dbUrl)
    .then((db)=> {
      dal.findDocument(ObjectID(req.params.id), db, (docs)=> {
        db.close();
        res.status(200).send(docs);
      });
    })
    .catch((err)=> {
      errorHandler(err);
    });
});

app.post('/api/v1/recipes', (req, res)=> {
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
