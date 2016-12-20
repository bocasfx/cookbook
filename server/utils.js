const path = require('path');
const fs = require('fs-extra');

function loadRecipes() {

  const _recipes = [];

  let normalizedPath = path.join(__dirname, './recipes');

  fs.readdirSync(normalizedPath).forEach((file)=> {
    let name = path.basename(file, '.js');
    _recipes.push(require('./recipes/' + name));
    console.log(`Loaded recipe: ${name}`);
  });

  return _recipes;
}

module.exports = {
  loadRecipes
};
