import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';

const styles = {
  categoryList: {
    margin: '50px auto'
  }
};

class CategoryList extends React.Component {
  render() {
    return (
      <div>
        <Subheader rightUrl="/categories/new" rightLabel="Add Category"/>
        <ul style={styles.categoryList}>
          {
            this.props.categories.map((category)=> {
              let label = capitalize(category.category);
              let url = '/categories/' + category._id + '/recipes';
              return (
                <li key={category._id}>
                  <Link to={url}>{label}</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = CategoryList;
