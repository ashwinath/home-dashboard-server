const express = require('express')
const vpnRouter = require('./routes/vpn')

const app = express()
const PORT = 3000;

app.use('/vpn', vpnRouter)

app.listen(PORT, () => console.log(`home-dashboard-server started on port ${PORT}`))
