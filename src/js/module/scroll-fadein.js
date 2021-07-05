import $ from 'jquery';

export default class {
  constructor() {
    $(window).on('scroll', function () {
      $('.scroll-fading').each(function () {
        const windowHeight = $(window).height();
        const targetPosition = $(this).offset().top - windowHeight;
        if ($(window).scrollTop() > targetPosition) {
          $(this).addClass('fade-in');
        }
      });
    });
  }
}
