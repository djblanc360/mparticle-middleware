import fetch from 'node-fetch';

/**
 * Makes an API request to mParticle.
 * @param {string} url The mParticle API URL
 * @param {string} type The request type
 * @param {string} token The bearer token for authentication
 * @param {Object} body The request body
 * @returns {Promise<Object>} The response data
 */
const apiRequest = async (url, type, token, body) => {
    const response = await fetch(url, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        throw new Error(`mParticle API Error: ${responseData.error || JSON.stringify(responseData)}`);
    }
};

export default apiRequest;
