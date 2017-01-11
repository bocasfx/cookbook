import React from 'react';
import { Link } from 'react-router';
import capitalize from 'capitalize';
import request from 'superagent';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/categories')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          categories: response.body
        });
      });
  }

  onGetData(docs) {
    this.setState({
      categories: docs
    });
  }

  render() {
    return (
      <div>
        <Link to="/categories/new">Add category</Link>
        <div className="categoryList">
          <ul>
            {
              this.state.categories.map((category)=> {
                let label = capitalize(category._id);
                let url = '/categories/' + label;
                return (
                  <li key={category._id}>
                    <Link to={url} className="category">{label}</Link>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = CategoryList;
