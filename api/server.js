const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.post('/',  (req, res) => {   
    db('accounts')
        .insert(req.body)
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json(err));
});

server.get('/', (req, res) => {
    db('accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json(err));
});

server.get('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .first().then(account => res.status(200).json(account))
        .catch(err => res.status(500).json(err));
});
   
server.delete('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .del()
        .then(num => res.status(201).json(num))
        .catch(err => res.status(400).json(err));
});

server.put('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => res.status(201).json(count))
        .catch(err => res.status(500).json(err));
});
 
module.exports = server;
