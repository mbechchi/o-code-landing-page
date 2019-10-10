import './style.scss';
import './pages/home/home';
import { NavbarAnim } from './layouts/navbar/navbar';


// Init
window.onload = () => {

    // Init smooth scroll
    new SmoothScrollAnim();

    // Init navbar animations
    new NavbarAnim();
};

export class SmoothScrollAnim {

    constructor() {
        const links = document.querySelectorAll('.scroll');
        links.forEach(el => {
            el['onclick'] = (e) => { this.scrollAnchors(e, el); };
        });
    }

    scrollAnchors(e, respond = null) {

        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
        e.preventDefault();

        let targetID = respond.getAttribute('href')
        const targetAnchor = document.querySelector(targetID);

        if (!targetAnchor) return;

        const originalTop = distanceToTop(targetAnchor);
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });

        const checkIfDone = setInterval(() => {
            const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                targetAnchor.tabIndex = '-1';
                targetAnchor.focus();
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    }
}
