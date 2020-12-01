'use strict'

const expect = require('chai').expect
const serviceCreator = require('../covida-services.js')

describe('Service', function () {
    describe('igdb', function () {
        describe('getPopularGames', function () {

            it('should return what it recives', function () {
                let igdb = {
                    getPopularGames: (done) => {
                        done(null, [])
                    }
                }
                const service = serviceCreator(null, igdb)

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


            it('should return games', function () {
                service.getGameByName("myName", (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').with.lengthOf(5)
                })
            })

            it('should return an error for names that are not strings', function () {
                service.getGameByName(1, (err, games) => {
                    expect(err).to.be.equal(2)
                    expect(games).to.be.undefined
                })
            })
        })
    })

    describe('db', function () {
        describe('newGroup', function () {

            let db = {
                createGroup: (group, done) => {
                    done(null, [1, 2, 3, 4, 5])
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
                const group = {}
                service.newGroup(group, (err, games) => {
                    expect(err).to.be.null
                    expect(games).to.be.an('array').with.lengthOf(5)
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
                    expect(games).to.be.undefined
                    expect(err).to.be.equal(2)
                })

                service.editGroup(undefined, group, (err, games) => {
                    expect(games).to.be.undefined
                    expect(err).to.be.equal(2)
                })

                service.editGroup("null", group, (err, games) => {
                    expect(games).to.be.undefined
                    expect(err).to.be.equal(2)
                })
            })

            it('if group is null or undefined it will return error', function () {
                const groupid = 1
                service.editGroup(groupid, null, (err, games) => {
                    expect(games).to.be.undefined
                    expect(err).to.be.equal(2)
                })

                service.editGroup(groupid, undefined, (err, games) => {
                    expect(games).to.be.undefined
                    expect(err).to.be.equal(2)
                })
            })
        })


        /*
                describe('getAllGroups', function () {
                    it('should return an error for names that arent strings', function () {
                        service.getGameByName(1, (err, games) => {
                            expect(games).to.be.undefined
                            expect(err).to.be.equal(2)
                        })
                    })
                })


                describe('getSpecGroup', function () {
                    it('should return an error for names that arent strings', function () {
                        service.getGameByName(1, (err, games) => {
                            expect(games).to.be.undefined
                            expect(err).to.be.equal(2)
                        })
                    })
                })


                describe('addGame', function () {
                    it('should return an error for names that arent strings', function () {
                        service.getGameByName(1, (err, games) => {
                            expect(games).to.be.undefined
                            expect(err).to.be.equal(2)
                        })
                    })
                })

                describe('removeGame', function () {
                    it('should return an error for names that arent strings', function () {
                        service.getGameByName(1, (err, games) => {
                            expect(games).to.be.undefined
                            expect(err).to.be.equal(2)
                        })
                    })
                })*/
    })
})