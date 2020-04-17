import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Logo from "../components/svg/logo"
import { ButtonFormModal } from "../components/formModal"

import { useScrollPosition } from "../components/utils/scrollPosition"

const Header = ({ onScrollToRef, location }) => {

  const data = useStaticQuery(graphql`
      query {
        allContentJson {
          edges {
            node {
              global {
                header {
                  cta
                  navigation {
                    contact
                    solution
                    testimonials
                  }
                }
              }
            }
          }
        }
      }
  `);

  const content = data.allContentJson.edges[0].node.global.header

  // Nav appearance
  const [navTranslate, setNavTranslate] = useState('0');

  const handleScrollMenu = (prevPos, currPos) => {
    if (currPos.y >= -120) {
      setNavTranslate(currPos.y + 'px')
    }
    else {
      let isVisible = currPos.y > prevPos.y
      setNavTranslate(isVisible ? '0' : '-100%')
    }
  }

  useScrollPosition(({ prevPos, currPos }) => {
    handleScrollMenu(prevPos, currPos)
  },[navTranslate])

  return (

    <header className={"c-header"} style={{ transform: `translateY(${navTranslate})` }}>

        <div className="l-container">

          <div className="u-flex u-flex-between u-flex-center-vt u-height-full">

            <div className="c-header__logo u-pd-hz-m u-pd-hz-0@main">
              <Link to="/" aria-label="logo">
                <Logo className="c-logo" aria-label="logo"/>
              </Link>
            </div>

            <div className="c-header__menu u-hide u-flex@main">

              { location.pathname === '/' &&
                <ul className="c-header__nav u-reset-list u-pd-hz-l">
                  <li className="u-pd-hz-l">
                    <button onClick={() => onScrollToRef('solution')}>{content.navigation.solution}</button>
                  </li>
                  <li className="u-pd-hz-l">
                    <button onClick={() => onScrollToRef('testimonials')}>{content.navigation.testimonials}</button>
                  </li>
                  <li className="u-pd-hz-l">
                    <button onClick={() => onScrollToRef('contact')}>{content.navigation.contact}</button>
                  </li>
                </ul>
              }

                <ButtonFormModal
                  btnClassName="c-btn c-btn--primary"
                  btnLabel={content.cta}
                />

            </div>

          </div>

        </div>

    </header>
  )

}

export default Header
