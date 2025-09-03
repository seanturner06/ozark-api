import { GraphQLResolveInfo } from 'graphql';
import { Episode as PrismaEpisode, Season as PrismaSeason, Character as PrismaCharacter, Crime as PrismaCrime, Quote as PrismaQuote } from '../generated/prisma';
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

export type Character = {
  __typename?: 'Character';
  appearances: Array<Episode>;
  crimes: Array<Crime>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  quotes: Array<Quote>;
};

export type CharacterFilter = {
  episodeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  hasCrimes?: InputMaybe<Scalars['Boolean']['input']>;
  hasQuotes?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  seasonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Crime = {
  __typename?: 'Crime';
  appearances: Array<Episode>;
  characters: Array<Character>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  quotes: Array<Quote>;
  severity: Scalars['String']['output'];
  type: Scalars['String']['output'];
  victim: Scalars['String']['output'];
};

export type CrimeFilter = {
  episodeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  seasonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  severity?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Array<Scalars['String']['input']>>;
  victim?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Episode = {
  __typename?: 'Episode';
  characters: Array<Character>;
  crimes: Array<Crime>;
  description?: Maybe<Scalars['String']['output']>;
  episodeNumber: Scalars['Int']['output'];
  hasDeaths: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  imdbRating?: Maybe<Scalars['Float']['output']>;
  quotes: Array<Quote>;
  season: Season;
  seasonId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type EpisodeFilter = {
  episodeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  hasDeaths?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  imdbRating?: InputMaybe<Scalars['Float']['input']>;
  seasonId?: InputMaybe<Scalars['ID']['input']>;
  viewerRating?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  character?: Maybe<Character>;
  characters: Array<Character>;
  crime?: Maybe<Crime>;
  crimes: Array<Crime>;
  episode?: Maybe<Episode>;
  episodes: Array<Episode>;
  quote?: Maybe<Quote>;
  quotes: Array<Quote>;
  season?: Maybe<Season>;
  seasons: Array<Season>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilter>;
};


export type QueryCrimeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCrimesArgs = {
  filter?: InputMaybe<CrimeFilter>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEpisodesArgs = {
  filter?: InputMaybe<EpisodeFilter>;
};


export type QueryQuoteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuotesArgs = {
  filter?: InputMaybe<QuoteFilter>;
};


export type QuerySeasonArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeasonsArgs = {
  filter?: InputMaybe<SeasonFilter>;
};

export type Quote = {
  __typename?: 'Quote';
  character: Character;
  characterId: Scalars['ID']['output'];
  episode: Episode;
  episodeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type QuoteFilter = {
  characterNames?: InputMaybe<Array<Scalars['String']['input']>>;
  episodeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  seasonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  textContains?: InputMaybe<Scalars['String']['input']>;
};

export type Season = {
  __typename?: 'Season';
  episodes: Array<Episode>;
  id: Scalars['ID']['output'];
  imdbRating: Scalars['Float']['output'];
  seasonNumber: Scalars['Int']['output'];
};

export type SeasonFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  imdbRating?: InputMaybe<Scalars['Float']['input']>;
  seasonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  viewerRating?: InputMaybe<Scalars['Float']['input']>;
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
  Character: ResolverTypeWrapper<PrismaCharacter>;
  CharacterFilter: CharacterFilter;
  Crime: ResolverTypeWrapper<PrismaCrime>;
  CrimeFilter: CrimeFilter;
  Episode: ResolverTypeWrapper<PrismaEpisode>;
  EpisodeFilter: EpisodeFilter;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Quote: ResolverTypeWrapper<PrismaQuote>;
  QuoteFilter: QuoteFilter;
  Season: ResolverTypeWrapper<PrismaSeason>;
  SeasonFilter: SeasonFilter;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Character: PrismaCharacter;
  CharacterFilter: CharacterFilter;
  Crime: PrismaCrime;
  CrimeFilter: CrimeFilter;
  Episode: PrismaEpisode;
  EpisodeFilter: EpisodeFilter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  Quote: PrismaQuote;
  QuoteFilter: QuoteFilter;
  Season: PrismaSeason;
  SeasonFilter: SeasonFilter;
  String: Scalars['String']['output'];
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  appearances?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType>;
  crimes?: Resolver<Array<ResolversTypes['Crime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quotes?: Resolver<Array<ResolversTypes['Quote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CrimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Crime'] = ResolversParentTypes['Crime']> = {
  appearances?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType>;
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quotes?: Resolver<Array<ResolversTypes['Quote']>, ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  victim?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  crimes?: Resolver<Array<ResolversTypes['Crime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasDeaths?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imdbRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quotes?: Resolver<Array<ResolversTypes['Quote']>, ParentType, ContextType>;
  season?: Resolver<ResolversTypes['Season'], ParentType, ContextType>;
  seasonId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, 'id'>>;
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType, Partial<QueryCharactersArgs>>;
  crime?: Resolver<Maybe<ResolversTypes['Crime']>, ParentType, ContextType, RequireFields<QueryCrimeArgs, 'id'>>;
  crimes?: Resolver<Array<ResolversTypes['Crime']>, ParentType, ContextType, Partial<QueryCrimesArgs>>;
  episode?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QueryEpisodeArgs, 'id'>>;
  episodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType, Partial<QueryEpisodesArgs>>;
  quote?: Resolver<Maybe<ResolversTypes['Quote']>, ParentType, ContextType, RequireFields<QueryQuoteArgs, 'id'>>;
  quotes?: Resolver<Array<ResolversTypes['Quote']>, ParentType, ContextType, Partial<QueryQuotesArgs>>;
  season?: Resolver<Maybe<ResolversTypes['Season']>, ParentType, ContextType, RequireFields<QuerySeasonArgs, 'id'>>;
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType, Partial<QuerySeasonsArgs>>;
};

export type QuoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quote'] = ResolversParentTypes['Quote']> = {
  character?: Resolver<ResolversTypes['Character'], ParentType, ContextType>;
  characterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  episode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  episodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = {
  episodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imdbRating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seasonNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Character?: CharacterResolvers<ContextType>;
  Crime?: CrimeResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quote?: QuoteResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
};

