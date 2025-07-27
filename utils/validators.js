function validUuid(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
        return false;
    }
    return true;
}

function validDate(date) {
    const dateOfIncorp = new Date(date);
    const today = new Date();
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/; 

    if (dateOfIncorp > today) {
        return {valid: false, error: "future date"}
    }

    if (!dataRegex.test(date)) {
        return {valid: false, error:"false format"};
    }

    return true;
}

function verifyAgentExists(id, list) {
    const agent = list.findIndex(a => a.id === id);
    if (agent === -1) {
        return false
    }
    return true;
}

const validStatusesList = ['aberto', 'em andamento', 'fechado'];

function validStatus(status) {
    return validStatusesList.includes(status.toLowerCase());
}

module.exports = {
    validUuid,
    validDate,
    verifyAgentExists,
    validStatusesList,
    validStatus
};