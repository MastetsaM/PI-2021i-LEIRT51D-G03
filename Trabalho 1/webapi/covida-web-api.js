'use strict'

const error = require('../covida-errors.js')



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
    service.getSpecGroup(groupId, (err, group) => {
        if (err) {
            errorHandler(err, res)
        } else {
            service.getGamesByRating(group, minRating, maxRating, (err, gamesRespectRules) => {
                if (err) {
                    errorHandler(err, res)
                } else {
                    res.json(gamesRespectRules)
                }
            })
        }
    })
}

function webapi(app, service) {

    const theWebApi = {

        getPopularGames: (req, res) => {
            service.getPopularGames((err, games) => {
                if (err) {
                    errorHandler(err, res)
                } else {
                    res.json(games)
                }
            })
        },

        getGameByName: (req, res) => {

            const gameName = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ')

            service.getGameByName(gameName, (err, games) => {
                if (err) {
                    errorHandler(err, res)
                } else {

                    res.json(games)
                }
            })
        },

        newGroup: (req, res) => {

            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
            }).on('end', () => {
                try {
                    const group = JSON.parse(body)

                    // 2. invoke service
                    service.newGroup(group, (err, newGroup) => {
                        if (err) {
                            errorHandler(err, res)
                        } else {
                            res.json(newGroup)
                        }
                    })
                } catch (ex) {
                    res.status(400).json({
                        cause: 'Argument required.'
                    })
                }
            })
        },

        editGroup: (req, res) => {

            // 1. extract params
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
            }).on('end', () => {
                try {
                    const group = JSON.parse(body)
                    const groupId = parseInt(req.params.groupId)

                    service.editGroup(groupId, group, (err, editedGroup) => {
                        if (err) {
                            errorHandler(err, res)
                        } else {
                            res.json(editedGroup)
                        }
                    })
                    //return
                } catch (ex) {
                    res.status(400).json({
                        cause: 'Argument required.'
                    })
                }
            })
        },

        getGroupList: (req, res) => {
            service.getAllGroups((db) => res.json(db))
        },

        getSpecGroup: (req, res) => {
            const groupId = parseInt(req.params.groupId)

            service.getSpecGroup(groupId, (err, db) => {
                if (err) {
                    errorHandler(err, res)
                } else {
                    res.json(db)
                }
            })
        },

        addGame: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const game = req.params.game

            service.getGameByName(game, (err, games) => {
                if (err) {
                    errorHandler(err, res)
                } else {
                    service.addGame(groupId, games, (err, games) => {
                        if (err) {
                            errorHandler(err, res)
                        } else {
                            res.json(games)
                        }
                    })
                }
            })
        },

        removeGame: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ')

            service.removeGame(groupId, game, (err, db) => {
                if (err) {
                    errorHandler(err, res)
                } else {
                    res.json(db)
                }
            })
        },

        getByRatingWithMin: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const minRating = parseInt(req.params.minRating)
            getGamesByRating(groupId, minRating, null, service, res)
        },

        getByRating: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            getGamesByRating(groupId, null, null, service, res)
        },

        getByRatingWithmax: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(groupId, null, maxRating, service, res)
        },

        getByRatingWithBoth: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const minRating = parseInt(req.params.minRating)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(groupId, minRating, maxRating, service, res)
        }
    }

    app.get('/game/popular', theWebApi.getPopularGames)
    app.get('/game/:game', theWebApi.getGameByName)

    app.post('/group/newGroup', theWebApi.newGroup)
    app.put('/group/edit/:groupId', theWebApi.editGroup)

    app.get('/group/list', theWebApi.getGroupList)
    app.get('/group/info/:groupId', theWebApi.getSpecGroup)

    app.put('/group/addGame/:groupId/game/:game', theWebApi.addGame)
    app.delete('/group/removeGame/:groupId/game/:game', theWebApi.removeGame)

    app.get('/group/getGameByRating/:groupId', theWebApi.getByRating)
    app.get('/group/getGameByRating/:groupId/min/:minRating', theWebApi.getByRatingWithMin)
    app.get('/group/getGameByRating/:groupId/max/:maxRating', theWebApi.getByRatingWithmax)
    app.get('/group/getGameByRating/:groupId/min/:minRating/max/:maxRating', theWebApi.getByRatingWithBoth)


    return theWebApi
}
module.exports = webapi