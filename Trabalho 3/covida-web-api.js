'use strict'

const express = require('express')
const error = require('./covida-errors.js')



function errorHandler(err, res) {
    switch (err) {
        case error.UNAUTHENTICATED:
            res.status(401).json({
                cause: 'This operation requires login.'
            })
            break;
        case error.EXTERNAL_SERVICE_FAILURE:
            res.status(502).json({
                cause: 'External service failure.'
            })
            break;

        case error.INVALID_ARGUMENTS:
            res.status(500).json({
                cause: 'Invalig argument.'
            })
            break;

        case error.INVALID_GROUP:
            res.status(500).json({
                cause: 'Invalid Group id.'
            })
            break;

        case error.NO_INFO:
            res.status(500).json({
                cause: 'Game/Group Not found / No Game/Group Info'
            })
            break;

        case error.INVALID_USER:
            res.status(500).json({
                cause: 'Bad username or password / User nor Created'
            })
            break;
    }
}

function getGamesByRating(req, groupId, minRating, maxRating, service, res) {
    service.getGamesByRating(req.user, groupId, minRating, maxRating)
        .then(gamesRespectRules => res.json(gamesRespectRules))
        .catch(err => errorHandler(err, res))
}

function webapi(service, auth) {

    const theWebApi = {

        getPopularGames: (req, res) => {
            service.getPopularGames()
                .then(games => res.json(games))
                .catch(err => errorHandler(err, res))
        },

        getGameByName: (req, res) => {

            const gameName = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ')

            service.getGameByName(gameName)
                .then(games => res.json(games))
                .catch(err => errorHandler(err, res))
        },

        newGroup: (req, res) => {

            const group = req.body
            if (group) {
                // 2. invoke service
                service.newGroup(req.user, group)
                    .then(newGroup => res.json(newGroup))
                    .catch(err => errorHandler(err, res))
                //promise
            } else {
                res.status(400).json({
                    cause: 'Argument required.'
                })
            }

        },

        editGroup: (req, res) => {

            const group = req.body
            if (group) {
                const groupId = JSON.stringify(req.params.groupId).slice(1, -1)

                service.editGroup(req.user, groupId, group)
                    .then(editedGroup => res.json(editedGroup))
                    .catch(err => errorHandler(err, res))
                //return
            } else {
                res.status(400).json({
                    cause: 'Argument required.'
                })
            }
        },

        getGroupList: (req, res) => {
            service.getAllGroups(req.user)
                .then(db => res.json(db))
                .catch(err => errorHandler(err, res))
        },

        getSpecGroup: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)

            service.getSpecGroup(req.user, groupId)
                .then(db => res.json(db))
                .catch(err => errorHandler(err, res))
        },

        addGame: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ')

            service.getGameByName(game)
                .then(games => {
                    if (games.length === 0)
                        errorHandler(error.NO_INFO, res)
                    else {
                        const gameToAdd = games.find(gameA => gameA.name === game)
                        service.addGame(req.user, groupId, gameToAdd)
                            .then(newGames => setTimeout(() => {
                                res.json(newGames)
                            }, 800))
                            .catch(err => errorHandler(err, res))
                    }
                })
                .catch(err => errorHandler(err, res))
        },

        removeGame: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ')

            service.removeGame(req.user, groupId, game)
                .then(db => res.json(db))
                .catch(err => errorHandler(err, res))
        },

        getByRatingWithMin: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const minRating = parseInt(req.params.minRating)
            getGamesByRating(req, groupId, minRating, null, service, res)
        },

        getByRatingWithmax: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(req, groupId, null, maxRating, service, res)
        },

        getByRatingWithBoth: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const minRating = parseInt(req.params.minRating)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(req, groupId, minRating, maxRating, service, res)
        },

        removeGroup: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            service.removeGroup(req.user, groupId)
                .then(newdb => res.json(newdb))
                .catch(err => errorHandler(err, res))
        },

        login: (req, res) => {
            // 1. check body
            const loginInfo = req.body

            const username = loginInfo.username
            const password = loginInfo.password

            auth.login(req, username, password)
                .then(() => {
                    const answer = {
                        'result': 'Login sucessfull'
                    }
                    res.json(answer)
                })
                .catch(err => {
                    errorHandler(err, res)
                })
        },

        logout: (req, res) => {

            auth.logout(req)
                .then(() => {
                    const answer = {
                        'result': 'Logout'
                    }
                    res.json(answer)
                })
                .catch(err => {
                    errorHandler(err, res)
                })
        },

        signup: (req, res) => {
            if (req.user === undefined) {
                auth.signup(req.body.username, req.body.password)
                    .then(() => {
                        const answer = {
                            'result': 'User Created'
                        }
                        res.json(answer)
                    })
                    .catch(err => errorHandler(err, res))

            } else {
                const answer = {
                    'result': 'you are loged'
                }
                res.json(answer)
            }
        }
    }

    const router = express.Router()
    router.use(express.urlencoded({
        extended: true
    }))
    router.use(express.json())


    router.post('/login', theWebApi.login)
    router.post('/logout', theWebApi.logout)
    router.post('/signup', theWebApi.signup)

    router.get('/game/popular', theWebApi.getPopularGames)
    router.get('/game/:game', theWebApi.getGameByName)

    router.post('/group/newGroup', theWebApi.newGroup)
    router.put('/group/:groupId', theWebApi.editGroup)

    router.get('/group/list', theWebApi.getGroupList)
    router.get('/group/:groupId', theWebApi.getSpecGroup)

    router.put('/group/:groupId/:game', theWebApi.addGame)
    router.delete('/group/:groupId/:game', theWebApi.removeGame)

    router.get('/group/:groupId/min/:minRating', theWebApi.getByRatingWithMin)
    router.get('/group/:groupId/max/:maxRating', theWebApi.getByRatingWithmax)
    router.get('/group/:groupId/:minRating/:maxRating', theWebApi.getByRatingWithBoth)

    router.delete('/group/:groupId', theWebApi.removeGroup)


    return router
}
module.exports = webapi