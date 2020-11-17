(function($){
//スライドトグル
$('.toggle-btn-inner').each(function(){
  $(this).on('click',function(){
    let target = $(this).data('target');
    let toggle = document.getElementById(target);
    $(toggle).slideToggle(200);
    if($(this).text() === "続きを読む"){
      $(this).text("省略する");
        }
        else{
          $(this).text("続きを読む");
        }
    });
  });

//ファーストビュー
      if( !sessionStorage.getItem('first-view') ) {
        $('.first-view').css("display","block");
      $(window).on('load',function(){
            setTimeout(fadeOut, 1000);
            sessionStorage.setItem('first-view', 'on');
        });
      }
      let fadeOut = function(){
        $('.first-view').addClass('-fade-out');
      }
    })(jQuery);