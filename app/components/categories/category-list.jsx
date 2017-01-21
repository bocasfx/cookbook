import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import FontAwesome from 'react-fontawesome';

const styles = {
  categoryList: {
    margin: '50px auto'
  },
  nothing: {
    fontSize: '2em'
  }
};

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories() {
    if (!this.props.done) {
      return <FontAwesome name="cog" size="2x" spin/>;
    }

    if (!this.props.categories.length && this.props.done) {
      return <div style={styles.nothing}>Nothing to see here. Try adding a category.</div>;
    }

    return this.props.categories.map((category)=> {
      let label = capitalize(category.category);
      let url = '/categories/' + category._id + '/recipes';
      return (
        <li key={category._id}>
          <Link to={url}>{label}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <Subheader rightUrl="/categories/new" rightLabel="Add Category"/>
        <ul style={styles.categoryList}>
          {this.getCategories()}
        </ul>
      </div>
    );
  }
}

module.exports = CategoryList;
