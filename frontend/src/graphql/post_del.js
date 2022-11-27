import { gql } from '@apollo/client';

export const DELETE_POST_MUTATION = gql`
    mutation deletePost(
        $type: Int!
        $_id: ID!
        $author: String!
    ){
        deletePost(
            type: $type
            _id: $_id
            author: $author
        )
        {
            type
            time
            body 
            author{name}
        }
    }
`;