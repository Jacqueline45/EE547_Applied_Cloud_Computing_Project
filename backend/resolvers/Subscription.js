import pubsub from './pubsub';

const Subscription = {
    user: {
      resolve: (payload) => {return payload.user},
      subscribe: () => {return pubsub.asyncIterator('user')}
    },
    due: {
      resolve: (payload) => {return payload.due},
      subscribe: (parent, {author}, context, info) => {return  pubsub.asyncIterator('due'+`${author}`);}              
    },
    post: {
      resolve: (payload) => {return payload.post;},
      subscribe: () => { return pubsub.asyncIterator('post'); }
    },
    oneMessage: {
      resolve: (payload) => {return payload.oneMessage},
      subscribe: () => {return pubsub.asyncIterator('oneMessage')}
    },
    vote: {
      resolve: (payload) => {return payload.vote},
      subscribe: () => {return pubsub.asyncIterator('vote')}
  },
};
export default Subscription;