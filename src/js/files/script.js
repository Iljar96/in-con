// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";
window.onload = function () {
	document.querySelectorAll('._hidden')
		.forEach(item => item.classList.remove('_hidden'));
}


const clickHandler = e => {
	//More articles block
	if (e.target.closest('.articles__btn.btn--more')) {
		e.target.closest('.articles__btn.btn--more').remove();
	}

	if (e.target.closest('.form-block__nav-link')) {
		const form = e.target.closest('.form-block').querySelector('form'),
			navBlock = e.target.closest('.form-block__nav'),
			navItems = navBlock.querySelectorAll('.form-block__nav-link'),
			button = e.target.closest('.form-block__nav-link'),
			input = form.querySelector('.form__input');

		navItems.forEach(item => item.classList.remove('_active'));
		button.classList.add('_active');
		input.placeholder = button.dataset.placeholder;
		input.dataset.type = button.dataset.type;
	}

	if (e.target.closest('.equipment__btn')) {
		const btn = e.target.closest('.equipment__btn');
		btn.remove();
	}
}

document.body.addEventListener('click', clickHandler);

const header = document.querySelector('.header');
const first = document.querySelector('.page');
const headerHeight = header.offsetHeight;
const firstHeight = first.offsetHeight;
let lastScrollTop = 0;


// Sticky header
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (scrollDistance > 0) {
		header.classList.add('_fixed');
	} else {
		header.classList.remove('_fixed');
	}
});