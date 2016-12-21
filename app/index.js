const $ = require('jquery');

const cookbook = {
  init: ()=> {
    console.log('initialized');
    cookbook.getRecipes();
  },

  getRecipes: ()=> {
    $.ajax({
      url: '/recipes',
    }).done((data)=> {
      cookbook.showRecipes(data);
    }).fail((jqXHR, textStatus, errorThrown)=> {
      console.log(errorThrown);
    });
  },

  showRecipes: (data)=> {
    $('#recipes').append('<ul></ul>');
    data.forEach((item) => {
      $('#recipes ul').append('<li><a href="#" recipeid="' + item._id + '">' + item.title + '</a></li>');
    });
    $('#recipes li').on('click', cookbook.getRecipe);
  },

  getRecipe: (item)=> {
    let recipeId = $(item.target)[0].attributes.recipeid.value;
    $.ajax({
      url: '/recipes/' + recipeId
    }).done((data)=> {
      console.log(data[0].title);
      $('#recipe').append(data[0].title);
    });
  }
};

$(document).ready(() => {
  cookbook.init();
});
