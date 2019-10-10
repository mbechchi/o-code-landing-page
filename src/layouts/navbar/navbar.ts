const NAVBAR_ANIM_Y = 150;

export class NavbarAnim {

    private didScroll = false;
    private navEl;

    constructor() {

        this.navEl = document.querySelector('nav');

        // Init navbar
        this.scrollPage();

        // Listen page scroll
        window.addEventListener('scroll', this.onPageScroll.bind(this), false);

        // Listen mobile menu button click
        const mobileMenuBtnEl = document.querySelector('#mobile-menu-btn');
        mobileMenuBtnEl.addEventListener('click', this.onMobileMenuButtonClick.bind(this));
    }

    onPageScroll() {

        if(!this.didScroll) {
            this.didScroll = true;
            setTimeout(this.scrollPage.bind(this), 250);
        }
    }

    scrollPage() {

        const sy = this.scrollY();

		if (sy >= NAVBAR_ANIM_Y) {
            this.navEl.classList.add('shrink');
		}
		else {
            this.navEl.classList.remove('shrink');
        }

		this.didScroll = false;
	}

	scrollY(): number {
		return window.pageYOffset || document.documentElement.scrollTop;
    }

    onMobileMenuButtonClick() {

        if(this.navEl.classList.contains('mobile-menu-opened')) {
            this.navEl.classList.remove('mobile-menu-opened');
            document.body.style.overflowY = 'auto';
        }
        else {
            this.navEl.classList.add('mobile-menu-opened');
            document.body.style.overflowY = 'hidden';
        }
    }
}
