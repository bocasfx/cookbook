import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    request.post('/api/v1/categories')
      .send(this.state)
      .end((err) => {
        browserHistory.push('/');
      });

  }

  onChange(event) {
    event.preventDefault();
    let category = event.target.value;
    this.setState({
      category
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        laksjdf
        <input type="text" name="category" value={this.state.category} onChange={this.onChange}/>
        <input type="submit" className="submit" value="Add"/>
      </form>
    );
  }
}

module.exports = NewCategory;
