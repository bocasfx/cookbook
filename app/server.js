import path from 'path';
import Express from 'express';
import React from 'react'; // eslint-disable-line no-unused-vars
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes.jsx';
import NotFoundPage from './not-found-page.jsx';
import errorHandler from './error-handler.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import config from './config/config.js';
import User from './models/user.js';
import Category from './models/category.js';
import Recipe from './models/recipe.js';
import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import https from 'https';
import fs from 'fs';
import Bluebird from 'bluebird';

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
const dbUrl = config.dbUrl;
const apiPrefix = '/api/v1';

const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json({limit: '50mb'}));

mongoose.Promise = Bluebird;
mongoose.connect(dbUrl);

app.get(apiPrefix + '/categories', (req, res)=> {
  Category
    .find()
    .sort({category: 1})
    .then((categories) => {
      if (!categories.length) {
        res.json(categories);
        return;
      }
      let outstanding = categories.length;
      categories.forEach((category, idx) => {
        Recipe
          .count({category: category._id})
          .then(((index, count) => {
            categories[index].recipeCount = count;
            outstanding--;
            if (!outstanding) {
              res.json(categories);
            }
          }).bind(this, idx))
          .catch((err) => {
            errorHandler(err);
          });
      });
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.get(apiPrefix + '/categories/:category', (req, res)=> {
  Category
    .find({category: req.params.category})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.get(apiPrefix + '/categories/:categoryid/recipes', (req, res) => {
  Recipe
    .find({category: req.params.categoryid})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.get(apiPrefix + '/recipes/:id', (req, res)=> {
  Recipe
    .find({_id: req.params.id})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.post(apiPrefix + '/search', (req, res) => {
  let query = req.body.query || '';
  Recipe
    .find({title: new RegExp('^.*' + query + '.*$', 'i')})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.post(apiPrefix + '/authenticate', (req, res) => {
  User
    .findOne({name: req.body.username})
    .then((user) => {
      if (!user) {
        return res.status(403).json({ success: false, message: 'Authentication failed. User not found.' });
      }

      const hashedPassword = crypto.createHmac('sha256', config.secret)
        .update(req.body.password)
        .digest('hex');

      if (user.password !== hashedPassword) {
        return res.status(403).json({ success: false, message: 'Invalid password.' });
      }

      delete user.passowrd;

      let token = jwt.sign(user, config.secret, {
        expiresIn: '24h'
      });

      res.json({
        success: true,
        message: 'Authenticated',
        token: token
      });
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.get('/newuser', (req, res) => {

  const hashedPassword = crypto.createHmac('sha256', config.secret)
    .update('password')
    .digest('hex');

  let newUser = new User({ 
    name: 'user', 
    password: hashedPassword,
    admin: true 
  });

  newUser
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.get('/initialize', (req, res) => {
  let categories = [
    'appetizers',
    'soups',
    'salads',
    'pasta & rice',
    'veggies',
    'meat',
    'fish',
    'dessert',
    'cakes',
    'breakfast',
    'bread',
    'preserves'
  ];

  categories.forEach((cat) => {
    let category = new Category({
      category: cat
    });

    category
      .save()
      .catch((err) => {
        errorHandler(err);
        res.json({success: false});
      });
  });
  res.json({success: true});
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

app.use((req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
    
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }

    req.decoded = decoded;
    next();
  });
});

app.post(apiPrefix + '/categories', (req, res) => {
  let newCategory = req.body.category;
  let category = new Category({
    category: newCategory
  });

  category
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.post(apiPrefix + '/recipes', upload.single('image'), (req, res)=> {
  let newRecipe = req.body;
  newRecipe.steps = JSON.parse(newRecipe.steps);
  newRecipe.ingredients = JSON.parse(newRecipe.ingredients);
  newRecipe.image = req.file ? '/images/' + path.basename(req.file.path) : '';
  let recipe = new Recipe(newRecipe);
  recipe
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

app.patch(apiPrefix + '/recipes/:id', upload.single('image'), (req, res)=> {
  let recipe = JSON.parse(req.body.recipe);
  if (req.file) {
    recipe.image = '/images/' + path.basename(req.file.path);
  }
  Recipe
    .findOneAndUpdate({_id: req.params.id}, recipe)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      errorHandler(err);
    });
});

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(3000);
