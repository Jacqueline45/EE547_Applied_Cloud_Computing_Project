import { gql } from '@apollo/client';

export const VOTE_SUBSCRIPTIONS = gql`
    subscription OnVote{
        vote {
            data{
                vote
                creator{name}
                count
            }
        }
    }

`;