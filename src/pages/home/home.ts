import i18n from '../../i18n/fr-FR.json';
import Rellax from 'rellax';
import SmoothScroll from 'smooth-scroll';
import { NavbarAnim } from '../../layouts/navbar/navbar';

interface Member {
    IMAGE: string;
    INFORMATIONS: string;
    NAME: string;
    STATUS: string;
    XP: string;
}

// Init
window.onload = () => {

    // Init smooth scroll
    new SmoothScroll('a[href*="#"]');

    // Init navbar animations
    new NavbarAnim();

    initSlider();

    new Rellax('.rellax', {
        speed: -2,
        round: true,
        vertical: true
    });
};

const initSlider = () => {

    let memberIndexSelected: number = 0;

    // Member preview elements
    const memberWrapper = document.querySelector('#page-home #team #member-preview-wrapper');
    const memberImageEl = memberWrapper.querySelector('.member-image');
    const memberNameEl = memberWrapper.querySelector('.member-name');
    const memberStatusEl = memberWrapper.querySelector('.member-status');
    const memberXpEl = memberWrapper.querySelector('.member-xp');
    const memberInformationsEl = memberWrapper.querySelector('.member-informations');
    const memberBtnNextEl = memberWrapper.querySelector('.btn-next');
    const memberBtnPrevEl = memberWrapper.querySelector('.btn-prev');

    // Members data and elements
    const members: Array<Member> = i18n.TEAM.MEMBERS;
    const membersEl = document.querySelectorAll('#page-home #team #members .member');

    // Listen member click
    membersEl.forEach((el, index) => {
        el.addEventListener('click', () => { selectMember(index); });
    });

    // Listen next member button click
    memberBtnNextEl.addEventListener('click', () => {
        const nextIndex = (members.length === memberIndexSelected + 1) ? 0 : memberIndexSelected + 1;
        selectMember(nextIndex);
    });

    // Listen previous member button click
    memberBtnPrevEl.addEventListener('click', () => {
        const nextIndex = (memberIndexSelected === 0) ? members.length - 1 : memberIndexSelected - 1;
        selectMember(nextIndex);
    });

    // On member selected
    const selectMember = (memberIndex: number) => {

        const selectedMember: Member = members[memberIndex];

        // Remove class for previous member selected
        membersEl[memberIndexSelected].classList.remove('selected');

        // Add class for new member selected
        membersEl[memberIndex].classList.add('selected');

        // Set member preview
        memberImageEl['style'].backgroundImage = `url('assets/images/${selectedMember.IMAGE}')`;
        memberNameEl.innerHTML = selectedMember.NAME;
        memberStatusEl.innerHTML = selectedMember.STATUS;
        memberXpEl.innerHTML = selectedMember.XP;
        memberInformationsEl.innerHTML = selectedMember.INFORMATIONS;

        memberIndexSelected = memberIndex;
    };

    selectMember(memberIndexSelected);
};
