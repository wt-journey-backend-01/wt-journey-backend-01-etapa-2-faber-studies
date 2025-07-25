const agentesRepository = require('../repositories/agentesRepository.js');
const {handleNotFound, handleBadRequest} = require('../utils/errorHandler.js')

function getAgentes(req, res) {
    const agentes = agentesRepository.allAgents();
    res.status(200).json(agentes);
}

function getAgentById(req, res) {
    const id = req.params.id;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!id || !uuidRegex.test(id)) {
        return handleBadRequest(res, 'ID mal formatado');
    }

    const agent = agentesRepository.agentsById(id);
    if (!agent) {
        return handleNotFound(res, 'Agente não encontrado');
    }
    res.status(200).json(agent);
}

module.exports = {
    getAgentes,
    getAgentById
}