import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';
import { createContext, Context} from './context';

const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
});

(async () => {
    const { url }: { url: string } = await startStandaloneServer(server, {
        context: async (): Promise<Context> => createContext(),
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
})();