// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";
window.onload = function () {
	document.querySelectorAll('._hidden')
		.forEach(item => item.classList.remove('_hidden'));


	const clickHandler = e => {
		//More articles block
		if (e.target.closest('.btn--more')) {
			e.target.remove();
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

	const changeHeaderHeightCssVar = (el) => {
		document.documentElement.style.setProperty('--header-height', el.offsetHeight + 'px');
	};

	changeHeaderHeightCssVar(header);

	// Sticky header
	if (header) {
		window.addEventListener('scroll', () => {
			let scrollDistance = window.scrollY;

			if (scrollDistance > 0) {
				header.classList.add('_fixed');
			} else {
				header.classList.remove('_fixed');
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
}
