import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query users{
       users{
            name
        } 
    }
`;