import React from 'react'
import { Route, IndexRoute } from 'react-router';
import Recipe from './components/recipe.jsx';
import NewRecipe from './components/new-recipe.jsx';
import Edit from './components/edit.jsx';
import Layout from './components/layout.jsx';
import IndexPage from './components/index-page.jsx';
import RecipeList from './components/recipe-list.jsx';
import NewCategory from './components/new-category.jsx';

const routes = (
  <div>
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route path="/categories/:categoryid/recipes/new" component={NewRecipe}/>
      <Route path="/categories/:categoryid/recipes/:recipeid" component={Recipe}/>
      <Route path="/edit/:recipeid" component={Edit}/>
      <Route path="/categories/new" component={NewCategory}/>
      <Route path="/categories/:categoryid/recipes" component={RecipeList}/>
    </Route>
  </div>
);

export default routes;
