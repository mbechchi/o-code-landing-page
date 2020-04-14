import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"

import {FadeInUp} from "../components/animations/fadeInUp"

const ProtectionDesDonneesPage = (props) => {

  const data = useStaticQuery(graphql`
    query {
      allContentJson {
        edges {
          node {
            privacy {
              title
            }
          }
        }
      }
    }
  `);

  const content = data.allContentJson.edges[0].node.privacy;

  return (
    <Layout {...props} className="u-height-full">
      <SEO title={content.title} />

      <section className="u-pd-vt-xxl u-fadeInUp">
        <div className="l-container u-pd-hz-l">

          <FadeInUp yOffset={50} delay={100}>
            <h1 className="c-h2 u-mg-bottom-l">
              {content.title}
            </h1>
          </FadeInUp>

        </div>
      </section>

    </Layout>
  )
}

export default ProtectionDesDonneesPage
