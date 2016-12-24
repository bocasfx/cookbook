import React from 'react';
import { Link } from 'react-router';
import styles from './styles/styles.css';
import capitalize from 'capitalize';

class RecipeList extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.maintitle}>Recetas</div>
          <Link className={styles.new} to="/new">+</Link>
        </div>
        <ul>
          {
            this.props.categories.map((category)=> {
              let label = capitalize(category._id);
              return (
                <li key={category._id}>
                  <div className={styles.category}>{label}</div>
                  <ul>
                    {
                      category.recipes.map((recipe)=> {
                        let recipeUrl = '/recipes/' + recipe.id;
                        return <li key={recipe.id}><Link to={recipeUrl}>{recipe.title}</Link></li>;
                      })
                    }
                  </ul>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = RecipeList;
