import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Document {
    document_id: String!
    title: String
    dossier_id: String
    type: String
    sourcetype: String
    date_scraped: String
    sourceurl: String
    date_extracted: String
    summary: String
    text: String
  }

  type Query {
    documents(limit: Int = 10): [Document!]!
  }
`;
