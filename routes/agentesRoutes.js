const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController.js');

/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Endpoints para gerenciar agentes do departamento de polícia
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Retorna todos os agentes
 *     tags: [Agentes]
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   dataDeIncorporacao:
 *                     type: string           
 *                     example: 2020/01/01     
 *                   cargo:
 *                     type: string
 *                     example: Detetive
 */
router.get('/agentes', agentesController.getAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente específico pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID do agente
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *     responses:
 *       200:
 *         description: Agente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                 nome:
 *                   type: string
 *                   example: Rommel Carneiro
 *                 dataDeIncorporacao:
 *                   type: string
 *                   example: 1992/10/04
 *                 cargo:
 *                   type: string
 *                   example: delegado
 *       400:
 *         description: ID mal formatado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID mal formatado
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Agente não encontrado
 */
router.get('/agentes/:id', agentesController.getAgentById);

module.exports = router;