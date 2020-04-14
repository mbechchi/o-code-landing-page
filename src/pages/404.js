import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"

import {FadeInUp} from "../components/animations/fadeInUp"

const NotFoundPage = (props) => {

  const data = useStaticQuery(graphql`
    query {
      allContentJson {
        edges {
          node {
            no_content {
              title
              message
              cta
            }
          }
        }
      }
    }
  `);

  const content = data.allContentJson.edges[0].node.no_content;

  return (
    <Layout {...props} className="u-height-full">
      <SEO title="404: Not found" />

      <section className="u-pd-vt-xxl u-fadeInUp">
        <div className="l-container u-pd-hz-l">

          <FadeInUp yOffset={50} delay={100}>
            <h1 className="c-h1 u-green80 u-uppercase u-semibold u-flex u-flex-center-vt u-mg-bottom-m">
              {content.title}
            </h1>
          </FadeInUp>

          <FadeInUp yOffset={75} delay={200}>
            <p className="u-fs-m u-lh-l u-mg-bottom-l" style={{ maxWidth: "960px"}}>{content.message}</p>
          </FadeInUp>

          <FadeInUp yOffset={100} delay={300}>
            <div className="u-center">
              <Link to={'/'} className="c-btn c-btn--primary" style={{ minWidth: "240px"}}>
                  {content.cta}
              </Link>
            </div>
          </FadeInUp>

        </div>
      </section>

    </Layout>
  )
}

export default NotFoundPage
