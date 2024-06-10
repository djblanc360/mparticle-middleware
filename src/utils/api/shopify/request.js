import fetch from 'node-fetch'

/**
 * Makes a GraphQL request to Shopify.
 * @param {string} url The GraphQL query
 * @param {Object} variables The variables for the GraphQL query
 * @returns {Promise<Object>} The response data
 */
const graphqlRequest = async (url, type, token, query, variables = {}) => {
    console.log('url:', url)
    console.log('type:', type)
    console.log('token:', token)
    console.log('query:', query)
    console.log('variables:', variables)
    const response = await fetch(`${url}graphql.json`, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
    })
    console.log('response:', response)

    const { data, errors } = await response.json()
    if (errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(errors)}`)
    }
    return data
}

export default graphqlRequest
