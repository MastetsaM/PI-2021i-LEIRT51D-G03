'use strict'

function service() {

    const theService = {

        getPopularGames: (resFunc) => {
            resFunc(null, [{
                name: "game1"
            }, {
                name: "game2"
            }, {
                name: "game3"
            }])
        },

        getGameByName: (game, resFunc) => {
            resFunc(null, {
                name: game
            })
        },

        newGroup: (group, resFunc) => {
            resFunc(null, group)
        },

        editGroup: (groupId, group, resFunc) => {
            resFunc(null, {
                id: groupId,
                toEditGroup: group
            })
        },

        getAllGroups: (resFunc) => {
            resFunc([{}, {}, {}])
        },

        getSpecGroup: (groupId, resFunc) => {
            resFunc(null, {
                groupId: groupId
            })
        },

        addGame: (groupId, newGame, resFunc) => {
            resFunc(null, {
                id: groupId,
                game: newGame
            })
        },

        removeGame: (groupId, game, resFunc) => {
            resFunc(null, {
                id: groupId,
                game: game
            })
        },

        getGamesByRating: (group, minRating, maxRating, resFunc) => {

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

            resFunc(null, result)
        }

    }

    return theService
}

module.exports = service