const setGlobalVars = (req, res, next) => {
    const domainCredentials = {
        // dev
        'arch': {
            environment: process.env.ENV_DEV,
            account_id: process.env.ARCH_ACCOUNT_ID,
            client_id: process.env.ARCH_CLIENT_ID,
            client_secret: process.env.ARCH_CLIENT_SECRET,
            workspace_id: process.env.ARCH_WORKSPACE_ID
        },
        // olukai
        'olukai-store': {
            environment: process.env.ENV_PROD,
            account_id: process.env.OLUKAI_ACCOUNT_ID,
            client_id: process.env.OLUKAI_CLIENT_ID,
            client_secret: process.env.OLUKAI_CLIENT_SECRET,
            workspace_id: process.env.OLUKAI_WORKSPACE_ID,
            klaviyo_private_key: process.env.OLUKAI_KLAVIYO_PRIVATE_KEY,
            shopify_token: process.env.OLUKAI_SHOPIFY_TOKEN,
            shopify_base_url: process.env.OLUKAI_SHOPIFY_BASE_URL,
        },
        'olukai-store-dev': {
            environment: process.env.ENV_DEV,
            account_id: process.env.OLUKAI_ACCOUNT_ID,
            client_id: process.env.OLUKAI_CLIENT_ID,
            client_secret: process.env.OLUKAI_CLIENT_SECRET,
            workspace_id: process.env.OLUKAI_WORKSPACE_ID,
            klaviyo_private_key: process.env.OLUKAI_KLAVIYO_PRIVATE_KEY,
        },
        'olukai-uk': {
            environment: process.env.ENV_PROD,
            account_id: process.env.OLUKAI_ACCOUNT_ID,
            client_id: process.env.OLUKAI_CLIENT_ID,
            client_secret: process.env.OLUKAI_CLIENT_SECRET,
            workspace_id: process.env.OLUKAI_UK_WORKSPACE_ID,
        },
        // roark
        'the-roark-revival': {
            environment: process.env.ENV_PROD,
            account_id: process.env.ROARK_ACCOUNT_ID,
            client_id: process.env.ROARK_CLIENT_ID,
            client_secret: process.env.ROARK_CLIENT_SECRET,
            workspace_id: process.env.ROARK_WORKSPACE_ID,
        },
        'dev-roark': {
            environment: process.env.ENV_DEV,
            account_id: process.env.ROARK_ACCOUNT_ID,
            client_id: process.env.ROARK_CLIENT_ID,
            client_secret: process.env.ROARK_CLIENT_SECRET,
            workspace_id: process.env.ROARK_WORKSPACE_ID,
        },
        // melin
        'melin-brand': {
            environment: process.env.ENV_PROD,
            account_id: process.env.MELIN_ACCOUNT_ID,
            client_id: process.env.MELIN_CLIENT_ID,
            client_secret: process.env.MELIN_CLIENT_SECRET,
            workspace_id: process.env.MELIN_WORKSPACE_ID,
        },
        'dev-melin-brand': {
            environment: process.env.ENV_DEV,
            account_id: process.env.MELIN_ACCOUNT_ID,
            client_id: process.env.MELIN_CLIENT_ID,
            client_secret: process.env.MELIN_CLIENT_SECRET,
            workspace_id: process.env.MELIN_WORKSPACE_ID,
        },
        // kaenon
        'kaenon': {
            environment: process.env.ENV_PROD,
            account_id: process.env.KAENON_ACCOUNT_ID,
            client_id: process.env.KAENON_CLIENT_ID,
            client_secret: process.env.KAENON_CLIENT_SECRET,
            workspace_id: process.env.KAENON_WORKSPACE_ID,
        },
        'kaenon-dev': {
            environment: process.env.ENV_PROD,
            account_id: process.env.KAENON_ACCOUNT_ID,
            client_id: process.env.KAENON_CLIENT_ID,
            client_secret: process.env.KAENON_CLIENT_SECRET,
            workspace_id: process.env.KAENON_WORKSPACE_ID,
        },
    }

    const domain = req.body.domain

    if (!domain || !domainCredentials[domain]) {
        return res.status(400).json({ message: 'credentials.js - Invalid or missing domain' })
    }

    global.credentials = domainCredentials[domain]

    const org_id = process.env.ORG_ID
    global.credentials.org_id = org_id

    const klaviyo_base_url = process.env.KLAVIYO_BASE_URL
    global.credentials.klaviyo_base_url = klaviyo_base_url

    next()
}

export default setGlobalVars
