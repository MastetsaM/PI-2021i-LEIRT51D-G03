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

        getRatingWithMin: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const minRating = parseInt(req.params.minRating)
            getGamesByRating(groupId, minRating, null, service, res)
        },

        getRatingWithmax: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(groupId, null, maxRating, service, res)
        },

        getRatingWithBoth: (req, res) => {
            const groupId = parseInt(req.params.groupId)
            const minRating = parseInt(req.params.minRating)
            const maxRating = parseInt(req.params.maxRating)
            getGamesByRating(groupId, minRating, maxRating, service, res)
        }
    }

    app.get('/game/popular', theWebApi.getPopularGames)
    app.get('/game/:game', theWebApi.getGameByName)

    app.post('/group/newGroup', theWebApi.newGroup)
    app.post('/group/edit/:groupId', theWebApi.editGroup)

    app.post('/group/list', theWebApi.getGroupList)
    app.post('/group/info/:groupId', theWebApi.getSpecGroup)

    app.post('/group/addGame/:groupId/game/:game', theWebApi.addGame)
    app.post('/group/removeGame/:groupId/game/:game', theWebApi.removeGame)
    app.post('/group/removeGame/:groupId/min/:minRating', theWebApi.getRatingWithMin)
    app.post('/group/removeGame/:groupId/max/:maxRating', theWebApi.getRatingWithmax)
    app.post('/group/removeGame/:groupId/min/:minRating/max/:maxRating', theWebApi.getRatingWithBoth)


    return theWebApi
}
module.exports = webapi