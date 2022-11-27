import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION6 = gql`
  subscription post6(
      $type: Int
    ){
    post6(
        type: $type
    ){
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