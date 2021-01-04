//slick.js
$('.slider').slick({
  accessibility: true,
  autoplay: false,
  autoplaySpeed: 8000,
  dots: true,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
  });
