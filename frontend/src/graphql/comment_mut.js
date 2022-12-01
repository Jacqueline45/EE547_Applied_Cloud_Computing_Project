import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment(
        $postId: ID!
        $postAuthor: String!
        $body: String!
        $author: String!
    ){
        createComment(
            data:{
                postId: $postId
                postAuthor: $postAuthor
                body: $body
                author: $author
            }
        )
        {
            post{name}
            time
            body
            author{name}
        }
    }
`;