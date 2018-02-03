const express = require('express')
const vpnRouter = require('./routes/vpn')
const widgetsRouter = require('./routes/widgets')

const app = express()
const PORT = 3000;

app.use('/static', express.static('public'))
app.use('/vpn', vpnRouter)
app.use('/widgets', widgetsRouter)

app.listen(PORT, () => console.log(`home-dashboard-server started on port ${PORT}`))
