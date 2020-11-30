'use strict'

const assert = require('assert')

describe('Service', function () {
    const serviceCreator = require('../covida-services.js')

    let igdb = require('../igdb-data.js')
    const db = require('../covida-db.js')
    const mocka = false
    if (mocka)
        igdb = require('./igdb-data-mocka.js')

    const service = serviceCreator(db, igdb)
    describe('getPopularGames', function () {
        it('should return the popular games', function () {
            service.getPopularGames((res) => {
                const result = Array.isArray(res) && res.length == 50
                assert.strictEqual(result, true)
            })
        })
    })
})