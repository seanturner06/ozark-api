import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from './generated/prisma';
import typeDefs from './schema';
import resolvers from './resolvers';

const prisma = new PrismaClient();

type MyContext = {
    prisma: PrismaClient;
};

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});

(async () => {
    const { url }: { url: string } = await startStandaloneServer(server, {
        context: async (): Promise<MyContext> => ({ prisma }),
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
})();