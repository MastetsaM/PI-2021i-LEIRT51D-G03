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

hbs.registerHelper("tableGroupButton", function (games, groups) {
    let response = '<tr>'
    for (let index = 0; index < games.length; index++) {
        response += `<td>${games[index].name}</td>`
        response += `<td>${games[index].summary}</td>`
        response += `<td>${games[index].total_rating}</td>`
        response += `<td width="10%"><div class="home">
                <button class="dropbtn2">Add Game To Group</button>
                <div class="dropbtn-content">`
        for (let index2 = 0; index2 < groups.length; index2++) {
            const gameName = games[index].name.replace('/', `%21`)
            response += `
            <form action="/${groups[index2].id}/${gameName}" method="POST">
            <input type="submit" value="${groups[index2].source.name}"></imput>
            </form>`
        }
        response += `<a href="/newGroup">New Group</a></li></div></div></td></tr>`
    }
    return response
})
app.set('view engine', 'hbs')
app.use(express.static('navbar'))
hbs.registerPartials('./views/partial')


app.listen(port, () => console.log(`Listening ${port}`))