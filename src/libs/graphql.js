const GRAPHQL_URL = 'https://stg.raptor.rea-asia.com/v1/graphql';

const fetchGraphQL = async ({ query, variables }) => {
  return fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-market': 'ipropertymy',
    },
    body: JSON.stringify({ query, variables, }),
    })
    .then(response => response?.json())
    .catch(() => ({ error: true, }));
}

export default fetchGraphQL;