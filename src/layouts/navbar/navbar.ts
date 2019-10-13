const NAVBAR_ANIM_Y = 150;

export class NavbarAnim {

    private activatedMenuIndex: number = -1;
    private didScroll = false;
    private navEl: HTMLElement;
    private navMenuEl: NodeListOf<HTMLElement>;
    private sections: Array<{scrollY: number, hash: string}> = [];

    constructor() {

        this.navEl = document.querySelector('nav');
        this.navMenuEl = this.navEl.querySelectorAll('.col-menu ul li');

        // Init navbar
        this.scrollPage();

        // Listen page scroll
        window.addEventListener('scroll', this.onPageScroll.bind(this), false);

        // Listen mobile menu button click
        const mobileMenuBtnEl = document.querySelector('#mobile-menu-btn');
        mobileMenuBtnEl.addEventListener('click', this.onMobileMenuButtonClick.bind(this));

        // Listen mobile menu links click
        const mobileMenuLinksEl = document.querySelectorAll('#mobile-menu a');
        mobileMenuLinksEl.forEach((el) => {
            el.addEventListener('click', this.onMobileMenuButtonClick.bind(this));
        });

        // Get all navbar-hash sections
        const sectionsEl = document.querySelectorAll('section[navbar-hash]');
        sectionsEl.forEach((el: HTMLElement) => {

            const hash = el.getAttribute('id');
            const offsetTop = el.offsetTop;

            this.sections.push({
                hash: hash,
                scrollY: offsetTop
            });
        });
    }

    onPageScroll() {

        this.setActiveMenu();

        if(!this.didScroll) {
            this.didScroll = true;
            setTimeout(this.scrollPage.bind(this), 250);
        }
    }

    setActiveMenu() {

        const scrollY = this.scrollY();
        let menuIndex = -1;

        this.sections.forEach((section, index) => {
            if (section.scrollY < scrollY + (window.innerHeight / 2)) {
                menuIndex = index;
                return;
            }
        });

        if(this.activatedMenuIndex !== menuIndex) {

            if(this.activatedMenuIndex > -1) {
                this.navMenuEl[this.activatedMenuIndex].classList.remove('active');
            }

            if(menuIndex > -1) {
                this.navMenuEl[menuIndex].classList.add('active');
            }

            this.activatedMenuIndex = menuIndex;
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
