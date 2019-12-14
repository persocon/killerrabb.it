const listQuery = `
query API_ListQuery {
  api {
    albums(order: "ASC") {
      id
      title
      cover_photo_base_url
      order
      content
      tags {
        keyname
        name
      }
      cover_photo {
        ext
        absolutePath
        childImageSharp {
          fluid(quality: 100) {
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
    }
    tags {
      name
      keyname
      albums {
        id
      }
    }
  }
}`;

module.exports = {
  listQuery,
};
