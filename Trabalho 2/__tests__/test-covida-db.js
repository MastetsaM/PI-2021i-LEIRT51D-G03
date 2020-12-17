'use strict'

const frisby = require('frisby');
const base_url = 'http://localhost:8888'

describe('db', function () {
    describe('createGroup', function () {
        it('If groups does not have descr or if its not String return error', function () {
            return frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": 1
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": []
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": null
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": undefined
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": "faf",
                    "desc": {}
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                })
        })
        it('If groups does not have name or if its not String return error', function () {
            return frisby
                .post(`${base_url}/group/newGroup`, {
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": 1,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": null,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": null,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": undefined,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                }) &&
                frisby
                .post(`${base_url}/group/newGroup`, {
                    "name": {},
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalig argument."
                })
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
        })
    })


    describe('editGroup', function () {

        it('if no group criated return error', function () {
            frisby.delete("http://localhost:9200/groups/")
            frisby.put("http://localhost:9200/groups/")
            return frisby
                .put(`${base_url}/group/groupId`, {
                    "name": "gg",
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': "Invalid Group id."
                })
        })


        it('If groups does not have descr or if its not String return error', function () {

            let groupId = ""
            return frisby.post(`${base_url}/group/newGroup`, {
                "name": "gg",
                "desc": "esta é a versão errada"
            }).then(res => {
                groupId = res.json.id
            })
            /*return frisby
            
                            .post(`${base_url}/group/groupId`, {
                                "name": "faf"
                            })
                            .expect('status', 500)
                            .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                            .expect('jsonTypes', {
                                'cause': "Invalig argument."
                            }) &&
                            frisby
                            .post(`${base_url}/group/groupId`, {
                                "name": "faf",
                                "desc": 1
                            })
                            .expect('status', 500)
                            .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                            .expect('jsonTypes', {
                                'cause': "Invalig argument."
                            }) &&
                            frisby
                            .post(`${base_url}/group/groupId`, {
                                "name": "faf",
                                "desc": []
                            })
                            .expect('status', 500)
                            .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                            .expect('jsonTypes', {
                                'cause': "Invalig argument."
                            }) &&
                            frisby
                            .post(`${base_url}/group/groupId`, {
                                "name": "faf",
                                "desc": null
                            })
                            .expect('status', 500)
                            .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                            .expect('jsonTypes', {
                                'cause': "Invalig argument."
                            }) &&
                            frisby
                            .post(`${base_url}/group/groupId`, {
                                "name": "faf",
                                "desc": undefined
                            })
                            .expect('status', 500)
                            .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                            .expect('jsonTypes', {
                                'cause': "Invalig argument."
                            }) &&
                            frisby
                            .post(`${base_url}/group/newGroup`, {
                                "name": "faf",
                                "desc": {}
                            })
                            .expect('status', 500)
                            .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                            .expect('jsonTypes', {
                                'cause': "Invalig argument."
                            })*/
        })
        /*
                it('If groups does not have name or if its not String return error', function () {
                    return frisby
                        .post(`${base_url}/group/newGroup`, {
                            "desc": "esta é a versão errada"
                        })
                        .expect('status', 500)
                        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                        .expect('jsonTypes', {
                            'cause': "Invalig argument."
                        }) &&
                        frisby
                        .post(`${base_url}/group/newGroup`, {
                            "name": 1,
                            "desc": "esta é a versão errada"
                        })
                        .expect('status', 500)
                        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                        .expect('jsonTypes', {
                            'cause': "Invalig argument."
                        }) &&
                        frisby
                        .post(`${base_url}/group/newGroup`, {
                            "name": null,
                            "desc": "esta é a versão errada"
                        })
                        .expect('status', 500)
                        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                        .expect('jsonTypes', {
                            'cause': "Invalig argument."
                        }) &&
                        frisby
                        .post(`${base_url}/group/newGroup`, {
                            "name": null,
                            "desc": "esta é a versão errada"
                        })
                        .expect('status', 500)
                        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                        .expect('jsonTypes', {
                            'cause': "Invalig argument."
                        }) &&
                        frisby
                        .post(`${base_url}/group/newGroup`, {
                            "name": undefined,
                            "desc": "esta é a versão errada"
                        })
                        .expect('status', 500)
                        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                        .expect('jsonTypes', {
                            'cause': "Invalig argument."
                        }) &&
                        frisby
                        .post(`${base_url}/group/newGroup`, {
                            "name": {},
                            "desc": "esta é a versão errada"
                        })
                        .expect('status', 500)
                        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                        .expect('jsonTypes', {
                            'cause': "Invalig argument."
                        })
                })
                /*
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
                */
    })
    /*
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
    */

    /*
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
    */

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