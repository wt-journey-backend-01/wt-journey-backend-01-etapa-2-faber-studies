const express = require('express');
const casosRepository = require('../repositories/casosRepository');

function getAllCases(req, res){
    const cases = casosRepository.allCases();
    return res.status(200).json(cases);
}

module.exports = {
    getAllCases
}