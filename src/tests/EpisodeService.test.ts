import { EpisodeService } from '../services/EpisodeService';
import { EpisodeFilter } from '../generated/graphql';
import { createMockContext, MockContext } from '../mockContext';
import { mockReset } from 'jest-mock-extended';

describe('EpisodeService', () => {
    let mockContext: MockContext;
    let episodeService: EpisodeService;

    beforeEach(() => {
        mockContext = createMockContext();
        episodeService = new EpisodeService(mockContext.prisma);
    });

    afterEach(() => {
      // Reset all mocks between tests
        mockReset(mockContext.prisma);
    });

    describe('getEpisode', () => {
        it('should return episode by id', async () => {
            const mockEpisode = { id: 1, title: 'Test Episode' };
            mockContext.prisma.episode.findUnique.mockResolvedValue(mockEpisode);

            const result = await episodeService.getEpisode('1');

            expect(mockContext.prisma.episode.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockEpisode);
        });

        it('should convert string id to number', async () => {
        mockContext.prisma.episode.findUnique.mockResolvedValue(null);

        await episodeService.getEpisode('123');

        expect(mockContext.prisma.episode.findUnique).toHaveBeenCalledWith({
            where: { id: 123 }
        });
        });
    });

    describe('getEpisodes', () => {
        it('should return all episodes when no filter is provided', async () => {
            const mockEpisodes = [
            { id: 1, title: 'Episode 1' },
            { id: 2, title: 'Episode 2' }
            ];
            mockContext.prisma.episode.findMany.mockResolvedValue(mockEpisodes);

            const result = await episodeService.getEpisodes(null);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: {}
            });
            expect(result).toEqual(mockEpisodes);
        });

        it('should filter by seasonId when provided', async () => {
            const filter: EpisodeFilter = { seasonId: '2' };
            const mockEpisodes = [{ id: 3, seasonId: 2, title: 'Episode 3' }];
            mockContext.prisma.episode.findMany.mockResolvedValue(mockEpisodes);

            const result = await episodeService.getEpisodes(filter);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: { seasonId: 2 }
            });
            expect(result).toEqual(mockEpisodes);
        });

        it('should filter by episodeIds when provided', async () => {
            const filter: EpisodeFilter = { episodeIds: ['1', '3', '5'] };
            const mockEpisodes = [
            { id: 1, title: 'Episode 1' },
            { id: 3, title: 'Episode 3' },
            { id: 5, title: 'Episode 5' }
            ];
            mockContext.prisma.episode.findMany.mockResolvedValue(mockEpisodes);

            const result = await episodeService.getEpisodes(filter);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: { id: { in: [1, 3, 5] } }
            });
            expect(result).toEqual(mockEpisodes);
        });

        it('should filter by hasDeaths when provided', async () => {
            const filter: EpisodeFilter = { hasDeaths: true };
            mockContext.prisma.episode.findMany.mockResolvedValue([]);

            await episodeService.getEpisodes(filter);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: { hasDeaths: true }
            });
        });

        it('should filter by imdbRating when provided', async () => {
            const filter: EpisodeFilter = { imdbRating: 8.5 };
            mockContext.prisma.episode.findMany.mockResolvedValue([]);

            await episodeService.getEpisodes(filter);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: { imdbRating: 8.5 }
            });
        });

        it('should combine multiple filters', async () => {
            const filter: EpisodeFilter = {
                seasonId: '1',
                hasDeaths: false,
                imdbRating: 9.0,
                episodeIds: ['1', '2']
            };
            mockContext.prisma.episode.findMany.mockResolvedValue([]);

            await episodeService.getEpisodes(filter);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: {
                    seasonId: 1,
                    hasDeaths: false,
                    imdbRating: 9.0,
                    id: { in: [1, 2] }
                }
            });
        });

        it('should ignore empty episodeIds array', async () => {
            const filter: EpisodeFilter = { episodeIds: [] };
            mockContext.prisma.episode.findMany.mockResolvedValue([]);

            await episodeService.getEpisodes(filter);

            expect(mockContext.prisma.episode.findMany).toHaveBeenCalledWith({
                where: {}
            });
        });
    });

    describe('getEpisodeSeason', () => {
        it('should return season by id', async () => {
            const mockSeason = { id: 1, name: 'Season 1' };
            mockContext.prisma.season.findUnique.mockResolvedValue(mockSeason);

            const result = await episodeService.getEpisodeSeason(1);

            expect(mockContext.prisma.season.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockSeason);
        });
    });

    describe('getEpisodeCharacters', () => {
        it('should return episode characters', async () => {
            const mockCharacters = [{ id: 1, name: 'Walter White' }];
            const mockEpisodeWithCharacters = {
                characters: jest.fn().mockResolvedValue(mockCharacters)
            };
            mockContext.prisma.episode.findUnique.mockReturnValue(mockEpisodeWithCharacters);

            const result = await episodeService.getEpisodeCharacters(1);

            expect(mockContext.prisma.episode.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(mockEpisodeWithCharacters.characters).toHaveBeenCalled();
            expect(result).toEqual(mockCharacters);
        });
    });

    describe('getEpisodeCrimes', () => {
        it('should return episode crimes', async () => {
            const mockCrimes = [{ id: 1, type: 'Drug Manufacturing' }];
            const mockEpisodeWithCrimes = {
                crimes: jest.fn().mockResolvedValue(mockCrimes)
            };
            mockContext.prisma.episode.findUnique.mockReturnValue(mockEpisodeWithCrimes);

            const result = await episodeService.getEpisodeCrimes(1);

            expect(mockContext.prisma.episode.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(mockEpisodeWithCrimes.crimes).toHaveBeenCalled();
            expect(result).toEqual(mockCrimes);
        });
    });

    describe('getEpisodeQuotes', () => {
        it('should return episode quotes', async () => {
            const mockQuotes = [{ id: 1, text: 'I am the one who knocks!' }];
            const mockEpisodeWithQuotes = {
                quotes: jest.fn().mockResolvedValue(mockQuotes)
            };
            mockContext.prisma.episode.findUnique.mockReturnValue(mockEpisodeWithQuotes);

            const result = await episodeService.getEpisodeQuotes(1);

            expect(mockContext.prisma.episode.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(mockEpisodeWithQuotes.quotes).toHaveBeenCalled();
            expect(result).toEqual(mockQuotes);
        });
    });

    // Example of testing with multiple services if needed
    describe('integration with other services', () => {
        it('should work alongside CharacterService', async () => {
            // You can access other mocked services from the context
            const mockCharacter = { id: 1, name: 'Walter White' };
            mockContext.prisma.character.findUnique.mockResolvedValue(mockCharacter);
    
            // Test some interaction between services if needed
            const character = await mockContext.characterService.getCharacter('1');
            expect(character).toEqual(mockCharacter);
        });
    });

    describe('error handling', () => {
        it('should handle database errors in getEpisode', async () => {
            const error = new Error('Database connection failed');
            mockContext.prisma.episode.findUnique.mockRejectedValue(error);
    
            await expect(episodeService.getEpisode('1')).rejects.toThrow('Database connection failed');
        });
    
        it('should handle database errors in getEpisodes', async () => {
            const error = new Error('Query failed');
            mockContext.prisma.episode.findMany.mockRejectedValue(error);
    
            await expect(episodeService.getEpisodes(null)).rejects.toThrow('Query failed');
        });
    });
});