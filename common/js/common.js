(function($){
const headerHeight = $('header').height();
const mediaSp = matchMedia('(max-width: 940px)').matches;

$(document).ready(function() {
  if(mediaSp){
     return false;
  }
  $('main').css({'padding-top':headerHeight + 'px'});
});


//スライドトグル
const slideToggle = function(){
$('.toggle-btn-inner').each(function(){
    let openText = $(this).find('.toggle-open').text();
    let closeText =  $(this).find('.toggle-close').text();
  $(this).on('click',function(){
    let target = $(this).data('target');
    let toggle = document.getElementById(target);
    $(toggle).slideToggle(300);
    if($(this).text() !== closeText){
      $(this).text(closeText);
        }
        else{
          $(this).text(openText);
        }
    });
  });
}
slideToggle();

//ファーストビュー
      if(sessionStorage.getItem('first-view') ) {
        $('.first-view').css("display","none");
      }
      else{
      $(document).ready(function(){
            setTimeout(fadeOut, 1000);
            sessionStorage.setItem('first-view', 'on');
        });
      }
      let fadeOut = function(){
        $('.first-view').addClass('-fade-out');
      }

//スクロールフェイドイン
      $(window).on('scroll' , function(){
        $('.scroll-fading').each(function(){
          let windowHeight = $(window).height();
          let targetPosition = $(this).offset().top - windowHeight;
          if($(window).scrollTop() > targetPosition){
          $(this).addClass('fade-in');
          }
        });
      });

//ページトップ用パララックス
$(window).on('scroll' , function(){
  let target = $(".parallax-inner");
  let scrollPosition = $(window).scrollTop();
  target.each(function(){
  let speed = $(this).data('js-speed');
  let scrollSpeed = speed * scrollPosition / 100;
  $(this).css({ 'transform' : 'translateY(-' + scrollSpeed + 'px)' } );
  });
});

//タブ
    $(function() {
      let tabs = $(".tab");
      $(".tab").on("click", function() {
        $(".active").removeClass("active");
        $(this).addClass("active");
        const index = tabs.index(this);
        $(".tab-inner").removeClass("open").eq(index).addClass("open");
      });
    });

//スムーズスクロール
$(function() {
$('a[href^="#"]').click(function() {
  let speed = 500; 
  let href= $(this).attr("href");
  let target = $(href == "#" || href == "" ? 'html' : href);
  let position = target.offset().top - headerHeight;
  $('body,html').animate({scrollTop:position}, speed, 'swing');
});
});

//ハンバーガー
$(function(){
  $('.btn-hamb').on('click', function() {
    $(this).toggleClass('active');
    $(".header-inner").toggleClass('active');
    setTimeout(function(){
      $(".global-nav").toggleClass('active');
    }
    ,500
    );
    return false;
  });
});

//Muuri
let maxHeight = 0;

$('.item').each(function() {
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
      return  isFilterMatch;
    });
  }

    })(jQuery);