import { gql } from '@apollo/client';

export const ONEMESSAGEBOX_QUERY = gql`
    query  {
        onemessageboxes {
            # date
            sender{
                name
            }
            body
        }
    }
`;

