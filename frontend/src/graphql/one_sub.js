import { gql } from '@apollo/client';

export const ONEMESSAGE_SUBSCRIPTION = gql`
  subscription onemessagebox(
      $sender: String!
    ){
    onemessagebox(
        sender: $sender
    ){
      mutation
      data{
        sender{name}
        body
      }
    }
  }
`;