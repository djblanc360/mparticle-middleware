import express from 'express'
const router = express.Router()

import {
    getShopifyCustomer
} from '../controllers/shopify/customer.js'

router.post('/customer/get', async (req, res) => {
    try {
        const customer = await getShopifyCustomer(req.body)
        res.json(customer)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
