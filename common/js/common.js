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
      $(window).on('load',function(){
      setTimeout(fadeOut, 1500);
    });
    })(jQuery);