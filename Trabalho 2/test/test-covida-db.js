'use strict'

const expect = require('chai').expect
const dbCreator = require('../db/covida-db.js')



describe('db', function () {
    describe('createGroup', function () {
        it('If groups does not have name or if its not String return error', function () {
            const db = dbCreator()

            let group = {
                name: null,
                desc: "ola"
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })
            group = {
                name: 1,
                desc: "ola"
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })
            group = {
                name: undefined,
                desc: "ola"
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })
            group = {
                name: [1],
                desc: "ola"
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })
        })
        it('If groups does not have description or if its not String return error', function () {
            const db = dbCreator()

            let group = {
                name: "ola",
                desc: null
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })


            group = {
                name: "ola",
                desc: undefined
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })


            group = {
                name: "ola",
                desc: ["ola"]
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })


            group = {
                name: "ola",
                desc: 1
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.equal(2)
                expect(newGroup).to.be.undefined
            })
        })


        it('if group has name and description return new group', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, (err, newGroup) => {
                expect(err).to.be.null
                expect(newGroup).to.be.an('object')
                expect(newGroup.id).to.be.an('number')
                expect(newGroup.name).to.be.an('string').equal(group.name)
                expect(newGroup.description).to.be.an('string').equal(group.desc)
                expect(newGroup.games).to.be.null

                expect(Object.keys(newGroup).length).equal(4)
            })
        })
    })



    describe('editGroup', function () {

        it('if no group criated return error', function () {
            const db = dbCreator()

            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            db.editGroup(0, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(4)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if no new name string or new description string passed return error', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            const groupId = 0

            let newGroup = {
                name: 1
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                name: ["name"]
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                name: null
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                name: undefined
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                desc: 1
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                desc: ["name"]
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                desc: null
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

            newGroup = {
                desc: undefined
            }
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(2)
                expect(editedGroup).to.be.undefined
            })

        })

        it('if Group id is out of  bounds should return error', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            const groupId = 1
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(3)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if all good it should return the edited group', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            const groupId = 0
            db.editGroup(groupId, newGroup, (err, editedGroup) => {
                expect(err).to.be.null
                expect(editedGroup).to.be.an("object")
                expect(editedGroup.id).to.be.an("number").equal(groupId)
                expect(editedGroup.name).to.be.an("string").equal(newGroup.name)
                expect(editedGroup.description).to.be.an("string").equal(newGroup.desc)
                expect(editedGroup.games).to.be.null
                expect(Object.keys(editedGroup).length).equal(4)
            })
        })
    })


    describe('listOfGroups', function () {
        it('if no groups return null', function () {
            const db = dbCreator()

            db.listOfGroups(db => {
                expect(db).to.be.null
            })
        })

        it('should return all the groups', function () {
            const db = dbCreator()

            let newGroup = {
                name: "new name 1",
                desc: "new description 1"
            }
            db.createGroup(newGroup, (err, editedGroup) => {})

            let newGroup2 = {
                name: "new name 2",
                desc: "new description 2"
            }
            db.createGroup(newGroup2, (err, editedGroup) => {})

            db.listOfGroups(db => {
                expect(db).to.be.an("array").with.lengthOf(2)

                expect(db[0].name).to.be.an("string").equal(newGroup.name)
                expect(db[1].name).to.be.an("string").equal(newGroup2.name)

                expect(Object.keys(db[0]).length).equal(4)
                expect(Object.keys(db[1]).length).equal(4)
            })
        })
    })



    describe('infoGroup', function () {
        it('if no group criated return error', function () {
            const db = dbCreator()

            db.infoGroup(0, (err, editedGroup) => {
                expect(err).to.be.equal(4)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if Group id is out of  bounds should return error', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})

            const groupId = 1
            db.infoGroup(groupId, (err, editedGroup) => {
                expect(err).to.be.equal(3)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if groups created and groupId in range return specified group', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            const groupId = 0
            db.infoGroup(groupId, (err, editedGroup) => {
                expect(err).to.be.null
                expect(editedGroup).to.be.an("object")
                expect(editedGroup.name).to.be.an("string").equal(group.name)
            })
        })
    })



    describe('addGame', function () {
        it('if no group criated return error', function () {
            const db = dbCreator()

            let newGame = {
                name: "new name",
                desc: "new description"
            }
            db.addGame(0, newGame, (err, editedGroup) => {
                expect(err).to.be.equal(4)
                expect(editedGroup).to.be.undefined
            })
        })

        it('If game to add has no info', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            const game = {}
            const groupId = 0
            db.addGame(groupId, game, (err, editedGroup) => {
                expect(err).to.be.equal(4)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if Group id is out of  bounds should return error', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})



            const game = {
                name: "game name"
            }
            const groupId = 1
            db.addGame(groupId, game, (err, editedGroup) => {
                expect(err).to.be.equal(3)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if Group id is out of  bounds should return error', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            const game = {
                name: "game name"
            }
            const groupId = 0
            db.addGame(groupId, game, (err, newGame) => {
                expect(err).to.be.null
                expect(newGame).to.be.an("object")
                expect(newGame.name).to.be.an("string").to.be.equal(game.name)
                expect(Object.keys(newGame).length).equal(1)
            })
        })
    })



    describe('removeGame', function () {
        it('if no group criated return error', function () {
            const db = dbCreator()

            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            db.removeGame(0, newGroup, (err, editedGroup) => {
                expect(err).to.be.equal(4)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if Group id is out of  bounds should return error', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})


            const game = {
                name: "game name"
            }
            const groupId = 1
            db.removeGame(groupId, game, (err, editedGroup) => {
                expect(err).to.be.equal(3)
                expect(editedGroup).to.be.undefined
            })
        })

        it('if no games added return null', function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})

            const removeGame = "remove this"
            const groupId = 0
            db.removeGame(groupId, removeGame, (err, games) => {
                expect(err).to.be.null
                expect(games).to.be.null
            })
        })

        it('if all good return array of games even if empty ', function () {
            //prepare
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})

            const newGame = {
                name: 'remove this'
            }
            const groupId = 0
            db.addGame(groupId, newGame, () => {})

            const newGame2 = {
                name: 'remove this 2'
            }
            db.addGame(groupId, newGame2, () => {})

            //test
            db.removeGame(groupId, 'remove this', (err, games) => {
                expect(err).to.be.null
                expect(games).to.be.an("array").with.lengthOf(1)
                expect(games[0].name).to.be.equal('remove this 2')
            })
            db.removeGame(groupId, 'remove this 2', (err, games) => {
                expect(err).to.be.null
                expect(games).to.be.an("array").that.is.empty
            })
        })

        it('if trying to remove game that isnt in the group return error', function () {
            //prepare
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            db.createGroup(group, () => {})

            const newGame = {
                name: 'remove this'
            }
            const groupId = 0
            db.addGame(groupId, newGame, () => {})


            //test
            db.removeGame(groupId, 'remove this 2', (err, games) => {
                expect(err).to.be.equal(2)
                expect(games).to.be.undefined
            })
        })
    })
})