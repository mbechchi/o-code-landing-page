import './style.scss';
import fr_FR from './assets/i18n/fr-FR.json';

let currentLang = fr_FR;

// Init
window.onload = () => {

    // Fill translate with current lang
    document.querySelectorAll('[translate]').forEach((el) => {
        el.innerHTML = currentLang[el.getAttribute('translate')] || '';
        el.removeAttribute('translate');
    });
};