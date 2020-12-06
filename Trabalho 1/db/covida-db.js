'use strict'

const error = require('../covida-errors.js')


function covida_db() {
    let db = null
    let maxIndex = 0
    const thedb = {

        createGroup: function (group, done) {
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
                done(null, db[maxIndex - 1])
            } else
                done(error.INVALID_ARGUMENTS)
        },


        editGroup: function (groupId, group, done) {
            if (db === null)
                done(error.NO_INFO)
            else {
                if (typeof group.name === "string" && typeof group.desc === "string") {

                    if (groupId >= maxIndex)
                        done(error.INVALID_GROUP)
                    else {
                        db[groupId].name = group.name || db[groupId].name
                        db[groupId].description = group.desc || db[groupId].description
                        done(null, db[groupId])
                    }
                } else
                    done(error.INVALID_ARGUMENTS)
            }
        },

        listOfGroups: function (done) {
            done(db)
        },

        infoGroup: function (groupId, done) {
            if (db === null)
                done(error.NO_INFO)
            else {
                if (groupId >= maxIndex)
                    done(error.INVALID_GROUP)
                else
                    done(null, db[groupId])
            }
        },

        addGame: function (groupId, gameToAdd, done) {
            if (db === null)
                done(error.NO_INFO)
            else {
                if (Object.keys(gameToAdd).length === 0)
                    done(error.NO_INFO)
                else {
                    if (groupId >= maxIndex)
                        done(error.INVALID_GROUP)
                    else {
                        const gamesList = db[groupId].games || []
                        gamesList.push(gameToAdd)
                        db[groupId].games = gamesList
                        done(null, gameToAdd)
                    }
                }
            }
        },

        removeGame: function (groupId, removeGame, done) {
            if (db === null)
                done(error.NO_INFO)
            else {
                if (groupId >= maxIndex)
                    done(error.INVALID_GROUP)
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
                            done(null, db[groupId].games)
                        else
                            done(error.INVALID_ARGUMENTS)
                    } else {
                        done(null, null)
                    }
                }
            }
        }
    }
    return thedb
}
module.exports = covida_db