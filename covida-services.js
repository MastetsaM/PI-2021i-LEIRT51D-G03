'use strict'

const error = require('./covida-errors.js')

function service(covida_db, igdb) {

    const theService = {

        getPopularGames: (res) => {
            igdb.getPopularGames((err, games) => res(err, games))
        },

        getGameByName: (game, res) => {
            if (typeof game === "string")
                igdb.getGameByName(game, (err, games) => res(err, games))
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
            if (typeof groupId === "number")
                covida_db.editGroup(groupId, group, (err, newGroup) => resFunc(err, newGroup))
            else
                resFunc(error.INVALID_ARGUMENTS)
        },

        getAllGroups: (resFunc) => {
            covida_db.listOfGroups((groups) => resFunc(groups))
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
                covida_db.removeGame(groupId, game, (err, games) => resFunc(err, games))
            else
                resFunc(error.INVALID_ARGUMENTS)
        }

    }

    return theService
}

module.exports = service