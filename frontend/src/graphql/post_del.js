import { gql } from '@apollo/client';

export const DELETE_POST_MUTATION = gql`
    mutation deletePost(
        $_id: ID!
        $author: String!
    ){
        deletePost(
            _id: $_id
            author: $author
        )
        {
            time
            body 
            author{name}
        }
    }
`;