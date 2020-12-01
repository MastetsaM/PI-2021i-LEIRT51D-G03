'use strict'

const default_port = 8888
const port = process.argv[2] || default_port


const express = require('express')
const app = express()

const serviceCreator = require('./covida-services.js')
const webapiCreator = require('./covida-web-api.js')


let igdb = require('./igdb-data.js')
const db = require('./covida-db.js')
const mocka = false
if (mocka)
    igdb = require('./igdb-data-mocka.js')

const service = serviceCreator(db, igdb)

const webapi = webapiCreator(app, service)

app.listen(port, () => console.log(`Listening ${port}`))