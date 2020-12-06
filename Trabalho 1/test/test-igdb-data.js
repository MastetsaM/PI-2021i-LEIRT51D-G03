'use strict'

const expect = require('chai').expect

const igdb_mocha = require('../igdb_data/igdb-data-mocha.js')


describe('igdb-data', function () {
    describe('getPopularGames', function () {
        it('(igdb_mocha) it should return 50 games', function () {
            igdb_mocha.getPopularGames((err, games) => {
                expect(err).to.be.null
                expect(games).to.be.an("array").with.lengthOf(50)
            })
        })
    })



    describe('getGamesByName', function () {
        it('(igdb_mocha) it should return 1 game inside an array', function () {
            const gameName = "Action Fighter"
            igdb_mocha.getGameByName(gameName, (err, game) => {
                expect(err).to.be.null

                expect(game).to.be.not.null.and.not.an("array")
                expect(game.id).to.be.an("number").and.equal(11885)
                expect(game.name).to.be.an("string").equal(gameName)
                expect(game.total_rating).to.be.an("number").equal(97.1588129374123)
            })
        })
    })
})