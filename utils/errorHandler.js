 /** 
 * @param {object} res - Objeto de resposta do Express.
 * @param {number} statusCode - Código HTTP (400, 404, etc.).
 * @param {string} message - Mensagem de erro.
 */

function handleError(res, statusCode, message) {
    return res.status(statusCode).json({error:message});
} 

function handleNotFound(res, message = "ID não encontrado") {
    return handleError(res, 404, message);
}

function handleBadRequest(res, message = 'Requisição Inválida ou mal formatados') {
    return handleError(res, 400, message);
};

function handleCreated(res, data) {
    return res.status(201).json(data);
}

function handleNotContent(res) {
    return res.status(204).send();
}

module.exports = {
    handleError,
    handleNotFound,
    handleBadRequest,
    handleCreated,
    handleNotContent
}

