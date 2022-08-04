// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
import { setInputMask } from "./forms/forms.js";

window.onload = function () {
	document.querySelectorAll('._hidden')
		.forEach(item => item.classList.remove('_hidden'));

	const clickHandler = e => {
		const target = e.target;
		//More articles block
		if (target.closest('.btn--more')) {
			target.remove();
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

			if (input.dataset.type === 'whatsapp') {
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

			target.innerHTML = parent.classList.contains('_opened') ? 'Читать дальше' : 'Скрыть';
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

	const forms = document.querySelectorAll('.form-block__form');

	// const onSubmit = (e) => {
	// 	e.preventDefault();

	// 	// var selector = e.target.contacts;

	// 	// var im = new Inputmask("99-9");
	// 	// im.mask(selector);
	// }

	forms.forEach(form => {
		var input = form.contacts;

		// var im = new Inputmask("99-9999999");
		// im.mask(input);

		// input.addEventListener('input', (e) => {
		// 	function tealegramTest(formRequiredItem) {
		// 		return /^[a-zA-Z0-9_.]{1,30}$/.test(formRequiredItem.value);
		// 	}

		// 	tealegramTest(e.target);
		// })

		// form.addEventListener('submit', onSubmit)
	});
}
