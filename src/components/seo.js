/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import iphone5_splash from '../images/splashscreen/iphone5_splash.png';
import iphone6_splash from '../images/splashscreen/iphone6_splash.png';
import iphoneplus_splash from '../images/splashscreen/iphoneplus_splash.png';
import iphonex_splash from '../images/splashscreen/iphonex_splash.png';
import iphonexr_splash from '../images/splashscreen/iphonexr_splash.png';
import iphonexsmax_splash from '../images/splashscreen/iphonexsmax_splash.png';
import ipad_splash from '../images/splashscreen/ipad_splash.png';
import ipadpro1_splash from '../images/splashscreen/ipadpro1_splash.png';
import ipadpro3_splash from '../images/splashscreen/ipadpro3_splash.png';
import ipadpro2_splash from '../images/splashscreen/ipadpro2_splash.png';

function SEO({ description, lang, meta, title, metaLinks }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const getIphoneSplashScreen = () => {
    return [
        {
          name: `link`,
          href: iphone5_splash,
          media: `(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphone6_splash,
          media: `(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphoneplus_splash,
          media: `(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphonex_splash,
          media: `(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphonexr_splash,
          media: `(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphonexsmax_splash,
          media: `(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipad_splash,
          media: `(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipadpro1_splash,
          media: `(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipadpro3_splash,
          media: `(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipadpro2_splash,
          media: `(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
      ];
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `apple-mobile-web-app-capable`,
          content: `yes`,
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `black-translucent`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[...metaLinks, ...getIphoneSplashScreen()]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  metaLinks: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  metaLinks: PropTypes.arrayOf(PropTypes.object),
}

export default SEO
