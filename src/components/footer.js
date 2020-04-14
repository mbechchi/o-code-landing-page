import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Logo from "../components/svg/logo"

const Footer = () => {

    const data = useStaticQuery(graphql`
        query {
            allContentJson {
                edges {
                    node {
                        global {
                            footer {
                              copyright
                              locations {
                                address
                                title
                              }
                              social {
                                instagram
                                linkedin
                                title
                                twitter
                              }
                              navigation {
                                policy
                                privacy
                              }
                            }
                            brand {
                              description
                              name
                            }
                          }
                    }
                }
            }
        }
    `);

    const content = data.allContentJson.edges[0].node.global.footer
    const brand = data.allContentJson.edges[0].node.global.brand

    return (
        <footer className={"c-footer u-fs-s u-pd-vt-xl u-pd-bottom-l@main u-pd-top-xxl@main u-pd-hz-l u-pd-hz-0@main"}>
            <div className="l-container">
                <Logo className="c-logo u-mg-bottom-m" />
                <div className="l-grid u-mg-bottom-l">
                    <div className="l-col-12 l-col-6@main">
                        <p className="u-mg-bottom-l" style={{ maxWidth: '380px' }}>{brand.description}</p>
                    </div>
                    <div className="l-col-12 l-col-6@main l-grid u-flex-end@main">
                    {content.locations.map((item, index) => (
                        <div className="l-col-6 l-col-4@main u-pd-bottom-m" key={"footer-location-" + index}>
                            <p className="u-bold u-uppercase">{item.title}</p>
                            <p dangerouslySetInnerHTML={{ __html: item.address }}></p>
                        </div>
                    ))}
                        <div className="l-col-6 l-col-4@main u-pd-bottom-m">
                            <p className="u-bold u-uppercase">{content.social.title}</p>
                            {/* <a href="#" target="_blank" rel="noopener noreferrer" className="u-block">{content.social.instagram}</a> */}
                            <a href="https://twitter.com/ocode_tech" target="_blank" alt="Twitter" rel="noopener noreferrer" className="u-block">{content.social.twitter}</a>
                            <a href="https://www.linkedin.com/company/ocode/about/" target="_blank" alt="LinkedIn" rel="noopener noreferrer" className="u-block">{content.social.linkedin}</a>
                        </div>
                    </div>
                </div>
                <div className="u-flex u-flex-center-vt@main u-flex-dir-col u-flex-dir-row-reverse@main u-flex-end">
                    <div className="u-flex@main u-pd-vt-m">
                        <Link to="/mentions-legales" className="u-block u-fs-xs u-pd-right-l">{content.navigation.policy}</Link>
                        <Link to="/protection-des-donnees" className="u-block u-fs-xs">{content.navigation.privacy}</Link>
                    </div>
                    <p className="u-fs-xs u-grey70 u-pd-right-l@main">{content.copyright}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
