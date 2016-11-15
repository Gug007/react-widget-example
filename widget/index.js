const express = require('express')
const PORT = 5001
const app = express()

const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const compiler = webpack(config)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))


app.get('/widget.js', (req, res) => {
  res.sendFile(__dirname + `/api.js`)
})

app.get('/*', (req, res) => {
  res.sendFile(__dirname + `/index.html`)
})

app.listen(PORT, () => console.log(`[widget] port: ${PORT}`))


