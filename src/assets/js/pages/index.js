import { preloadImages, qs, qsa, xml } from "../libs"

export function Pages(){



	if(qs('.index-page')){
		window.innerWidth >= 720
		&& ( scroll(), background_images() )
	}

	img_icon_scroll()
	
	new fullpage('#fullpage', {
		licenseKey: 'YOUR_KEY_HERE',
		autoScrolling:true,
		scrollHorizontally: true
	});
	
}

async function scroll(){


	await load_jquery()	

	
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

async function background_images(){
	let cfg = await xml("get_bg_config",null,'/api')
	cfg = JSON.parse(cfg)
	preloadImages(cfg.map(c=>window.location.href+c.src))

	qsa('li[resid]').forEach(li => {
		li.listen('mouseover', e => {

			let resid = +e.target.closest('li').getAttribute('resid')		
			let obj = cfg.find(c => c.resid == resid)

			let bgs = qs('.bgs',e.target.closest('section'))

			bgs.classList.add('changing')
			bgs.style.backgroundImage = "url("+obj.src+")"
			//bgs.classList.remove('changing')
			
		})
	})
}

async function load_jquery(){
	return new Promise(resolve => {

		if(qs('[jquery]')){resolve(); return}

		let script = document.createElement('script')
		script.src = '/vendors/jquery.min.js'
		script.setAttribute('jquery','')
		qs('.scripts-area').appendChild(script)
		script.onload = () => resolve()
	})
	
}




function img_icon_scroll(){
	let icon = qs('.cnt img.scroll')
	icon?.listen("click", e => {
		qs('section.area').scrollIntoView({ behavior: "smooth"})
	})
}