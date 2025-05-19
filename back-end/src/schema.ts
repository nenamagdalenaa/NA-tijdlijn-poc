import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # Dossier Type
  type Dossier {
    dossier_id: String!
    title: String
    date_published: String
    date_decision: String
    document_count: Int
    sourceurl: String
    responsible_ministry: String
    subject: String
    documents: [Document!]!
  }

  # Document Type
  type Document {
    document_id: String!
    dossier: Dossier
    title: String
    type: String
    sourcetype: String
    date_scraped: String
    sourceurl: String
    date_extracted: String
    summary: String
    text: String
    events: [Event!]! 
    groups: [Group!]!
    organizations: [Organization!]!
    persons: [Person!]!
    topics: [Topic!]!
  }

  # Event Type
  type Event {
    document: Document
    date: String
    description: String
  }

  # Group Type
  type Group {
    group_id: ID!
    name: String
    documents: [Document!]!
  }

  # Organization Type
  type Organization {
    organization_id: ID!
    name: String
    documents: [Document!]!
  }

  # Person Type
  type Person {
    person_id: ID!
    name: String
    documents: [Document!]!
  }

  # Topic Type
  type Topic {
    topic_id: String!
    name: String
    top_words: String
    summary: String
    documents: [Document!]!
}

  type TopEntities {
    persons: [EntityCount!]!
    organizations: [EntityCount!]!
    groups: [EntityCount!]!
}

  type EntityCount {
    id: String
    name: String
    count: Int!
}

  # Query type
type Query {
  documents: [Document!]!
  dossier(dossierId: String!): Dossier
  events(documentId: String!): [Event!]!
  groups: [Group!]!
  organizations: [Organization!]!
  people: [Person!]!
  topic(id: ID!): Topic    
  topics: [Topic!]!
  topEntitiesByTopic(topicId: ID!): TopEntities!
  getTimelineByTopic(
    topicId: ID!,
    persons: [String!],
    organizations: [String!],
    groups: [String!],
    startDate: String,
    endDate: String
  ): [Event!]!
  searchDocuments(query: String!): [Document!]!
  getTimelineBySearch(query: String!): [Event!]!
  getPersonsByDocumentId(documentId: ID!): [Person!]!
  getOrganizationsByDocumentId(documentId: ID!): [Organization!]!
  getGroupsByDocumentId(documentId: ID!): [Group!]!
  topEntities: TopEntities!
}

`;
