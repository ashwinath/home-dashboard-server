const express = require('express')
const axios = require('axios')

const router = express.Router()

const getVpn = (req, res) => {
    console.log("requested vpn status")
    getIpInfo().then(data => {
        data['vpn_status'] = checkIfVpnExists(data)
        res.json(data)
    })
}

const getIpInfo = () => axios.get('https://ipinfo.io').then(res => res.data)

const checkIfVpnExists = (data) => {
    const notAllowedRegex = /magix|singtel|singnet/i
    return !notAllowedRegex.test(data.org)
}

router.get('/', getVpn)

module.exports = router
