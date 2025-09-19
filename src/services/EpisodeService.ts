import { PrismaClient } from '@prisma/client'
import { Prisma } from '../generated/prisma';
import { Service } from 'typedi'
import { EpisodeFilter } from '../generated/graphql'

@Service()
export class EpisodeService {
    constructor(private prisma: PrismaClient) {}

    async getEpisode(id: String){
        return this.prisma.episode.findUnique({
            where: {id: Number(id)}
        });
    }

    async getEpisodes(filter: EpisodeFilter | null) {
        const where: Prisma.EpisodeWhereInput = {};
        
        if(filter) {
            if (filter.seasonId) {
                where.seasonId = Number(filter.seasonId);
            }
            if (filter.episodeIds && filter.episodeIds.length > 0) {
                where.id = { in: filter.episodeIds.map(id => Number(id)) };
            }
            if (filter.hasDeaths != null) {
                where.hasDeaths = filter.hasDeaths;
            }
            if (filter.imdbRating != null) {
                where.imdbRating = filter.imdbRating;
            }
        }

        return this.prisma.episode.findMany({
            where
        });
    }

    async getEpisodeSeason(seasonId: number) {
        return this.prisma.season.findUnique({
            where: { id: seasonId }
        });
    }

    async getEpisodeCharacters(episodeId: number) {
        return this.prisma.episode.findUnique({
            where: { id: episodeId }
        }).characters();
    }

    async getEpisodeCrimes(episodeId: number) {
        return this.prisma.episode.findUnique({
            where: { id: episodeId }
        }).crimes();
    }

    async getEpisodeQuotes(episodeId: number) {
        return this.prisma.episode.findUnique({
            where: { id: episodeId }
        }).quotes();  
    }
}