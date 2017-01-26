import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import Subheader from '../subheader.jsx';
import Spinner from '../spinner.jsx';
import SectionHeader from '../section-header.jsx';

const styles = {
  container: {
    margin: '70px 0'
  },
  li: {
    margin: '0 0 .6em 0'
  },
  sectionHeader: {
    margin: '50px auto',
    display: 'table'
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
        <li style={styles.li} key={category._id}>
          <Link to={url}>
            <span>{label}</span>
            <span className="tocCount">{category.recipeCount}</span>
          </Link>
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
        <div style={styles.sectionHeader}>
          <SectionHeader text="Categories" size="big"/>
        </div>
        <ul className="toc">
          {this.getCategories()}
        </ul>
      </div>
    );
  }
}

module.exports = CategoryList;
