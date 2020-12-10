'use strict'

const default_port = 8888
const port = process.argv[2] || default_port


const express = require('express')
const app = express()

const serviceCreator = require('./service/covida-services.js')
const dbCreator = require('./db/covida-db.js')
const webapiCreator = require('./webapi/covida-web-api.js')


let igdb = require('./igdb_data/igdb-data.js')
const db = dbCreator()

const service = serviceCreator(db, igdb)

const webapi = webapiCreator(app, service)

app.listen(port, () => console.log(`Listening ${port}`))