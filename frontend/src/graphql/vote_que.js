import { gql } from '@apollo/client';

export const VOTE_QUERY = gql`
    query votes(
        $creator: String
    ){
       votes(
           creator: $creator
        ){
            _id
            vote
            creator{name}
            count
        } 
    }
`;