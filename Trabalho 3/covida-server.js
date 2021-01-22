'use strict'

let storage_host = 'http://localhost:9200'

const default_port = 8888
const port = process.argv[2] || default_port


const express = require('express')
const hbs = require('hbs')
const app = express()

const serviceCreator = require('./covida-services.js')
const dbCreator = require('./elasticsearch.js')
const webAPICreator = require('./covida-web-api.js')
const webaUICreator = require('./covida-web-ui.js')
const authCreator = require('./covida-auth.js')
const auth = authCreator(app, storage_host)




let igdb = require('./igdb-data.js')
const db = dbCreator(storage_host)

const service = serviceCreator(db, igdb)
const webAPI = webAPICreator(service, auth)
const webUI = webaUICreator(service, auth)
app.use('/api', webAPI)
app.use(webUI)



hbs.registerHelper("replaceBar", function (string, options) {
    return options.fn({
        newString: string.replace('/', `%21`)
    })
})
hbs.registerHelper("emptyArray", function (array, byRating, options) {
    const response = {}
    if (array.length > 0)
        response.isEmptyArray = true
    if (array.length == 0 && byRating == true)
        response.isEmptyArray = true
    return options.fn(response)
})
app.set('view engine', 'hbs')
app.use(express.static('navbar'))
hbs.registerPartials('./views/partial')


app.listen(port, () => console.log(`Listening ${port}`))