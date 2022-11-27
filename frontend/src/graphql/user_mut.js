import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $name: String!
        $password: String!
    ){
        createUser(
            data:{
                name: $name
                password: $password
            }
        )
    }
`;