import { gql } from '@apollo/client';

export const DUE_SUBSCRIPTION = gql`
  subscription due(
      $author: String!
    ){
    due(
        author: $author
    ){
      mutation
      data{
        due
        body
        author{name}
      }
    }
  }
`;