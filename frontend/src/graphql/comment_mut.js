import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment(
        $type: Int!
        $postId: ID!
        $postAuthor: String!
        $body: String!
        $author: String!
    ){
        createComment(
            data:{
                type: $type
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