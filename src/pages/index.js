import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small style={{ marginRight: rhythm(1 / 4) }}>
                {node.frontmatter.date}
                &nbsp;&bull;&nbsp;
                {`${node.timeToRead} min read`}
              </small>
              {node.frontmatter.tags && node.frontmatter.tags.length > 0 &&
                <Fragment>
                  {node.frontmatter.tags.map((tag, idx) => {
                    return (
                      <span
                        key={idx}
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: rhythm(1 / 4),
                          borderRadius: rhythm(10),
                          padding: '.2rem .5rem',
                          marginRight: '.3rem',
                          backgroundColor: '#36B5A2',
                          color: '#fff',
                          verticalAlign: 'middle',
                          boxShadow: '1px 1px 0px 0px #00ffda',
                        }}
                      >{tag}
                      </span>
                    )
                  })}
                </Fragment>
              }
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`
