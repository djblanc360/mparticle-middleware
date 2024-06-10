/* global credentials */
import graphqlRequest from '../../utils/api/shopify/request.js'

// Function to get a Shopify customer
const getShopifyCustomer = async (data) => {
    const buildQuery = data => {
        let queryParts = []
        if (data.email) {
            queryParts.push(`email:${data.email}`)
        }
        if (data.phone) {
            queryParts.push(`phone:${data.phone}`)
        }
        return queryParts.join(" OR ")
    }

    const query = `
        query getCustomer($query: String!) {
            customers(first: 10, query: $query) {
                edges {
                    node {
                        id
                        email
                        firstName
                        lastName
                        phone
                        note
                        state
                        emailMarketingConsent {
                            marketingOptInLevel
                            marketingState
                        }
                        smsMarketingConsent {
                            consentCollectedFrom
                            marketingOptInLevel
                            marketingState
                        }
                        tags
                    }
                }
            }
        }`

    const searchQuery = buildQuery(data)
    const variables = { query: searchQuery }

    try {
        const response = await graphqlRequest(credentials.shopify_base_url, 'POST', credentials.shopify_token, query, variables)
        return response
    } catch (error) {
        console.error('Failed to fetch Shopify customer:', error)
        throw error
    }
}

// Function to create a Shopify customer
const createShopifyCustomer = async (customerData) => {
    const mutation = `
        mutation customerCreate($input: CustomerInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                    phone
                    note
                    tags
                    // Add other fields as needed
                }
                userErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        input: {
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone,
            note: customerData.note,
            tags: customerData.tags,
            // Add other fields to match the CustomerInput type as necessary
        }
    };

    try {
        const response = await graphqlRequest(credentials.shopify_base_url, 'POST', credentials.shopify_token, mutation, variables);
        // Handling userErrors to understand the API response
        if (response.customerCreate.userErrors.length > 0) {
            console.error('Errors:', response.customerCreate.userErrors);
            throw new Error('Failed to create customer due to user input errors.');
        }
        return response.customerCreate.customer;
    } catch (error) {
        console.error('Failed to create Shopify customer:', error);
        throw error;
    }
}

// Function to update a Shopify customer
const updateShopifyCustomer = async (customerId, updateData) => {
    const mutation = `
        mutation customerUpdate($id: ID!, $input: CustomerInput!) {
            customerUpdate(id: $id, input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                    phone
                    note
                    tags
                    // Include additional fields as required
                }
                userErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        id: customerId,
        input: {
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            email: updateData.email,
            phone: updateData.phone,
            note: updateData.note,
            tags: updateData.tags,
            // Include other modifiable fields that are part of the CustomerInput type
        }
    };

    try {
        const response = await graphqlRequest(credentials.shopify_base_url, 'POST', credentials.shopify_token, mutation, variables);
        // Handle userErrors to understand the API response
        if (response.customerUpdate.userErrors.length > 0) {
            console.error('Errors:', response.customerUpdate.userErrors);
            throw new Error('Failed to update customer due to user input errors.');
        }
        return response.customerUpdate.customer;
    } catch (error) {
        console.error('Failed to update Shopify customer:', error);
        throw error;
    }
}

// Function to update email marketing consent for a Shopify customer
const updateShopifyCustomerEmailMarketingConsent = async (customerId, marketingConsent) => {
    const mutation = `
        mutation customerEmailMarketingConsentUpdate($id: ID!, $consent: CustomerEmailMarketingConsentInput!) {
            customerEmailMarketingConsentUpdate(id: $id, consent: $consent) {
                customer {
                    id
                    email
                    emailMarketingConsent {
                        state
                        consentUpdatedAt
                        marketingOptInLevel
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        id: customerId,
        consent: {
            state: marketingConsent.state, // Expected values: "subscribed", "pending", "declined"
            marketingOptInLevel: marketingConsent.marketingOptInLevel, // Expected values: "single_opt_in", "confirmed_opt_in", "unknown"
            consentUpdatedAt: marketingConsent.consentUpdatedAt // Optional: ISO 8601 formatted date and time string
        }
    };

    try {
        const response = await graphqlRequest(credentials.shopify_base_url, 'POST', credentials.shopify_token, mutation, variables);
        // Handle userErrors to understand the API response
        if (response.customerEmailMarketingConsentUpdate.userErrors.length > 0) {
            console.error('Errors:', response.customerEmailMarketingConsentUpdate.userErrors);
            throw new Error('Failed to update customer email marketing consent due to input errors.');
        }
        return response.customerEmailMarketingConsentUpdate.customer;
    } catch (error) {
        console.error('Failed to update Shopify customer email marketing consent:', error);
        throw error;
    }
}

// Function to update SMS marketing consent for a Shopify customer
const updateShopifyCustomerSmsMarketingConsent = async (customerId, smsMarketingConsent) => {
    const mutation = `
        mutation customerSmsMarketingConsentUpdate($id: ID!, $consent: CustomerSmsMarketingConsentInput!) {
            customerSmsMarketingConsentUpdate(id: $id, consent: $consent) {
                customer {
                    id
                    email
                    smsMarketingConsent {
                        state
                        consentUpdatedAt
                        marketingOptInLevel
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        id: customerId,
        consent: {
            state: smsMarketingConsent.state, // Expected values: "subscribed", "pending", "declined"
            marketingOptInLevel: smsMarketingConsent.marketingOptInLevel, // Expected values: "single_opt_in", "confirmed_opt_in", "unknown"
            consentUpdatedAt: smsMarketingConsent.consentUpdatedAt // Optional: ISO 8601 formatted date and time string
        }
    };

    try {
        const response = await graphqlRequest(credentials.shopify_base_url, 'POST', credentials.shopify_token, mutation, variables);
        // Handle userErrors to understand the API response
        if (response.customerSmsMarketingConsentUpdate.userErrors.length > 0) {
            console.error('Errors:', response.customerSmsMarketingConsentUpdate.userErrors);
            throw new Error('Failed to update customer SMS marketing consent due to input errors.');
        }
        return response.customerSmsMarketingConsentUpdate.customer;
    } catch (error) {
        console.error('Failed to update Shopify customer SMS marketing consent:', error);
        throw error;
    }
}

export {
    getShopifyCustomer,
    createShopifyCustomer,
    updateShopifyCustomer,
    updateShopifyCustomerEmailMarketingConsent,
    updateShopifyCustomerSmsMarketingConsent  // Export the new function
};
