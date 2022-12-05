import { gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
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

const CHECK_USER = gql`
    mutation checkUser(
        $email: String!
    ){
        checkUser(
            email: $email
        )
    }
`;

export {CHECK_USER, CREATE_USER_MUTATION};