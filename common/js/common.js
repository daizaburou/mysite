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
            let elm = $(this);
            let windowHeight = $(window).height();
            let targetPosition = elm.offset().top - windowHeight;
            if($(window).scrollTop() > targetPosition){
            $(elm).addClass('fade-in');
            }
        });
    });

    })(jQuery);