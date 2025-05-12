import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # Dossier Type
  type Dossier {
    dossier_id: String!
    title: String
    date_published: String
    date_decision: String
    document_count: Int
    sourceURL: String
    responsible_ministry: String
    subject: String
    documents: [Document!]!  # Relatie naar Documenten
  }

  # Document Type
  type Document {
    document_id: String!
    dossier: Dossier  # Relatie naar Dossier
    title: String
    type: String
    sourcetype: String
    date_scraped: String
    sourceURL: String
    date_extracted: String
    summary: String
    text: String
    events: [Event!]!  # Relatie naar Events
    groups: [Group!]!  # Relatie naar Groups
    organizations: [Organization!]!  # Relatie naar Organizations
    people: [Person!]!  # Relatie naar People
    topics: [Topic!]!  # Relatie naar Topics
  }

  # Event Type
  type Event {
    document: Document  # Relatie naar Document
    date: String
    description: String
  }

  # Group Type
  type Group {
    group_id: String!
    name: String
    documents: [Document!]!  # Relatie naar Documents
  }

  # Organization Type
  type Organization {
    organization_id: String!
    name: String
    documents: [Document!]!  # Relatie naar Documents
  }

  # Person Type
  type Person {
    person_id: String!
    name: String
    documents: [Document!]!  # Relatie naar Documents
  }

  # Topic Type
  type Topic {
    topic_id: String!
    name: String
    top_words: String
    summary: String
    documents: [Document!]!  # Relatie naar Documents
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
    dossier(dossier_id: String!): Dossier
    events(document_id: String!): [Event!]!
    groups: [Group!]!
    organizations: [Organization!]!
    people: [Person!]!
    topic(id: ID!): Topic    
    topics: [Topic!]!
    topEntitiesByTopic(topic_id: ID!): TopEntities!
  }
`;
