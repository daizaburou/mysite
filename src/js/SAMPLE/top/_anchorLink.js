const SmoothScroll = require('smooth-scroll');
const smoothScroll = new SmoothScroll();

export default class {
  constructor() {
    const anchorElements = Array.prototype.slice.call(document.querySelectorAll('button[data-href*="#"]'), 0);
    if (anchorElements) {
      [...anchorElements].forEach((anchor) => {
        anchor.addEventListener('click', this.handleClick.bind(this), false);
      });
    }
  }
  handleClick(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('data-href');
    const targetElement = document.querySelector(href);
    const navClose = document.getElementById('js-nav-close');

    document.body.classList.remove('is-hero-fixed');
    if (navClose) {
      navClose.click();
    }
    if (targetElement) {
      document.body.classList.add('is-scrolling');
      smoothScroll.animateScroll(targetElement, null, { updateURL: false, speed: 300 });
    }
    this.waitForScroll();
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
