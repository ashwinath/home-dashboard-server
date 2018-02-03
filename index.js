const express = require('express')
const vpnRouter = require('./routes/vpn')
const widgetsRouter = require('./routes/widgets')

const app = express()
const PORT = 3001;

app.use('/api/static', express.static('public'))
app.use('/api/vpn', vpnRouter)
app.use('/api/widgets', widgetsRouter)

app.listen(PORT, () => console.log(`home-dashboard-server started on port ${PORT}`))
