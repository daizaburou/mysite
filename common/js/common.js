(function($){
//スライドトグル
    $('.toggle-btn').click(function(){
    $('.toggle').slideToggle(200);
    if($('.toggle-btn').text() === "続きを読む"){
        $('.toggle-btn').text("省略する");
        }
        else{
        $('.toggle-btn').text("続きを読む");
        }
    
    });

//ファーストビュー
    let fadeOut = function(){
        $('.first-view').addClass('-fade-out');
      }
      if( !sessionStorage.getItem('first-view') ) {
      $(window).on('load',function(){
            $('.first-view').css("display","block");
            setTimeout(fadeOut, 1000);
            sessionStorage.setItem('first-view', 'on');
        });
      }
    })(jQuery);