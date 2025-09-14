import { PrismaClient } from './generated/prisma';
import { CharacterService } from './services/CharacterService'
import { SeasonService } from './services/SeasonService';
import { EpisodeService } from './services/EpisodeService';
import { QuoteService } from './services/QuoteService'
import { CrimeService } from './services/CrimeService';


export type Context = {
    prisma: PrismaClient; 
    characterService: CharacterService; 
    seasonService: SeasonService;
    episodeService: EpisodeService;
    quoteService: QuoteService;
    crimeService: CrimeService;
}

export const createContext = (): Context => {
    const prisma = new PrismaClient();
    return {
        prisma,
        characterService: new CharacterService(prisma),
        seasonService: new SeasonService(prisma),
        episodeService: new EpisodeService(prisma),
        quoteService: new QuoteService(prisma),
        crimeService: new CrimeService(prisma)
    }
}