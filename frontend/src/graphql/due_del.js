import { gql } from '@apollo/client';

export const DELETE_DUE_MUTATION = gql`
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