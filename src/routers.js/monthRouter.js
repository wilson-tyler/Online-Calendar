const express = require('express');
const monthController = require('../controllers/monthController');
const dayController = require('../controllers/dayController');
const router = express.Router();

router.get('/', monthController.getMonth, (req, res) => {
  return res.status(200).json(res.locals.month);
})
router.post('/:day', dayController.postEvent, (req, res) => {
  return res.status(200).json(res.locals.event);
})

module.exports = router;