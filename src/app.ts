import './style.scss';
import './pages/home/home';
import { NavbarAnim } from './layouts/navbar/navbar';


// Init
window.onload = () => {

    // Init navbar animations
    new NavbarAnim();
};
