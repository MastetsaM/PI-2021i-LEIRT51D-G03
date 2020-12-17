'use strict'


const frisby = require('frisby');
const base_url = 'http://localhost:8888'


describe('igdb-data', function () {

    describe('getPopularGames', function () {
        it('(igdb_mocha) it should return 50 games', function () {
            return frisby
                .get(`${base_url}/game/popular`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', frisby.Joi.array())
                .then(function (res) {
                    expect(res.json.length).toEqual(50)
                })
        })
    })



    describe('getGamesByName', function () {
        it('(igdb_mocha) it should return 1 game inside an array', function () {
            return frisby
                .get(`${base_url}/game/Action%20Fighter`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', frisby.Joi.array())
                .then(function (res) {
                    expect(res.json.length).toEqual(1)
                    expect(res.json[0].name).toEqual('Action Fighter')
                })
        })
    })
})