import { Resolvers } from './generated/graphql';
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
            return context.quoteService.getQuotes(args.filter || {});
        },
        quote: async(_parent, args, context) => {
            return context.quoteService.getQuote(args.id);
        },
        crimes: async(_parent, args, context) => {
            return context.crimeService.getCrimes(args.filter || {});
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
            const result = await context.quoteService.getQuoteCharacter(parent.characterId);

            if (!result) {
                throw new Error(`Character with id ${parent.characterId} not found`);
            }

            return result;
        },
        episode: async(parent, _args, context) => {
            const result = await context.quoteService.getQuoteEpisode(parent.episodeId);

            if (!result) {
                throw new Error(`Episode with id ${parent.episodeId} not found`);
            }

            return result;
        }
    },
    Crime: {
        appearances: async(parent, _args, context) => {
            const result = await context.crimeService.getCrimeAppearances(parent.id);

            return result ?? [];
        },
        characters: async(parent, _args, context) => {
            const result = await context.crimeService.getCrimeCharacters(parent.id);

            return result ?? [];
        }
    }
}

export default resolvers;