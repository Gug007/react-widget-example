const express = require('express')
const PORT = 5000
const app = express()

app.get('*', (req, res) => {
  res.sendFile(__dirname + `/index.html`)
})

app.listen(PORT, () => console.log(`[app] port: ${PORT}`))