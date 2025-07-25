const agents = [
    {
        "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
        "nome": "Rommel Carneiro",
        "dataDeIncorporacao": "1992-10-04",
        "cargo": "delegado"
    },
    {
        "id": "502bccf5-cf9e-489d-8412-446cd169a0f2",
        "nome": "Ana Paula Silva",
        "dataDeIncorporacao": "2005-05-15",
        "cargo": "investigadora"
    },
    {
        "id": "603bccf5-cf9e-489d-8412-446cd169a0f3",
        "nome": "Carlos Alberto Souza",
        "dataDeIncorporacao": "2010-08-20",
        "cargo": "agente de polícia"
    },
    {
        "id": "704bccf5-cf9e-489d-8412-446cd169a0f4",
        "nome": "Fernanda Lima",
        "dataDeIncorporacao": "2018-01-10",
        "cargo": "perita criminal"
    },
    {
        "id": "805bccf5-cf9e-489d-8412-446cd169a0f5",
        "nome": "Júlio César Rocha",
        "dataDeIncorporacao": "2015-07-15",
        "cargo": "agente de polícia"
    },
    {
        "id": "906bccf5-cf9e-489d-8412-446cd169a0f6",
        "nome": "Vanessa Martins",
        "dataDeIncorporacao": "2012-04-03",
        "cargo": "delegada"
    }
];

function allAgents() {
    return agents;
}

function agentsById(id) {
    const agents = allAgents();
    return agent = agents.find(a => a.id === id);   
}

function addNewAgentToRepo(newAgent) {
    agents.push(newAgent);
    return newAgent;
}

function updateAgentOnRepo(id, newData) {
    const index = agents.findIndex(a => a.id === id);
    if(index === -1) {
        return null;
    }

    return agents[index] = {id, ...newData};
}

function patchAgentOnRepo(id, updates) {
    const index = agents.findIndex(a => a.id === id);

    if (index === -1) {
        return null;
    }

    agents[index] = { ...agents[index], ...updates};

    return agents[index];
}

function deleteAgentOnRepo(id) {
    const index = agents.findIndex(a => a.id === id);

    if (index === -1) {
        return false;
    }

    agents.splice(index, 1);

    return true;
}

module.exports = {
    allAgents,
    agentsById,
    addNewAgentToRepo,
    updateAgentOnRepo,
    patchAgentOnRepo,
    deleteAgentOnRepo
} 


