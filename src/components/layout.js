import React from "react"
import Loadable from "react-loadable"

import Header from "../components/header"
import Footer from "../components/footer"
import Transition from "../components/transition"
import { FormModal } from "../components/formModal"

import { LocaleContextProvider } from "../components/context/localeContext"
import { ModalContextProvider } from "../components/context/modalContext"

// Styles
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import "../styles/main.scss"

// The CookieConsent component is client-side dependent.
// React-loadable makes it only be loaded in the client
const LoadCookieConsent = Loadable({
  loader: () => import("../components/cookie"),
  render(loaded, props) {
    let CookieConsent = loaded.default;
    return <CookieConsent/>;
  },
  loading() {
    return <div></div>
  }
});

const Layout = (pageProps) => {

  // console.log(pageProps);

  return (
    <LocaleContextProvider>
      <ModalContextProvider>

        <LoadCookieConsent />

        <Header onScrollToRef={pageProps.onScrollToRef} location={pageProps.location} />

        <Transition location={pageProps.location} className="u-pd-navbar-top">
          { pageProps.children }
        </Transition>

        <Footer />

        <FormModal modalClassName="c-modal--primary u-pd-l u-pd-xl@main" />

      </ModalContextProvider>
    </LocaleContextProvider>
  )
}

export default Layout
