import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';
import { createContext, Context} from './context';

import { createComplexityRule, fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';

const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    validationRules: [
        createComplexityRule({
            maximumComplexity: 1000,
            estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1 }),
            ],
        })
    ]
});

(async () => {
    const { url }: { url: string } = await startStandaloneServer(server, {
        context: async (): Promise<Context> => createContext(),
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
})();