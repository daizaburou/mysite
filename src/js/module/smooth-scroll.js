const SmoothScroll = require('smooth-scroll');

export default class {
  constructor() {
    new SmoothScroll('a[href*="#"]', {
      speed: 500,
      header: '.js-header',
      updateURL: false,
      speedAsDuration: true,
    });
  }
}
