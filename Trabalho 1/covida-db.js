'use strict'

const error = require('./covida-errors.js')

let db = null
let maxIndex = 0

module.exports = {

    createGroup: function (group, done) {
        if (group.name && group.desc) {
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
            if (group.name || group.desc) {

                const groups = db.filter(group => group.id === groupId)
                if (groups.length == 0)
                    done(error.INVALID_GROUP)

                db[groupId].name = group.name || db[groupId].name
                db[groupId].description = group.desc || db[groupId].description
                done(null, db[groupId])

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
            const groups = db.filter(group => group.id === groupId)
            if (groups.length == 0)
                done(error.INVALID_GROUP)
            else
                done(null, groups)
        }
    },

    addGame: function (groupId, gameToAdd, done) {
        if (gameToAdd === {})
            done(error.NO_INFO)

        if (db === null)
            done(error.NO_INFO)
        else {

            const groups = db.filter(group => group.id === groupId)
            if (groups.length == 0)
                done(error.INVALID_GROUP)

            const gamesList = db[groupId].games || []
            gamesList.push(gameToAdd)
            db[groupId].games = gamesList
            done(null, gameToAdd)
        }
    },

    removeGame: function (groupId, removeGame, done) {
        if (db === null)
            done(error.NO_INFO)
        else {
            const groups = db.filter(group => group.id === groupId)
            if (groups.length == 0) {
                done(error.INVALID_GROUP)

            } else {
                for (let i = 0; i < db[groupId].games.length; i++) {
                    if (db[groupId].games[i].name === removeGame) {
                        db[groupId].games.splice(i, 1)
                        done(null, db[groupId].games)
                    }
                }
                done(error.INVALID_ARGUMENTS)
            }
        }
    }
}