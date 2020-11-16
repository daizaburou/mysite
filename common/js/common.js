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