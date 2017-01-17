import React from 'react'
import { Route, IndexRoute } from 'react-router';
import Recipe from './components/recipes/recipe.jsx';
import RecipeNew from './components/recipes/recipe-new.jsx';
import RecipeEdit from './components/recipes/recipe-edit.jsx';
import Layout from './components/layout.jsx';
import IndexPage from './components/index-page.jsx';
import RecipeListContainer from './components/recipes/recipe-list-container.jsx';
import CategoryNew from './components/categories/category-new.jsx';

const routes = (
  <div>
    <Route name="Home" path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route name="New Recipe" path="/categories/:categoryid/recipes/new" component={RecipeNew}/>
      <Route name="Recipe" path="/categories/:categoryid/recipes/:recipeid" component={Recipe} staticName={true}/>
      <Route name="Edit Recipe" path="/categories/:categoryid/recipes/edit/:recipeid" component={RecipeEdit}/>
      <Route name="New Category" path="/categories/new" component={CategoryNew}/>
      <Route name="Recipes" path="/categories/:categoryid/recipes" component={RecipeListContainer}/>
    </Route>
  </div>
);

export default routes;
