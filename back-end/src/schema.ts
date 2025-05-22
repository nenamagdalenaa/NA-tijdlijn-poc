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
    sourceType: String
    scrapedDate: String
    sourceUrl: String
    extractedDate: String
    summary: String
    text: String
    events: [Event!]! 
    groups: [Group!]!
    organizations: [Organization!]!
    persons: [Person!]!
    topics: [TopicAssignment!]!
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

  type TopicAssignment {
    topicId: ID!
    name: String
    probability: Float
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

  input FilterOptions {
    query: String
    topicId: ID
    persons: [ID!]
    organizations: [ID!]
    groups: [ID!]
    startDate: String
    endDate: String
  }

  type EntityGroups {
    persons: [Person!]!
    organizations: [Organization!]!
    groups: [Group!]!
  }

  # Query type
  type Query {
    topic(topicId: ID!): Topic    
    topics: [Topic!]!
    topEntitiesByTopic(topicId: ID!): TopEntities!
    topEntities: TopEntities!
    getDocuments(filterOptions: FilterOptions): [Document!]!
    getTimeline(filterOptions: FilterOptions): [Event!]!
    getEntities: EntityGroups!
  }
`;
