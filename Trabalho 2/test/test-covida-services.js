'use strict'

const expect = require('chai').expect
const error = require('../covida-errors.js')
const serviceCreator = require('../service/covida-services.js')

describe('Service', function () {
    describe('igdb', function () {
        describe('getPopularGames', function () {
            it('should return what it recives', async function () {
                let igdb = {
                    getPopularGames: () => {
                        return new Promise((resolve, reject) => {
                            resolve([])
                        })
                    }
                }
                const service = serviceCreator(null, igdb)

                await service.getPopularGames()
                    .then(res => expect(res).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen1")
                        expect(err).to.be.undefined
                    })
            })
        })



        describe('getGameByName', function () {
            it('should return an empty array if null returned', async function () {
                let igdb = {
                    getGameByName: () => {
                        return Promise.resolve(null)
                    }
                }
                const service = serviceCreator(null, igdb)
                await service.getGameByName("1")
                    .then(res => expect(res).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen2")
                        expect(err).to.be.undefined
                    })
            })




            let igdb = {
                getGameByName: () => {
                    return Promise.resolve([1, 2, 3, 4, 5])
                }
            }
            const service = serviceCreator(null, igdb)
            it('should return an error for names that are not strings', async function () {
                await service.getGameByName(1)
                    .then(games => {
                        console.log("this will never happen3")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGameByName(null)
                    .then(games => {
                        console.log("this will never happen4")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGameByName(undefined)
                    .then(games => {
                        console.log("this will never happen5")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGameByName([1])
                    .then(games => {
                        console.log("this will never happen6")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })


            it('should return games', async function () {
                await service.getGameByName("myName")
                    .then(games => expect(games).to.be.an('array').with.lengthOf(5))
                    .catch(err => {
                        console.log("this will never happen7")
                        expect(err).to.be.undefined
                    })
            })
        })

    })



    describe('db', function () {
        describe('newGroup', function () {

            let db = {
                createGroup: () => {
                    return Promise.resolve([])
                }
            }
            const service = serviceCreator(db, null)

            it('If there is no group there should be an error', async function () {
                await service.newGroup(undefined)
                    .then(games => {
                        console.log("this will never happen8")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.newGroup(null)
                    .then(games => {
                        console.log("this will never happen8")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })


            it('If there is group it returns what it gets ', async function () {
                await service.newGroup({})
                    .then(games => expect(games).to.be.an('array').that.is.empty)
                    .catch(err => {
                        console.log("this will never happen10")
                        expect(err).to.be.undefined
                    })

                await service.newGroup(1)
                    .then(games => expect(games).to.be.an('array').that.is.empty)
                    .catch(err => {
                        console.log("this will never happen11")
                        expect(err).to.be.undefined
                    })

                await service.newGroup("{}")
                    .then(games => expect(games).to.be.an('array').that.is.empty)
                    .catch(err => {
                        console.log("this will never happen12")
                        expect(err).to.be.undefined
                    })

                await service.newGroup([{}, 1, "srasda"])
                    .then(games => expect(games).to.be.an('array').that.is.empty)
                    .catch(err => {
                        console.log("this will never happen13")
                        expect(err).to.be.undefined
                    })
            })
        })



        describe('editGroup', function () {
            let db = {
                editGroup: () => {
                    return Promise.resolve([1, 2, 3, 4, 5])
                }
            }
            const service = serviceCreator(db, null)
            it('if groupid is not a string it will return error', async function () {
                const group = {}
                await service.editGroup(null, group)
                    .then(res => {
                        console.log("this will never happen14")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.editGroup(undefined, group)
                    .then(res => {
                        console.log("this will never happen15")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.editGroup(1, group)
                    .then(res => {
                        console.log("this will never happen16")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

            })



            it('if group is null or undefined it will return error', async function () {
                const groupid = "1"
                await service.editGroup(groupid, null)
                    .then(res => {
                        console.log("this will never happen17")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))


                await service.editGroup(groupid, undefined)
                    .then(res => {
                        console.log("this will never happen18")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

            })



            it('if groupId is string and group isnt null or undefined will work', async function () {
                const groupid = "1"
                const group = {}
                await service.editGroup(groupid, group)
                    .then(err => expect(err).to.be.an("array").with.lengthOf(5))
                    .catch(err => {
                        console.log("this will never happen19")
                        expect(err).to.be.undefined
                    })

            })
        })




        describe('getAllGroups', function () {
            it('if gets null groups, it should return an empty array', async function () {
                let db = {
                    listOfGroups: function () {
                        return Promise.resolve(null)
                    }
                }
                const service = serviceCreator(db, null)

                await service.getAllGroups()
                    .then(groups => expect(groups).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen20")
                        expect(err).to.be.undefined
                    })
            })




            it('if gets groups, it should return the groups', async function () {
                let db = {
                    listOfGroups: function () {
                        return Promise.resolve([{}, {}, {}])
                    }
                }
                const service = serviceCreator(db, null)

                await service.getAllGroups()
                    .then(groups => expect(groups).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen21")
                        expect(err).to.be.undefined
                    })
            })
        })



        describe('getSpecGroup', function () {
            let db = {
                infoGroup: function () {
                    return Promise.resolve([])
                }
            }
            const service = serviceCreator(db, null)
            it('for groupId not string nust return error', async function () {
                await service.getSpecGroup(1, (err, games) => {
                        expect(err).to.be.equal(2)
                        expect(games).to.be.undefined
                    })
                    .then(games => {
                        console.log("this will never happen22")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getSpecGroup(null, (err, games) => {
                        expect(err).to.be.equal(2)
                        expect(games).to.be.undefined
                    })
                    .then(games => {
                        console.log("this will never happen23")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getSpecGroup(undefined, (err, games) => {
                        expect(err).to.be.equal(2)
                        expect(games).to.be.undefined
                    })
                    .then(() => {
                        console.log("this will never happen24")
                        expect(err).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getSpecGroup([1])
                    .then(games => {
                        console.log("this will never happen25")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })



            it('if groupId is string return what it receives', async function () {
                await service.getSpecGroup("1")
                    .then(groups => expect(groups).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen26")
                        expect(err).to.be.undefined
                    })
            })
        })



        describe('addGame', function () {
            let db = {
                addGame: function () {
                    return Promise.resolve([])
                }
            }
            const service = serviceCreator(db, null)
            it('should return an error for groupId that isnt string', async function () {
                const newGame = {}
                await service.addGame(1, newGame)
                    .then(res => {
                        console.log("this will never happen27")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.addGame(null, newGame)
                    .then(res => {
                        console.log("this will never happen28")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.addGame(undefined, newGame)
                    .then(res => {
                        console.log("this will never happen29")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.addGame([1], newGame)
                    .then(res => {
                        console.log("this will never happen30")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })



            it('should return an error if no game is passed', async function () {
                await service.addGame(1, null)
                    .then(res => {
                        console.log("this will never happen31")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.addGame(1, undefined)
                    .then(res => {
                        console.log("this will never happen32")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })



            it('if groupId is number and newGmae is passed return added game', async function () {
                const newGame = {}
                await service.addGame("1", newGame)
                    .then(groups => expect(groups).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen33")
                        expect(err).to.be.undefined
                    })
            })
        })



        describe('removeGame', function () {
            it('If groupId is number and game is string returns remaining games', async function () {

                let db = {
                    removeGame: function () {
                        return Promise.resolve(null)
                    }
                }
                const service = serviceCreator(db, null)
                const game = "game"
                await service.removeGame("1", game)
                    .then(games => expect(games).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen34")
                        expect(err).to.be.undefined
                    })
            })



            let db = {
                removeGame: function () {
                    return Promise.resolve(["ok", {}])
                }
            }
            const service = serviceCreator(db, null)

            it('should return an error if groupId isnt string', async function () {
                const game = "game Name"
                await service.removeGame(1, game)
                    .then(res => {
                        console.log("this will never happen35")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGame(null, game)
                    .then(res => {
                        console.log("this will never happen36")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGame(undefined, game)
                    .then(res => {
                        console.log("this will never happen37")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGame([1], game)
                    .then(res => {
                        console.log("this will never happen38")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })



            it('should return an error if game isnt string', async function () {
                const game = 1
                await service.removeGame(1, game)
                    .then(res => {
                        console.log("this will never happen39")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGame(1, null)
                    .then(res => {
                        console.log("this will never happen40")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGame(1, undefined)
                    .then(res => {
                        console.log("this will never happen41")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGame(1, [game])
                    .then(res => {
                        console.log("this will never happen42")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })



            it('If groupId is number and game is string returns remaining games', async function () {
                const game = "game"
                await service.removeGame("1", game)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(2))
                    .catch(err => {
                        console.log("this will never happen42")
                        expect(err).to.be.undefined
                    })
            })
        })



        describe('removeGroup', function () {

            it('should return an empty array if null recieved', async function () {
                let db = {
                    removeGroup: function () {
                        return Promise.resolve(null)
                    }
                }
                const service = serviceCreator(db, null)
                await service.removeGroup("1")
                    .then(games => expect(games).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen43")
                        expect(err).to.be.undefined
                    })
            })



            it('should return an error if groupId isnt string', async function () {
                let db = {
                    removeGroup: function () {
                        return Promise.resolve(["ok", {}])
                    }
                }
                const service = serviceCreator(db, null)
                await service.removeGroup("1")
                    .then(games => expect(games).to.be.an("array").with.lengthOf(2))
                    .catch(err => {
                        console.log("this will never happen44")
                        expect(err).to.be.undefined
                    })
            })



            it('if groupId is not string return error', async function () {
                let db = {
                    removeGroup: function () {
                        return Promise.resolve(["ok", {}])
                    }
                }
                const service = serviceCreator(db, null)

                const game = 1
                await service.removeGroup(game)
                    .then(() => {
                        console.log("this will never happen45")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGroup(null)
                    .then(() => {
                        console.log("this will never happen46")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGroup(undefined)
                    .then(() => {
                        console.log("this will never happen47")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.removeGroup([game])
                    .then(games => {
                        console.log("this will never happen48")
                        expect(games).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })
        })
























        describe('getGamesByRating', function () {

            it('should return an empty array if null recieved', async function () {
                let db = {
                    getGamesByRating: function () {
                        return Promise.resolve(null)
                    }
                }
                const service = serviceCreator(db, null)
                await service.getGamesByRating("1", 1, 2)
                    .then(games => expect(games).to.be.an("array").that.is.empty)
                    .catch(err => {
                        console.log("this will never happen49")
                        expect(err).to.be.undefined
                    })
            })

            it('should return an array of games', async function () {
                let db = {
                    getGamesByRating: function () {
                        return Promise.resolve([{}, {}, {}])
                    }
                }
                const service = serviceCreator(db, null)
                await service.getGamesByRating("1", 1, 2)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })
            })

            it('should return an error of if max not number or null or undefined', async function () {
                let db = {
                    getGamesByRating: function () {
                        return Promise.resolve([{}, {}, {}])
                    }
                }
                const service = serviceCreator(db, null)
                const groupId = "1"
                const min = 1
                await service.getGamesByRating(groupId, min, "2")
                    .then(res => {
                        console.log("this will never happen51")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGamesByRating(groupId, min, {})
                    .then(res => {
                        console.log("this will never happen52")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGamesByRating(groupId, min, [])
                    .then(res => {
                        console.log("this will never happen53")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })

            it('should return an error of if min not number or null or undefined', async function () {
                let db = {
                    getGamesByRating: function () {
                        return Promise.resolve([{}, {}, {}])
                    }
                }
                const service = serviceCreator(db, null)
                const groupId = "1"
                const max = 80
                await service.getGamesByRating(groupId, "2", max)
                    .then(res => {
                        console.log("this will never happen51")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGamesByRating(groupId, {}, max)
                    .then(res => {
                        console.log("this will never happen52")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))

                await service.getGamesByRating(groupId, [], max)
                    .then(res => {
                        console.log("this will never happen53")
                        expect(res).to.be.undefined
                    })
                    .catch(err => expect(err).to.be.an("number").equal(error.INVALID_ARGUMENTS))
            })


            it("if max or min missing it will be replace by an 0 or 100, respectively", async function () {
                let db = {
                    getGamesByRating: function () {
                        return Promise.resolve([{}, {}, {}])
                    }
                }
                const service = serviceCreator(db, null)
                await service.getGamesByRating("groupId", 5, null)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", 5, undefined)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", null, 5)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", undefined, 5)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", null, null)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", undefined, undefined)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", undefined, null)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })

                await service.getGamesByRating("groupId", null, undefined)
                    .then(games => expect(games).to.be.an("array").with.lengthOf(3))
                    .catch(err => {
                        console.log("this will never happen50")
                        expect(err).to.be.undefined
                    })
            })
        })
    })
})