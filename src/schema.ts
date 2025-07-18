const typeDefs = `type Query {
  episodes(filter: EpisodeFilter): [Episode!]!
  episode(id: ID!): Episode
  characters(filter: CharacterFilter): [Character!]!
  character(id: ID!): Character
  crimes(filter: CrimeFilter): [Crime!]!
  crime(id: ID!): Crime
  seasons(filter: SeasonFilter): [Season!]!
  season(id: ID!): Season
  quotes(filter: QuoteFilter): [Quote!]!
  quote(id: ID!): Quote
}

type Episode {
  id: ID!
  episodeNumber: Int!
  title: String!
  imdbRating: Float
  viewerRating: Float
  description: String
  seasonId: ID!
  hasDeaths: Boolean!
  # airDate: DateTime!
  characters: [Character!]!
  crimes: [Crime!]!
  season: Season!
  quotes: [Quote!]!
}

type Season {
  id: ID!
  seasonNumber: Int!
  imdbRating: Float!
  viewerRating: Float!
  # airDate: DateTime!
  episodes: [Episode!]!
}

type Character {
  id: ID!
  name: String!
  description: String
  imageUrl: String
  appearances: [Episode!]!
  crimes: [Crime!]!
  quotes: [Quote!]!
}

type Crime {
  id: ID!
  type: String!
  victim: String!
  description: String!
  severity: String!
  appearances: [Episode!]!
  characters: [Character!]!
  quotes: [Quote!]!
}

type Quote {
  id: ID!
  text: String!
  characterId: ID!
  episodeId: ID!
  character: Character!
  episode: Episode!
}

input EpisodeFilter {
  id: ID
  seasonId: ID
  episodeIds: [ID!]
  hasDeaths: Boolean
  imdbRating: Float
  viewerRating: Float
}

input SeasonFilter {
  id: ID
  seasonIds: [ID!]
  imdbRating: Float
  viewerRating: Float
  # airDate: DateTime
}

input CharacterFilter {
  id: ID
  hasCrimes: Boolean
  episodeIds: [ID!]
  seasonIds: [ID!]
  hasQuotes: Boolean
}

input CrimeFilter {
  type: [String!]
  victim: [String!]
  severity: [String!]
  seasonIds: [ID!]
  episodeIds: [ID!]
}

input QuoteFilter {
  episodeIds: [ID!]
  seasonIds: [ID!]
  characterNames: [String!]
  textContains: String
}
`;

export default typeDefs;
