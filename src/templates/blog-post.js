import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"


import Layout from '../components/layout'
import SEO from '../components/seo'

import '../styles/blog-posts.scss'

const BlogPostTemplate = ({ data }) => {
    const post = data.mdx;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout title={siteTitle} className="blog">
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <article className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          <p>
            {post.frontmatter.date}
          </p>
          <MDXRenderer>{post.body}</MDXRenderer>
        </article>
      </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`