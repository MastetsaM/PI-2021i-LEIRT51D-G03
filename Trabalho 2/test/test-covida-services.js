'use strict'

const expect = require('chai').expect
const serviceCreator = require('../service/covida-services.js')

describe('Service', function () {
    describe('igdb', function () {
        describe('getPopularGames', function () {
            let igdb = {
                getPopularGames: (done) => {
                    done(null, [])
                }
            }
            const service = serviceCreator(null, igdb)

            it('should return what it recives', function () {
                service.getPopularGames((err, res) => {

                    expect(err).to.be.null
                    expect(res).to.be.an('array').that.is.empty
                })
            })
        })



        describe('getGameByName', function () {

            let igdb = {
                getGameByName: (myName, done) => {
                    done(null, [1, 2, 3, 4, 5])
                }
            }
            const service = serviceCreator(null, igdb)


            it('should return an error for names that are not strings', function () {
                service.getGameByName(1, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.getGameByName(null, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.getGameByName(undefined, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.getGameByName([1], (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })

            it('should return games', function () {
                service.getGameByName("myName", (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').with.lengthOf(5)

                })
            })
        })
    })

    describe('db', function () {
        describe('newGroup', function () {

            let db = {
                createGroup: (group, done) => {
                    done(null, [])
                }
            }
            const service = serviceCreator(db, null)

            it('If there is no group there should be an error', function () {
                service.newGroup(undefined, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.newGroup(null, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })

            it('If there is group it returns what it gets ', function () {
                service.newGroup({}, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').that.is.empty
                })
                service.newGroup(1, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').that.is.empty
                })
                service.newGroup("{}", (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').that.is.empty
                })
                service.newGroup([{}, 1, "srasda"], (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').that.is.empty
                })
            })
        })



        describe('editGroup', function () {
            let db = {
                editGroup: (groupId, group, done) => {
                    done(null, [1, 2, 3, 4, 5])
                }
            }
            const service = serviceCreator(db, null)
            it('if groupid is not a number it will return error', function () {
                const group = {}
                service.editGroup(null, group, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.editGroup(undefined, group, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.editGroup("null", group, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })

            it('if group is null or undefined it will return error', function () {
                const groupid = 1
                service.editGroup(groupid, null, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })

                service.editGroup(groupid, undefined, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })

            it('if groupId is number and group isnt null or undefined will work', function () {
                const groupid = 1
                const group = {}
                service.editGroup(groupid, group, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').with.lengthOf(5)
                })
            })
        })



        describe('getAllGroups', function () {
            it('if gets null groups, it should return an empty array', function () {
                let db = {
                    listOfGroups: function (done) {
                        done(null)
                    }
                }
                const service = serviceCreator(db, null)

                service.getAllGroups((groups) => {
                    expect(groups).to.be.an("array").that.is.empty
                })
            })




            it('if gets groups, it should return the groups', function () {
                let db = {
                    listOfGroups: function (done) {
                        done([{}, {}, {}])
                    }
                }
                const service = serviceCreator(db, null)

                service.getAllGroups((groups) => {
                    expect(groups).to.be.an("array").with.lengthOf(3)
                })
            })
        })



        describe('getSpecGroup', function () {
            let db = {
                infoGroup: function (groupId, done) {
                    done(null, [])
                }
            }
            const service = serviceCreator(db, null)
            it('for groupId not number nust return error', function () {
                service.getSpecGroup("1", (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.getSpecGroup(null, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.getSpecGroup(undefined, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.getSpecGroup([1], (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })
            it('for groupId not number nust return error', function () {
                service.getSpecGroup(1, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an("array").that.is.empty
                })
            })
        })


        describe('addGame', function () {
            let db = {
                addGame: function (groupId, gameToAdd, done) {
                    done(null, [gameToAdd])
                }
            }
            const service = serviceCreator(db, null)
            it('should return an error for groupId that arent numbers', function () {
                const newGame = {}
                service.addGame("1", newGame, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.addGame(null, newGame, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.addGame(undefined, newGame, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.addGame([1], newGame, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })
            it('should return an error if no game is passed', function () {
                service.addGame(1, null, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.addGame(1, undefined, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })
            it('if groupId is number and newGmae is passed return added game', function () {
                const newGame = {}
                service.addGame(1, newGame, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an("array").with.lengthOf(1)
                })
            })
        })

        describe('removeGame', function () {
            let db = {
                removeGame: function (groupId, game, done) {
                    done(null, ["ok", {}])
                }
            }
            const service = serviceCreator(db, null)

            it('should return an error if groupId isnt number', function () {
                const game = "game Name"
                service.removeGame("1", game, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.removeGame(null, game, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.removeGame(undefined, game, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.removeGame([1], game, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })

            it('should return an error if game isnt string', function () {
                const game = 1
                service.removeGame(1, game, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.removeGame(1, null, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.removeGame(1, undefined, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
                service.removeGame(1, [game], (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })
            it('If groupId is number and game is string returns remaining games', function () {
                const game = "game"
                service.removeGame(1, game, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an("array").with.lengthOf(2)
                })
            })
        })
    })
})