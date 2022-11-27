const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');
import { PubSub } from 'graphql-subscriptions';
import db from './db';
import User from '../resolvers/User'
import Message from '../resolvers/Message'
import Post from '../resolvers/Post'
import Comment from '../resolvers/Comment'
import Vote from '../resolvers/Vote'
import Query from '../resolvers/Query';
import Mutation from '../resolvers/Mutation';
import Subscription from '../resolvers/Subscription';

const app = express();

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
  db.once('open',  () => {
    console.log('Mongo database connected!');
  });
}

(async function () {
  await connectMongo();

  const pubsub = new PubSub();
  const typeDefs = readFileSync('./schema.graphql').toString('utf-8');
  const schema = makeExecutableSchema({
    resolvers: {
      User,
      Message,
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
  app.use('', graphqlHTTP(async (req) => {
    return {
      schema,
      graphiql: true,
      context: {
        db: db,
        pubsub: pubsub
      }
    };
  }));

  app.listen( process.env.PORT || 5000);
  console.log('GraphQL API server running at http://localhost:5000/');
})()