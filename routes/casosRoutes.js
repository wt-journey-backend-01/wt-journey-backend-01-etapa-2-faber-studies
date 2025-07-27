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
 *     tags: [Casos]
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
 *                     example: fechado
 *                   agente_id:
 *                     type: string
 *                     example: 401bccf5-cf9e-489d-8412-446cd169a0f1
 */
router.get('/casos', casosController.getAllCases);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso pelo ID
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Caso retornado com sucesso
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
 *                     example: fechado
 *                   agente_id:
 *                     type: string
 *                     example: 401bccf5-cf9e-489d-8412-446cd169a0f1
 */
router.get('/casos/:id', casosController.getCaseById);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cadastra um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - status
 *               - agente_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: homicidio
 *               descricao:
 *                 type: string
 *                 example: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *               status:
 *                 type: string
 *                 example: em andamento
 *               agente_id: 
 *                 type: string
 *                 example: 401bccf5-cf9e-489d-8412-446cd169a0f1                
 *  
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: ID não encontrado
 */
router.post('/casos', casosController.addNewCase);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza todos os dados de um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - status
 *               - agente_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: homicidio
 *               descricao:
 *                 type: string
 *                 example: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *               status:
 *                 type: string
 *                 example: em andamento
 *               agente_id: 
 *                 type: string
 *                 example: 401bccf5-cf9e-489d-8412-446cd169a0f1  
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       400:
 *         description: Requisição inválida ou dados mal formatados
 *       404:
 *         description: Caso/Agente não encontrado
 */
router.put('/casos/:id', casosController.updateCase);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente os dados de um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: homicidio
 *               descricao:
 *                 type: string
 *                 example: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *               status:
 *                 type: string
 *                 example: em andamento
 *               agente_id: 
 *                 type: string
 *                 example: 401bccf5-cf9e-489d-8412-446cd169a0f1 
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       400:
 *         description: Requisição inválida ou dados mal formatados
 *       404:
 *         description: Caso/Agente não encontrado
 */
router.patch('/casos/:id', casosController.patchCase);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Remove um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: caso removido com sucesso (sem corpo na resposta)
 *       400:
 *         description: ID mal formatado
 *       404:
 *         description: caso não encontrado
 */
router.delete('/casos/:id', casosController.deleteCase);

module.exports = router
