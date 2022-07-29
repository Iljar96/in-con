export const tabLines = () => {
	const navLines = document.querySelectorAll('[data-tab-line]');

	navLines.forEach(navLine => {
		const tabsBlock = navLine.closest('[data-tabs]');
		const titleBlock = tabsBlock.querySelector('[data-tabs-titles]');
		const navItems = titleBlock.querySelectorAll('button');
		const activeNavItems = titleBlock.querySelector('button._tab-active');
		let isFirstCall = true;

		if (navLine) {
			if (isFirstCall) {
				navLine.style.width = `${activeNavItems.offsetWidth}px`;
				navLine.style.left = `${activeNavItems.offsetLeft}px`;
				isFirstCall = false;
			}

			navItems.forEach(el => {
				el.addEventListener('mouseenter', (e) => {
					setTimeout(() => {
						navLine.style.width = `${e.target.offsetWidth}px`;
						navLine.style.left = `${e.target.offsetLeft}px`;
					}, 10);

				});

				el.addEventListener('mouseleave', () => {
					let navItemActive = titleBlock.querySelector('._tab-active');

					navLine.style.width = `${navItemActive.offsetWidth}px`;
					navLine.style.left = `${navItemActive.offsetLeft}px`;
				});
			});
		}
	})
}