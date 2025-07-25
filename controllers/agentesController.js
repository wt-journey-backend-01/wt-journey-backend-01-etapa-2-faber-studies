const agentesRepository = require('../repositories/agentesRepository.js');

function getAgentes(req, res) {
    const agentes = agentesRepository.allAgents();
    res.json(agentes);
}

function getAgenteById(req, res) {
    const id = req.params.id;
    const agentes = agentesRepository.agentsById(id);
    res.json(agentes);
}

module.exports = {
    getAgentes,
    getAgenteById
}