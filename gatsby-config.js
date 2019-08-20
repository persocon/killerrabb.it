const fs = require("fs")
const { buildSchema, buildClientSchema } = require("graphql")

module.exports = {
  siteMetadata: {
    title: `The Killer-Rabbit Photography`,
    description: `Pedro Costa Neves - Photography, Portfolio`,
    author: `@persocon`,
    siteUrl: 'https://killerrabb.it',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `presets`,
        path: `${__dirname}/src/presets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `API`,
        fieldName: `api`,
        url: process.env.TKRP_GRAPHQL_API,
        createSchema: async () => {
          const sdl = fs.readFileSync(`${__dirname}/schema.sdl`).toString()
          return buildSchema(sdl)
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://killerrabb.it`,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-webpack-size`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'listQuery',
        imagePath: 'api.albums.photos.base_url',
        name: 'banana'
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "The Killer-Rabbit Photography",
        short_name: "TKRP",
        start_url: "/",
        description: `Pedro Costa Neves photo portfolio`,
        lang: `en`,
        background_color: "#1b1c1e",
        theme_color: "#1b1c1e",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `presets-images`,
        path: `${__dirname}/src/images/presets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `splash-screen-images`,
        path: `${__dirname}/src/images/splashscreen`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    `gatsby-plugin-transition-link`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [`gatsby-remark-footnotes`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        plugins: [`gatsby-remark-images`, `gatsby-remark-footnotes`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },

          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    }
  ],
}
