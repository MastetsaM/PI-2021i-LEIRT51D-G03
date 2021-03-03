'use strict'

const express = require('express')
const error = require('./covida-errors.js')



function errorHandler(err, res) {
    switch (err) {
        case error.UNAUTHENTICATED:
            return 'This operation requires login.'

        case error.EXTERNAL_SERVICE_FAILURE:
            return 'External service failure.'

        case error.INVALID_ARGUMENTS:
            return 'Invalig argument.'

        case error.INVALID_GROUP:
            return 'Invalid Group id.'

        case error.NO_INFO:
            return 'Game/Group Not found / No Game/Group Info'

        case error.INVALID_USER:
            return 'Bad username or password / User nor Created'
    }
}

function webapi(service, auth) {

    const theWebUI = {

        homeUI: async (req, res) => {
            const answer = {
                user: req.user
            }
            if (req.query.addGame === true)
                answer.addGame = "Game Added"
            if (req.query.addGame === false)
                answer.addGame = req.query.error
            await service.getPopularGames()
                .then(games => answer.games = games)
                .catch(err => answer.error = errorHandler(err, res))
            if (answer.error === undefined) {
                await service.getAllGroups(req.user)
                    .then(groups => {
                        answer.groups = []
                        req.user.groups.forEach(userGroup => {
                            const newGroup = groups.list_of_groups.filter(group => userGroup === group.id)
                            answer.groups.push(newGroup[0])
                        });
                    })
                    //.then(groups => answer.groups = groups.list_of_groups)
                    .catch(() => {})
            }
            res.render('home', answer)
        },

        getGameUI: async (req, res) => {
            const obj = {
                user: req.user
            }
            let gameName = JSON.stringify(req.query.gameName)
            if (gameName) {
                gameName = gameName
                    .slice(1, -1)
                    .replace('%20', ' ')
                await service.getGameByName(gameName)
                    .then(games => {
                        obj.games = games
                        if (games.length == 0)
                            obj.error = "Invalid Game"
                    })
                    .catch(err => obj.error = errorHandler(err, res))
                if (obj.error === undefined) {
                    await service.getAllGroups(req.user)
                        .then(groups => {
                            answer.groups = []
                            req.user.groups.forEach(userGroup => {
                                const newGroup = groups.list_of_groups.filter(group => userGroup === group.id)
                                answer.groups.push(newGroup[0])
                            });
                        })
                        .catch(() => {})
                }
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
            const obj = {
                user: req.user
            }
            if (obj.user) {
                obj.created = req.query.created
                obj.edited = req.query.edited
                obj.edit = req.query.edit
                obj.id = req.query.id
                obj.error = req.query.error
                res.render('group create', obj)
            } else {
                res.redirect('/')
            }
        },

        newGroup: (req, res) => {
            const group = req.body
            if (group.name && group.desc && group.name != '' && group.desc != '') {
                // 2. invoke service
                service.newGroup(req.user, group)
                    .then(groupId => auth.addGroup(req.user, groupId)
                        .then(() => setTimeout(() => {
                            res.redirect('/listGroup')
                        }, 1000))
                        .catch()
                    )
                    .catch(err => {
                        const error = errorHandler(err, res)
                        res.redirect('/group?error=' + error)
                    })
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
            if (group.name && group.desc && group.id && group.name != '' && group.desc != '' && group.id != '') {
                service.editGroup(req.user, group.id, group)
                    .then(() => setTimeout(() => {
                        res.redirect('/listGroup')
                    }, 800))
                    .catch(err => {
                        const error = errorHandler(err, res)
                        res.redirect('/group?edit=true&&error=' + error + '&&name=' + group.name + '&&desc=' + group.desc + '&&id=' + group.id)
                    })
                //return
            } else {
                const obj = {}
                obj.error = 'Invalid Arguments'
                obj.edit = true
                if (group.id != '')
                    obj.id = group.id
                if (group.name != '')
                    obj.name = group.name
                if (group.desc != '')
                    obj.desc = group.desc
                res.render('group', obj)
            }
        },

        getGroupList: (req, res) => {
            if (req.user) {
                service.getAllGroups(req.user)
                    .then(groups => {
                        const answer = {
                            user: req.user
                        }
                        answer.list_of_groups = []
                        req.user.groups.forEach(userGroup => {
                            const newGroup = groups.list_of_groups.filter(group => userGroup === group.id)
                            answer.list_of_groups.push(newGroup[0])
                        });
                        res.render('list groups', answer)
                    })
                    .catch(err => {
                        const groups = {
                            error: errorHandler(err, res)
                        }
                        res.render('list groups', groups)
                    })
            } else {
                res.redirect('/')
            }
        },

        getSpecGroup: (req, res) => {
            if (req.user) {
                const groupId = JSON.stringify(req.query.id).slice(1, -1)

                service.getSpecGroup(req.user, groupId)
                    .then(db => {
                        db.id = groupId
                        db.user = req.user
                        res.render('spec group', db)
                    })
                    .catch(err => {
                        const groups = {
                            error: errorHandler(err, res)
                        }
                        res.render('list groups', groups)
                    })
            } else {
                res.redirect('/')
            }
        },

        addGame: (req, res) => {
            if (req.user) {
                const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
                const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ').replace('`%21`', '/')

                service.getGameByName(game)
                    .then(games => {
                        if (games.length === 0)
                            errorHandler(error.NO_INFO, res)
                        else
                            service.addGame(req.user, groupId, games[0])
                            .then(() => res.redirect("/?update=true"))
                            .catch(err => res.redirect("/?update=false&&error=" + errorHandler(err, res)))
                    })
                    .catch(() => {})
            } else {
                res.redirect('/')
            }
        },

        removeGame: (req, res) => {
            if (req.user) {
                const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
                const game = JSON.stringify(req.params.game).slice(1, -1).replace('%20', ' ').replace('`%21`', '/')

                service.removeGame(req.user, groupId, game)
                    .then(() => setTimeout(() => {
                        res.redirect('/specGroup?id=' + groupId)
                    }, 800))
                    .catch(err => answer.error = errorHandler(err, res))
            } else {
                res.redirect('/')
            }
        },

        getByRatingWithBoth: async (req, res) => {
            if (req.user) {
                const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
                const minRating = parseFloat(req.query.quantityMin)
                const maxRating = parseFloat(req.query.quantityMax)

                const answer = {}
                answer.id = groupId
                await service.getSpecGroup(req.user, groupId)
                    .then(db => {
                        db.id = groupId
                        answer.groupInfo = db
                    })
                    .catch(err => answer.error = errorHandler(err, res))
                if (answer.error === undefined) {
                    await service.getGamesByRating(req.user, groupId, minRating, maxRating)
                        .then(gamesRespectRules => answer.games = gamesRespectRules)
                        .catch(err => answer.error = errorHandler(err, res))
                }
                answer.byRating = true
                res.render('spec group', answer)
            } else {
                res.redirect('/')
            }
        },

        removeGroup: (req, res) => {
            if (req.user) {
                const groupId = JSON.stringify(req.params.groupId).slice(1, -1)
                service.removeGroup(req.user, groupId)
                    .then(() => auth.removeGroup(req.user, groupId)
                        .then(() => setTimeout(() => {
                            res.redirect('/listGroup')
                        }, 1000)))
                    .catch(err => res.render('list groups', {
                        error: errorHandler(err, res)
                    }))
            } else {
                res.redirect('/')
            }
        },

        login: (req, res) => {
            if (req.user === undefined) {
                auth.login(req, req.body.username, req.body.password)
                    .then(() => {
                        res.redirect('/')
                    })
                    .catch(err => {
                        res.statusCode = 401
                        res.redirect('/login?error=' + errorHandler(err, res))
                    })
            } else {
                res.redirect('/')
            }
        },

        logout: (req, res) => {
            if (req.user) {
                auth.logout(req)
                    .then(() => {
                        res.redirect('/')
                    })
                    .catch(err => {
                        res.statusCode = 401
                        res.redirect('/login?error=' + errorHandler(err, res))
                    })
            } else {
                res.redirect('/')
            }
        },

        loginForm: (req, res) => {
            if (req.user === undefined) {
                const answer = {
                    user: req.user
                }
                answer.error = req.query.error
                answer.errorCreate = req.query.errorCreate
                res.render('login', answer)
            } else {
                res.redirect('/')
            }
        },

        signup: (req, res) => {
            if (req.user === undefined) {
                auth.signup(req.body.username, req.body.password)
                    .then(() => setTimeout(() => {
                        res.redirect('/login?errorCreate=Account created')
                    }, 800))
                    .catch(err => res.redirect('/login?errorCreate=' + errorHandler(err, res)))

            } else {
                res.redirect('/')
            }
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
    router.get('/group/:groupId/game/:game', theWebUI.removeGame)
    router.get('/group/:groupId/getByRating', theWebUI.getByRatingWithBoth)

    router.get('/login', theWebUI.loginForm)
    router.post('/login', theWebUI.login)
    router.post('/signup', theWebUI.signup)
    router.get('/logout', theWebUI.logout)


    return router
}
module.exports = webapi