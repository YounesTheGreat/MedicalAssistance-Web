const express = require('express');
const router = express.Router();
const dashboardMedecin = require("../business/dashboardMedecin");

/* GET home page. */
router.get('/', dashboardMedecin);

module.exports = router;
