'use strict'


//curl http://localhost:9200/
let storage_host = 'http://localhost:9200'
//storage_host = "https://67d807dc-3f70-4125-b54b-8f185df03838.mock.pstmn.io"

const default_port = 8888
const port = process.argv[2] || default_port


const express = require('express')
const hbs = require('hbs')
const app = express()

const serviceCreator = require('./covida-services.js')
const dbCreator = require('./elasticsearch.js')


let igdb = require('./igdb-data.js')
const db = dbCreator(storage_host)

const service = serviceCreator(db, igdb)

const webAPICreator = require('./covida-web-api.js')
const webAPI = webAPICreator(service)
app.use('/api', webAPI);

const webaUICreator = require('./covida-web-ui.js')
const webUI = webaUICreator(service)
app.use(webUI)
app.set('view engine', 'hbs')
hbs.registerPartials('./views/partial')


app.listen(port, () => console.log(`Listening ${port}`))