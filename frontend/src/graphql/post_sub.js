import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION = gql`
  subscription post(
      $type: Int
      $author: String
    ){
    post(
        type: $type
        author: $author
    ){
    mutation
      data{
        type
        time
        body
        author{name}
      }
    }
  }
`;