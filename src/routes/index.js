const express = require('express');
const router = express.Router();

const universitiesRoutes = require('./universitiesRoutes');
const weatherRoutes = require('./weatherRoutes');

router.use('/', universitiesRoutes);
router.use('/', weatherRoutes);

module.exports = router;
