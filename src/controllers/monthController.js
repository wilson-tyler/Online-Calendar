const model = require('../MonthModal');

const monthController = {};

monthController.getMonth = async (req, res, next) => {
  try {
    const month = req.params.month;
    const monthClicked = await model.Month.find({month: month});
    res.locals.month = monthClicked;
    next();
  } catch (err) {
    return next({
      log: 'Caught in getMonth controller.',
      message: {err: 'Caught in getMonth controller.'}
    });
  }
}

monthController.getTodayEvents = async (req, res, next) => {
  try {
    const { day, month } = req.body;
    const todayEvents = await model.Month.find({month: month});
    res.locals.todayEvents = todayEvents[day];
    next();
  } catch (err) {
    return next({
      log: 'Caught in getTodayEvents controller.',
      message: {err: 'Caught in getTodayEvents controller.'}
    });
  }
}

// monthController.createMonth = async (req, res, next) => {
//   try {
//     const monthClicked = await model.Month.create({month: 'January'});
//     res.locals.month = monthClicked;
//     return next();
//   } catch (err) {
//     return next({
//       log: 'Caught in createMonth controller.',
//       message: {err: 'Caught in createMonth controller.'}
//     });
//   }
// }

module.exports = monthController;