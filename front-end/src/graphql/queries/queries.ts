import { gql } from "@apollo/client";

// Topics
export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      topicId
      name
      summary
      topWords
    }
  }
`;

export const GET_TOPIC = gql`
  query GetTopic($topicId: ID!) {
    topic(topicId: $topicId) {
      topicId
      name
      summary
      topWords
    }
  }
`;

// Entities
export const GET_TOP_ENTITIES = gql`
  query GetTopEntities {
    topEntities {
      persons {
        entityId
        name
        count
      }
      organizations {
        entityId
        name
        count
      }
      groups {
        entityId
        name
        count
      }
    }
  }
`;

export const GET_ENTITIES_BY_TOPIC = gql`
  query GetEntitiesByTopic($topicId: ID!) {
    topEntitiesByTopic(topicId: $topicId) {
      persons {
        entityId
        name
        count
      }
      organizations {
        entityId
        name
        count
      }
      groups {
        entityId
        name
        count
      }
    }
  }
`;

// Timelines / Events
export const GET_TIMELINE_BY_TOPIC = gql`
  query GetTimelineByTopic(
    $topicId: ID!
    $persons: [String!]
    $organizations: [String!]
    $groups: [String!]
    $startDate: String
    $endDate: String
  ) {
    getTimelineByTopic(
      topicId: $topicId
      persons: $persons
      organizations: $organizations
      groups: $groups
      startDate: $startDate
      endDate: $endDate
    ) {
      document {
        documentId
        sourceUrl
        sourceType
        title
        persons {
          personId
          name 
        }
        organizations {
          organizationId
          name
        }
        groups {
          groupId
          name
        }
      }
      date
      description
    }
  }
`;


export const GET_TIMELINE_BY_SEARCH = gql`
  query GetTimelineByQuery($query: String!) {
    getTimelineByQuery(query: $query) {
      document {
        documentId
        sourceUrl
        persons {
          personId
          name
        }
        organizations {
          organizationId
          name
        }
        groups {
          groupId
          name
        }
      }
      date
      description
    }
  }
`;

// Documents

export const SEARCH_DOCUMENTS = gql`
  query SearchDocuments($query: String!) {
    searchDocuments(query: $query) {
      documentId
      title
      summary
      sourceUrl
      dossier {
        dossierId
        title
        sourceUrl
      }
      persons {
        personId
      }
      organizations {
        organizationId
      }
      groups {
        groupId
      }
      topics {
        topicId
        name
    }
    }
  }
`;
