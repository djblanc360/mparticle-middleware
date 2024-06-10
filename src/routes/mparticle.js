import express from 'express'
const router = express.Router()

import { getUserProfile } from '../controllers/user.js'
 
router.post('/profile/get', async (req, res) => {
    try {
        const profile = await getUserProfile(req.body.email)
        res.json(profile)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router