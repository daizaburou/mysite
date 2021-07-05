import $ from 'jquery';

export default class {
  constructor() {
    $('.btn-hamburger').on('click', function () {
      $(this).toggleClass('active');
      $('.header-inner').toggleClass('active');
      setTimeout(function () {
        $('.global-nav').toggleClass('active');
      }, 500);
      return false;
    });
  }
}
