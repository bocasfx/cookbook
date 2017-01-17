import React from 'react';
import CategoryNew from './category-new.jsx';

class CategoryNewContainer extends React.Component {
  render() {
    let categoriesUrl = '/api/v1/categories/';
    let cancelUrl = '/';
    return (
      <CategoryNew categoriesUrl={categoriesUrl} cancelUrl={cancelUrl}/>
    );
  }
}

module.exports = CategoryNewContainer;
