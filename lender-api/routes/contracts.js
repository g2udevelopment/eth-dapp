var express = require('express');
var router = express.Router();
var Contract = require('../models/contract');

router.get('/to/:address', (req,res,next) => {
    Contract.find({"toAddress": req.params.address},(err, contracts) => {
        if (err) next(err);
        res.status(200).json(contracts);
    });
});

router.get('/from/:address',(req,res,next) => {
    Contract.find({"fromAddress": req.params.address},(err, contracts) => {
        if (err) next(err);
        res.status(200).json(contracts);
    });
});

router.post('/', (req,res, next) => {
    Contract.count({"contractAddress" : req.body.contractAddress}, (err, count) => {
        if (err) next(err);
        if (count > 0) return res.sendStatus(400);
    });

    var contract = new Contract(req.body);
    contract.save((err) => {
        if (err) next(err);
        console.log('Contract saved');
        res.sendStatus(202);
    })
});

module.exports = router;