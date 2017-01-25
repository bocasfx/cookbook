import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';

const styles = {
  categoryList: {
    margin: '50px auto'
  },
  nothing: {
    fontSize: '2em'
  },
  container: {
    margin: '70px 0'
  }
};

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories() {

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
    if (!this.props.categories.length || this.props.error) {
      return (
        <div style={styles.container}>
          <Spinner error={this.props.error} spin={!this.props.done} staticMessage="Nothing to see here. Try adding a category."/>;
        </div>
      );
    }

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
