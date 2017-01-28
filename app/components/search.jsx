import React from 'react';
import Button from './button.jsx';
import Toaster from './toaster.jsx';
import request from 'superagent';
import { Link } from 'react-router';
import SectionHeader from './section-header.jsx';

const styles = {
  container: {
    margin: '70px auto 20px auto',
    width: '300px'
  },
  input: {
    width: '100%',
    paddingLeft: '7px'
  },
  buttonBar: {
    textAlign: 'right',
  },
  warning: {
    position: 'fixed',
    width: 'auto',
    marginTop: '25px',
    color: 'coral'
  },
  searchStr: {
    float: 'left',
    marginBottom: '25px'
  },
  resultsContainer: {
    marginBottom: '70px'
  },
  li: {
    marginLeft: '40px'
  }
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      disabled: true,
      error: false,
      errorMessage: '',
      recipeList: []
    };

    this.searchStrRef = this.searchStrRef.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
  }

  componentDidMount() {
    this.searchStrInput.focus();
  }

  searchStrRef(input) {
    this.searchStrInput = input;
  }

  onSubmit(event) {
    event.preventDefault();
    request
      .post('/api/v1/search')
      .set('Accept', 'application/json')
      .send({query: this.state.searchStr})
      .end((err, response)=> {
        if (err) {
          return this.setState({
            error: true,
            done: true,
            errorMessage: 'Unable to search for recipes.'
          });
        }
        this.setState({
          recipeList: response.body,
          done: true,
          errorMessage: '',
          error: false
        });
      });
  }

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    state.disabled = !state.searchStr;
    if (!state.searchStr) {
      state.recipeList = [];
      state.done = false;
      state.error = false;
    }
    this.setState(state);
  }

  getRecipes() {
    let recipeCount = this.state.recipeList.length;
    if (!recipeCount) {
      return '';
    }

    let plural = recipeCount > 1 ? 's' : '';
    let headerText = 'Found ' + recipeCount + ' recipe' + plural + '!';

    return (
      <div style={styles.resultsContainer}>
        <SectionHeader size="small" text={headerText}/>
        <ul>
          {
            this.state.recipeList.map((recipe) => {
              let recipeUrl = '/recipes/' + recipe._id;
              return (
                <Link to={recipeUrl} key={recipe._id}><li style={styles.li}>{recipe.title}</li></Link>
              );
            })
          }
        </ul>
      </div>
    );
  }

  render() {
    let errorMessage = '';

    if (this.state.error) {
      errorMessage = <Toaster message={this.state.errorMessage}/>;
    } else if (!this.state.recipeList.length && this.state.done) {
      errorMessage = <Toaster message="No recipes found :("/>;
    }

    return (
      <div>
        <div style={styles.container}>
          {errorMessage}
          <span style={styles.searchStr}>Search</span>
          <input
            type="text"
            name="searchStr"
            ref={this.searchStrRef}
            autoComplete="off"
            style={styles.input}
            onChange={this.onChange}/>
          <div style={styles.buttonBar}>
            <Button type="submit" value="Search" onClick={this.onSubmit} disabled={this.state.disabled}/>
          </div>
          <div style={styles.warning}></div>
        </div>
        {this.getRecipes()}
      </div>
    );
  }
}

module.exports = Search;
