import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import RecipeListContainer from './recipe-list-container.jsx';
import Recipe from './recipe.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={RecipeListContainer}/>
          <Route path="/recipes/:recipeid" component={Recipe}/>
        </Router>
      </div>
    );
  }
}

module.exports = App;
