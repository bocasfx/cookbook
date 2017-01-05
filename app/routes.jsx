import React from 'react'
import { Route, IndexRoute } from 'react-router';
import Recipe from './components/recipe.jsx';
import New from './components/new.jsx';
import Edit from './components/edit.jsx';
import Layout from './components/layout.jsx';
import IndexPage from './components/index-page.jsx';

const routes = (
  <div>
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route path="recipes/:recipeid" component={Recipe}/>
      <Route path="new" component={New}/>
      <Route path="edit/:recipeid" component={Edit}/>
    </Route>
  </div>
);

export default routes;
