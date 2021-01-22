'use strict'

const frisby = require('frisby');
const setCookieParser = require('set-cookie-parser');

const base_url = 'http://localhost:8888'

let groupId = ""
describe('db', function () {
    describe('create acount', function () {
        it('missing password', function () {
            return frisby
                .post(`${base_url}/api/signup`, {
                    "username": "ok",
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.cause).toEqual("Invalig argument.")
                })
        })

        it('missing username', function () {
            return frisby
                .post(`${base_url}/api/signup`, {
                    "password": "ok"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.cause).toEqual("Invalig argument.")
                })
        })

        it('all good', function () {
            return frisby
                .post(`${base_url}/api/signup`, {
                    "username": "ok",
                    "password": "ok",
                })
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'result': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.result).toEqual("User Created")
                })
        })
    })
    describe('acount Login', function () {
        it('missing password', function () {
            return frisby
                .post(`${base_url}/api/login`, {
                    "username": "ok",
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.cause).toEqual("Invalig argument.")
                })
        })

        it('missing password', function () {
            return frisby
                .post(`${base_url}/api/login`, {
                    "password": "ok"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.cause).toEqual("Invalig argument.")
                })
        })

        it('bad password', function () {
            return frisby
                .post(`${base_url}/api/login`, {
                    "username": "ok",
                    "password": "ok123",
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.cause).toEqual("Bad username or password / User nor Created")
                })
        })

        it('bad password', function () {
            return frisby
                .post(`${base_url}/api/login`, {
                    "username": "ok1",
                    "password": "ok",
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'cause': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.cause).toEqual("Bad username or password / User nor Created")
                })
        })

        it('all good', function () {
            return frisby
                .post(`${base_url}/api/login`, {
                    "username": "ok",
                    "password": "ok",
                })
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'result': frisby.Joi.string().required()
                })
                .then(res => {
                    expect(res.json.result).toEqual("Login sucessfull")
                    const sessionCookie = setCookieParser.parseString(

                        res.headers.get('set-cookie')
                    )
                    console.log(sessionCookie)

                    frisby.globalSetup({
                        request: {
                            headers: {
                                'Cookie': `${sessionCookie.name}=${sessionCookie.value}`
                            }
                        }
                    })
                })
        })
    })
    describe('createGroup', function () {
        it('If groups does not have descr or if its not String return error', function () {
            return frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": "faf"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": "faf",
                    "desc": 1
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": "faf",
                    "desc": []
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": "faf",
                    "desc": null
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": "faf",
                    "desc": undefined
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": "faf",
                    "desc": {}
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })
        it('If groups does not have name or if its not String return error', function () {
            return frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": 1,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": null,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": null,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": undefined,
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby
                .post(`${base_url}/api/group/newGroup`, {
                    "name": {},
                    "desc": "esta é a versão errada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })
        it('if group has name and description return new group ID', function () {
            return frisby
                .post(`${base_url}/api/group/newGroup`, {
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
            return frisby.put(`${base_url}/api/group/groupId`, {
                    "name": "gg",
                    "desc": "esta é a versão errada2"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalid Group id."))
        })
        it('If groups does not have descr or if its not String return error', function () {
            return false || frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "faf"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "faf",
                    "desc": 1
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "faf",
                    "desc": []
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "faf",
                    "desc": null
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "faf",
                    "desc": undefined
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "faf",
                    "desc": {}
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })

        it('If groups does not have name or if its not String return error', function () {
            return frisby.put(`${base_url}/api/group/${groupId}`, {
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": 1,
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": [],
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": null,
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": undefined,
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument.")) &&
                frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": {},
                    "desc": "versao editada"
                })
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })

        it('if all good it should return result updated', function () {
            return frisby.put(`${base_url}/api/group/${groupId}`, {
                    "name": "new name",
                    "desc": "new description"
                })
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.result).toEqual("updated"))
        })


    })

    describe('listOfGroups', function () {
        it('it should always return an array of groups even if empty ', function () {
            return frisby.get(`${base_url}/api/group/list`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', "list_of_groups", frisby.Joi.array().required())
        })
    })


    describe('infoGroup', function () {
        it('if no group criated/or invalid groupId return error', function () {
            return frisby.put(`${base_url}/api/group/groupId`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalig argument."))
        })

        it('if groups created and groupId valid return specified group', function () {
            return frisby.get(`${base_url}/api/group/${groupId}`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', {
                    'id': frisby.Joi.string(),
                    'source': frisby.Joi.number()
                })
                .expect('jsonTypes', '', {
                    "name": frisby.Joi.string(),
                    "description": frisby.Joi.string(),
                    "games": frisby.Joi.array()
                })
        })
    })


    describe('addGame', function () {
        it('if Group id is not valid should return error', function () {
            return frisby.put(`${base_url}/api/group/groupId/Disco%20Elysium`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause)
                    .toEqual("Invalid Group id."))

        })

        it('If game to add has no info return error', function () {
            return frisby.put(`${base_url}/api/group/${groupId}/Disco%20Elys`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause)
                    .toEqual("Game/Group Not found / No Game/Group Info"))
        })

        it('if valide groupId and game return result', function () {
            return frisby.put(`${base_url}/api/group/${groupId}/Disco%20Elysium`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.result).toEqual("updated"))
        })
    })



    describe('removeGame', function () {
        it('if Group id is out of  bounds should return error', function () {
            return frisby.delete(`${base_url}/api/group/groupId/Disco%20Elysium`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalid Group id."))
        })
        it('if trying to remove game that isnt in the group return error', function () {
            return frisby.delete(`${base_url}/api/group/${groupId}/Metroid%20Prime`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Game/Group Not found / No Game/Group Info"))

        })
        it('if all good return "result: updated" ', function () {
            return frisby.delete(`${base_url}/api/group/${groupId}/Disco%20Elysium`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.result).toEqual("updated"))
        })
    })

    describe('getGamesByRating', function () {
        it('if Groupid is not valid  return error', function () {
            return frisby.get(`${base_url}/api/group/groupId/min/60`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalid Group id.")) &&
                frisby.get(`${base_url}/api/group/groupId/max/60`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalid Group id.")) &&
                frisby.get(`${base_url}/api/group/groupId/60/96`)
                .expect('status', 500)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.cause).toEqual("Invalid Group id."))
        })
        it('request must only return games that respest the total rating range', async function () {
            await frisby.put(`${base_url}/api/group/${groupId}/Disco%20Elysium`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => expect(res.json.result).toEqual("updated"))


            return frisby.get(`${base_url}/api/group/${groupId}/min/60`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => res.json.every(game => game.total_rating >= 60)) &&
                frisby.get(`${base_url}/api/group/${groupId}/max/96`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => res.json.every(game => game.total_rating <= 96)) &&
                frisby.get(`${base_url}/api/group/${groupId}/60/96`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .then(res => res.json.every(game => game.total_rating >= 60 && game.total_rating <= 96))
        })
        it('the result of this request must be ordered by total_rating DESC', async function () {
            await frisby.put(`${base_url}/api/group/${groupId}/Metroid%20Prime`)


            return frisby.get(`${base_url}/api/group/${groupId}/60/96`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                .expect('jsonTypes', frisby.Joi.array().required())
                .then(res => {
                    const result = res.json
                    expect(result.length).toEqual(2)
                    const ratingRules = result.every(game => game.total_rating >= 60 && game.total_rating <= 96)
                    let orderRule = true
                    for (let index = 0; index < result.length - 1; index++) {
                        if (result[index].total_rating < result[index + 1].total_rating)
                            orderRule = false
                    }
                    expect(ratingRules).toEqual(true)
                    expect(orderRule).toEqual(true)
                })
        })

        describe('removeGroup', function () {
            it('if Groupid is not valid  return error', function () {
                return frisby.delete(`${base_url}/api/group/groupId`)
                    .expect('status', 500)
                    .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                    .then(res => expect(res.json.cause).toEqual("Invalid Group id."))
            })
            it('if Groupid is valid  return "result: deleted"', function () {
                return frisby.delete(`${base_url}/api/group/${groupId}`)
                    .expect('status', 200)
                    .expect('header', 'Content-Type', 'application/json; charset=utf-8')
                    .then(res => expect(res.json.result).toEqual("deleted"))
            })
        })
    })
})