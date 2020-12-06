'use strict'

const error = require('../covida-errors.js')

function service(covida_db, igdb) {

    const theService = {

        getPopularGames: (resFunc) => {
            igdb.getPopularGames((err, games) => resFunc(err, games))
        },

        getGameByName: (game, resFunc) => {
            if (typeof game === "string")
                igdb.getGameByName(game, (err, games) => resFunc(err, games || {
                    info: "No game found"
                }))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        newGroup: (group, resFunc) => {
            if (group)
                covida_db.createGroup(group, (err, newGroup) => resFunc(err, newGroup))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        editGroup: (groupId, group, resFunc) => {
            if (typeof groupId === "number" && group)
                covida_db.editGroup(groupId, group, (err, newGroup) => resFunc(err, newGroup))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        getAllGroups: (resFunc) => {
            covida_db.listOfGroups((groups) => resFunc(groups || []))
        },

        getSpecGroup: (groupId, resFunc) => {
            if (typeof groupId === "number")
                covida_db.infoGroup(groupId, (err, group) => resFunc(err, group))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        addGame: (groupId, newGame, resFunc) => {
            if (typeof groupId === "number" && newGame)
                covida_db.addGame(groupId, newGame, (err, game) => resFunc(err, game))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        removeGame: (groupId, game, resFunc) => {
            if (typeof groupId === "number" && typeof game === "string")
                covida_db.removeGame(groupId, game, (err, games) => resFunc(err, games || []))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        getGamesByRating: (group, minRating, maxRating, resFunc) => {

            let min = minRating || 0
            if (min < 0) min = 0
            if (min > 100) min = 100

            let max = maxRating || 100
            if (max > 100) max = 100
            if (max < 0) max = 0

            if (group && typeof min === "number" && typeof max === "number") {

                if (min > max) {
                    const aux = max
                    max = min
                    min = aux
                }

                if (group.games) {
                    const gamesRespectRules = group.games.filter(game => game.total_rating <= max && game.total_rating >= min).sort((a, b) => b.total_rating - a.total_rating);
                    resFunc(null, gamesRespectRules)
                } else
                    resFunc(null, [])
            } else {
                resFunc(error.INVALID_ARGUMENTS)
            }
        }

    }

    return theService
}

module.exports = service