import { Context } from './context'
import { createMockContext, MockContext } from './context'
import { getAllEpisodes } from './testFunctions'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

describe('getAllEpisodes', () => {
    test('returns all episodes', async() => {
        const mockEpisodes = [
            {id: 1, episodeNumber: 1, title:'Episode1', imdbRating: 7.5, hasDeaths: false, description: 'description1', seasonId:1},
            {id: 2, episodeNumber: 2, title:'Episode2', imdbRating: 8.0, hasDeaths: true, description: 'description2', seasonId:1},
        ]
        
        mockCtx.prisma.episode.findMany.mockResolvedValue(mockEpisodes)

        const episodes = await getAllEpisodes(ctx)

        expect(episodes).toEqual(mockEpisodes)
    })
})