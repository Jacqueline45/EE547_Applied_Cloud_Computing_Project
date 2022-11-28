import pubsub from './pubsub';

const Subscription = {
    user: {
      resolve: (payload) => {return payload.user},
      subscribe: () => {return pubsub.asyncIterator(['user'])}
    },
    post: {
      resolve: (payload) => {return payload.post},
      subscribe: (parent, {type, author}, context, info) => {
        return  pubsub.asyncIterator(['post'+`${type}`+`${author}`]);
      }              
    },
    post6: {
      resolve: (payload) => {return payload.post6;},
      subscribe: () => {
        return pubsub.asyncIterator('post6');
      },
    },
    oneMessage: {
      resolve: (payload) => {return payload.oneMessage},
      subscribe: () => {return pubsub.asyncIterator(['oneMessage'])}
    },
    vote: {
      resolve: (payload) => {return payload.vote},
      subscribe: () => {return pubsub.asyncIterator(['vote'])}
  },
};

export default Subscription;