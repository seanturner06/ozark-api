import { PrismaClient } from '@prisma/client';
import { Prisma } from '../generated/prisma';
import { Service } from 'typedi'
import { CharacterFilter} from '../generated/graphql'

@Service()
export class CharacterService {
    constructor(private prisma: PrismaClient) {}

    async getCharacter(id: String){
        return this.prisma.character.findUnique({
            where: {id: Number(id)}
        });
    }

    async getCharacters(filter: CharacterFilter | null) {
        const where: Prisma.CharacterWhereInput = {}; 

        if (filter) {
            if(filter.id){
                where.id = Number(filter.id);
            }
            if(filter.hasCrimes !== undefined) {
                if(filter.hasCrimes) {
                    where.crimes = { some: {} };
                } else {
                    where.crimes = { none: {} };
                }
            }
            if(filter.episodeIds != null && filter.episodeIds.length > 0) {
                where.episodes = {
                    some: {
                        id: { in: filter.episodeIds.map(id => Number(id)) }
                    }
                }
            }
            if(filter.seasonIds != null && filter.seasonIds.length > 0) {
                where.episodes = {
                    some: {
                        id: { in: filter.seasonIds.map(id => Number(id)) }
                    }
                }
            }
            if(filter.hasQuotes !== undefined) {
                if(filter.hasQuotes) {
                    where.quotes = { some: {} }; 
                }else {
                    where.quotes = { none: {} };
                }
            }
        }
        return this.prisma.character.findMany( { where } );
    }

    async getCharacterAppearances(characterId: number) {
        return this.prisma.character.findUnique({
            where: { id: characterId }
        }).episodes();
    }
}