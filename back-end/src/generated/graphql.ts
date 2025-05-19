import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  date_extracted?: Maybe<Scalars['String']['output']>;
  date_scraped?: Maybe<Scalars['String']['output']>;
  document_id: Scalars['String']['output'];
  dossier?: Maybe<Dossier>;
  events: Array<Event>;
  groups: Array<Group>;
  organizations: Array<Organization>;
  people: Array<Person>;
  sourcetype?: Maybe<Scalars['String']['output']>;
  sourceurl?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topics: Array<Topic>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Dossier = {
  __typename?: 'Dossier';
  date_decision?: Maybe<Scalars['String']['output']>;
  date_published?: Maybe<Scalars['String']['output']>;
  document_count?: Maybe<Scalars['Int']['output']>;
  documents: Array<Document>;
  dossier_id: Scalars['String']['output'];
  responsible_ministry?: Maybe<Scalars['String']['output']>;
  sourceurl?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type EntityCount = {
  __typename?: 'EntityCount';
  count: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
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
  group_id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Organization = {
  __typename?: 'Organization';
  documents: Array<Document>;
  name?: Maybe<Scalars['String']['output']>;
  organization_id: Scalars['String']['output'];
};

export type Person = {
  __typename?: 'Person';
  documents: Array<Document>;
  name?: Maybe<Scalars['String']['output']>;
  person_id: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  documents: Array<Document>;
  dossier?: Maybe<Dossier>;
  events: Array<Event>;
  getGroupsByDocumentId: Array<Group>;
  getOrganizationsByDocumentId: Array<Organization>;
  getPersonsByDocumentId: Array<Person>;
  getTimelineForQuery: Array<Event>;
  getTimelineForTopic: Array<Event>;
  groups: Array<Group>;
  organizations: Array<Organization>;
  people: Array<Person>;
  searchDocuments: Array<Document>;
  topEntitiesByTopic: TopEntities;
  topic?: Maybe<Topic>;
  topics: Array<Topic>;
};


export type QueryDossierArgs = {
  dossier_id: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  document_id: Scalars['String']['input'];
};


export type QueryGetGroupsByDocumentIdArgs = {
  document_id: Scalars['ID']['input'];
};


export type QueryGetOrganizationsByDocumentIdArgs = {
  document_id: Scalars['ID']['input'];
};


export type QueryGetPersonsByDocumentIdArgs = {
  document_id: Scalars['ID']['input'];
};


export type QueryGetTimelineForQueryArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetTimelineForTopicArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  organizations?: InputMaybe<Array<Scalars['String']['input']>>;
  persons?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  topic_id: Scalars['ID']['input'];
};


export type QuerySearchDocumentsArgs = {
  query: Scalars['String']['input'];
};


export type QueryTopEntitiesByTopicArgs = {
  topic_id: Scalars['ID']['input'];
};


export type QueryTopicArgs = {
  id: Scalars['ID']['input'];
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
  top_words?: Maybe<Scalars['String']['output']>;
  topic_id: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Document: ResolverTypeWrapper<Document>;
  Dossier: ResolverTypeWrapper<Dossier>;
  EntityCount: ResolverTypeWrapper<EntityCount>;
  Event: ResolverTypeWrapper<Event>;
  Group: ResolverTypeWrapper<Group>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Organization: ResolverTypeWrapper<Organization>;
  Person: ResolverTypeWrapper<Person>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TopEntities: ResolverTypeWrapper<TopEntities>;
  Topic: ResolverTypeWrapper<Topic>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Document: Document;
  Dossier: Dossier;
  EntityCount: EntityCount;
  Event: Event;
  Group: Group;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Organization: Organization;
  Person: Person;
  Query: {};
  String: Scalars['String']['output'];
  TopEntities: TopEntities;
  Topic: Topic;
};

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  date_extracted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date_scraped?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  document_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dossier?: Resolver<Maybe<ResolversTypes['Dossier']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  organizations?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  sourcetype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceurl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DossierResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dossier'] = ResolversParentTypes['Dossier']> = {
  date_decision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date_published?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  document_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  dossier_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  responsible_ministry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceurl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntityCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntityCount'] = ResolversParentTypes['EntityCount']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  document?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  group_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organization_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  person_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  dossier?: Resolver<Maybe<ResolversTypes['Dossier']>, ParentType, ContextType, RequireFields<QueryDossierArgs, 'dossier_id'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'document_id'>>;
  getGroupsByDocumentId?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGetGroupsByDocumentIdArgs, 'document_id'>>;
  getOrganizationsByDocumentId?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryGetOrganizationsByDocumentIdArgs, 'document_id'>>;
  getPersonsByDocumentId?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryGetPersonsByDocumentIdArgs, 'document_id'>>;
  getTimelineForQuery?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryGetTimelineForQueryArgs, 'query'>>;
  getTimelineForTopic?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryGetTimelineForTopicArgs, 'topic_id'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  organizations?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  searchDocuments?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QuerySearchDocumentsArgs, 'query'>>;
  topEntitiesByTopic?: Resolver<ResolversTypes['TopEntities'], ParentType, ContextType, RequireFields<QueryTopEntitiesByTopicArgs, 'topic_id'>>;
  topic?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType, RequireFields<QueryTopicArgs, 'id'>>;
  topics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
};

export type TopEntitiesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopEntities'] = ResolversParentTypes['TopEntities']> = {
  groups?: Resolver<Array<ResolversTypes['EntityCount']>, ParentType, ContextType>;
  organizations?: Resolver<Array<ResolversTypes['EntityCount']>, ParentType, ContextType>;
  persons?: Resolver<Array<ResolversTypes['EntityCount']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  top_words?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Document?: DocumentResolvers<ContextType>;
  Dossier?: DossierResolvers<ContextType>;
  EntityCount?: EntityCountResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TopEntities?: TopEntitiesResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
};

