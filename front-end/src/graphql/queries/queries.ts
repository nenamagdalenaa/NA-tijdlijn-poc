import { gql } from "@apollo/client";

// Topics
export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      topic_id
      name
      summary
      top_words
    }
  }
`;

export const GET_TOPIC = gql`
  query GetTopic($id: ID!) {
    topic(id: $id) {
      topic_id
      name
      summary
      top_words
    }
  }
`;

// Entities
export const GET_TOP_ENTITIES = gql`
  query GetTopEntities {
    topEntities {
      persons {
        id
        name
        count
      }
      organizations {
        id
        name
        count
      }
      groups {
        id
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
        id
        name
      }
      organizations {
        id
        name
      }
      groups {
        id
        name
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
        document_id
        sourceurl
      }
      date
      description
    }
  }
`;


export const GET_TIMELINE_BY_SEARCH = gql`
  query GetTimelineBySearch($query: String!) {
    getTimelineBySearch(query: $query) {
      document {
        document_id
        sourceurl
        persons {
          person_id
          name
        }
        organizations {
          organization_id
          name
        }
        groups {
          group_id
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
      document_id
      title
      summary
      sourceurl
      dossier {
        dossier_id
        title
        sourceurl
      }
      persons {
        person_id
      }
      organizations {
        organization_id
      }
      groups {
        group_id
      }
    }
  }
`;
