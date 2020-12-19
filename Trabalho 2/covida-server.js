'use strict'


//curl http://localhost:9200/
let storage_host = 'http://localhost:9200'
//storage_host = "https://67d807dc-3f70-4125-b54b-8f185df03838.mock.pstmn.io"

const default_port = 8888
const port = process.argv[2] || default_port


const express = require('express')
const app = express()

const serviceCreator = require('./covida-services.js')
const dbCreator = require('./elasticsearch.js')
const webapiCreator = require('./covida-web-api.js')


let igdb = require('./igdb-data.js')
const db = dbCreator(storage_host)

const service = serviceCreator(db, igdb)

const webapi = webapiCreator(app, service)

app.listen(port, () => console.log(`Listening ${port}`))