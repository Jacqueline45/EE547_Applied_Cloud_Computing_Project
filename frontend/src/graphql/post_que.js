import { gql } from '@apollo/client';

export const POST_QUERY = gql`
    query PostforAuthor(
        $type: Int
        $author: String
    ){
       posts(
           type: $type
           author: $author
        ){
            _id
            type
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