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
 *     summary: Retorna um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 dataDeIncorporacao:
 *                   type: string
 *                 cargo:
 *                   type: string
 *       404:
 *         description: Agente não encontrado
 */
router.get('/agentes/:id', agentesController.getAgenteById);

module.exports = router;