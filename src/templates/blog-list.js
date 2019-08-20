import React from "react"
import { graphql } from "gatsby"
import { pathOr } from 'ramda';
import Link from "gatsby-plugin-transition-link/AniLink";


import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from '../components/pagination';

import '../styles/blog-posts.scss';


const BlogList = ({ data, pageContext, location }) => {

  const getPosts = () => {
    const posts = pathOr([], ['allMdx', 'edges'], data);
    return posts.map(p => {
      const post = pathOr(false, ['node'], p);
      return <article key={post.id} className="blog-posts">
            <h2>{post.frontmatter.title}</h2>
            <p>{post.excerpt}</p>
            <p>
              <Link cover direction="right" bg="#1b1c1e" to={post.fields.slug}>
                Read more.
              </Link>
            </p>
        </article>
    })
   
  }

  return (<Layout className="blog">
    <SEO title="Blog" />
    <h1>Some bullshit I decided to write</h1>
    <Pagination {...pageContext} />
    {getPosts()}
    <Pagination {...pageContext} />
  </Layout>)
}

export const query = graphql`
query QueryListPosts($skip: Int!, $limit: Int!) {
  allMdx(
    skip: $skip
    limit: $limit
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
        }
        excerpt(pruneLength: 360)
      }
    }
  }
}`


export default BlogList
