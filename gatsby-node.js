const path = require("path")
const cleanStack = require("clean-stack")
const slugify = require("@mangocorporation/mango-slugfy")
const { trace } = require("xtrace")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const {
  forEach,
  range,
  addIndex,
  map,
  pathOr,
  curry,
  pipe,
  propOr,
  divide,
  __: $,
} = require("ramda")

const paginationPath = curry((total, page) =>
  page === 0 ? "/" : page < 0 || page >= total ? "" : `${page + 1}`
)

const tryCatch = curry((catcher, deets, tryer) => {
  try {
    tryer(deets)
  } catch (e) {
    catcher(e)
  }
})

const POSTS_PER_PAGE = 3
const getTotalPages = pipe(
  propOr(0, "length"),
  divide($, POSTS_PER_PAGE),
  Math.ceil
)

const shrug = error => {
  console.log(
    `errors are XGH`,
    error.msg,
    error.stack ? cleanStack(error.stack) : "no stack, no problem"
  )
  throw error
}

const QUERY_LIST = `
query API_ListQuery {
  api {
    albums(order: "DESC") {
      id
      title
      cover_photo_base_url
      order
      content
      cover_photo {
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
  }
}
`

const imap = addIndex(map)

const createPages = async ([actions, graphql]) => {
  const pages = pipe(
    await graphql,
    pathOr(false, ["data", "api", "albums"])
  )(QUERY_LIST)
  const numPages = getTotalPages(pages)
  if (numPages === 0) return
  const paginate = paginationPath(numPages)
  pipe(
    range(0),
    imap((_, i) => ({
      path: paginate(i),
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
        prevPath: paginate(i - 1),
        nextPath: paginate(i + 1),
      },
    })),
    trace("pages to create"),
    forEach(actions.createPage)
  )(numPages)
  pipe(
    ({ id, title }) => ({
      path: slugify(title),
      component: path.resolve("./src/templates/album.js"),
      context: { albumId: id },
    }),
    forEach(actions.createPage)
  )(pages)
}

exports.createPages = async ({ actions, graphql }) =>
  await tryCatch(shrug, [actions, graphql], createPages)

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  createResolvers({
    API_Photo: {
      imageFile: {
        type: `File`,
        resolve({ base_url }) {
          return createRemoteFileNode({
            url: base_url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
    API_Album: {
      cover_photo: {
        type: `File`,
        resolve({ cover_photo_base_url }) {
          return createRemoteFileNode({
            url: cover_photo_base_url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
