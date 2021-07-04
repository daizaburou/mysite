import $ from 'jquery';

export default class {
  constructor() {
    const headerHeight = $('header').height();
    const mediaSp = matchMedia('(max-width: 940px)').matches;

    const addHeaderHeight = () => {
      if (mediaSp || document.URL.match(/about/)) {
        return false;
      }
      $('#main').css({ paddingTop: headerHeight + 'px' });
    };

    const addParallaxHeight = () => {
      const target = $('.parallax');
      target.each(function () {
        const parallaxHeight = $(this).height();
        const parallaxNext = $(this).next();
        if (parallaxNext.hasClass('parallax-height')) {
          parallaxNext.css({ height: parallaxHeight + 'px' });
        }
      });
    };
    addHeaderHeight();
    addParallaxHeight();
    $(window).on('resize', function () {
      addParallaxHeight();
    });
  }
}
