import $ from 'jquery';

export default class {
  constructor() {
    $('.toggle-btn-inner').each(function () {
      let openText = $(this).find('.toggle-open').text();
      let closeText = $(this).find('.toggle-close').text();
      $(this).on('click', function () {
        let target = $(this).data('target');
        let toggle = document.getElementById(target);
        $(toggle).slideToggle(300);
        if ($(this).text() !== closeText) {
          $(this).text(closeText);
        } else {
          $(this).text(openText);
        }
      });
    });
  }
}
