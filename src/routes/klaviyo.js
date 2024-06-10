import express from 'express'
const router = express.Router()

import { getKlaviyoProfile, getKlaviyoProfileEvents, getKlaviyoLastEvent } from '../controllers/klaviyo.js'

router.post('/profile/get', async (req, res) => {
    try {
        const profile = await getKlaviyoProfile(req.body)
        res.json(profile)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/profile/events', async (req, res) => {
    try {
        const events = await getKlaviyoProfileEvents(req.body)
        res.json(events)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/profile/event/last', async (req, res) => {
    try {
        const event = await getKlaviyoLastEvent(req.body)
        res.json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})