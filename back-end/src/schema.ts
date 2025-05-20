import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # Dossier Type
  type Dossier {
    dossierId: String!
    title: String
    publishedDate: String
    decisionDate: String
    documentCount: Int
    sourceUrl: String
    responsibleMinistry: String
    subject: String
    documents: [Document!]!
  }

  # Document Type
  type Document {
    documentId: String!
    dossier: Dossier
    title: String
    type: String
    sourcetype: String
    scrapedDate: String
    sourceUrl: String
    extractedDate: String
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
    groupId: ID!
    name: String
    documents: [Document!]!
  }

  # Organization Type
  type Organization {
    organizationId: ID!
    name: String
    documents: [Document!]!
  }

  # Person Type
  type Person {
    personId: ID!
    name: String
    documents: [Document!]!
  }

  # Topic Type
  type Topic {
    topicId: ID!
    name: String
    topWords: String
    summary: String
    documents: [Document!]!
}

  type TopEntities {
    persons: [EntityCount!]!
    organizations: [EntityCount!]!
    groups: [EntityCount!]!
}

  type EntityCount {
    entityId: String
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
  topic(topicId: ID!): Topic    
  topics: [Topic!]!
  topEntitiesByTopic(topicId: ID!): TopEntities!
  topEntities: TopEntities!
  getTimelineByTopic(
    topicId: ID!,
    persons: [String!],
    organizations: [String!],
    groups: [String!],
    startDate: String,
    endDate: String
  ): [Event!]!
  searchDocuments(query: String!): [Document!]!
  getTimelineByQuery(query: String!): [Event!]!
  getPersonsByDocumentId(documentId: ID!): [Person!]!
  getOrganizationsByDocumentId(documentId: ID!): [Organization!]!
  getGroupsByDocumentId(documentId: ID!): [Group!]!
}

`;
