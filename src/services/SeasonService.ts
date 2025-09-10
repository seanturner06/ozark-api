import { PrismaClient } from '@prisma/client';
import { Prisma } from '../generated/prisma';
import { Service } from 'typedi'
import { SeasonFilter } from '../generated/graphql'

@Service()
export class SeasonService {
    constructor(private prisma: PrismaClient) {}

    async getSeason(id: String){
        return this.prisma.season.findUnique({
            where: {id: Number(id)}
        })
    }

    async getSeasons(filter: SeasonFilter | null) {
        const where: Prisma.SeasonWhereInput = {};

        if(filter){
            if (filter.id) {
                where.id = Number(filter.id);
            }
            if (filter.seasonIds && filter.seasonIds.length > 0) {
                where.id = { in: filter.seasonIds.map(id => Number(id)) };
            }
            if(filter.imdbRating !== undefined) {
                where.imdbRating = filter.imdbRating;
            }
        }
        return this.prisma.season.findMany( { where } );
    }

    async getSeasonEpisodes(seasonId: number) {
        return this.prisma.season.findUnique({
            where: {id: seasonId }
        }).episodes();
    }
}