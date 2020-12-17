'use strict'

const express = require('express')
const error = require('./covida-errors.js')



function errorHandler(err, res) {
    switch (err) {
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
    }
}

function getGamesByRating(groupId, minRating, maxRating, service, res) {
    service.getGamesByRating(groupId, minRating, maxRating)
        .then(gamesRespectRules => res.json(gamesRespectRules))
        .catch(err => errorHandler(err, res))
}

function webapi(app, service) {

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
                service.newGroup(group)
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

                service.editGroup(groupId, group)
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
            service.getAllGroups()
                .then(db => res.json(db))
        },

        getSpecGroup: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)

            service.getSpecGroup(groupId)
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
                    else
                        service.addGame(groupId, games[0])
                        .then(newGames => res.json(newGames))
                        .catch(err => errorHandler(err, res))
                })
                .catch(err => errorHandler(err, res))
        },

        removeGame: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ')

            service.removeGame(groupId, game)
                .then(db => res.json(db))
                .catch(err => errorHandler(err, res))
        },

        getByRatingWithMin: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const minRating = parseInt(req.params.minRating)
            getGamesByRating(groupId, minRating, null, service, res)
        },

        getByRatingWithmax: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(groupId, null, maxRating, service, res)
        },

        getByRatingWithBoth: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const minRating = parseInt(req.params.minRating)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(groupId, minRating, maxRating, service, res)
        },

        removeGroup: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            service.removeGroup(groupId)
                .then(newdb => res.json(newdb))
                .catch(err => errorHandler(err, res))
        }
    }

    app.use(express.json())

    app.get('/game/popular', theWebApi.getPopularGames)
    app.get('/game/:game', theWebApi.getGameByName)

    app.post('/group/newGroup', theWebApi.newGroup)
    app.put('/group/:groupId', theWebApi.editGroup)

    app.get('/group/list', theWebApi.getGroupList)
    app.get('/group/:groupId', theWebApi.getSpecGroup)

    app.put('/group/:groupId/:game', theWebApi.addGame)
    app.delete('/group/:groupId/:game', theWebApi.removeGame)

    app.get('/group/:groupId/:minRating', theWebApi.getByRatingWithMin)
    app.get('/group/:groupId/:maxRating', theWebApi.getByRatingWithmax)
    app.get('/group/:groupId/:minRating/:maxRating', theWebApi.getByRatingWithBoth)

    app.delete('/group/:groupId', theWebApi.removeGroup)


    return theWebApi
}
module.exports = webapi