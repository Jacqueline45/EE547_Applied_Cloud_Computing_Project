import { gql } from '@apollo/client';

export const DUE_QUERY = gql`
    query DueforAuthor(
        $author: String!
    ){
       dues(
           author: $author
        ){
            _id
            due
            body
            author{name}
        } 
    }
`;