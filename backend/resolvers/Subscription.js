import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const Subscription = {
    user: {
        subscribe(parent, args, context, info) {
          return pubsub.asyncIterator('user');
        },
    },
    post: {
        async subscribe(parent, {type, author}, context, info) {
          return pubsub.asyncIterator('post'+`${type}`+`${author}`);
        },
    },
    post6: {
      async subscribe(parent, {type}, context, info) {
        return pubsub.asyncIterator('post6'+`${type}`);
      },
    },
    oneMessage: {
        subscribe(parent, args, context, info) {
          return pubsub.asyncIterator('oneMessage');
        },
    },
    vote: {
      subscribe(parent, args, context, info) {
        return pubsub.asyncIterator('vote');
      },
  },
};

export default Subscription;