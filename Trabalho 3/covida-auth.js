'use strict';

const passport = require('passport');

const express = require('express');
const session = require('express-session');

const FileStore = require('session-file-store')(session)

const error = require('./covida-errors.js')
const fetch = require('node-fetch')



function userToRef(user, done) {
	done(null, user.username);
}

function refToUser(userRef, done) {
	if (activeUsers.length === 0) {
		getUsers()
			.then(users => {
				const user = users.find(elem => elem.username == userRef);
				if (user) {
					activeUsers.push(user)
				} else {
					return Promise.reject('Bad username or password.');
				}
			})
			.catch(() => done('User unknown'))
	} else {
		const user = activeUsers.find(elem => elem.username == userRef);
		if (user) {
			done(null, user);
		} else {
			done('User unknown');
		}
	}
}

async function getUsers() {
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
		const result = await fetch(`${groupsBaseUrl}/_search`, object)
		const answer = await result.json()
		if ((answer.status || answer.error) && (answer.status === 404 || answer.error.type === 'index_not_found_exception'))
			throw error.INVALID_USER
		else {
			const hits = answer.hits.hits
			const users = hits.map(hit => {
				hit._source.id = hit._id
				return hit._source
			})
			return users
		}
	} catch (err) {
		if (err == error.INVALID_USER)
			throw error.INVALID_USER
		throw error.EXTERNAL_SERVICE_FAILURE
	}
}


let activeUsers = []

let groupsBaseUrl = ""

module.exports = (app, baseUrl) => {
	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret: 'isel-leirt',
		store: new FileStore()
	}))

	app.use(passport.initialize())
	app.use(passport.session())

	passport.serializeUser(userToRef)
	passport.deserializeUser(refToUser)

	groupsBaseUrl = `${baseUrl}/users`

	return {
		login: async (req, username, password) => {
			if (username && password) {
				return getUsers()
					.then(users => {
						const user = users.find(elem => elem.username == username);
						if (user && password === user.password) {
							req.login(user, (err, result) => {
								if (err) {
									throw err
								} else {
									activeUsers.push(user)
									return Promise.resolve(result)
								}
							})
						} else {
							throw error.INVALID_USER
						}
					})
			} else {
				throw error.INVALID_ARGUMENTS
			}
		},

		logout: (req) => new Promise((resolve, reject) => {
			req.logout()
			req.session.destroy(() => resolve())
		}),

		signup: async (username, password) => {
			if (typeof username === "string" && typeof password === "string") {
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password,
						groups: []
					})
				}
				try {
					const result = await fetch(`${groupsBaseUrl}/_doc`, options)
					return await result.json()
				} catch (erro) {
					throw error.EXTERNAL_SERVICE_FAILURE
				}
			} else
				throw error.INVALID_ARGUMENTS
		},

		addGroup: async (user, newGroupId) => {
			const myUser = activeUsers.find(elem => elem.username == user.username);
			if (myUser && user.password === myUser.password) {
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"script": {
							"source": "ctx._source.groups.add(params.group)",
							"params": {
								"group": newGroupId
							}
						}
					})
				}
				try {
					const response = await fetch(`${groupsBaseUrl}/_update/${myUser.id}`, options)
					const answer = await response.json()
					if (answer.error || answer.status)
						throw error.INVALID_GROUP
					else {
						myUser.groups.push(newGroupId)
						return Promise.resolve()
					}
				} catch (erro) {
					if (erro === error.INVALID_GROUP)
						throw error.INVALID_GROUP
					throw error.EXTERNAL_SERVICE_FAILURE
				}
			}
		},

		removeGroup: async (myUser, groupId) => {
			let myUsers
			await getUsers(groupId).then(users => myUsers = users)
				.catch(err => {
					throw err
				})

			const user = myUsers.filter(user => user.username === myUser.username)[0]
			const index = user.groups.findIndex(group => groupId === group)
			if (index === -1)
				throw error.NO_INFO
			user.groups.splice(index, 1)
			const currentUser = activeUsers.find(userArray => userArray.id == user.id)
			currentUser.groups.splice(index, 1)
			const options = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			}
			try {
				const response = await fetch(`${groupsBaseUrl}/_doc/${myUser.id}`, options)
				const answer = await response.json()
				if (answer.error || answer.status)
					throw error.INVALID_GROUP
				else
					return {
						result: answer.result
					}
			} catch (erro) {
				if (erro === error.INVALID_GROUP)
					throw error.INVALID_GROUP
				throw error.EXTERNAL_SERVICE_FAILURE
			}
		}
	}
}