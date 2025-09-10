import { Resolvers } from './generated/graphql';
import { Prisma } from './generated/prisma';
import { Context } from './context';

const resolvers: Resolvers<Context> = {
    Query: {
        episodes: async (_parent, args, context) => {
            return context.episodeService.getEpisodes(args.filter || null);
        }, 
        episode: async(_parent, args, context) => {
            return context.episodeService.getEpisode(args.id)
        },
        seasons: async(_parent, args, context) => {
            return context.seasonService.getSeasons(args.filter || null);
        },
        season: async(_parent, args, context) => {
            return context.seasonService.getSeason(args.id);
        },
        characters: async(_parent, args, context) => {
            return context.characterService.getCharacters(args.filter || null);
        },
        character: async(_parent, args, context) => {
            return context.characterService.getCharacter(args.id);
        },
        quotes: async(_parent, args, context) => {
            return context.quoteService.getQuotes(args.filter | null);
        }
        crimes: async(_parent, args, context) => {
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
        crime: async(_parent, args, context) => {
            return context.crimeService.getCrime(args.id);
        }
    },
    Episode: {
        season: async(parent, _args, context) => {
            const result = context.episodeService.getEpisodeSeason(parent.seasonId);

            if (!result) {
                throw new Error(`Season with id ${parent.seasonId} not found`);
            }

            return result;
        },
        characters: async(parent, _args, context) => {
            const result = context.episodeService.getEpisodeCharacters(parent.id);

            return result ?? [];
        },
        crimes: async(parent, _args, context) => {
            const result = context.episodeService.getEpisodeCrimes(parent.id);

            return result ?? [];
        },
        quotes: async(parent, _args, context) => {
            const result = context.episodeService.getEpisodeQuotes(parent.id);

            return result ?? [];
        }
    }, 
    Season: {
        episodes: async(parent, _args, context) => {
            return context.seasonService.getSeasonEpisodes(parent.id);
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
            const result = await context.quoteService.getQuoteCharacter(parent.id);

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