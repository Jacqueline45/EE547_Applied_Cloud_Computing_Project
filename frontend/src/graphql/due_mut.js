import { gql } from '@apollo/client';

const CREATE_DUE_MUTATION = gql`
    mutation createDue(
        $due: String!
        $body: String!
        $author: String!
    ){
        createDue(
            data:{
                due: $due
                body: $body
                author: $author
            }
        )
        {
            due
            body 
            author{name}
        }
    }
`;

const DELETE_DUE_MUTATION = gql`
    mutation deleteDue(
        $_id: ID!
        $author: String!
    ){
        deleteDue(
            _id: $_id
            author: $author
        )
        {
            due
            body 
            author{name}
        }
    }
`;

export {CREATE_DUE_MUTATION, DELETE_DUE_MUTATION}