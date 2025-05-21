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
    "\n  query GetTopics {\n    topics {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n": typeof types.GetTopicsDocument,
    "\n  query GetTopic($topicId: ID!) {\n    topic(topicId: $topicId) {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n": typeof types.GetTopicDocument,
    "\n  query GetTopEntities {\n    topEntities {\n      persons {\n        entityId\n        name\n        count\n      }\n      organizations {\n        entityId\n        name\n        count\n      }\n      groups {\n        entityId\n        name\n        count\n      }\n    }\n  }\n": typeof types.GetTopEntitiesDocument,
    "\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        entityId\n        name\n      }\n      organizations {\n        entityId\n        name\n      }\n      groups {\n        entityId\n        name\n      }\n    }\n  }\n": typeof types.GetEntitiesByTopicDocument,
    "\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        documentId\n        sourceUrl\n      }\n      date\n      description\n    }\n  }\n": typeof types.GetTimelineByTopicDocument,
    "\n  query GetTimelineByQuery($query: String!) {\n    getTimelineByQuery(query: $query) {\n      document {\n        documentId\n        sourceUrl\n        persons {\n          personId\n          name\n        }\n        organizations {\n          organizationId\n          name\n        }\n        groups {\n          groupId\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n": typeof types.GetTimelineByQueryDocument,
    "\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      documentId\n      title\n      summary\n      sourceUrl\n      dossier {\n        dossierId\n        title\n        sourceUrl\n      }\n      persons {\n        personId\n      }\n      organizations {\n        organizationId\n      }\n      groups {\n        groupId\n      }\n      topics {\n        topicId\n        name\n    }\n    }\n  }\n": typeof types.SearchDocumentsDocument,
};
const documents: Documents = {
    "\n  query GetTopics {\n    topics {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n": types.GetTopicsDocument,
    "\n  query GetTopic($topicId: ID!) {\n    topic(topicId: $topicId) {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n": types.GetTopicDocument,
    "\n  query GetTopEntities {\n    topEntities {\n      persons {\n        entityId\n        name\n        count\n      }\n      organizations {\n        entityId\n        name\n        count\n      }\n      groups {\n        entityId\n        name\n        count\n      }\n    }\n  }\n": types.GetTopEntitiesDocument,
    "\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        entityId\n        name\n      }\n      organizations {\n        entityId\n        name\n      }\n      groups {\n        entityId\n        name\n      }\n    }\n  }\n": types.GetEntitiesByTopicDocument,
    "\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        documentId\n        sourceUrl\n      }\n      date\n      description\n    }\n  }\n": types.GetTimelineByTopicDocument,
    "\n  query GetTimelineByQuery($query: String!) {\n    getTimelineByQuery(query: $query) {\n      document {\n        documentId\n        sourceUrl\n        persons {\n          personId\n          name\n        }\n        organizations {\n          organizationId\n          name\n        }\n        groups {\n          groupId\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n": types.GetTimelineByQueryDocument,
    "\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      documentId\n      title\n      summary\n      sourceUrl\n      dossier {\n        dossierId\n        title\n        sourceUrl\n      }\n      persons {\n        personId\n      }\n      organizations {\n        organizationId\n      }\n      groups {\n        groupId\n      }\n      topics {\n        topicId\n        name\n    }\n    }\n  }\n": types.SearchDocumentsDocument,
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
export function graphql(source: "\n  query GetTopics {\n    topics {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n"): (typeof documents)["\n  query GetTopics {\n    topics {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopic($topicId: ID!) {\n    topic(topicId: $topicId) {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n"): (typeof documents)["\n  query GetTopic($topicId: ID!) {\n    topic(topicId: $topicId) {\n      topicId\n      name\n      summary\n      topWords\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopEntities {\n    topEntities {\n      persons {\n        entityId\n        name\n        count\n      }\n      organizations {\n        entityId\n        name\n        count\n      }\n      groups {\n        entityId\n        name\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTopEntities {\n    topEntities {\n      persons {\n        entityId\n        name\n        count\n      }\n      organizations {\n        entityId\n        name\n        count\n      }\n      groups {\n        entityId\n        name\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        entityId\n        name\n      }\n      organizations {\n        entityId\n        name\n      }\n      groups {\n        entityId\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEntitiesByTopic($topicId: ID!) {\n    topEntitiesByTopic(topicId: $topicId) {\n      persons {\n        entityId\n        name\n      }\n      organizations {\n        entityId\n        name\n      }\n      groups {\n        entityId\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        documentId\n        sourceUrl\n      }\n      date\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetTimelineByTopic(\n    $topicId: ID!\n    $persons: [String!]\n    $organizations: [String!]\n    $groups: [String!]\n    $startDate: String\n    $endDate: String\n  ) {\n    getTimelineByTopic(\n      topicId: $topicId\n      persons: $persons\n      organizations: $organizations\n      groups: $groups\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      document {\n        documentId\n        sourceUrl\n      }\n      date\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTimelineByQuery($query: String!) {\n    getTimelineByQuery(query: $query) {\n      document {\n        documentId\n        sourceUrl\n        persons {\n          personId\n          name\n        }\n        organizations {\n          organizationId\n          name\n        }\n        groups {\n          groupId\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetTimelineByQuery($query: String!) {\n    getTimelineByQuery(query: $query) {\n      document {\n        documentId\n        sourceUrl\n        persons {\n          personId\n          name\n        }\n        organizations {\n          organizationId\n          name\n        }\n        groups {\n          groupId\n          name\n        }\n      }\n      date\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      documentId\n      title\n      summary\n      sourceUrl\n      dossier {\n        dossierId\n        title\n        sourceUrl\n      }\n      persons {\n        personId\n      }\n      organizations {\n        organizationId\n      }\n      groups {\n        groupId\n      }\n      topics {\n        topicId\n        name\n    }\n    }\n  }\n"): (typeof documents)["\n  query SearchDocuments($query: String!) {\n    searchDocuments(query: $query) {\n      documentId\n      title\n      summary\n      sourceUrl\n      dossier {\n        dossierId\n        title\n        sourceUrl\n      }\n      persons {\n        personId\n      }\n      organizations {\n        organizationId\n      }\n      groups {\n        groupId\n      }\n      topics {\n        topicId\n        name\n    }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;