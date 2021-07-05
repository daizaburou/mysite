import $ from 'jquery';

export default class {
  constructor() {
    $(window).on('scroll', function () {
      let target = $('.parallax-inner,.parallax');
      let scrollPosition = $(window).scrollTop();
      target.each(function () {
        let speed = $(this).data('js-speed');
        let scrollSpeed = (speed * scrollPosition) / 100;
        $(this).css({ transform: 'translateY(-' + scrollSpeed + 'px)' });
      });
    });
  }
}
