'use strict'

const default_port = 8888
const port = process.argv[2] || default_port


const express = require('express')
const app = express()

const serviceCreator = require('./service/covida-services-mocha.js')
const webapiCreator = require('./webapi/covida-web-api.js')

const service = serviceCreator()

const webapi = webapiCreator(app, service)

app.listen(port, () => console.log(`Listening ${port}`))