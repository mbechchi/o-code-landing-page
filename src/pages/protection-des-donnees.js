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
              content {
                title
                desc
                list
              }
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
        <div className="l-container-lg u-pd-hz-l">

          <FadeInUp yOffset={50} delay={100}>
            <h1 className="c-h2 u-mg-bottom-xl">
              {content.title}
            </h1>
          </FadeInUp>

          {content.content.map((item, index) => (
            <section className="u-mg-bottom-l" key={"mentions-" + index}>

              { item.title && <h2 className="c-h4 u-mg-bottom-m">{item.title}</h2> }

              {item.desc.map((desc, descIndex) => (
                <p className="u-mg-bottom-m" key={"mentions-" + index + "-" + descIndex} dangerouslySetInnerHTML={{ __html: desc}}></p>
              ))}

              { item.list &&
                <ul className="u-pd-left-xl">
                  { item.list.map((list, listIndex) => (
                    <li className="u-mg-bottom-m" key={"mentions-" + index + "-" + listIndex}>
                      <p dangerouslySetInnerHTML={{ __html: list}}></p>
                    </li>
                  ))}
                </ul>
              }
            </section>
          ))}

        </div>
      </section>

    </Layout>
  )
}

export default ProtectionDesDonneesPage
