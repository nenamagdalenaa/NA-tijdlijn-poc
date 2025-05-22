import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createDataloaders } from './dataloaders';

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors({
      origin: 'http://localhost:3000',
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => ({
        loaders: createDataloaders()
      }),
    })
  );

  app.listen(4000, '0.0.0.0', () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();
