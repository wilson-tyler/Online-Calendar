const Month = require('../MonthModal');

const dayController = {};

dayController.postEvent = async (req, res, next) => {
  try {
    const day = req.params.day;
    const { event, time , month} = req.body;
    const createEvent = await Month.findOneAndUpdate({month: month}, month[day].push({event, time}));
    res.locals.event = createEvent;
    next();
  } catch (err) {
    return next({
      log: 'Caught in postEvent controller.',
      message: {err: 'Caught in postEvent controller.'}
    });
  }
}



module.exports = dayController;