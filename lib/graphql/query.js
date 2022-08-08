import { gql } from '@urql/core';

const getUserRole = gql`
    query ($userID:ID!) {
            getUser(id: $userID) {
                role
        }
    }
`

export { getUserRole }