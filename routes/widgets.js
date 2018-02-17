const axios = require('axios')
const express = require('express')
const widget_config = require('../config/widgets-config')
const router = express.Router()
const { exec } = require('child_process')

router.get('/', (req, res) => {
    console.log("requested widgets status")
    res.json(widget_config.widgets)
})

// get title, use the title as the key
router.get('/check-online', (req, res) => {
    if (req.query.title) {
        widget = getWidget(req.query.title)

        if (!widget) {
            invalidRequest(res)
        }
        const { title, link } = widget

        getUrlStatus(link).then(response => {
            responseObj = {
                title: title,
                status: true,
            }
            res.json(responseObj)
        }, err => {
            responseObj = {
                title: title,
                status: false,
            }
            res.json(responseObj)
        })

        return
    }
    invalidRequest(res)
})

router.post('/start', (req, res) => {
    console.log(req.body)
    if (req.body.title) {
        widget = getWidget(req.body.title)

        if (!widget) {
            invalidRequest(res)
        }

        const { title, link, bash_command } = widget

        getUrlStatus(link).then(response => {
            // Don't do anything since the process has started
            res.json({ title: title, start: true })
        }, err => {
            if (bash_command) {
                exec(bash_command, (error, stdout, stderr) => {
                    if (error) {
                        res.json({
                            title: title,
                            start: false,
                            err: true,
                        })
                        return
                    }
                    res.json({ title: title, start: true })
                })
                return
            } 
            invalidRequest(res)
        })

        return
    }
    invalidRequest(res)
})

const getUrlStatus = (link) => {
    return axios.get(link)
}

const invalidRequest = (res) => {
    res.status(400)
    res.json({ error_message: "invalid request" })
}

const getWidget = (title) => {
    const widgets = widget_config.widgets
    return widgets.find(obj => obj.title == title)
}

module.exports = router
