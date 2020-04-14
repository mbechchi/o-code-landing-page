import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import defaultImage from "../assets/images/visual-ocode.png"

function SEO({ title }) {

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteLanguage
            siteUrl
            author
          }
        }
      }
    `
  )

  const metadata = data.site.siteMetadata

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: metadata.siteUrl,
      name: metadata.title,
      alternateName: ""
    }
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang: metadata.siteLanguage,
      }}>

      {/* General tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="image" content={metadata.siteUrl + defaultImage} />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes" />

      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={metadata.siteUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.siteUrl + defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={metadata.author} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.siteUrl + defaultImage} />

      {/* Links */}
      {metadata.canonicalUrl && <link rel="canonical" href={metadata.canonicalUrl} />}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `fr`,
  meta: [],
  description: ``,
}

export default SEO
