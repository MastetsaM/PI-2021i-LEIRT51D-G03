'use strict'

const expect = require('chai').expect
const dbCreator = require('../covida-db.js')



describe('db', function () {
    describe('createGroup', function () {
        it('If groups does not have name or if its not String return error', async function () {
            const db = dbCreator()

            let group = {
                name: null,
                desc: "ola"
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            group = {
                name: 1,
                desc: "ola"
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            group = {
                name: undefined,
                desc: "ola"
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            group = {
                name: [1],
                desc: "ola"
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

        })

        it('If groups does not have description or if its not String return error', async function () {
            const db = dbCreator()

            let group = {
                name: "ola",
                desc: null
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            group = {
                name: "ola",
                desc: undefined
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            group = {
                name: "ola",
                desc: ["ola"]
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            group = {
                name: "ola",
                desc: 1
            }
            await db.createGroup(group)
                .then(newGroup => expect(newGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))
        })
        it('if group has name and description return new group', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group)
                .then(newGroup => {
                    expect(newGroup).to.be.an('object')
                    expect(newGroup.id).to.be.an('number')
                    expect(newGroup.name).to.be.an('string').equal(group.name)
                    expect(newGroup.description).to.be.an('string').equal(group.desc)
                    expect(newGroup.games).to.be.null

                    expect(Object.keys(newGroup).length).equal(4)
                })
                .catch(err => expect(err).to.be.null)
        })
    })

    describe('editGroup', function () {

        it('if no group criated return error', async function () {
            const db = dbCreator()

            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            await db.editGroup(0, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(4))
        })

        it('if no new name string or new description string passed return error', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            const groupId = 0

            let newGroup = {
                name: 1
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


            newGroup = {
                name: ["name"]
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))

            newGroup = {
                name: null
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


            newGroup = {
                name: undefined
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


            newGroup = {
                desc: 1
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


            newGroup = {
                desc: ["name"]
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


            newGroup = {
                desc: null
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


            newGroup = {
                desc: undefined
            }
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))


        })

        it('if Group id is out of  bounds should return error', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            const groupId = 1
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(3))
        })

        it('if all good it should return the edited group', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            const groupId = 0
            await db.editGroup(groupId, newGroup)
                .then(editedGroup => {
                    expect(editedGroup).to.be.an("object")
                    expect(editedGroup.id).to.be.an("number").equal(groupId)
                    expect(editedGroup.name).to.be.an("string").equal(newGroup.name)
                    expect(editedGroup.description).to.be.an("string").equal(newGroup.desc)
                    expect(editedGroup.games).to.be.null
                    expect(Object.keys(editedGroup).length).equal(4)
                })
                .catch(err => expect(err).to.be.null)
        })
    })


    describe('listOfGroups', function () {
        it('if no groups return null', async function () {
            const db = dbCreator()

            await db.listOfGroups()
                .then(db => expect(db).to.be.null)

        })

        it('should return all the groups', async function () {
            const db = dbCreator()

            let newGroup = {
                name: "new name 1",
                desc: "new description 1"
            }
            await db.createGroup(newGroup, () => {})

            let newGroup2 = {
                name: "new name 2",
                desc: "new description 2"
            }
            await db.createGroup(newGroup2, () => {})

            await db.listOfGroups()
                .then(db => {
                    expect(db).to.be.an("array").with.lengthOf(2)

                    expect(db[0].name).to.be.an("string").equal(newGroup.name)
                    expect(db[1].name).to.be.an("string").equal(newGroup2.name)

                    expect(Object.keys(db[0]).length).equal(4)
                    expect(Object.keys(db[1]).length).equal(4)
                })
        })
    })


    describe('infoGroup', function () {
        it('if no group criated return error', async function () {
            const db = dbCreator()

            await db.infoGroup(0)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(4))
        })

        it('if Group id is out of  bounds should return error', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})

            const groupId = 1
            await db.infoGroup(groupId)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(3))
        })

        it('if groups created and groupId in range return specified group', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            const groupId = 0
            await db.infoGroup(groupId)
                .then(editedGroup => {
                    expect(editedGroup).to.be.an("object")
                    expect(editedGroup.name).to.be.an("string").equal(group.name)
                })
                .catch(err => expect(err).to.be.null)
        })
    })



    describe('addGame', function () {
        it('if no group criated return error', async function () {
            const db = dbCreator()

            let newGame = {
                name: "new name",
                desc: "new description"
            }
            await db.addGame(0, newGame)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(4))
        })

        it('If game to add has no info', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            const game = {}
            const groupId = 0
            await db.addGame(groupId, game)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(4))
        })

        it('if Group id is out of  bounds should return error', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})



            const game = {
                name: "game name"
            }
            const groupId = 1
            await db.addGame(groupId, game)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(3))
        })


        it('if Group id is out of  bounds should return error', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            const game = {
                name: "game name"
            }
            const groupId = 0
            await db.addGame(groupId, game)
                .then(newGame => {
                    expect(newGame).to.be.an("object")
                    expect(newGame.name).to.be.an("string").to.be.equal(game.name)
                    expect(Object.keys(newGame).length).equal(1)
                })
                .catch(err => expect(err).to.be.null)
        })
    })



    describe('removeGame', function () {
        it('if no group criated return error', async function () {
            const db = dbCreator()

            let newGroup = {
                name: "new name",
                desc: "new description"
            }
            await db.removeGame(0, newGroup)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(4))
        })

        it('if Group id is out of  bounds should return error', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})


            const game = {
                name: "game name"
            }
            const groupId = 1
            await db.removeGame(groupId, game)
                .then(editedGroup => expect(editedGroup).to.be.undefined)
                .catch(err => expect(err).to.be.equal(3))
        })

        it('if no games added return null', async function () {
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})

            const removeGame = "remove this"
            const groupId = 0
            await db.removeGame(groupId, removeGame)
                .then(games => expect(games).to.be.null)
                .catch(err => expect(err).to.be.null)
        })

        it('if all good return array of games even if empty ', async function () {
            //prepare
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})

            const newGame = {
                name: 'remove this'
            }
            const groupId = 0
            await db.addGame(groupId, newGame, () => {})

            const newGame2 = {
                name: 'remove this 2'
            }
            await db.addGame(groupId, newGame2, () => {})

            //test
            await db.removeGame(groupId, 'remove this')
                .catch(err => expect(err).to.be.null)
                .then(games => {
                    expect(games).to.be.an("array").with.lengthOf(1)
                    expect(games[0].name).to.be.equal('remove this 2')
                })

            await db.removeGame(groupId, 'remove this 2')
                .then(games => expect(games).to.be.an("array").that.is.empty)
                .catch(err => expect(err).to.be.null)
        })

        it('if trying to remove game that isnt in the group return error', async function () {
            //prepare
            const db = dbCreator()

            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})

            const newGame = {
                name: 'remove this'
            }
            const groupId = 0
            await db.addGame(groupId, newGame, () => {})


            //test
            await db.removeGame(groupId, 'remove this 2')
                .then(games => expect(games).to.be.undefined)
                .catch(err => expect(err).to.be.equal(2))
        })
    })


    describe('removeGame', function () {
        it('if no group criated return error', async function () {
            const db = dbCreator()
            let group = {
                name: "name",
                desc: "description"
            }
            await db.createGroup(group, () => {})
            await db.createGroup(group, () => {})


            await db.removeGroup(1)
                .then(games => expect(games).to.be.an("array").with.lengthOf(1))
                .catch(err => expect(err).to.be.undefined)

            await db.removeGroup(1)
                .then(games => expect(games).to.be.undefined)
                .catch(err => expect(err).to.be.equal(3))
        })
    })
})