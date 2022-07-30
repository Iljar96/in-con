// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";
window.onload = function () {
	document.querySelectorAll('._hidden')
		.forEach(item => item.classList.remove('_hidden'));
}

document.body.addEventListener('click', (e) => {
	if (e.target.closest('.articles__btn.btn--more')) {
		e.target.closest('.articles__btn.btn--more').remove();
	}
});

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