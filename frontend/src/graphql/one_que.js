import { gql } from '@apollo/client';

export const ONEMESSAGEBOX_QUERY = gql`
    query  MsgforSender(
        $sender: String!
    ){
        onemessageboxes(
            sender: $sender
        ) {
            _id
            sender{ name }
            body
        }
    }
`;
