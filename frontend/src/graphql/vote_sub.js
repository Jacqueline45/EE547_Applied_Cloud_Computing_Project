import { gql } from '@apollo/client';

export const VOTE_SUBSCRIPTIONS = gql`
    subscription {
        vote {
            data{
                vote
                creator
                count
            }
        }
    }

`;