import { qs } from "../libs"

export function Ui(){
	mobile_menu()

}

function mobile_menu(){

	let navs = [qs('header ul.nav'), qs('.header ul.nav')];

	qs('#nav-icon1').listen("click", e => {
		navs.forEach(n=>n?.classList.toggle('open'))
		e.target.classList.toggle('open')
	})

	// close by outside click
	document.listen("click", e => {

		let prevent = false

		navs.forEach(n => n == e.target ? prevent = true : prevent = false)
		navs.forEach(n => {
			if(n?.contains(e.target)) prevent = true
		})

		if(e.target == qs('#nav-icon1')) return

		if(prevent) return

		navs.forEach(n=>n?.classList.remove('open'))
		qs('#nav-icon1').classList.remove('open')
		
	})

	// accordeon 
	qs('ul.nav li.prod .head').listen("click", e => {
		qs('ul.nav li.prod .body').classList.toggle('open')
		e.target.classList.toggle('open')
	})

	// insert home link

	if(window.innerWidth <=780){
		const str = `<li><a href="/">Главная</a></li>`
		navs.forEach(n=>n?.insertAdjacentHTML('afterbegin', str))
	}
}