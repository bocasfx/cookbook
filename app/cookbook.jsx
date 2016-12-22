import React from 'react';
import RecipeListContainer from './recipe-list-container.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <RecipeListContainer/>
      </div>
    );
  }
}

module.exports = App;
