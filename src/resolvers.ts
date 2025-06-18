import { PrismaClient } from '@prisma/client';

// 1. Context type
interface Context {
    prisma: PrismaClient;
    user?: {
    id: string;
    name: string;
    };
}
// 2. Filter types
interface EpisodeFilter {
    id?: string;
    seasonId?: string;
    episodeIds?: string[];
    hasDeaths?: boolean;
    imdbRating?: number;
    viewerRating?: number;
}

const resolvers ={
    Query: {
        episodes: async (_: any, { filter }: { filter: EpisodeFilter }, context: Context) => {
            const where: any = {};
            
            if (filter) {
                if (filter.seasonId) {
                    where.seasonId = filter.seasonId;
                }
                if (filter.episodeIds && filter.episodeIds.length > 0) {
                    where.id = { in: filter.episodeIds };
                }
                if (filter.hasDeaths !== undefined) {
                    where.hasDeaths = filter.hasDeaths;
                }
                if (filter.imdbRating !== undefined) {
                    where.imdbRating = filter.imdbRating;
                }
                if (filter.viewerRating !== undefined) {
                    where.viewerRating = filter.viewerRating;
                }
            }
            return context.prisma.episode.findMany({ where });
        }
    }
}

export default resolvers;