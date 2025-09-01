import { Resolvers } from './generated/graphql';
import { Prisma } from './generated/prisma';

// TODO: ADD OPTIMIZATION VIA DATALOADER OR INCLUDE 
const resolvers: Resolvers = {
    Query: {
        episodes: async (_parent, args, context) => {
            const where: Prisma.EpisodeWhereInput = {};
            
            if (args.filter) {
                if (args.filter.seasonId) {
                    where.seasonId = Number(args.filter.seasonId);
                }
                if (args.filter.episodeIds && args.filter.episodeIds.length > 0) {
                    where.id = { in: args.filter.episodeIds.map(id => Number(id)) };
                }
                if (args.filter.hasDeaths !== undefined && args.filter.hasDeaths !== null) {
                    where.hasDeaths = args.filter.hasDeaths;
                }
                if (args.filter.imdbRating !== undefined) {
                    where.imdbRating = args.filter.imdbRating;
                }
                if (args.filter.viewerRating !== undefined) {
                    where.viewerRating = args.filter.viewerRating;
                }
            }
            return context.prisma.episode.findMany({ where });
        }, 
        seasons: async (_parent, args, context) => {
            const where: Prisma.SeasonWhereInput = {};

            if (args.filter) {
                if (args.filter.id) {
                    where.id = Number(args.filter.id);
                }
                if (args.filter.seasonIds && args.filter.seasonIds.length > 0) {
                    where.id = { in: args.filter.seasonIds.map(id => Number(id)) };
                }
                if(args.filter.imdbRating !== undefined) {
                    where.imdbRating = args.filter.imdbRating;
                }
                if(args.filter.viewerRating !== undefined) {
                    where.viewerRating = args.filter.viewerRating;
                }
            }
            return context.prisma.season.findMany({ where });
        },
        characters: async (_parent, args, context) => {
            const where: Prisma.CharacterWhereInput = {};

            if (args.filter) {
                if (args.filter.id) {
                    where.id = Number(args.filter.id);
                }
                if (args.filter.hasCrimes !== undefined) {
                    if (args.filter.hasCrimes) {
                        where.crimes = { some: {} };
                    } else {
                        where.crimes = { none: {} };
                    }
                }
                // TODO: Add filtering for episodes and seasons 
                if(args.filter.hasQuotes !== undefined) {
                    if(args.filter.hasQuotes) {
                        where.quotes = { some: {} };
                    } else {
                        where.quotes = { none: {} };
                    }
                }
            }
            return context.prisma.character.findMany({ where });
        },
        character: async(_parent, args, context) => {
            return context.prisma.character.findUnique({
                where: {
                    id: Number(args.id)
                }
            })
        },
        crimes: async (_parent, args, context) => {
            const where: Prisma.CrimeWhereInput = {};

            if (args.filter) {
                if(args.filter.type && args.filter.type.length > 0) {
                    where.type = { in: args.filter.type };
                }
                if(args.filter.victim && args.filter.victim.length > 0) {
                    where.victim = { in: args.filter.victim };
                }
                
            }
            return context.prisma.crime.findMany({ where });
        },
    },
    Episode: {
        season: async(parent, _args, context) => {
            return context.prisma.season.findUnique({
                where: {id: parent.seasonId}
            })
        },
        characters: async(parent, _args, context) => {
            return context.prisma.character.findMany({
                where: {episodes: {some: {id: parent.id } } }
            })
        },
        crimes: async(parent, _args, context) => {
            return context.prisma.crime.findMany({
                where: {episodes: {some: {id: parent.id}}}
            })
        },
        quotes: async(parent, _args, context) => {
            return context.prisma.quote.findMany({
                where: {episodes:{some: {id: parent.id}}}
            })
        }
    }, 
    Season: {
        episodes: async(parent, _args, context) => {
            return context.prisma.episode.findMany({
                where: {seasonId: parent.id}
            })
        }
    }, 
    Character: {
        appearances: async(parent, _args, context) => {
            return context.prisma.episode.findMany({
                where: {characters: {some: {id: parent.id }}}
            })
        },
        crimes: async(parent, _args, context) => {
            return context.prisma.crime.findMany({
                where: {characters: {some: {id: parent.id}}}
            })
        }, 
        quotes: async(parent, _args, context) => {
            return context.prisma.quote.findMany({
                where: {characters: {some: {id: parent.id}}}
            })
        }
    },
    Quote: {
        character: async(parent, _args, context) => {
            return context.prisma.character.findUnique({
                where: {id: parent.characterId}
            })
        },
        episode: async(parent, _args, context) => {
            return context.prisma.episode.findUnique({
                where: {id: parent.episodeId}
            })
        }
    },
    Crime: {
        appearances: async(parent, _args, context) => {
            return context.prisma.episode.findMany({
                where: {crimes: {some: {id: parent.id}}}
            })
        },
        characters: async(parent, _args, context) => {
            return context.prisma.character.findMany({
                where: {crimes: {some: {id: parent.id}}}
            })
        }
    }

}

export default resolvers;