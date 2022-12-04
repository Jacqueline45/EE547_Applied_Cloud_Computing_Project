import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $name: String!
        $password: String!
        $phone: String!
        $email: String!
    ){
        createUser(
            data:{
                name: $name
                password: $password
                phone: $phone
                email: $email
            }
        )
    }
`;