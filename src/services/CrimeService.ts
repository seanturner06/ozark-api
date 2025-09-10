import { PrismaClient } from '@prisma/client';
import { Prisma } from '../generated/prisma';
import { Service } from 'typedi'
import { CrimeFilter } from '../generated/graphql'


@Service()
export class CrimeService {
    constructor(private prisma: PrismaClient){};

    async getCrime(crimeId: String){
        return this.prisma.crime.findUnique({
            where: {id: crimeId}
        });
    }

    async getCrimes(filter: CrimeFilter){
        const where: Prisma.CrimeWhereInput = {};

        if(filter){ 
            if(filter.type && filter.type.length > 0) {
                where.type = { in: filter.type };
            }
            if(filter.victim && filter.victim.length > 0) {
                where.victim = { in: filter.victim };
            }
            if(filter.seasonIds != null && filter.seasonIds.length > 0) {
                where.episodes = {
                    some: {
                        seasonId: { in: filter.seasonIds.map(id => Number(id)) }
                    }
                }
            }
            if(filter.episodeIds != null && filter.episodeIds.length > 0) {
                where.episodes = {
                    some: {
                        id: { in: filter.episodeIds.map(id => Number(id)) }
                    }
                }
            }
        }
        return this.prisma.crime.findMany({ where });
    }

    async getCrimeAppearances(crimeId: number){
        return this.prisma.crime.findUnique({
            where: {id: crimeId},
        }).episodes();
    }

    async getCrimeCharacters(crimeId: number){
        return this.prisma.crime.findUnique({
            where: {id: crimeId},
        }).characters();
    }
}