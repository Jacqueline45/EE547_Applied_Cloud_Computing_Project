import { gql } from '@apollo/client';

export const VOTE_QUERY = gql`
    query votes(
        $vote: String
    ){
       votes(
           vote: $vote
        ){
            vote
            creator{name}
            count
        } 
    }
`;