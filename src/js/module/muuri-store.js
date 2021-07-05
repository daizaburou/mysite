import $ from 'jquery';
import Muuri from 'muuri';

export default class {
  constructor() {
    let maxHeight = 0;

    $('.item').each(function () {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });

    $('.item').height(maxHeight);

    const grid = new Muuri('.grid');
    const typeFilter = $('.type-filter');

    typeFilter.change(filter);

    function filter() {
      const typeFilterValue = typeFilter.val();
      const typeFilterName = typeFilter.attr('name');
      const filterAttr = 'data-' + typeFilterName;
      grid.filter(function (item) {
        let element = item.getElement();
        let isFilterMatch = !typeFilterValue ? true : (element.getAttribute(filterAttr) || '') === typeFilterValue;
        return isFilterMatch;
      });
    }
  }
}
