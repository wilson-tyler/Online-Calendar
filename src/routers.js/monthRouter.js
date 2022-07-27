const express = require('express');
const monthController = require('../controllers/monthController');
const dayController = require('../controllers/dayController');
const router = express.Router();


router.get('/:month', monthController.getMonth, (req, res) => {
  return res.status(200).json(res.locals.month);
})

router.get('/:month/:day', monthController.getEvent, (req, res) => {
  return res.status(200).json(res.locals.selectedEvents);
})

router.post('/:month/:day', dayController.postEvent, (req, res) => {
  return res.status(200).json(res.locals.event);
})

router.delete('/:month/:day', dayController.deleteEvent, (req, res) => {
  return res.status(200).json(res.locals.event);
})

router.patch('/:month/:day', dayController.updateEvent, (req, res) => {
  return res.status(200).json(res.locals.event);
})



module.exports = router;