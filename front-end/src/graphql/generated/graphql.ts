/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Document = {
  __typename?: 'Document';
  documentId: Scalars['String']['output'];
  dossier?: Maybe<Dossier>;
  events: Array<Event>;
  extractedDate?: Maybe<Scalars['String']['output']>;
  groups: Array<Group>;
  organizations: Array<Organization>;
  persons: Array<Person>;
  scrapedDate?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  sourcetype?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topics: Array<Topic>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Dossier = {
  __typename?: 'Dossier';
  decisionDate?: Maybe<Scalars['String']['output']>;
  documentCount?: Maybe<Scalars['Int']['output']>;
  documents: Array<Document>;
  dossierId: Scalars['String']['output'];
  publishedDate?: Maybe<Scalars['String']['output']>;
  responsibleMinistry?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type EntityCount = {
  __typename?: 'EntityCount';
  count: Scalars['Int']['output'];
  entityId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Event = {
  __typename?: 'Event';
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  document?: Maybe<Document>;
};

export type Group = {
  __typename?: 'Group';
  documents: Array<Document>;
  groupId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Organization = {
  __typename?: 'Organization';
  documents: Array<Document>;
  name?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['ID']['output'];
};

export type Person = {
  __typename?: 'Person';
  documents: Array<Document>;
  name?: Maybe<Scalars['String']['output']>;
  personId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  documents: Array<Document>;
  dossier?: Maybe<Dossier>;
  events: Array<Event>;
  getGroupsByDocumentId: Array<Group>;
  getOrganizationsByDocumentId: Array<Organization>;
  getPersonsByDocumentId: Array<Person>;
  getTimelineByQuery: Array<Event>;
  getTimelineByTopic: Array<Event>;
  groups: Array<Group>;
  organizations: Array<Organization>;
  people: Array<Person>;
  searchDocuments: Array<Document>;
  topEntities: TopEntities;
  topEntitiesByTopic: TopEntities;
  topic?: Maybe<Topic>;
  topics: Array<Topic>;
};


export type QueryDossierArgs = {
  dossierId: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  documentId: Scalars['String']['input'];
};


export type QueryGetGroupsByDocumentIdArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryGetOrganizationsByDocumentIdArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryGetPersonsByDocumentIdArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryGetTimelineByQueryArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetTimelineByTopicArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  organizations?: InputMaybe<Array<Scalars['String']['input']>>;
  persons?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  topicId: Scalars['ID']['input'];
};


export type QuerySearchDocumentsArgs = {
  query: Scalars['String']['input'];
};


export type QueryTopEntitiesByTopicArgs = {
  topicId: Scalars['ID']['input'];
};


export type QueryTopicArgs = {
  topicId: Scalars['ID']['input'];
};

export type TopEntities = {
  __typename?: 'TopEntities';
  groups: Array<EntityCount>;
  organizations: Array<EntityCount>;
  persons: Array<EntityCount>;
};

export type Topic = {
  __typename?: 'Topic';
  documents: Array<Document>;
  name?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  topWords?: Maybe<Scalars['String']['output']>;
  topicId: Scalars['ID']['output'];
};

export type GetTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', topicId: string, name?: string | null, summary?: string | null, topWords?: string | null }> };

export type GetTopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type GetTopicQuery = { __typename?: 'Query', topic?: { __typename?: 'Topic', topicId: string, name?: string | null, summary?: string | null, topWords?: string | null } | null };

export type GetTopEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopEntitiesQuery = { __typename?: 'Query', topEntities: { __typename?: 'TopEntities', persons: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null, count: number }>, organizations: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null, count: number }>, groups: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null, count: number }> } };

export type GetEntitiesByTopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type GetEntitiesByTopicQuery = { __typename?: 'Query', topEntitiesByTopic: { __typename?: 'TopEntities', persons: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null }>, organizations: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null }>, groups: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null }> } };

export type GetTimelineByTopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
  persons?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  organizations?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTimelineByTopicQuery = { __typename?: 'Query', getTimelineByTopic: Array<{ __typename?: 'Event', date?: string | null, description?: string | null, document?: { __typename?: 'Document', documentId: string, sourceUrl?: string | null } | null }> };

export type GetTimelineByQueryQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GetTimelineByQueryQuery = { __typename?: 'Query', getTimelineByQuery: Array<{ __typename?: 'Event', date?: string | null, description?: string | null, document?: { __typename?: 'Document', documentId: string, sourceUrl?: string | null, persons: Array<{ __typename?: 'Person', personId: string, name?: string | null }>, organizations: Array<{ __typename?: 'Organization', organizationId: string, name?: string | null }>, groups: Array<{ __typename?: 'Group', groupId: string, name?: string | null }> } | null }> };

export type SearchDocumentsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchDocumentsQuery = { __typename?: 'Query', searchDocuments: Array<{ __typename?: 'Document', documentId: string, title?: string | null, summary?: string | null, sourceUrl?: string | null, dossier?: { __typename?: 'Dossier', dossierId: string, title?: string | null, sourceUrl?: string | null } | null, persons: Array<{ __typename?: 'Person', personId: string }>, organizations: Array<{ __typename?: 'Organization', organizationId: string }>, groups: Array<{ __typename?: 'Group', groupId: string }>, topics: Array<{ __typename?: 'Topic', topicId: string, name?: string | null }> }> };


export const GetTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"topWords"}}]}}]}}]} as unknown as DocumentNode<GetTopicsQuery, GetTopicsQueryVariables>;
export const GetTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"topWords"}}]}}]}}]} as unknown as DocumentNode<GetTopicQuery, GetTopicQueryVariables>;
export const GetTopEntitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetTopEntitiesQuery, GetTopEntitiesQueryVariables>;
export const GetEntitiesByTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEntitiesByTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topEntitiesByTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetEntitiesByTopicQuery, GetEntitiesByTopicQueryVariables>;
export const GetTimelineByTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimelineByTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"persons"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizations"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groups"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTimelineByTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"persons"},"value":{"kind":"Variable","name":{"kind":"Name","value":"persons"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizations"}}},{"kind":"Argument","name":{"kind":"Name","value":"groups"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groups"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetTimelineByTopicQuery, GetTimelineByTopicQueryVariables>;
export const GetTimelineByQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimelineByQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTimelineByQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetTimelineByQueryQuery, GetTimelineByQueryQueryVariables>;
export const SearchDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dossier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dossierId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchDocumentsQuery, SearchDocumentsQueryVariables>;