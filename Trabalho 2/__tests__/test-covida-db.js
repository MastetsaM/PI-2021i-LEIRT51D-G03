'use strict'

const frisby = require('frisby');
const base_url = 'http://localhost:8888'

let groupId = ""
describe('db', function () {
    describe('createGroup', function () {
        it('If groups does not have descr or if its not String return error', function () {
            return frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": 1
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": []
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": null
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": undefined
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": {}
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })
        it('If groups does not have name or if its not String return error', function () {
            return frisby
                .post(`${base_url}/group/newGroup`, {
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": 1,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": null,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": null,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": undefined,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": {},
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })
        it('if group has name and description return new group', function () {
            return frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "gg",
                    "desc": "esta é a versão errada"
                })
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'id': frisby.Joi.string().required()
                })
                .then(res => {
                    groupId = res.json.id
                    console.log(groupId)
                })
        })
    })


    describe('editGroup', function () {
        it('if no group criated or group id invalid return error', function () {
            return frisby.put(`${base_url}/group/groupId`, {
                    "name": "gg",
                    "desc": "esta é a versão errada2"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalid Group id."))
        })
        it('If groups does not have descr or if its not String return error', function () {
            return false || frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "faf"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "faf",
                    "desc": 1
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "faf",
                    "desc": []
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "faf",
                    "desc": null
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "faf",
                    "desc": undefined
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "faf",
                    "desc": {}
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })

        it('If groups does not have name or if its not String return error', function () {
            return frisby.put(`${base_url}/group/${groupId}`, {
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": 1,
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": [],
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": null,
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": undefined,
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/group/${groupId}`, {
                    "name": {},
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })

        it('if all good it should return the edited group', function () {
            return frisby.put(`${base_url}/group/${groupId}`, {
                    "name": "new name",
                    "desc": "new description"
                })
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.result).toEqual("updated"))
        })


    })

    /*describe('listOfGroups', function () {
           it('if no groups return null', function () {
               return frisby.put(`${base_url}/group/list`)
                   .expect('status', 200)
                   .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                   .then(res => expect(res.json.result).toEqual("updated"))
           })
           
                   it('should return all the groups', function () {
                       return frisby.put(`${base_url}/group/list`)
                           .expect('status', 200)
                           .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                           .then(res => expect(res.json.result).toEqual("updated"))
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
    })*/


    describe('infoGroup', function () {
        it('if no group criated/or invalid groupId return error', function () {
            return frisby.put(`${base_url}/group/groupId`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })

        it('if groups created and groupId in range return specified group', function () {
            return frisby.get(`${base_url}/group/${groupId}`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    "name": frisby.Joi.string().required(),
                    "description": frisby.Joi.string().required(),
                    "games": frisby.Joi.array().required()
                })
        })
    })


    describe('addGame', function () {
        it('if no group criated/or invalid groupId return error', function () {
            return frisby.put(`${base_url}/group/groupId/games`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause)
                    .toEqual("Game/Group Not found / No Game/Group Info"))
        })

        it('If game to add has no info return error', function () {
            return frisby.put(`${base_url}/group/groupId/Disco%20Elys`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause)
                    .toEqual("Game/Group Not found / No Game/Group Info"))
        })

        it('if Group id is out of  bounds should return error', function () {
            return frisby.put(`${base_url}/group/groupId/Disco%20Elysium`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause)
                    .toEqual("Invalid Group id."))

        })
        it('if valide groupId and game return result', function () {
            return frisby.put(`${base_url}/group/${groupId}/Disco%20Elysium`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.result).toEqual("updated"))
        })
    })


    /*
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
        })*/
})