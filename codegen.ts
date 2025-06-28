import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        {
          'typescript-resolvers': {
            mappers: {
              Episode: '../generated/prisma#Episode as PrismaEpisode',
              Season: '../generated/prisma#Season as PrismaSeason',
              Character: '../generated/prisma#Character as PrismaCharacter',
              Crime: '../generated/prisma#Crime as PrismaCrime',
              Quote: '../generated/prisma#Quote as PrismaQuote',
            }
          }
        }
      ],
    },
  },
}

export default config;