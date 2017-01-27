import React from 'react'
import { Route, IndexRoute } from 'react-router';
import RecipeContainer from './components/recipes/recipe-container.jsx';
import RecipeNew from './components/recipes/recipe-new.jsx';
import RecipeEdit from './components/recipes/recipe-edit.jsx';
import Layout from './components/layout.jsx';
import IndexPage from './components/index-page.jsx';
import RecipeListContainer from './components/recipes/recipe-list-container.jsx';
import CategoryNewContainer from './components/categories/category-new-container.jsx';
import EnsureLoggedInContainer from './components/ensure-logged-in-container.jsx';
import Login from './components/login.jsx';
import Search from './components/search.jsx';

const routes = (
  <div>
    <Route name="Home" path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route component={EnsureLoggedInContainer}>
        <Route name="New Recipe" path="/categories/:categoryid/recipes/new" component={RecipeNew}/>
        <Route name="New Category" path="/categories/new" component={CategoryNewContainer}/>
        <Route name="Edit Recipe" path="/categories/:categoryid/recipes/edit/:recipeid" component={RecipeEdit}/>
      </Route>
      <Route name="Recipe" path="/recipes/:recipeid" component={RecipeContainer} staticName={true}/>
      <Route name="Recipes" path="/categories/:categoryid/recipes" component={RecipeListContainer}/>
      <Route name="Login" path="/login" component={Login}/>
      <Route name="Search" path="/search" component={Search}/>
    </Route>
  </div>
);

export default routes;
