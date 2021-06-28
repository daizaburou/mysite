import anchorLink from './modules/top/_anchorLink';
import scrollFade from './modules/_scrollFade';
import parallax from './modules/_parallax';
import modal from './modules/_modal';
import nav from './modules/_nav';
import hero from './modules/top/_hero';
import openPage from './modules/_openPage';
import videoDefer from './modules/_videoDefer';
import Swiper, { Autoplay } from 'swiper';
Swiper.use([Autoplay]);

window.addEventListener('DOMContentLoaded', function () {
  new scrollFade();
  new parallax(document.getElementById('js-parallax'));
  new modal();
  new nav();
  new hero();
  new openPage();
  new videoDefer();
  // new Swiper('.swiper-container', {
  //   speed: 1000,
  //   slidesPerView: 1,
  //   loop: true,
  //   direction: 'vertical',
  //   allowTouchMove: false,
  //   preventClicks: false,
  //   preventClicksPropagation: false,
  //   autoplay: {
  //     delay: 2000,
  //   },
  // });
  new anchorLink(); // Swiperのloopで作成される複製スライドにもaddEventListenerする必要があるため、Swiperより後に実行
});
