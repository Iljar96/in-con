
/*
Документация по работе в шаблоне: https://www.lightgalleryjs.com/docs/
Документация плагина: https://www.lightgalleryjs.com/docs/
Сниппет(HTML):
*/

// Подключение базового набора функционала
import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js';
import lgVideo from 'lightgallery/plugins/video/lg-video.min.js';

// Плагины
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
// import lgThumbnail from 'lightgallery/plugins/thumbnail'

// Базовые стили
import '@scss/libs/gallery/lightgallery.scss';
// Стили дополнений
// import '@scss/libs/gallery/lg-thumbnail.scss';
import '@scss/libs/gallery/lg-video.scss';
// import '@scss/libs/gallery/lg-autoplay.scss';
import '@scss/libs/gallery/lg-zoom.scss';
// import '@scss/libs/gallery/lg-pager.scss';
// import '@scss/libs/gallery/lg-fullscreen.scss';
// import '@scss/libs/gallery/lg-share.scss';
// import '@scss/libs/gallery/lg-comments.scss';s
// import '@scss/libs/gallery/lg-rotate.scss';
// import '@scss/libs/gallery/lg-medium-zoom.scss';
// import '@scss/libs/gallery/lg-relative-caption.scss';

// Все стили
// import '@scss/libs/gallery/lightgallery-bundle.scss';

// Запуск
const galleries = document.querySelectorAll('[cases-galery]');
if (galleries.length) {
	galleries.forEach(gallery => {
		lightGallery(gallery, {
			plugins: [lgZoom, lgVideo],
			licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
			speed: 500,
			escKey: true,
			download: 0,
			mobileSettings: {
				showCloseIcon: true
			}
		});


		gallery.addEventListener('keyup', event => {
			if (event.code === 'Enter' && event.target.closest('[tabindex]'))
				event.target.click();
		});
	});
}

//Cases gallery
let itemGallery = document.getElementById('cases-galery');
let itemGalleryLinks = itemGallery.querySelectorAll('.cases__col-video');
let realIndexSlider;
let itemGalleryDynamic = [];
if (itemGallery && itemGalleryLinks.length > 0) {
	for (let i = 0; i < itemGalleryLinks.length; i++) {
		const link = itemGalleryLinks[i];
		itemGalleryDynamic[i] = {
			src: link.getAttribute('data-src'),
			poster: link.getAttribute('data-poster'),
		};
	}


	let itemGalleryLight = lightGallery(itemGallery, {
		plugins: [lgVideo],
		licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
		dynamic: true,
		speed: 500,
		escKey: true,
		download: 0,
		mobileSettings: {
			controls: true,
			showCloseIcon: true,
		},
		dynamicEl: itemGalleryDynamic,
	});

	itemGallery.addEventListener('click', function (e) {
		if (e.target.closest('.cases__col-video')) {
			realIndexSlider = itemGallery.getElementsByClassName('swiper-slide-active');
			realIndexSlider = Number(realIndexSlider[0].getAttribute('data-swiper-slide-index'));
			itemGalleryLight.openGallery(realIndexSlider);
		}
	});
}




