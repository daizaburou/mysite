(function($){

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
  let position = target.offset().top;
  $('body,html').animate({scrollTop:position}, speed, 'swing');
});
});


    })(jQuery);