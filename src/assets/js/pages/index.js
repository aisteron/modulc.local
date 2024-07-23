import { preloadImages, qs, qsa, xml } from "../libs"

export function Pages(){


	// скролл fullpage для главной страницы
	(qs('#fullpage') && window.innerWidth >= 720) && new fullpage('#fullpage', {
		licenseKey: 'YOUR_KEY_HERE',
		autoScrolling:true,
		scrollHorizontally: true
	});
	
	// главная страница. скролл до следующей секции по клику на иконку
	img_icon_scroll()

	// подмена background изображений у секций
	window.innerWidth >= 720 && background_images()
	
}

async function background_images(){

	if(!qs('.section.area')) return

	let cfg = await xml("get_bg_config",null,'/api')
	cfg = JSON.parse(cfg)
	preloadImages(cfg.map(c=>window.location.origin+"/"+c.src))

	qsa('li[resid]').forEach(li => {
		li.listen('mouseover', e => {

			let resid = +e.target.closest('li').getAttribute('resid')		
			let obj = cfg.find(c => c.resid == resid)

			let bgs = qs('.bgs2',e.target.closest('.section'))

			bgs.classList.add('changing')

			bgs.style.backgroundImage = "url("+obj.src+")"
			//bgs.classList.remove('changing')
			
		})
	})
}

function img_icon_scroll(){
	let icon = qs('.cnt img.scroll')
	icon?.listen("click", e => {
		//qs('.section.area').scrollIntoView({ behavior: "smooth"})
		fullpage_api.moveSectionDown()
	})
}