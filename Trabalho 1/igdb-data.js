'use strict'

const urllib = require('urllib')
const error = require('./covida-errors.js')

let options = {
    type: 'post',
    headers: {
        'Client-ID': 'giigmv7xp163yqkp05d0nesqjhilmz',
        'Authorization': 'Bearer ztgm03pner1gmjv0kzn07utzmfkpgy'
    },
    content: ''
}

const URL = 'https://api.igdb.com/v4/games'

module.exports = {

    getPopularGames: function (done) {

        options.content =
            `fields name , rating, total_rating;
        sort total_rating desc;
        where total_rating != null;
        limit 50;`

        urllib.request(URL, options, (err, res) => {
            if (err) {
                done(error.EXTERNAL_SERVICE_FAILURE)
            } else {
                const resut = JSON.parse(res)
                done(null, resut)
            }
        })

    },

    getGameByName: function (name, done) {

        options.content = `fields name, total_rating; sort total_rating desc; where name = "${name}" & total_rating!=null; `

        urllib.request(URL, options, (err, data) => {
            if (err) {
                done(error.EXTERNAL_SERVICE_FAILURE)
            } else {
                const resut = JSON.parse(data)
                done(null, resut)
            }
        })

    }
}