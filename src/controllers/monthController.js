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

monthController.getEvent = async (req, res, next) => {
  try {
    const { day, month } = req.params;
    const todayEvents = await model.Month.findOne({month: month});
    const eventArr = todayEvents[day];
    const events = [];
    for (let i = 0; i < eventArr.length; i++) {
      events.push(await model.Event.findOne({_id: eventArr[i]}));
    }
    res.locals.selectedEvents = events;
    next();
  } catch (err) {
    return next({
      log: 'Caught in getEvent controller.',
      message: {err: 'Caught in getEvent controller.'}
    });
  }
}

monthController.getTodayEvents = async (req, res, next) => {
  try {
    const { day, month } = req.body;
    const todayEvents = await model.Month.find({month: month});
    const eventArr = todayEvents[day];
    res.locals.todayEvents = eventArr;
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