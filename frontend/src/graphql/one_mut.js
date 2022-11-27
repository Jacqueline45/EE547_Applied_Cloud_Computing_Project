import { gql } from '@apollo/client';

const CREATE_ONEMESSAGE_MUTATION = gql`
    mutation createOneMessage(
        $sender: String!
        $body: String!
    ){
        createOneMessage(
            sender: $sender
            body: $body
        ){
            date
            sender{
                name
            }
            body
        }
  }
`;

const UPDATE_ONEMESSAGE_MUTATION = gql`
    mutation updateOneMessage(
        $sender: String!
        $body: String!
    ){
        updateOneMessage(
            sender: $sender
            body: $body
        ){
            date
            sender{
                name
            }
            body
        }
  }

`;


export {CREATE_ONEMESSAGE_MUTATION, UPDATE_ONEMESSAGE_MUTATION};