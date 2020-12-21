'use strict'

const fetch = require('node-fetch')
const error = require('./covida-errors.js')

let options = {
    method: 'post',
    body: '',
    headers: {
        'Client-ID': 'giigmv7xp163yqkp05d0nesqjhilmz',
        'Authorization': 'Bearer ztgm03pner1gmjv0kzn07utzmfkpgy'
    }
}

const URL = 'https://api.igdb.com/v4/games'

module.exports = {

    getPopularGames: async function (done) {

        options.body =
            `fields id, name , rating, total_rating;
        sort total_rating desc;
        where total_rating != null;
        limit 50;`

        try {
            const response = await fetch(URL, options)
            if (response.ok) {
                const data = await response.text()
                return JSON.parse(data)
            }
        } catch (err) {
            console.log("quotes", "error", err)
        }
        throw error.EXTERNAL_SERVICE_FAILURE
    },

    getGameByName: async function (name) {
        //name = 'Disco Elysium'
        options.body = `fields id, name, total_rating; sort total_rating desc; where name = "${name}" & total_rating!=null; `

        const response = await fetch(URL, options)
        if (response.ok) {
            const data = await response.text()
            const result = JSON.parse(data)
            return result
        } else
            throw error.EXTERNAL_SERVICE_FAILURE
    }
}