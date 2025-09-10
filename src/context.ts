import { PrismaClient } from './generated/prisma';
// import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { CharacterService } from './services/CharacterService'
import { SeasonService } from './services/SeasonService';


export type Context = {
    prisma: PrismaClient; 
    characterService: CharacterService; 
    seasonService: SeasonService;
}

// export type MockContext = {
//     prisma: DeepMockProxy<PrismaClient>;
//     characterService: CharacterService;
// }

export const createContext = (): Context => {
    const prisma = new PrismaClient();
    return {
        prisma,
        characterService: new CharacterService(prisma),
        seasonService: new SeasonService(prisma)
    }
}

// export const createMockContext = (): MockContext => {
//     const mockPrisma = mockDeep<PrismaClient>();
//     return {
//         prisma: mockPrisma,
//         characterService: new CharacterService(mockPrisma),
//     }
// }