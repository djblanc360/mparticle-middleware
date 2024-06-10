/* global credentials */
import apiRequest from '../utils/api/mparticle/request.js';
import { getBearerToken } from '../utils/api/mparticle/auth.js';

/**
 * Retrieves a user profile from mParticle.
 * @param {string} email The user's email
 * @returns {Promise<Object>} The user profile data
 */
const getUserProfile = async (email) => {
    const token = await getBearerToken();
    if (!token) {
        throw new Error('Authentication failed. Unable to obtain bearer token.');
    }

    const orgId = credentials.org_id;
    const accountId = credentials.account_id;
    const workspaceId = credentials.workspace_id;
    const url = `https://api.mparticle.com/userprofile/v1/resolve/${orgId}/${accountId}/${workspaceId}?fields=device_identities,user_identities,user_attributes,audience_memberships,attribution`;

    const body = {
        environment_type: 'production',
        identity: {
            type: 'email',
            value: email
        }
    };

    try {
        const userProfile = await apiRequest(url, 'POST', token, body);
        // console.log('User profile retrieved:', userProfile);
        return userProfile;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};

export { 
    getUserProfile 
};
