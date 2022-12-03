import { gql } from '@apollo/client';

const UPDATE_VOTE_MUTATION = gql`
    mutation updateVote(
        $vote: String!
        $creator: String!
    ){
        updateVote(
            data:{
                vote: $vote
                creator: $creator
            }
        )
        {
            vote 
            creator{name}
            count
        }
    }
`;

const CREATE_VOTE_MUTATION = gql`
    mutation createVote(
        $vote: String!
        $creator: String!
    ){
        createVote(
            data:{
                vote: $vote
                creator: $creator
            }
        )
        {
            vote 
            creator{name}
            count
        }
    }
`;

const DELETE_VOTE_MUTATION = gql`
    mutation deleteVote(
        $_id: ID!
        $creator: String!
    ){
        deleteVote(
            _id: $_id
            creator: $creator
        )
        {
            vote 
            creator{name}
            count
        }
    }
`;

export {UPDATE_VOTE_MUTATION, CREATE_VOTE_MUTATION, DELETE_VOTE_MUTATION};