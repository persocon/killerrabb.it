import React from "react"
import { graphql, Link } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from "gatsby-image"


import ReactMarkdown from 'react-markdown'
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/album.scss";

const Album = ({ pageContext, data, location }) => {
  const getGallery = () => {
    return data.api.album[0].photos.map((photo) => (<Img className="photo" key={photo.id} fluid={photo.imageFile.childImageSharp.fluid} alt="" />));
  }
  const getCoverPhoto = () => {
    return <Img className="photo photo--cover" fluid={data.api.album[0].cover_photo.childImageSharp.fluid}/>
  }
  const getContent = () => {
    return <article><ReactMarkdown source={data.api.album[0].content}/></article>
  }
  return (<Layout>
    <SEO
      title={data.api.album[0].title}
    />
    <article className="album">
      <nav>
        <Link to="/">Home</Link> / <Link className="active" to={`/${mangoSlugfy(data.api.album[0].title)}`}>{data.api.album[0].title}</Link>
      </nav>
      <h1>{data.api.album[0].title}</h1>
      {getCoverPhoto()}
      {getContent()}
      {getGallery()}
    </article>
  </Layout>);
}

export const query = graphql`
query API_AlbumQuery($albumId: String!) {
  api {
    album(id: $albumId) {
      id
      title
      content
      cover_photo_base_url
      cover_photo {
        ext
        absolutePath
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      photos {
        id
        description
        base_url
        imageFile {
          ext
          absolutePath
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
}`

export default Album
