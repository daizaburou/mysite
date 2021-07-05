import $ from 'jquery';

export default class {
  constructor() {
    $(function () {
      let tabs = $('.tab');
      $('.tab').on('click', function () {
        $('.active').removeClass('active');
        $(this).addClass('active');
        const index = tabs.index(this);
        $('.tab-inner').removeClass('open').eq(index).addClass('open');
      });
    });
  }
}
