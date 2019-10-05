import i18n from '../../i18n/fr-FR.json';

interface Member {
    IMAGE: string;
    INFORMATIONS: string;
    NAME: string;
    STATUS: string;
    XP: string;
}

// Init
window.onload = () => {

    const memberWrapper = document.querySelector('#page-home #team #member-preview-wrapper');
    const memberImageEl = memberWrapper.querySelector('.member-image');
    const memberNameEl = memberWrapper.querySelector('.member-name');
    const memberStatusEl = memberWrapper.querySelector('.member-status');
    const memberXpEl = memberWrapper.querySelector('.member-xp');
    const memberInformationsEl = memberWrapper.querySelector('.member-informations');

    const members: Array<Member> = i18n.TEAM.MEMBERS;
    const membersEl = document.querySelectorAll('#page-home #team #members .member');

    let memberIndexSelected: number = 0;

    membersEl.forEach((el, index) => {
        el.addEventListener('click', () => {
            selectMember(index);
        });
    });

    const selectMember = (memberIndex: number) => {

        const selectedMember: Member = members[memberIndex];

        // Remove class for previous member selected
        membersEl[memberIndexSelected].classList.remove('selected');

        // Add class for new member selected
        membersEl[memberIndex].classList.add('selected');

        // Set member preview
        memberImageEl['style'].backgroundImage = `assets/images/${selectedMember.IMAGE}`;
        memberNameEl.innerHTML = selectedMember.NAME;
        memberStatusEl.innerHTML = selectedMember.STATUS;
        memberXpEl.innerHTML = selectedMember.XP;
        memberInformationsEl.innerHTML = selectedMember.INFORMATIONS;

        memberIndexSelected = memberIndex;
    };

    selectMember(memberIndexSelected);
}
