'use strict'

const error = require('./covida-errors.js')


function covida_db() {
    let db = null
    let maxIndex = 0
    const thedb = {

        createGroup: function (group) {
            return new Promise((resolve, reject) => {
                if (typeof group.name === "string" && typeof group.desc === "string") {
                    const groups = db || []
                    const newGroup = {
                        id: maxIndex++,
                        name: group.name,
                        description: group.desc || '',
                        games: null
                    }
                    groups.push(newGroup)
                    db = groups
                    resolve(db[maxIndex - 1])
                } else
                    reject(error.INVALID_ARGUMENTS)
            })
        },


        editGroup: function (groupId, group) {
            return new Promise((resolve, reject) => {
                if (db === null)
                    reject(error.NO_INFO)
                else {
                    if (typeof group.name === "string" && typeof group.desc === "string") {

                        if (!db.some(group => group.id === groupId))
                            reject(error.INVALID_GROUP)
                        else {
                            db[groupId].name = group.name || db[groupId].name
                            db[groupId].description = group.desc || db[groupId].description
                            resolve(db[groupId])
                        }
                    } else
                        reject(error.INVALID_ARGUMENTS)
                }
            })
        },

        listOfGroups: function () {
            return new Promise((resolve, reject) => {
                resolve(db)
            })
        },

        infoGroup: function (groupId) {
            return new Promise((resolve, reject) => {
                if (db === null)
                    reject(error.NO_INFO)
                else {
                    if (!db.some(group => group.id === groupId))
                        reject(error.INVALID_GROUP)
                    else
                        resolve(db[groupId])
                }
            })
        },

        addGame: function (groupId, gameToAdd) {
            return new Promise((resolve, reject) => {
                if (db === null)
                    reject(error.NO_INFO)
                else {
                    if (Object.keys(gameToAdd).length === 0)
                        reject(error.NO_INFO)
                    else {
                        if (!db.some(group => group.id === groupId))
                            reject(error.INVALID_GROUP)
                        else {
                            const gamesList = db[groupId].games || []
                            gamesList.push(gameToAdd)
                            db[groupId].games = gamesList
                            resolve(gameToAdd)
                        }
                    }
                }
            })
        },

        removeGame: function (groupId, removeGame) {
            return new Promise((resolve, reject) => {
                if (db === null)
                    reject(error.NO_INFO)
                else {
                    if (!db.some(group => group.id === groupId))
                        reject(error.INVALID_GROUP)
                    else {
                        if (db[groupId].games) {
                            let removed = false
                            for (let i = 0; i < db[groupId].games.length; i++) {
                                if (db[groupId].games[i].name === removeGame) {
                                    db[groupId].games.splice(i, 1)
                                    removed = true
                                    break
                                }
                            }

                            if (removed)
                                resolve(db[groupId].games)
                            else
                                reject(error.INVALID_ARGUMENTS)
                        } else {
                            resolve(null)
                        }
                    }
                }
            })
        },

        removeGroup: function (groupId) {
            return new Promise((resolve, reject) => {
                if (db === null)
                    reject(error.NO_INFO)
                else {
                    const index = db.findIndex(group => group.id === groupId)
                    if (index === -1)
                        reject(error.INVALID_GROUP)
                    else {
                        db.splice(index, 1)
                        resolve(db)
                    }
                }
            })
        }
    }
    return thedb
}
module.exports = covida_db