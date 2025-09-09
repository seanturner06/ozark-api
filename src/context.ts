import { PrismaClient } from './generated/prisma';
// import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { CharacterService } from './services/characterService'

export type Context = {
    prisma: PrismaClient; 
    characterService: CharacterService; 
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
    }
}

// export const createMockContext = (): MockContext => {
//     const mockPrisma = mockDeep<PrismaClient>();
//     return {
//         prisma: mockPrisma,
//         characterService: new CharacterService(mockPrisma),
//     }
// }