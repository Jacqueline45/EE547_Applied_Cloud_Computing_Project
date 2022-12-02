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
            sender{name}
            body
        }
  }
`;

const DELETE_ONEMESSAGE_MUTATION = gql`
    mutation deleteOneMessage(
        $_id: ID!
        $sender: String!
    ){
        deleteOneMessage(
            _id: $_id
            sender: $sender
        )
        {
            sender{name}
            body 
        }
    }
`;


export {CREATE_ONEMESSAGE_MUTATION, DELETE_ONEMESSAGE_MUTATION};