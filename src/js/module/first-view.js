import $ from 'jquery';

export default class {
  constructor() {
    if (sessionStorage.getItem('first-view')) {
      $('.first-view').css('display', 'none');
    } else {
      setTimeout(function () {
        $('.first-view').addClass('-fade-out');
      }, 1000);
      sessionStorage.setItem('first-view', 'on');
    }
  }
}
