import { gql } from '@apollo/client';

export const USER_SUBSCRIPTIONS = gql`
    subscription {
        user {
            data{name}
        }
    }

`;