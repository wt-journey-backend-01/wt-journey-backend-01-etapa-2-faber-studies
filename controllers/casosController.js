const casosRepository = require('../repositories/casosRepository');
const { allAgents } = require('../repositories/agentesRepository');
const {handleNotFound, handleBadRequest, handleInvalidId, handleCreated, handleNotContent} = require('../utils/errorHandler');
const { validUuid, validDate, verifyAgentExists, validStatus, validStatusesList } = require('../utils/validators');
const { v4: uuidv4 } = require('uuid');

function getAllCases(req, res){
    const cases = casosRepository.allCases();
    return res.status(200).json(cases);
}

function getCaseById(req, res){
    const id = req.params.id;
    if (!validUuid(id)) {
        return handleInvalidId(res, 'ID mal formatado!');
    }
    const case_ = casosRepository.caseById(id);

    if (!case_) {
        return handleNotFound(res, 'Caso não encontrado');
    }

    res.status(200).json(case_);
}

function addNewCase(req, res){
    const {titulo, descricao, status, agente_id} = req.body;
    if (!titulo || !descricao || !status || !agente_id) {
        return handleBadRequest(res, 'Todos os campos precisam ser preenchidos!');
    }
    
    if (!validUuid(agente_id)) {
        return handleInvalidId(res, 'ID inválido');
    }

    const agents = allAgents();

    if (!verifyAgentExists(agente_id, agents)) {
        return handleNotFound(res, 'Agente não encontrado');
    }

    if (!validStatus(status)) {
        return handleBadRequest(res, `Status inválido. Valores permitidos: ${validStatusesList.join(', ')}`);
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

function updateCase(req, res) {
    const id = req.params.id;
    const updates = req.body;

    if (updates.id) {
        return handleBadRequest(res, 'ID não pode ser alterado!');
    }

    const existingCase = casosRepository.caseById(id);
    if (!existingCase) {
        return handleNotFound(res, 'Caso não encontrado!');
    }

    if (Object.keys(updates).length < 4) {
        return handleBadRequest(res, 'Todos os campos devem ser preenchidos!');
    }

    if (!validStatus(updates.status)) {
        return handleBadRequest(res, `Status inválido. Valores permitidos: ${validStatusesList.join(', ')}`);
    }

    if (!validUuid(updates.agente_id)) {
        return handleBadRequest(res, 'Formato de ID inválido pro agente associado ao caso.');
    }

    const agents = allAgents();

    if (!verifyAgentExists(updates.agente_id, agents)) {
        return handleNotFound(res, 'Agente não encontrado');
    }

    const updateCase = casosRepository.updateCaseOnRepo(id, updates);

    if (!updateCase) {
        return handleNotFound(res, 'Caso não encontrado');
    }

    res.status(200).json(updateCase);
}

function patchCase(req, res) {
    const id = req.params.id;
    const updates = req.body;

    const existingCase = casosRepository.caseById(id);
    if (!existingCase) {
        return handleNotFound(res, 'Caso não encontrado!');
    }

    if (updates.id) {
        return handleBadRequest(res, 'Não é permitido alterar o ID!');
    }

    if (updates.status) {
        if (!validStatus(updates.status)) {
            return handleBadRequest(res, `Status inválido. Valores permitidos: ${validStatusesList.join(', ')}`);
        }
    }

    if (updates.agente_id) {
        if(!validUuid(updates.agente_id)) {
            return handleInvalidId(res, 'Formato de ID inválido!');
        }

        const agents = allAgents();
        if (!verifyAgentExists(updates.agente_id, agents)) {
            return handleBadRequest(res, 'Agente não encontrado');
        }
    }

    const cases = casosRepository.allCases();
    
    const caseExists = cases.findIndex(c => c.id === id);
    if (caseExists === -1) {
        return handleNotFound(res, 'Caso não encontrado!');
    }

    const allowedFields = ['titulo','descricao','status','agente_id'];
    const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return handleBadRequest(res, `Campos inválidos: ${invalidFields.join(', ')}`);
    }

    const update = casosRepository.patchCaseOnRepo(id, updates);

    if (!update) {
        return handleNotFound(res, 'Caso não encontrado');
    }

    return res.status(200).json(update);

}

function deleteCase(req, res) {
    const id = req.params.id;

    const cases = casosRepository.allCases();
    const caseExists = cases.findIndex(c => c.id === id);
    
   if(!validUuid(id)) {
        return handleBadRequest(res, 'Formato de ID inválido!');
    }

    if (caseExists === -1) {
        return handleNotFound(res, 'Caso não existente!');
    }

    const deleted = casosRepository.deleteCaseOnRepo(id);

    if (!deleted) {
        return handleNotFound(res, 'Caso não encontrado!');
    }

    return handleNotContent(res);
}

function getFilteredCases(req, res) {
    const { status, agente_id, keyword } = req.query;
    let filteredCases = casosRepository.allCases();

    if (status) {
        filteredCases = filteredCases.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }

    if (agente_id) {
        filteredCases = filteredCases.filter(c => c.agente_id === agente_id);
    }

    if (keyword) {
        filteredCases = filteredCases.filter(c =>
            c.titulo.toLowerCase().includes(keyword.toLowerCase()) ||
            c.descricao.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    res.status(200).json(filteredCases);
}

module.exports = {
    getAllCases,
    getCaseById,
    addNewCase,
    updateCase,
    patchCase,
    deleteCase,
    getFilteredCases
}