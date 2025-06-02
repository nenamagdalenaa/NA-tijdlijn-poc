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
      origin: 'https://na-tijdlijn-poc.vercel.app',
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => ({
        loaders: createDataloaders()
      }),
    })
  );

  const PORT = parseInt(process.env.PORT || '4000', 10);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server ready at https://na-tijdlijn-poc.onrender.com/graphql`);
  });
}

startServer();
