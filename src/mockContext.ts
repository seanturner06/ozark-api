import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { CharacterService } from './services/CharacterService';
import { SeasonService } from './services/SeasonService';
import { EpisodeService } from './services/EpisodeService';
import { QuoteService } from './services/QuoteService';
import { CrimeService } from './services/CrimeService';

export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>;
    characterService: CharacterService;
    seasonService: SeasonService;
    episodeService: EpisodeService;
    quoteService: QuoteService;
    crimeService: CrimeService;
}

export const createMockContext = (): MockContext => {
    const mockPrisma = mockDeep<PrismaClient>();
    return {
        prisma: mockPrisma,
        characterService: new CharacterService(mockPrisma),
        seasonService: new SeasonService(mockPrisma),
        episodeService: new EpisodeService(mockPrisma),
        quoteService: new QuoteService(mockPrisma),
        crimeService: new CrimeService(mockPrisma),
    }
}