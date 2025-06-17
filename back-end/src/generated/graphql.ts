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
  topics?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  EntityGroups: ResolverTypeWrapper<EntityGroups>;
  Event: ResolverTypeWrapper<Event>;
  FilterOptions: FilterOptions;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Group: ResolverTypeWrapper<Group>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Organization: ResolverTypeWrapper<Organization>;
  Person: ResolverTypeWrapper<Person>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TopEntities: ResolverTypeWrapper<TopEntities>;
  Topic: ResolverTypeWrapper<Topic>;
  TopicAssignment: ResolverTypeWrapper<TopicAssignment>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Document: Document;
  Dossier: Dossier;
  EntityCount: EntityCount;
  EntityGroups: EntityGroups;
  Event: Event;
  FilterOptions: FilterOptions;
  Float: Scalars['Float']['output'];
  Group: Group;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Organization: Organization;
  Person: Person;
  Query: {};
  String: Scalars['String']['output'];
  TopEntities: TopEntities;
  Topic: Topic;
  TopicAssignment: TopicAssignment;
};

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dossier?: Resolver<Maybe<ResolversTypes['Dossier']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  extractedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  organizations?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType>;
  persons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  scrapedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['TopicAssignment']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DossierResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dossier'] = ResolversParentTypes['Dossier']> = {
  decisionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  documentCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  dossierId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responsibleMinistry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntityCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntityCount'] = ResolversParentTypes['EntityCount']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  entityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntityGroupsResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntityGroups'] = ResolversParentTypes['EntityGroups']> = {
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  organizations?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType>;
  persons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
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
  groupId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  personId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDocuments?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType, Partial<QueryGetDocumentsArgs>>;
  getEntities?: Resolver<ResolversTypes['EntityGroups'], ParentType, ContextType>;
  getTimeline?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryGetTimelineArgs>>;
  topEntities?: Resolver<ResolversTypes['TopEntities'], ParentType, ContextType>;
  topEntitiesByTopic?: Resolver<ResolversTypes['TopEntities'], ParentType, ContextType, RequireFields<QueryTopEntitiesByTopicArgs, 'topicId'>>;
  topic?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType, RequireFields<QueryTopicArgs, 'topicId'>>;
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
  topWords?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topicId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicAssignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicAssignment'] = ResolversParentTypes['TopicAssignment']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  probability?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  topicId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Document?: DocumentResolvers<ContextType>;
  Dossier?: DossierResolvers<ContextType>;
  EntityCount?: EntityCountResolvers<ContextType>;
  EntityGroups?: EntityGroupsResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TopEntities?: TopEntitiesResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  TopicAssignment?: TopicAssignmentResolvers<ContextType>;
};

