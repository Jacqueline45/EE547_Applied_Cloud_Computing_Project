import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $type: Int!
        $body: String!
        $author: String!
    ){
        createPost(
            data:{
                type: $type
                body: $body
                author: $author
            }
        )
        {
            type
            time
            body 
            author{name}
        }
    }
`;