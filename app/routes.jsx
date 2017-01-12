import React from 'react'
import { Route, IndexRoute } from 'react-router';
import Recipe from './components/recipes/recipe.jsx';
import RecipeNew from './components/recipes/recipe-new.jsx';
import RecipeEdit from './components/recipes/recipe-edit.jsx';
import Layout from './components/layout.jsx';
import IndexPage from './components/index-page.jsx';
import RecipeList from './components/recipes/recipe-list.jsx';
import CategoryNew from './components/categories/category-new.jsx';

const routes = (
  <div>
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route path="/categories/:categoryid/recipes/new" component={RecipeNew}/>
      <Route path="/categories/:categoryid/recipes/:recipeid" component={Recipe}/>
      <Route path="/categories/:categoryid/recipes/edit/:recipeid" component={RecipeEdit}/>
      <Route path="/categories/new" component={CategoryNew}/>
      <Route path="/categories/:categoryid/recipes" component={RecipeList}/>
    </Route>
  </div>
);

export default routes;
