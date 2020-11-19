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
      $(window).on('load',function(){
            setTimeout(fadeOut, 1000);
            sessionStorage.setItem('first-view', 'on');
        });
      }
      let fadeOut = function(){
        $('.first-view').addClass('-fade-out');
      }
    })(jQuery);