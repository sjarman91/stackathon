'use strict'

const api = require('express').Router()


api.get('/heartbeat', (req, res) => {
  res.send({ok: true})
})

api.post('/location', (req, res) => {
  console.log(req.body)
  res.send('location received')
})

api.use((err, req, res, next) => {
  res.status(500).send(err)
})

api.use((req, res) => res.status(404).end())


module.exports = api
