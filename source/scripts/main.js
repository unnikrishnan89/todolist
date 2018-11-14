/* global $ */

var todo = require('../components/todo/todo.js')();

(function($) {

  $(window).on('load', function () {
    $('.pre-loader').fadeOut(1000);
  });

  todo.init({
    input: '.todo__input',
    element: '.todo__list'
  });

})(jQuery)
