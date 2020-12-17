'use strict'

const error = require('../covida-errors.js')

function service(covida_db, igdb) {

    const theService = {

        getPopularGames: () => {
            return igdb.getPopularGames()
        },

        getGameByName: async (game) => {
            if (typeof game === "string") {
                return await igdb.getGameByName(game)
                    .then(games => games || [])
            } else
                throw error.INVALID_ARGUMENTS
        },

        newGroup: async (group) => {
            if (group)
                return await covida_db.createGroup(group)
            else
                throw error.INVALID_ARGUMENTS
        },

        editGroup: async (groupId, group) => {
            if (typeof groupId === "string" && group)
                return await covida_db.editGroup(groupId, group)
            else
                throw error.INVALID_ARGUMENTS
        },

        getAllGroups: async () => {
            const groups = await covida_db.listOfGroups()
            return groups || []
        },

        getSpecGroup: async (groupId) => {
            if (typeof groupId === "string")
                return covida_db.infoGroup(groupId)
            else
                throw error.INVALID_ARGUMENTS
        },

        addGame: async (groupId, newGame) => {
            if (typeof groupId === "string" && newGame)
                return covida_db.addGame(groupId, newGame)
            else
                throw error.INVALID_ARGUMENTS
        },

        removeGame: async (groupId, game) => {
            if (typeof groupId === "string" && typeof game === "string") {
                return await covida_db.removeGame(groupId, game).then(games => games || [])
            } else
                throw error.INVALID_ARGUMENTS
        },

        removeGroup: async (groupId) => {
            if (typeof groupId === "string") {
                return await covida_db.removeGroup(groupId).then(games => games || [])
            } else
                throw error.INVALID_ARGUMENTS
        },

        getGamesByRating: async (groupId, minRating, maxRating) => {
            let min = minRating || 0
            if (min < 0) min = 0
            if (min > 100) min = 100

            let max = maxRating || 100
            if (max > 100) max = 100
            if (max < 0) max = 0

            if (min > max) {
                const aux = max
                max = min
                min = aux
            }

            if (typeof groupId === "string" && typeof min === "number" && typeof max === "number") {

                return await covida_db.getGamesByRating(groupId, min, max).then(games => games || [])
            } else
                throw error.INVALID_ARGUMENTS
        }

    }

    return theService
}

module.exports = service