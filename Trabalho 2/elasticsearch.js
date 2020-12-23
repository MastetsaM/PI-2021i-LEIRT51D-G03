'use strict'


const error = require('./covida-errors.js')
const fetch = require('node-fetch')


function newdb(baseUrl) {

    const groupsBaseUrl = `${baseUrl}/groups`

    const thedb = {

        createGroup: async function (group) {
            if (typeof group.name === "string" && typeof group.desc === "string") {
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: group.name,
                        description: group.desc,
                        games: []
                    })
                }
                try {
                    const response = await fetch(`${groupsBaseUrl}/_doc`, options)

                    const answer = await response.json()

                    return {
                        id: answer._id
                    }
                } catch (erro) {
                    throw error.EXTERNAL_SERVICE_FAILURE
                }
            } else
                throw error.INVALID_ARGUMENTS
        },


        editGroup: async function (groupId, group) {
            if (typeof group.name === "string" && typeof group.desc === "string") {
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "script": {
                            "source": "ctx._source.name = params.name;  ctx._source.description = params.description;",
                            "params": {
                                "name": group.name,
                                "description": group.desc,
                            }
                        }
                    })
                }
                try {
                    const response = await fetch(`${groupsBaseUrl}/_update/${groupId}`, options)
                    const answer = await response.json()
                    if (answer.error || answer.status)
                        throw error.INVALID_GROUP
                    else
                        return {
                            result: answer.result
                        }
                } catch (erro) {
                    throw error.EXTERNAL_SERVICE_FAILURE
                }
            } else {
                throw error.INVALID_ARGUMENTS
            }
        },

        listOfGroups: async function () {
            const object = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    size: 10000
                })
            }
            try {
                const response = await fetch(`${groupsBaseUrl}/_search`, object)
                const answer = await response.json()
                const hits = answer.hits.hits
                const groups = hits.map(hit => {
                    const info = {
                        id: hit._id,
                        source: hit._source

                    }
                    return info
                })

                return {
                    "list_of_groups": groups
                }
            } catch (erro) {
                throw error.EXTERNAL_SERVICE_FAILURE
            }
        },

        infoGroup: async function (groupId) {
            try {
                const response = await fetch(`${groupsBaseUrl}/_doc/${groupId}`)
                const answer = await response.json()
                if (answer.found === false)
                    throw error.INVALID_GROUP
                else {
                    const groups = answer._source
                    return groups
                }
            } catch (erro) {
                throw error.EXTERNAL_SERVICE_FAILURE
            }
        },

        addGame: async function (groupId, gameToAdd) {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "script": {
                        "source": "ctx._source.games.add(params.game)",
                        "params": {
                            "game": gameToAdd
                        }
                    }
                })
            }
            try {
                const response = await fetch(`${groupsBaseUrl}/_update/${groupId}`, options)
                const answer = await response.json()
                if (answer.error || answer.status)
                    throw error.INVALID_GROUP
                else
                    return {
                        result: answer.result
                    }
            } catch (erro) {
                throw error.EXTERNAL_SERVICE_FAILURE
            }
        },

        removeGame: async function (groupId, removeGame) {
            let myGroup
            await this.infoGroup(groupId).then(group => myGroup = group)

            const index = myGroup.games.findIndex(game => game.name === removeGame)
            if (index === -1)
                throw error.NO_INFO
            myGroup.games.splice(index, 1)
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(myGroup)
            }
            try {
                const response = await fetch(`${groupsBaseUrl}/_doc/${groupId}`, options)
                const answer = await response.json()
                if (answer.error || answer.status)
                    throw error.INVALID_GROUP
                else
                    return {
                        result: answer.result
                    }
            } catch (erro) {
                throw error.EXTERNAL_SERVICE_FAILURE
            }

        },

        getGamesByRating: function (groupId, min, max) {
            try {
                return this.infoGroup(groupId)
                    .then(group => {
                        if (group) {
                            const gamesByRating = group.games
                                .filter(game => game.total_rating <= max && game.total_rating >= min)
                                .sort((a, b) => b.total_rating - a.total_rating);
                            return gamesByRating
                        } else
                            throw error.INVALID_GROUP
                    })
            } catch (erro) {
                throw error.EXTERNAL_SERVICE_FAILURE
            }
        },

        removeGroup: async function (groupId) {
            const options = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }
            try {
                const response = await fetch(`${groupsBaseUrl}/_doc/${groupId}`, options)
                const answer = await response.json()
                if (answer.result === "not_found")
                    throw error.INVALID_GROUP
                else
                    return {
                        result: answer.result
                    }
            } catch (erro) {
                throw error.EXTERNAL_SERVICE_FAILURE
            }
        }
    }
    return thedb
}
module.exports = newdb