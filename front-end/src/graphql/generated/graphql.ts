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
  sourceType?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topics: Array<TopicAssignment>;
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

export type EntityGroups = {
  __typename?: 'EntityGroups';
  groups: Array<Group>;
  organizations: Array<Organization>;
  persons: Array<Person>;
};

export type Event = {
  __typename?: 'Event';
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  document?: Maybe<Document>;
};

export type FilterOptions = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groups?: InputMaybe<Array<Scalars['ID']['input']>>;
  organizations?: InputMaybe<Array<Scalars['ID']['input']>>;
  persons?: InputMaybe<Array<Scalars['ID']['input']>>;
  query?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  topicId?: InputMaybe<Scalars['ID']['input']>;
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
  getDocuments: Array<Document>;
  getEntities: EntityGroups;
  getTimeline: Array<Event>;
  topEntities: TopEntities;
  topEntitiesByTopic: TopEntities;
  topic?: Maybe<Topic>;
  topics: Array<Topic>;
};


export type QueryGetDocumentsArgs = {
  filterOptions?: InputMaybe<FilterOptions>;
};


export type QueryGetTimelineArgs = {
  filterOptions?: InputMaybe<FilterOptions>;
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

export type TopicAssignment = {
  __typename?: 'TopicAssignment';
  name?: Maybe<Scalars['String']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  topicId: Scalars['ID']['output'];
};

export type GetTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', topicId: string, name?: string | null, summary?: string | null, topWords?: string | null }> };

export type GetTopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type GetTopicQuery = { __typename?: 'Query', topic?: { __typename?: 'Topic', topicId: string, name?: string | null, summary?: string | null, topWords?: string | null } | null };

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntitiesQuery = { __typename?: 'Query', getEntities: { __typename?: 'EntityGroups', persons: Array<{ __typename?: 'Person', personId: string, name?: string | null }>, organizations: Array<{ __typename?: 'Organization', organizationId: string, name?: string | null }>, groups: Array<{ __typename?: 'Group', groupId: string, name?: string | null }> } };

export type GetEntitiesByTopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type GetEntitiesByTopicQuery = { __typename?: 'Query', topEntitiesByTopic: { __typename?: 'TopEntities', persons: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null, count: number }>, organizations: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null, count: number }>, groups: Array<{ __typename?: 'EntityCount', entityId?: string | null, name?: string | null, count: number }> } };

export type GetTimelineQueryVariables = Exact<{
  filterOptions?: InputMaybe<FilterOptions>;
}>;


export type GetTimelineQuery = { __typename?: 'Query', getTimeline: Array<{ __typename?: 'Event', date?: string | null, description?: string | null, document?: { __typename?: 'Document', documentId: string, sourceUrl?: string | null, sourceType?: string | null, title?: string | null, persons: Array<{ __typename?: 'Person', personId: string, name?: string | null }>, organizations: Array<{ __typename?: 'Organization', organizationId: string, name?: string | null }>, groups: Array<{ __typename?: 'Group', groupId: string, name?: string | null }> } | null }> };

export type GetDocumentsQueryVariables = Exact<{
  filterOptions?: InputMaybe<FilterOptions>;
}>;


export type GetDocumentsQuery = { __typename?: 'Query', getDocuments: Array<{ __typename?: 'Document', documentId: string, title?: string | null, summary?: string | null, sourceUrl?: string | null, scrapedDate?: string | null, dossier?: { __typename?: 'Dossier', dossierId: string, title?: string | null, sourceUrl?: string | null } | null, topics: Array<{ __typename?: 'TopicAssignment', topicId: string, name?: string | null, probability?: number | null }>, persons: Array<{ __typename?: 'Person', personId: string, name?: string | null }>, organizations: Array<{ __typename?: 'Organization', organizationId: string, name?: string | null }>, groups: Array<{ __typename?: 'Group', groupId: string, name?: string | null }> }> };


export const GetTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"topWords"}}]}}]}}]} as unknown as DocumentNode<GetTopicsQuery, GetTopicsQueryVariables>;
export const GetTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"topWords"}}]}}]}}]} as unknown as DocumentNode<GetTopicQuery, GetTopicQueryVariables>;
export const GetEntitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetEntitiesQuery, GetEntitiesQueryVariables>;
export const GetEntitiesByTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEntitiesByTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topEntitiesByTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetEntitiesByTopicQuery, GetEntitiesByTopicQueryVariables>;
export const GetTimelineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimeline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterOptions"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTimeline"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetTimelineQuery, GetTimelineQueryVariables>;
export const GetDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterOptions"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"scrapedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dossier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dossierId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"probability"}}]}},{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetDocumentsQuery, GetDocumentsQueryVariables>;