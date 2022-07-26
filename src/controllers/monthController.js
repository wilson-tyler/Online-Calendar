const Month = require('../MonthModal');

const monthController = {};

monthController.getMonth = async (req, res, next) => {
  try {
    const { month } = req.body;
    const monthClicked = await Month.find({month});
    res.locals.month = monthClicked;
    next();
  } catch (err) {
    return next({
      log: 'Caught in getMonth controller.',
      message: {err: 'Caught in getMonth controller.'}
    });
  }
}

module.exports = monthController;