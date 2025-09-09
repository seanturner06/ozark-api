import { Context } from '../context'

export async function getAllEpisodes(ctx: Context) {
    return ctx.prisma.episode.findMany()
}

export async function getAllCharacters(ctx: Context) {
    return ctx.prisma.character.findMany()
}