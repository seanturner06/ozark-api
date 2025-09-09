import { Resolvers } from './generated/graphql';
import { Prisma } from './generated/prisma';
import { Context } from './context';

const resolvers: Resolvers<Context> = {
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
            }
            return context.prisma.season.findMany({ where });
        },
        characters: async (_parent, args, context) => {
            return context.characterService.getCharacters(args.filter || null);
        },
        character: async(_parent, args, context) => {
            return context.characterService.getCharacter(args.id);
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
            const result = await context.prisma.season.findUnique({
                where: {id: parent.seasonId}
            })

            if (!result) {
                throw new Error(`Season with id ${parent.seasonId} not found`);
            }

            return result;
        },
        characters: async(parent, _args, context) => {
            const result = await context.prisma.episode.findUnique({
                where: {id: parent.id }
            }).characters();

            return result ?? [];
        },
        crimes: async(parent, _args, context) => {
            const result = await context.prisma.episode.findUnique({
                where: {id: parent.id}
            }).crimes();

            return result ?? [];
        },
        quotes: async(parent, _args, context) => {
            const result = await context.prisma.episode.findUnique({
                where: {id: parent.id}
            }).quotes();

            return result ?? [];
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
            const result = await context.characterService.getCharacterAppearances(parent.id);
            return result ?? [];
        },
        crimes: async(parent, _args, context) => {
            const result = await context.characterService.getCharacterCrimes(parent.id);
            return result ?? [];
        }, 
        quotes: async(parent, _args, context) => {
            const result = await context.characterService.getCharacterQuotes(parent.id);
            return result ?? [];
        }
    },
    Quote: {
        character: async(parent, _args, context) => {
            const result = await context.prisma.character.findUnique({
                where: {id: parent.characterId}
            });

            if (!result) {
                throw new Error(`Character with id ${parent.characterId} not found`);
            }

            return result;
        },
        episode: async(parent, _args, context) => {
            const result = await context.prisma.episode.findUnique({
                where: {id: parent.episodeId}
            });

            if (!result) {
                throw new Error(`Episode with id ${parent.episodeId} not found`);
            }

            return result;
        }
    },
    Crime: {
        appearances: async(parent, _args, context) => {
            const result = await context.prisma.crime.findUnique({
                where: {id: parent.id}
            }).episodes(); 

            return result ?? [];
        },
        characters: async(parent, _args, context) => {
            const result = await context.prisma.crime.findUnique({
                where: {id: parent.id}
            }).characters(); 

            return result ?? [];
        }
    }

}

export default resolvers;