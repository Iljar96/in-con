/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Lazy, EffectFade, Autoplay } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	// Перечень слайдеров
	if (document.querySelector('.team__slider')) {
		new Swiper('.team__slider', {
			modules: [Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			loop: true,
			lazy: true,
			// Arrows
			navigation: {
				nextEl: '.team__btn-next',
				prevEl: '.team__btn-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 2,
					spaceBetween: 0,
					autoHeight: true,
				},
				991: {
					slidesPerView: 4,
					spaceBetween: 0,
				},
			},
		});
	}
	if (document.querySelector('.cases__body')) {
		new Swiper('.cases__body', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 50,
			autoHeight: true,
			speed: 800,
			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: true,
			// Dotts
			//pagination: {
			//	el: '.slider-quality__pagging',
			//	clickable: true,
			//},
			// Arrows
			navigation: {
				nextEl: '.cases__btn-next',
				prevEl: '.cases__btn-prev',
			},
			on: {

			}
		});
	}
	if (document.querySelector('.intro__slider')) {
		new Swiper('.intro__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Lazy, EffectFade, Autoplay],
			effect: 'fade',
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: true,
			// Dotts
			//pagination: {
			//	el: '.slider-quality__pagging',
			//	clickable: true,
			//},
			// Arrows
			navigation: {
				nextEl: '.cases__btn-next',
				prevEl: '.cases__btn-prev',
			},
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			on: {
				init: function () {
					this.on('slideChange', function () {
						this.el.classList.add('slider-changed');
					});
				},
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});