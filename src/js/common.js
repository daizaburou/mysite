import adjustHeight from './module/adjust-height';
import slideToggle from './module/slide-toggle';
import firstView from './module/first-view';
import scrollFadeIn from './module/scroll-fadein';
import smoothScroll from './module/smooth-scroll';
import slick from './module/slick';
import tab from './module/tab';
import hamburger from './module/hamburger';

window.addEventListener('DOMContentLoaded', function () {
  new adjustHeight();
  new slideToggle();
  new firstView();
  new scrollFadeIn();
  new smoothScroll();
  new slick();
  new tab();
  new hamburger();
});
