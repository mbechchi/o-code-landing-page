module.exports = {
  siteMetadata: {
    title: `O°Code - product memories`,
    description: `Une technologie qui permet d’authentifier et suivre les interactions avec n’importe quel objet tout au long de sa vie.`,
    author: `@tibomahe`,
    siteImage: ``,
    siteLanguage: `fr`,
    siteUrl: `https://www.o-code.tech/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        devMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `O°code`,
        short_name: `O°code`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          // https://github.com/typekit/webfontloader/issues/409
          families: [
            'Montserrat:300,400,500,600,700',
            'DM+Sans:500,700&display=swap'
          ]
        }
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`
  ],
}
