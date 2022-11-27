import { gql } from '@apollo/client';

export const SIGNIN_QUERY = gql`
    query signIn(
        $name: String!
        $password: String!
    ){
        signIn(
           name: $name
           password: $password
        )
    }
`;