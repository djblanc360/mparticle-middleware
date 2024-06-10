/* global credentials */
import fetch from 'node-fetch';

let cachedToken = null;
let tokenTimestamp = 0;
const tokenExpiryDuration = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

async function getBearerToken() {
    const currentTime = new Date().getTime();
    if (cachedToken && (currentTime - tokenTimestamp < tokenExpiryDuration)) {
        return cachedToken; // Return cached token if it is still valid
    }

    const tokenEndpoint = 'https://sso.auth.mparticle.com/oauth/token';
    const clientId = credentials.client_id;
    const clientSecret = credentials.client_secret;
    const data = {
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://api.mparticle.com',
        grant_type: 'client_credentials'
    };

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData.access_token) {
            cachedToken = responseData.access_token; // Cache the new token
            tokenTimestamp = new Date().getTime(); // Update the timestamp
            return cachedToken;
        } else {
            throw new Error('Failed to retrieve access token');
        }
    } catch (error) {
        console.error('Error retrieving bearer token:', error);
        return null;
    }
}

export { getBearerToken };
