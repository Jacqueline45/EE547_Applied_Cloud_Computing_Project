const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
const { execute, subscribe } = require('graphql');
const cors = require('cors');
import Message from '../resolvers/Message'
import Due from '../resolvers/Due'
import Post from '../resolvers/Post'
import Comment from '../resolvers/Comment'
import Vote from '../resolvers/Vote'
import Query from '../resolvers/Query';
import Mutation from '../resolvers/Mutation';
import Subscription from '../resolvers/Subscription';

const app = express();
const path = '/graphql';

const mongoose = require('mongoose');
require('dotenv-defaults').config();

async function connectMongo() {
  if (!process.env.MONGO_URL) {
    console.error("Missing Mongo_URL!!!");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "EE547_Project"
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open',  () => {console.log('Mongo database connected!');});
}

(async function () {
  await connectMongo();

  const typeDefs = readFileSync('./schema.graphql').toString('utf-8');
  const schema = makeExecutableSchema({
    resolvers: {
      Message,
      Due,
      Post,
      Comment,
      Vote,
      Query,
      Mutation,
      Subscription,
    },
    typeDefs
  });
  app.use(cors());
  app.use(path, graphqlHTTP(async () => {
    return {
      schema,
      graphiql: true
    }
  }));

  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`GraphQL Server running on http://localhost:5000/graphql`)
    const wsServer = new WebSocketServer({
        server,
        path
    });

    useServer(
      {
          schema,
          execute,
          subscribe,
          onConnect: (ctx) => {
              console.log('Connect');
          },
          onSubscribe: (ctx, msg) => {
              console.log('Subscribe');
          },
          onNext: (ctx, msg, args, result) => {
              console.debug('Next');
          },
          onError: (ctx, msg, errors) => {
              console.error('Error');
          },
          onComplete: (ctx, msg) => {
              console.log('Complete');
          },
      },
      wsServer
    );
    console.log(`WebSockets listening on ws://localhost:5000/graphql`)
  });
})()