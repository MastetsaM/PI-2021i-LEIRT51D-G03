'use strict'

const express = require('express')
const error = require('./covida-errors.js')



function errorHandler(hbs, err, res) {
    switch (err) {
        case error.EXTERNAL_SERVICE_FAILURE:
            res.status(502)
            res.render(hbs, {
                cause: 'External service failure.',
                err: true
            })
            break;

        case error.INVALID_ARGUMENTS:
            res.status(500)
            res.render(hbs, {
                cause: 'Invalig argument.',
                err: true
            })
            break;

        case error.INVALID_GROUP:
            res.status(500)
            res.render(hbs, {
                cause: 'Invalid Group id.',
                err: true
            })
            break;

        case error.NO_INFO:
            res.status(500)
            res.render(hbs, {
                cause: 'Game/Group Not found / No Game/Group Info',
                err: true
            })
            break;
    }
}

function getGamesByRating(groupId, minRating, maxRating, service, res) {
    service.getGamesByRating(groupId, minRating, maxRating)
        .then(gamesRespectRules => res.json(gamesRespectRules))
        .catch(err => errorHandler(err, res))
}

function webapi(service) {

    const theWebUI = {

        homeUI: (req, res) => {
            service.getPopularGames()
                .then(games =>
                    res.render('home', {
                        games: games
                    })
                )
                .catch(err => errorHandler(err, res))
        },

        getGameUI: (req, res) => {
            const obj = {}
            if (req.query.gameName) {
                const gameName = JSON.stringify(req.query.gameName)
                    .slice(1, -1)
                    .replace('%20', ' ')
                service.getGameByName(gameName)
                    .then(games => {
                        obj.games = games
                        if (games.length == 0)
                            obj.err = true
                        res.render('Get Games', obj)
                    })
                    .catch(err => errorHandler(err, res))
            } else {
                if (req.query.gameName === '') {
                    obj.err = true
                    obj.cause = 'No Input'
                }
                res.render('Get Games', obj)
            }
        },

        newGroupUI: (req, res) => {
            const obj = {};
            obj.created = req.query.created
            obj.id = req.query.id
            res.render('group create', obj)
        },

        newGroup: (req, res) => {
            const group = req.body
            if (group.name != '' && group.desc != '') {
                // 2. invoke service
                service.newGroup(group)
                    .then(id => res.redirect(303, `/newGroup?created=true&id=${id}`))
                    .catch(err => errorHandler('group create', err, res))
                //promise
            } else {
                const obj = {
                    cause: 'Invalid Arguments',
                    err: true
                }
                if (group.name != '')
                    obj.name = group.name
                if (group.desc != '')
                    obj.desc = group.desc
                res.render('group create', obj)
            }
        },

        editGroupUI: (req, res) => {
            if (req.query.post)
                res.redirect(303, `/group?id=${req.query.id}&name=${req.query.name}&desc=${req.query.desc}`)
            else {
                const obj = {
                    new: false
                }
                obj.edited = req.query.edited
                res.render('group edit', obj)
            }
        },

        editGroup: (req, res) => {
            const group = req.body
            if (group.name != '' && group.desc != '' && group.id != '') {
                const groupId = group.id

                service.editGroup(groupId, group)
                    .then(() => res.redirect(303, '/editGroup?edited=true'))
                    .catch(err => errorHandler('group edit', err, res))
                //return
            } else {
                const obj = {
                    cause: 'Invalid Arguments',
                    err: true
                }
                if (group.id != '')
                    obj.id = group.id
                if (group.name != '')
                    obj.name = group.name
                if (group.desc != '')
                    obj.desc = group.desc
                res.render('group edit', obj)
            }
        },

        getGroupList: (req, res) => {
            service.getAllGroups()
                .then(groups =>
                    res.render('list groups', groups)
                )
                .catch(err => errorHandler(err, res))
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

    const router = express.Router()
    router.use(express.urlencoded({
        extended: true
    }))

    router.get('/', theWebUI.homeUI)
    router.get('/game', theWebUI.getGameUI)

    router.get('/newGroup', theWebUI.newGroupUI)
    router.post('/group', theWebUI.newGroup)
    router.get('/editGroup', theWebUI.editGroupUI)
    router.put('/group', theWebUI.editGroup)

    router.get('/list', theWebUI.getGroupList)
    router.get('/group', theWebUI.getSpecGroup)

    router.put('/group/:groupId/:game', theWebUI.addGame)
    router.delete('/group/:groupId/:game', theWebUI.removeGame)

    router.get('/group/:groupId/min/:minRating', theWebUI.getByRatingWithMin)
    router.get('/group/:groupId/max/:maxRating', theWebUI.getByRatingWithmax)
    router.get('/group/:groupId/:minRating/:maxRating', theWebUI.getByRatingWithBoth)

    router.delete('/group/:groupId', theWebUI.removeGroup)


    return router
}
module.exports = webapi