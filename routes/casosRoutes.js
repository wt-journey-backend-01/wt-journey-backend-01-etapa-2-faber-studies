const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController.js');

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciar Casos do departamento de polícia
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Retorna todos os casos
 *     tags: [casos]
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                   titulo:
 *                     type: string
 *                     example: homicídio
 *                   descricao: 
 *                     type: string           
 *                     example: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                   status:
 *                     type: string
 *                     example: aberto
 *                   agente_id:
 *                     type: string
 *                     example: 401bccf5-cf9e-489d-8412-446cd169a0f1
 */
router.get('/casos', casosController.getAllCases);

module.exports = router
