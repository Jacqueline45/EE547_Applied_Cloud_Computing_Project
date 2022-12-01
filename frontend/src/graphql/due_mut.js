import { gql } from '@apollo/client';

export const CREATE_DUE_MUTATION = gql`
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