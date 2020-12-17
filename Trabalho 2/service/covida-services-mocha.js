'use strict'

function service() {

    const theService = {

        getPopularGames: (resFunc) => {
            return Promise.resolve([{
                name: "game1"
            }, {
                name: "game2"
            }, {
                name: "game3"
            }])
        },

        getGameByName: (game, resFunc) => {
            return Promise.resolve({
                name: game
            })
        },

        newGroup: (group, resFunc) => {
            return Promise.resolve(group)
        },

        editGroup: (groupId, group, resFunc) => {
            return Promise.resolve({
                id: groupId,
                toEditGroup: group
            })
        },

        getAllGroups: (resFunc) => {
            return Promise.resolve([{}, {}, {}])
        },

        getSpecGroup: (groupId, resFunc) => {
            return Promise.resolve({
                groupId: groupId
            })
        },

        addGame: (groupId, newGame, resFunc) => {
            return Promise.resolve({
                id: groupId,
                game: newGame
            })
        },

        removeGame: (groupId, game, resFunc) => {
            return Promise.resolve({
                id: groupId,
                game: game
            })
        },

        getGamesByRating: (group, minRating, maxRating) => {

            if (minRating > maxRating) {
                const aux = maxRating
                maxRating = minRating
                minRating = aux
            }

            let min = minRating || 0
            if (min < 0) min = 0
            if (min > 100) min = 100

            let max = maxRating || 100
            if (max > 100) max = 100
            if (max < 0) max = 0

            const result = {
                max: max,
                min: min,
                group: group
            }

            return Promise.resolve(result)
        },

        removeGroup: async () => {
            return Promise.resolve([])
        }

    }

    return theService
}

module.exports = service