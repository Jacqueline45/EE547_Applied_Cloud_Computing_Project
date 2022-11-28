import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION6 = gql`
  subscription OnPost6{
    post6{
      mutation
      data{
        type
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