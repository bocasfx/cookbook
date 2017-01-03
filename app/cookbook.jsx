import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import RecipeListContainer from './recipe-list-container.jsx';
import Recipe from './recipe.jsx';
import New from './new.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={RecipeListContainer}/>
          <Route path="/recipes/:recipeid" component={Recipe}/>
          <Route path="/new" component={New}/>
        </Router>
      </div>
    );
  }
}

module.exports = App;
