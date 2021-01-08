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

        homeUI: async (req, res) => {
            const answer = {}
            if (req.query.addGame)
                answer.addGame = "Game Added"
            await service.getPopularGames()
                .then(games => answer.games = games)
                .catch(err => errorHandler(err, res))
            await service.getAllGroups()
                .then(groups => answer.groups = groups.list_of_groups)
                .catch(err => errorHandler(err, res))

            res.render('home', answer)
        },

        getGameUI: async (req, res) => {
            const obj = {}
            if (req.query.gameName) {
                const gameName = JSON.stringify(req.query.gameName)
                    .slice(1, -1)
                    .replace('%20', ' ')
                await service.getGameByName(gameName)
                    .then(games => {
                        obj.games = games
                        if (games.length == 0)
                            obj.err = true
                    })
                    .catch(err => errorHandler('Get Games', err, res))
                await service.getAllGroups()
                    .then(groups => obj.groups = groups.list_of_groups)
                    .catch(err => errorHandler(err, res))
                res.render('Get Games', obj)
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
            obj.edited = req.query.edited
            obj.edit = req.query.edit
            obj.id = req.query.id
            res.render('group create', obj)
        },

        newGroup: (req, res) => {
            const group = req.body
            if (group.name != '' && group.desc != '') {
                // 2. invoke service
                service.newGroup(group)
                    .then(() => setTimeout(() => {
                        res.redirect('/listGroup')
                    }, 800))
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

        editGroup: (req, res) => {
            const group = req.body
            if (group.name != '' && group.desc != '' && group.id != '') {
                service.editGroup(group.id, group)
                    .then(() => setTimeout(() => {
                        res.redirect('/listGroup')
                    }, 800))
                    .catch(err => errorHandler('group create', err, res))
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
                .then(groups => res.render('list groups', groups))
                .catch(err => errorHandler(err, res))
        },

        getSpecGroup: (req, res) => {
            const groupId = JSON.stringify(req.query.id).slice(1, -1)

            service.getSpecGroup(groupId)
                .then(db => {
                    db.id = groupId
                    res.render('spec group', db)
                })
                .catch(err => errorHandler(err, res))
        },

        addGame: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ').replace('`%21`', '/')

            service.getGameByName(game)
                .then(games => {
                    if (games.length === 0)
                        errorHandler(error.NO_INFO, res)
                    else
                        service.addGame(groupId, games[0])
                        .then(newGames => res.redirect("/?addGame=updated"))
                        .catch(err => errorHandler(err, res))
                })
                .catch(err => errorHandler(err, res))
        },

        removeGame: (req, res) => {
            const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
            const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ').replace('`%21`', '/')

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
                .then(() => setTimeout(() => {
                    res.redirect('/listGroup')
                }, 1000))
                .catch(err => errorHandler(err, res))
        }
    }

    const router = express.Router()
    router.use(express.urlencoded({
        extended: true
    }))

    router.get('/', theWebUI.homeUI)
    router.get('/game', theWebUI.getGameUI)
    router.get('/group', theWebUI.newGroupUI)
    router.post('/newGroup', theWebUI.newGroup)
    router.post('/editGroup', theWebUI.editGroup)

    router.get('/listGroup', theWebUI.getGroupList)
    router.post('/:groupId/:game', theWebUI.addGame)
    router.get('/deletGroup/:groupId', theWebUI.removeGroup)

    router.get('/specGroup', theWebUI.getSpecGroup)
    router.post('/group/:groupId/game/:game', theWebUI.removeGame)
    router.get('/group/:groupId/min/:minRating', theWebUI.getByRatingWithMin)
    router.get('/group/:groupId/max/:maxRating', theWebUI.getByRatingWithmax)
    router.get('/group/:groupId/:minRating/:maxRating', theWebUI.getByRatingWithBoth)



    return router
}
module.exports = webapi