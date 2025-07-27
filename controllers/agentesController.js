const agentesRepository = require('../repositories/agentesRepository.js');
const {handleNotFound, handleBadRequest, handleCreated, handleNotContent, handleInvalidId} = require('../utils/errorHandler.js')
const {validUuid, validDate} = require('../utils/validators.js');
const { v4: uuidv4 } = require('uuid');


function getAgentes(req, res) {
    const agentes = agentesRepository.allAgents();
    res.status(200).json(agentes);
}


function getAgentById(req, res) {
    const id = req.params.id;

    if (!validUuid(id)) {
        return handleInvalidId(res, 'ID inválido');
    }

    const agent = agentesRepository.agentsById(id);
    if (!agent) {
        return handleNotFound(res, 'Agente não encontrado');
    }
    res.status(200).json(agent);
}


function addNewAgent(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const {dateValidation, error} = validDate(dataDeIncorporacao);

    if (!nome || !dataDeIncorporacao || !cargo) {
        return handleBadRequest(res, "Todos os campos são obrigatórios!");
    }

    if (!dateValidation) {
        if (error === "false format") {
            return handleBadRequest(res, "Campo dataDeIncorporacao deve serguir o formato 'YYYY-MM-DD");   
        }
        if (error === "future date") {
            return handleBadRequest(res, 'Data de incorporação não pode ser futura!');
        }
    }

    const newAgent = {
        id: uuidv4(),
        nome,
        dataDeIncorporacao,
        cargo
    };

    agentesRepository.addNewAgentToRepo(newAgent);

    return handleCreated(res, newAgent);
}


function updateAgent(req, res) {
    const id = req.params.id;
    const {nome, dataDeIncorporacao, cargo} = req.body;

    if (!validUuid(id)) {
        return handleInvalidId(res, 'ID mal formatado');
    }

    const agents = agentesRepository.allAgents();

    const agentExists = agents.findIndex(a => a.id === id);
    if (agentExists === -1) {
        return handleNotFound(res, 'Agente não encontrado!');
    }

    if (!nome || !dataDeIncorporacao || !cargo) {
        return handleBadRequest(res, 'Todos os campos devem ser preenchidos!');
    }

    if (req.body.id) {
        return handleBadRequest(res, 'Campo ID não pode ser alterado!');
    }

    const {dateValidation, error} = validDate(dataDeIncorporacao);
    if (!dateValidation) {
        if (error === "false format") {
            return handleBadRequest(res, "Campo dataDeIncorporacao deve serguir o formato 'YYYY-MM-DD");   
        }
        if (error === "future date") {
            return handleBadRequest(res, 'Data de incorporação não pode ser futura!');
        }
    }

    const updatedAgent = agentesRepository.updateAgentOnRepo(id, {nome, dataDeIncorporacao, cargo});

    if (!updatedAgent) {
        return handleNotFound(res, 'Agente não encontrado!');
    }

    res.status(200).json(updatedAgent);
}


function patchAgent(req, res) {
    const id = req.params.id;
    const updates = req.body;

    if (!validUuid(id)) {
        return handleInvalidId(res, 'ID inválido');
    }

    const agents = agentesRepository.allAgents();

    const agentExists = agents.findIndex(a => a.id === id);
    if (agentExists === -1) {
        return handleNotFound(res, 'Agente não encontrado!');
    }

    if (!updates || Object.keys(updates).length === 0) {
        return handleBadRequest(res, 'Envie ao menos um campo para atualizar!');
    }

    const allowedFields = ['nome','dataDeIncorporacao','cargo'];
    const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return handleBadRequest(res, `Campos inválidos: ${invalidFields.join(', ')}`);
    }

    if (req.body.id) {
        return handleBadRequest(res, 'Campo ID não pode ser alterado!')
    }

    if (updates.dataDeIncorporacao) {
        const {dateValidation, error} = validDate(updates.dataDeIncorporacao);
        if (!dateValidation) {
            if (error === "false format") {
                return handleBadRequest(res, "Campo dataDeIncorporacao deve serguir o formato 'YYYY-MM-DD");   
            }
            if (error === "future date") {
                return handleBadRequest(res, 'Data de incorporação não pode ser futura!');
            }
        }
    }

    delete req.body.id;
    const patchedAgent = agentesRepository.patchAgentOnRepo(id, updates);

    if (!patchedAgent) {
        return handleNotFound(res, 'Agente não encontrado!');
    }

    res.status(200).json(patchedAgent);
}


function deleteAgent(req, res) {
    const id = req.params.id;

    if (!validUuid(id)) {
        return handleInvalidId(res, 'ID mal formatado!');
    }

    const agents = agentesRepository.allAgents();

    const agentExists = agents.findIndex(a => a.id === id);
    if (agentExists === -1) {
        return handleNotFound(res, 'Agente não encontrado!');
    }

    const deleted = agentesRepository.deleteAgentOnRepo(id);

    if (!deleted) {
        return handleNotFound(res, 'Agente não encontrado');
    }

    return handleNotContent(res);
}


module.exports = {
    getAgentes,
    getAgentById,
    addNewAgent,
    updateAgent,
    patchAgent,
    deleteAgent
}