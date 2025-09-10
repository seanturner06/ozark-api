import { PrismaClient } from '@prisma/client';
import { Prisma } from '../generated/prisma';
import { Service } from 'typedi'
import { QuoteFilter } from '../generated/graphql'


@Service()
export class QuoteService {
    constructor(private prisma: PrismaClient){}

    async getQuote(quoteId: String) {
        return this.prisma.quote.findUnique({
            where: {id: quoteId}
        });
    }

    async getQuotes(filter: QuoteFilter){
        const where: Prisma.QuoteWhereInput = {};

        if(filter) {
            if(filter.episodeIds != null && filter.episodeIds.length > 0){
                where.episodeId = { in: filter.episodeIds.map(id => Number(id)) };
            }
            if(filter.seasonIds != null && filter.seasonIds.length > 0) {
                where.episode = {
                    seasonId: {in: filter.seasonIds.map(id => Number(id))}
                };
            }
            if(filter.characterNames != null && filter.characterNames.length > 0){
                where.character = {
                    name: {in: filter.characterNames}
                }; 
            }
            if(filter.textContains){
                where.text = {
                    contains: filter.textContains, 
                    mode: 'insensitive'
                }; 
            }
        }

        return this.prisma.quote.findMany({
            where
        });
    }

    async getQuoteCharacter(characterId: number){
        return this.prisma.character.findUnique({
            where: {id: characterId}
        });
    }

    async getQuoteEpisode(episodeId: number){
        return this.prisma.episode.findUnique({
            where: {id: episodeId}
        });
    }
}