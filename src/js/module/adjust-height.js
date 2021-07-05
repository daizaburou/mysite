export default class {
  constructor() {
    const headerHeight = document.querySelector('.js-header').clientHeight;
    const mediaSp = matchMedia('(max-width: 940px)').matches;
    if (mediaSp || document.URL.match(/about/)) {
      return false;
    }
    const main = document.querySelector('main');
    main.setAttribute('style', `padding-top: ${headerHeight}px`);
  }
}
