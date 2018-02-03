const express = require('express')
const widget_config = require('../config/widgets-config')
const router = express.Router()

router.get('/', (req, res) => {
    res.json(widget_config.widgets)
})

module.exports = router
