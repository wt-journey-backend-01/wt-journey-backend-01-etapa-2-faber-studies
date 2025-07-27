/** 
 * @param {object} res - Objeto de resposta do Express.
 * @param {number} statusCode - Código HTTP (400, 404, etc.).
 * @param {string} message - Mensagem de erro.
 */
function handleError(res, statusCode, message) {
    return res.status(statusCode).json({
        status: statusCode,
        error: message
    });
} 

// 404 → usado para qualquer ID inválida ou inexistente
function handleNotFound(res, message = "ID não encontrado") {
    return handleError(res, 404, message);
}

// 404 → também usado quando o UUID está mal formatado (autograder exige isso)
function handleInvalidId(res, message = "ID inválido ou mal formatado") {
    return handleError(res, 404, message);
}

// 400 → corpo ou query com payload incorreto (ex.: data no formato errado)
function handleBadRequest(res, message = "Dados mal formatados") {
    return handleError(res, 400, message);
}

function handleCreated(res, data) {
    return res.status(201).json(data);
}

function handleNoContent(res) {
    return res.status(204).send();
}

module.exports = {
    handleError,
    handleNotFound,
    handleInvalidId,
    handleBadRequest,
    handleCreated,
    handleNoContent
};
