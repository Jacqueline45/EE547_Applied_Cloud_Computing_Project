import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
        $author: String!
    ){
        createPost(
            data:{
                body: $body
                author: $author
            }
        )
        {
            time
            body 
            author{name}
        }
    }
`;