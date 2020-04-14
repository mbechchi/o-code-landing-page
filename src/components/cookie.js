
import React from "react"

import 'cookieconsent';
// import 'cookieconsent/src/cookieconsent.js'
import 'cookieconsent/build/cookieconsent.min.css'

class CookieConsent extends React.Component {

    constructor() {
        super();

        this.options = {
            palette: {
                popup: {
                    "background": "#fff"
                },
                button: {
                    "background": "#fff",
                    "border": "#000",
                    "text": "#000"
                }
            },
            position: "bottom-right",
            type: "opt-in",
            content: {
                message: "Ce site utilise des cookies de pistage afin de réaliser des statistiques de visites. Ces cookies ne sont déposés que si vous donnez votre accord en cliquant sur le bouton Accepter. Ces données ne seront pas utilisées pour vous identifier ou vous contacter.",
                allow: "Accepter",
                dismiss: "Refuser",
                deny: "Refuser",
                link: "En savoir plus",
                href: "https://www.cnil.fr/fr/site-web-cookies-et-autres-traceurs",
                policy: "<svg xmlns='http://www.w3.org/2000/svg' height='12' width='12' viewBox='0 0 32 32' class='u-fill-primary u-mg-right-s'><path d='M31.715 13.04a.999.999 0 00-1.894-.226A2 2 0 0128.001 14c-.895.002-1.651-.602-1.903-1.431a1 1 0 00-1.186-.686A3.981 3.981 0 0124 12a4.013 4.013 0 01-4-4c0-.297.043-.596.117-.911a1.001 1.001 0 00-.686-1.187C18.602 5.651 17.998 4.895 18 4a2 2 0 011.186-1.82.999.999 0 00-.226-1.895A16.025 16.025 0 0016 0C7.174.002.002 7.174 0 16c.002 8.826 7.174 15.998 16 16 8.826-.002 15.998-7.174 16-16 0-1.018-.106-2.006-.285-2.96zm-5.82 12.855C23.356 28.432 19.862 30 16 30s-7.356-1.568-9.895-4.105C3.568 23.356 2 19.862 2 16s1.568-7.356 4.105-9.895A13.952 13.952 0 0116 2c.18 0 .356.019.535.027A3.96 3.96 0 0016 4c.002 1.493.83 2.773 2.037 3.456A5.05 5.05 0 0018 8a6.006 6.006 0 006 6c.188 0 .366-.018.544-.037.683 1.206 1.962 2.035 3.456 2.037a3.96 3.96 0 001.973-.535c.008.178.027.355.027.535 0 3.862-1.568 7.356-4.105 9.895z'/><path d='M14 8a2 2 0 11-3.999.001A2 2 0 0114 8zM10 16a2 2 0 11-3.999.001A2 2 0 0110 16zM20 24a2 2 0 11-3.999.001A2 2 0 0120 24zM18 17a1 1 0 11-2 0 1 1 0 012 0zM26 21a1 1 0 11-2 0 1 1 0 012 0zM12 23a1 1 0 11-2 0 1 1 0 012 0z'/></svg> Cookies"
            },
            onInitialise: this.ManageConsent,
            onStatusChange: this.ManageConsent,
        }

        this.state = {
            didConsent: false
        };
    }

    ManageConsent = (status) => {

        if (status === 'allow') {
            this.setState({
                didConsent: true
            });
        }

        if (this.options.type === 'opt-in' && this.state.didConsent) {
            console.log('cookie consent given');
            this.onConsentGiven();
        }
        else {
            console.log('did not consent');
            this.setState({
                didConsent: false
            });
        }
    }

    onConsentGiven = () => {

        /* eslint-disable */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-XXXXX', 'auto');
        ga('send', 'pageview');
        /* eslint-disable */

    }

    // cookieconsent.initialise() need to be bound to a this context
    // Hence the class component and the componentDidMount lifecycle here
    componentDidMount() {
        window.cookieconsent.initialise(this.options);
    }

    render() {
        return (null)
    }

}

export default CookieConsent
