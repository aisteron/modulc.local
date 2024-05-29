import { qs } from "../libs"

export function Pages(){
	
	//scroll()
	background_images()
}

function scroll(){
	
	var divs = $('section');
  var div = 0;
  div = -1
  divs.each(function(i) {
    if (div < 0 && ($(this).offset().top >= $(window).scrollTop())) {
        div = i;
    }
  });
  $(window).on('mousewheel DOMMouseScroll', function(e) {
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      if (div > 0) {
        div--;
      }
    } else {
      if (div < divs.length) {
        div++;
      }
    }
    $('html,body').stop().animate({
      scrollTop: divs.eq(div).offset().top
    }, 1000);
    return false;
  });
  $(window).resize(function() {
    $('html,body').scrollTop(divs.eq(div).offset().top);
  });
}

function background_images(){
	
}

