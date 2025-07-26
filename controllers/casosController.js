const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const {handleNotFound, handleBadRequest, handleCreated, handleNotContent} = require('../utils/errorHandler');
const { validUuid, validDate } = require('../utils/validators');
const { v4: uuidv4 } = require('uuid');

function getAllCases(req, res){
    const cases = casosRepository.allCases();
    return res.status(200).json(cases);
}

function getCaseById(req, res){
    const id = req.params.id;
    if (!validUuid(id)) {
        return handleBadRequest(res, 'UUID Inválido!');
    }
    const case_ = casosRepository.caseById(id);

    if (!case_) {
        return handleNotFound(res, 'UUID não encontrado!');
    }

    res.status(200).json(case_);
}

function addNewCase(req, res){
    const {titulo, descricao, status, agente_id} = req.body;
    if (!titulo || !descricao || !status || !agente_id) {
        return handleBadRequest(res, 'Todos os campos precisam ser preenchidos!');
    }
    
    if (!validUuid(agente_id)) {
        return handleBadRequest(res, 'Formato de UUID inválido pro agente associado ao caso.');
    }

    const agents = agentesRepository.allAgents();

    const agentExists = agents.find(a => a.id === agente_id);

    if (!agentExists) {
        return handleNotFound(res, 'Agente associado ao caso não encontrado na lista de agentes cadastrados!');
    }

    const validStatuses = ['aberto', 'em andamento','fechado'];

    if (!validStatuses.includes(status.toLowerCase())) {
        return handleBadRequest(res, `Status inválido. Valores permitidos ${validStatuses.join(', ')}`);
    }

    const newCase = {
        id: uuidv4(),
        titulo: titulo,
        descricao: descricao,
        status: status,
        agente_id: agente_id
    };

    casosRepository.addNewCaseOnRepo(newCase);

    return res.status(201).json(newCase);

}

module.exports = {
    getAllCases,
    getCaseById,
    addNewCase
}