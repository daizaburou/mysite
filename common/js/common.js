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
        let scrollNomal = $('.scroll-fading');
        scrollNomal.each(fadeIn(scrollNomal));
      });

    const fadeIn = (elem) => {
      let windowHeight = $(window).height();
      let targetPosition = elem.offset().top - windowHeight;
      if($(window).scrollTop() > targetPosition){
      $(elem).addClass('fade-in');
      }
    }


    $(function() {
      let tabs = $(".tab");
      $(".tab").on("click", function() {
        $(".active").removeClass("active");
        $(this).addClass("active");
        const index = tabs.index(this);
        $(".tab-inner").removeClass("open").eq(index).addClass("open");
      })
    })
    })(jQuery);