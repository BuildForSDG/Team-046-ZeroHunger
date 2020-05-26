const express = require('express');

const router = express.Router();
const agentcontoller = require('../Controllers/AgentC');

router.get('/', agentcontoller.getAllAgent);
router.post('/', agentcontoller.createAgent);
router.get('/', agentcontoller.getOneAgent);
router.put('/', agentcontoller.modifyOneAgent);
router.get('/', agentcontoller.deleteAgent);

module.exports = router;