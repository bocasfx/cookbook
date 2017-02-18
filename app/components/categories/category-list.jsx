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
  gt: {
    backgroundColor: 'mistyrose',
    padding: '6px 16px 6px 4px',
    fontSize: '0.75em',
    fontWeight: 'bolder',
    position: 'absolute',
    top: '0px',
    left: '0px',
    clipPath: 'polygon(100% 50%, 100% 50%, 0 100%, 0 0)'
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
        <Link to={url} key={category._id}>
          <li style={styles.li}>
            <span style={styles.gt}>&gt;</span>
            <span>{label}</span>
            <span>{category.recipeCount}</span>
          </li>
        </Link>
      );
    });
  }

  render() {
    if (!this.props.categories.length || this.props.error) {
      return (
        <div>
          <Subheader rightUrl="/categories/new" rightLabel="Add Category"/>
          <div style={styles.container}>
            <Spinner error={this.props.error} spin={!this.props.done} staticMessage="Nothing to see here. Try adding a category."/>
          </div>
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
