const SmoothScroll = require('smooth-scroll');
const smoothScroll = new SmoothScroll();

export default class {
  constructor() {
    this.touchStartY = null;
    window.addEventListener('load', this.checkOnHero.bind(this));
    window.addEventListener('scroll', this.checkOnHero.bind(this));
    document.addEventListener('wheel', this.handleScrollAction.bind(this), { passive: false });
    document.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleScrollAction.bind(this), { passive: false });
    document.addEventListener('keydown', this.handleScrollAction.bind(this), { passive: false });
  }

  checkOnHero() {
    if (document.body.classList.contains('is-hero-fixed') || document.body.classList.contains('is-scrolling')) {
      return;
    }
    if (document.getElementById('message').getBoundingClientRect().top > 0) {
      document.body.classList.add('is-hero-fixed');
      document.body.classList.add('is-scrolling');
      smoothScroll.animateScroll(document.getElementById('top'), null, {
        updateURL: false,
        speed: 500,
        speedAsDuration: true,
      });
      this.waitForScroll();
    }
  }

  handleScrollAction(e) {
    if (
      e.type == 'wheel' ||
      e.type == 'touchmove' ||
      (e.type == 'keydown' && (e.keyCode == 0x26 || e.keyCode == 0x28))
    ) {
      if (
        !document.body.classList.contains('is-modal') &&
        (document.body.classList.contains('is-hero-fixed') || document.body.classList.contains('is-scrolling'))
      ) {
        e.preventDefault();
      }
    }

    let isScrollDown = false;
    if (e.type == 'wheel') {
      isScrollDown = e.deltaY > 0;
    } else if (e.type == 'touchmove') {
      isScrollDown = this.touchStartY > e.touches[0].pageY;
    } else if (e.type == 'keydown') {
      isScrollDown = e.keyCode == 0x28;
    }

    if (
      !document.body.classList.contains('is-modal') &&
      document.body.classList.contains('is-hero-fixed') &&
      isScrollDown
    ) {
      document.body.classList.remove('is-hero-fixed');
      document.body.classList.add('is-scrolling');
      smoothScroll.animateScroll(document.getElementById('message'), null, {
        updateURL: false,
        speed: 500,
        speedAsDuration: true,
      });
      this.waitForScroll();
    }
  }

  handleTouchStart(e) {
    this.touchStartY = e.touches[0].pageY;
  }

  waitForScroll() {
    let timer;
    timer = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 300);
    window.addEventListener('scroll', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 300);
    });
  }
}
