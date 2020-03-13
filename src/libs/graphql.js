const GRAPHQL_URL = 'https://dev.raptor.rea-asia.com/v1/graphql';

const fetchGraphQL = async ({ query, variables }) => {
  return fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables, }),
    })
    .then(response)
    .catch(() => ({ error: true, }));
}

export default fetchGraphQL;