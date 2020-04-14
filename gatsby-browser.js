
exports.onRouteUpdate = ({ location, prevLocation }) => {
    document && document.querySelector('body').classList['remove']("u-overflow-hidden");
}

exports.onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `Le site a été mis à jour !` +
        `Souhaitez-vous raffraichir la page pour la mettre à jour ?`
    )
    if (answer === true) {
      window.location.reload()
    }
}