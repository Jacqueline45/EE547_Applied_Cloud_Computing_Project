import { gql } from '@apollo/client';

export const ONEMESSAGE_SUBSCRIPTIONS = gql`
    subscription {
        oneMessage {
            mutation
            sender
            body
        }
    }

`;