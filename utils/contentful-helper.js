import { GraphQLClient, gql } from "graphql-request";
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/`

const client = new GraphQLClient(CONTENTFUL_URL, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
  }
})

export const getParkPaths = async () => {
  const parkPathsQuery = gql`
  {
    articlesCollection(limit: 500, order: title_ASC) {
      items {
        slug
      }
    }
  }
  `

  return client.request(parkPathsQuery)
}

export const getParks = async () => {
  const parksQuery = gql`
  {
    articlesCollection(limit: 500, order: title_ASC) {
      items {
        title
        slug
      }
    }
  }
  `

  return client.request(parksQuery)
}

export const getParkInfo = async(slug) => {
  const parkInfoQuery = gql`
    query getParkInfo($slug: String) {
      articlesCollection(where: {slug: $slug}, limit: 1) {
        items {
          title
          reviewsCollection {
            items {
              user {
                username
                firstName
                lastName
              }
              rating
              content
            }
          }
        }
      }
    }
  `

  const variables = {
    slug
  }
  
  return client.request(parkInfoQuery, variables)
}