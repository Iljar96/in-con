// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
import { setInputMask } from "./forms/forms.js";

const clickHandler = e => {
	const moreBtnOnClick = (items, btn, countEl = null, itemsCount = 6) => {
		if (items.length) {
			items.forEach((item, i) => {
				if (i < itemsCount) {
					item.removeAttribute('hidden');
				}
			})

			if (countEl && items.length < itemsCount * 2) {
				countEl.innerHTML = items.length - itemsCount;
			}
			if (items.length <= itemsCount) {
				btn.remove();
			}
		}
	}

	const target = e.target;
	//More articles block
	if (target.closest('.articles__btn.btn--more')) {
		const btn = target.closest('.articles__btn.btn--more');
		const parent = target.closest('.articles__tabs-body');
		const items = parent.querySelectorAll('.articles__item[hidden]');

		moreBtnOnClick(items, btn, null, 6);
	}
	if (target.closest('.cases-list__more.btn--more')) {
		const btn = target.closest('.cases-list__more.btn--more');
		const lastItemsCount = btn.querySelector('.cases-list__count');
		const parent = target.closest('.cases-list__container');
		const items = parent.querySelectorAll('.cases-list__item[hidden]');

		moreBtnOnClick(items, btn, lastItemsCount, 4);
	}

	if (target.closest('.form-block__nav-link')) {
		const form = e.target.closest('.form-block').querySelector('form'),
			navBlock = e.target.closest('.form-block__nav'),
			navItems = navBlock.querySelectorAll('.form-block__nav-link'),
			button = e.target.closest('.form-block__nav-link'),
			input = form.contacts,
			hiddenInput = form.contactTypes,
			inputErrorBlock = input.closest('.form__input-wrapper').querySelector('.form__error');

		navItems.forEach(item => item.classList.remove('_active'));
		button.classList.add('_active');
		input.placeholder = button.dataset.placeholder;
		input.dataset.type = button.dataset.type;
		input.classList.remove('_form-error');
		input.value = '';
		hiddenInput.value = button.innerHTML;

		if (inputErrorBlock) {
			inputErrorBlock.remove();
		}

		if (input.dataset?.type === 'whatsapp') {
			setInputMask(input);
		} else {
			if (input.inputmask) {
				input.inputmask.remove();
			}
		}
	}

	if (target.closest('.equipment__btn')) {
		const btn = target.closest('.equipment__btn');
		btn.remove();
	}
	if (target.closest('.case-block__btn') && target.closest('[data-read-more]')) {
		const parent = target.closest('[data-read-more]');
		const closeText = target.dataset.closeText;
		const openText = target.dataset.openText;

		target.innerHTML = parent.classList.contains('_opened') ? closeText : openText;
		parent.classList.toggle('_opened');
	}
}

document.body.addEventListener('click', clickHandler);

const header = document.querySelector('.header');

const changeHeaderHeightCssVar = (el) => {
	document.documentElement.style.setProperty('--header-height', el.offsetHeight + 'px');
};

// Sticky header
if (header) {
	window.addEventListener('scroll', () => {
		let scrollDistance = window.scrollY;

		if (scrollDistance > 0) {
			header.classList.add('_fixed');
		} else {
			header.classList.remove('_fixed');
			setTimeout(function () {
				changeHeaderHeightCssVar(header);
			}, 150);
		}
	});
}

if (header.classList.contains('header--secondary')) {
	// Вот тут функция оптимизации резайса (троттлинг)
	(function () {
		let throttle = function (type, name, obj) {
			obj = obj || window;
			let running = false;
			let func = function () {
				if (running) { return; }
				running = true;
				requestAnimationFrame(function () {
					obj.dispatchEvent(new CustomEvent(name));
					running = false;
				});
			};
			obj.addEventListener(type, func);
		};

		/* init - you can init any event */
		throttle("resize", "optimizedResize");
	})();

	const debounce = (fn, wait) => {
		let timeout;
		return (...arg) => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => fn(...arg), wait)
		}
	};

	window.addEventListener("optimizedResize", function () {
		if (!header.classList.contains('_fixed')) {
			debounce(() => changeHeaderHeightCssVar(header), 200)();
		}
	});
}

window.onload = function () {
	document.querySelectorAll('._hidden')
		.forEach(item => item.classList.remove('_hidden'));
}
