import React, { useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { IntersectionObserverProvider } from "../components/context/intersection0bserverContext"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { ButtonFormModal } from "../components/formModal"
import Testimonials from "../components/testimonials"

import { FadeInUp } from "../components/animations/fadeInUp"

import IntroVideoWebm from "../assets/videos/ocode-intro.webm"
import IntroVideoMp4 from "../assets/videos/ocode-intro.mp4"

export const homePictureFragment = graphql`
  fragment homePictureFragment on File {
    childImageSharp {
      fluid(maxWidth: 483, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`

const HomePage = (props) => {

  const data = useStaticQuery(graphql`
    query {
      allContentJson {
        edges {
          node {
            global {
              header {
                navigation {
                  contact
                  solution
                  testimonials
                }
              }
            }
            home {
              demo_band {
                cta
                title
              }
              headband {
                cta
                desc
                title
              }
              solution {
                features {
                  desc
                  title
                  tldr
                  pic
                }
                title
              }
              testimonials {
                title
              }
            }
          }
        }
      }
      homePictures: allFile(
        filter: {
            extension: {regex: "/(jpg)|(jpeg)|(png)/"},
            relativeDirectory: {eq: "images/home"}
        }
      ) {
        nodes {
          name
          ...homePictureFragment
        }
      }
    }
  `);

  const content = data.allContentJson.edges[0].node.home;
  const global = data.allContentJson.edges[0].node.global;

  // Ref collection
  const solutionRef = useRef(null)
  const testimonialsRef = useRef(null)
  const endOfPageRef = useRef(null)
  const anchors = {
    'solution': solutionRef,
    'testimonials': testimonialsRef,
    'contact': endOfPageRef,
  }
  const scrollToRef = (refName) => {
    window.scrollTo(0, anchors[refName].current.offsetTop);
  }


  return (
    <Layout {...props} onScrollToRef={scrollToRef}>
      <div className={"c-content"}>

        <SEO title="Accueil O°Code" />

        {/* Headband */}
        <IntersectionObserverProvider className="c-headband u-pd-vt-l">
          <div className="l-container u-pd-hz-l u-pd-hz-0@main">
            <FadeInUp yOffset={20} className="l-grid u-flex-center-vt">
              <div className="l-col-12 l-col-6@main u-pd-right-xxl@main">

                  <h1 className="c-h1 c-letter-slide-in u-mg-bottom-l">
                    {content.headband.title}
                    <span className="c-bullet c-bullet--big c-bullet--scaleIn u-mg-left-s"></span>
                  </h1>

                  <div className="u-pd-right-xl u-mg-bottom-l">
                    {content.headband.desc.map((item, index) => (
                      <p className="u-fs-sm u-mg-bottom-m" key={"headband-desc-" + index}>{item}</p>
                    ))}
                  </div>

                  <ButtonFormModal
                    btnClassName="c-btn c-btn--primary u-mg-bottom-l"
                    btnLabel={content.headband.cta} />

              </div>
              <div className="l-col-12 l-col-6@main u-pd-left-xl@main">

                <div className="c-block-video">
                  <span className="c-block-video__placeholder"></span>
                  <video className="c-block-video__video" muted playsInline autoPlay loop preload="metadata">
                    <source src={IntroVideoWebm} type="video/webm" />
                    <source src={IntroVideoMp4} type="video/mp4" />
                  </video>
                </div>

              </div>
            </FadeInUp>
          </div>
        </IntersectionObserverProvider>

        {/* Solution */}
        <section ref={solutionRef} className="u-pd-vt-xl u-pd-vt-xxl@main u-pd-hz-l u-pd-hz-s@main">
          <div className="l-container">

            <div className="u-pd-left-2col@main u-mg-bottom-xl">
              <FadeInUp yOffset={20} delay={2000}>
                <div className="c-subtitle u-flex u-flex-center-vt u-mg-bottom-m">
                    <span className="c-bullet u-mg-right-m"></span>
                    {global.header.navigation.solution}
                </div>
                <h2 className="c-h2 u-primary">{content.solution.title}</h2>
              </FadeInUp>
            </div>

          {content.solution.features.map((feature, i) => {
              let picture = data.homePictures.nodes.filter((el) => el.name === feature.pic)[0];
            return (
              <IntersectionObserverProvider className={"l-grid u-flex-center-vt u-pd-vt-m u-pd-vt-l@main " + (i%2 === 0 ? "u-flex-dir-row-reverse@main" : "")} key={"feature-" + i}>

                <div className={"l-col-12 l-col-6@main u-pd-vt-s " + (i%2 === 0 ? "u-pd-right-1col@main" : "u-pd-left-1col@main")}>

                  <FadeInUp yOffset={20} delay={300} className="">
                    <h3 className="c-h3 u-mg-bottom-l">{feature.title}</h3>
                    {feature.desc.map((item, index) => (
                      <p className="u-mg-bottom-m" key={"feature-" + i + "-desc-" + index}>{item}</p>
                    ))}
                    <p className="u-primary u-semibold u-mg-bottom-m">{feature.tldr}</p>
                  </FadeInUp>

                </div>

                <div className={"l-col-12 l-col-6@main u-pd-vt-s " + (i%2 === 0 ? "u-pd-right-1col@main" : "u-pd-left-1col@main")}>
                    { picture &&
                      <FadeInUp yOffset={20} delay={300}>
                        <Img className="u-width-full" fluid={picture.childImageSharp.fluid} />
                      </FadeInUp>
                    }
                </div>

              </IntersectionObserverProvider>
            )
          })}

          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} className="u-bg-grey10 u-pd-vt-xl u-pd-vt-xxl@main u-pd-hz-m">
          <div className="l-container">
            <Testimonials />
          </div>
        </section>

         {/* Demo band */}
         <section className="u-bg-primary u-center u-pd-vt-xxl u-pd-hz-m">
           <div className="l-container u-pd-vt-l@main">
              <h2 className="c-h2 u-white u-medium u-mg-bottom-l">
                {content.demo_band.title}
              </h2>
              <ButtonFormModal
                btnClassName="c-btn c-btn--primary-reverse u-mg-hz-auto"
                btnLabel={content.demo_band.cta}
              />
           </div>
         </section>

      </div>

      <div ref={endOfPageRef}></div>
    </Layout>
  )
}

export default HomePage
