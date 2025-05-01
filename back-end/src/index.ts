import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.listen(4000, '0.0.0.0', () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();
