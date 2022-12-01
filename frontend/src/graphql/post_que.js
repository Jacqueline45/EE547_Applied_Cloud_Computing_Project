import { gql } from '@apollo/client';

export const POST_QUERY = gql`
    query PostforAuthor(
        $author: String
    ){
       posts(
           author: $author
        ){
            _id
            time
            body
            author{name}
            comments{
                time
                body
                author{name}
            }
        } 
    }
`;