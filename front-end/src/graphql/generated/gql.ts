/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetTopics {\n    topics {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n": typeof types.GetTopicsDocument,
    "\n  query GetTopic($id: ID!) {\n    topic(id: $id) {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n": typeof types.GetTopicDocument,
    "\n  query GetTopEntities {\n    topEntities {\n      persons {\n        id\n        name\n        count\n      }\n      organizations {\n        id\n        name\n        count\n      }\n      groups {\n        id\n        name\n        count\n      }\n    }\n  }\n": typeof types.GetTopEntitiesDocument,
    "\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        id\n        name\n      }\n      organizations {\n        id\n        name\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetEntitiesByTopicDocument,
    "\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        document_id\n        sourceurl\n      }\n      date\n      description\n    }\n  }\n": typeof types.GetTimelineByTopicDocument,
    "\n  query GetTimelineBySearch($query: String!) {\n    getTimelineBySearch(query: $query) {\n      document {\n        document_id\n        sourceurl\n        persons {\n          person_id\n          name\n        }\n        organizations {\n          organization_id\n          name\n        }\n        groups {\n          group_id\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n": typeof types.GetTimelineBySearchDocument,
    "\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      document_id\n      title\n      summary\n      sourceurl\n      dossier {\n        dossier_id\n        title\n        sourceurl\n      }\n      persons {\n        person_id\n      }\n      organizations {\n        organization_id\n      }\n      groups {\n        group_id\n      }\n    }\n  }\n": typeof types.SearchDocumentsDocument,
};
const documents: Documents = {
    "\n  query GetTopics {\n    topics {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n": types.GetTopicsDocument,
    "\n  query GetTopic($id: ID!) {\n    topic(id: $id) {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n": types.GetTopicDocument,
    "\n  query GetTopEntities {\n    topEntities {\n      persons {\n        id\n        name\n        count\n      }\n      organizations {\n        id\n        name\n        count\n      }\n      groups {\n        id\n        name\n        count\n      }\n    }\n  }\n": types.GetTopEntitiesDocument,
    "\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        id\n        name\n      }\n      organizations {\n        id\n        name\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n": types.GetEntitiesByTopicDocument,
    "\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        document_id\n        sourceurl\n      }\n      date\n      description\n    }\n  }\n": types.GetTimelineByTopicDocument,
    "\n  query GetTimelineBySearch($query: String!) {\n    getTimelineBySearch(query: $query) {\n      document {\n        document_id\n        sourceurl\n        persons {\n          person_id\n          name\n        }\n        organizations {\n          organization_id\n          name\n        }\n        groups {\n          group_id\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n": types.GetTimelineBySearchDocument,
    "\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      document_id\n      title\n      summary\n      sourceurl\n      dossier {\n        dossier_id\n        title\n        sourceurl\n      }\n      persons {\n        person_id\n      }\n      organizations {\n        organization_id\n      }\n      groups {\n        group_id\n      }\n    }\n  }\n": types.SearchDocumentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopics {\n    topics {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n"): (typeof documents)["\n  query GetTopics {\n    topics {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopic($id: ID!) {\n    topic(id: $id) {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n"): (typeof documents)["\n  query GetTopic($id: ID!) {\n    topic(id: $id) {\n      topic_id\n      name\n      summary\n      top_words\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopEntities {\n    topEntities {\n      persons {\n        id\n        name\n        count\n      }\n      organizations {\n        id\n        name\n        count\n      }\n      groups {\n        id\n        name\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTopEntities {\n    topEntities {\n      persons {\n        id\n        name\n        count\n      }\n      organizations {\n        id\n        name\n        count\n      }\n      groups {\n        id\n        name\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        id\n        name\n      }\n      organizations {\n        id\n        name\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        id\n        name\n      }\n      organizations {\n        id\n        name\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        document_id\n        sourceurl\n      }\n      date\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        document_id\n        sourceurl\n      }\n      date\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTimelineBySearch($query: String!) {\n    getTimelineBySearch(query: $query) {\n      document {\n        document_id\n        sourceurl\n        persons {\n          person_id\n          name\n        }\n        organizations {\n          organization_id\n          name\n        }\n        groups {\n          group_id\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetTimelineBySearch($query: String!) {\n    getTimelineBySearch(query: $query) {\n      document {\n        document_id\n        sourceurl\n        persons {\n          person_id\n          name\n        }\n        organizations {\n          organization_id\n          name\n        }\n        groups {\n          group_id\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      document_id\n      title\n      summary\n      sourceurl\n      dossier {\n        dossier_id\n        title\n        sourceurl\n      }\n      persons {\n        person_id\n      }\n      organizations {\n        organization_id\n      }\n      groups {\n        group_id\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      document_id\n      title\n      summary\n      sourceurl\n      dossier {\n        dossier_id\n        title\n        sourceurl\n      }\n      persons {\n        person_id\n      }\n      organizations {\n        organization_id\n      }\n      groups {\n        group_id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;