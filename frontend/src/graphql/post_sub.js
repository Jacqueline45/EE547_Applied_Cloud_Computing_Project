import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION = gql`
  subscription OnPost{
    post{
      mutation
      data{
        time
        body
        author{name}
        comments{
          post{name}
          time
          body
          author{name}
        }
      }
    }
  }
`;