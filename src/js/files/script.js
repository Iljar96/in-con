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