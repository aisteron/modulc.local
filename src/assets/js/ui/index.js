import { load_toast, qs, qsa, xml } from "../libs"

export function Ui(){
	mobile_menu()
	cb_form()

}

function mobile_menu(){

	let navs = [qs('header ul.nav'), qs('.header ul.nav')];

	qs('#nav-icon1')?.listen("click", e => {
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
		qs('#nav-icon1')?.classList.remove('open')
		
	})

	// accordeon 
	qs('ul.nav li.prod .head')?.listen("click", e => {
		qs('ul.nav li.prod .body').classList.toggle('open')
		e.target.classList.toggle('open')
	})

	// insert home link

	if(window.innerWidth <=780){
		const str = `<li><a href="/">Главная</a></li>`
		navs.forEach(n=>n?.insertAdjacentHTML('afterbegin', str))
	}
}

async function cb_form(){
	const form = qs('form.cb')
	if(!form) return
	
	form.listen("submit", async e => {
		e.preventDefault()

		const how = Array.from(qsa('.how input:checked'))
								.map(el => qs('.l',el.closest('label')).innerHTML.replace('\t','') ) 
		
		const obj = {
			name: qs('[name="name"]', e.target).value,
			phone: qs('[name="phone"]', e.target).value,
			how: how
		}

		if(qs('textarea', e.target).value){
			obj.message = qs('textarea', e.target).value
		}

		qs('button[type="submit"]').disabled = true

		let res = await xml('callback', obj, '/api')
		qs('button[type="submit"]').disabled = false
		
		try{
			res = JSON.parse(res)
		} catch(e){
			await load_toast()
			new Snackbar('Ошибка парсинга JSON')
		}

		if(!res.success){
			await load_toast()
			new Snackbar('Ошибка отправки заявки')
			return
		}

		await load_toast()
		new Snackbar('✅ Успешно отправлено')

		qs('[name="name"]', e.target).value = ''
		qs('[name="phone"]', e.target).value = ''
		qs('textarea', e.target).value = ''

		qsa('.how input').forEach(el => el.checked = false)

		try {
			ym(97465658,'reachGoal','cb')
		} catch(e){
			console.log(e)
		}




		
		
	})
}