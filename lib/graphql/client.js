import { createClient } from '@urql/core';

const client = createClient({
    url: process.env.DGRAPH_GRAPHQL_ENDPOINT,
});

export { client }