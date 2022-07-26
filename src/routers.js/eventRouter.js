const express = require('express');
const monthController = require('../controllers/monthController');
const router = express.Router();

router.get('/', monthController.getTodayEvents, (req, res) => {
  return res.status(200).json(res.locals.todayEvents);
})

module.exports = router;