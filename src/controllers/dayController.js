const model = require('../MonthModal');

const dayController = {};

dayController.postEvent = async (req, res, next) => {
  try {
    const { day, month } = req.params;
    const { event, time } = req.body;

    const eventCreated = await model.Event.create({ event, time });
    const createEvent = await model.Month.findOneAndUpdate({ month: month }, { $push: { [day]: eventCreated._id } }, { new: true });
    res.locals.event = createEvent;
    next();
  } catch (err) {
    return next({
      log: 'Caught in postEvent controller.',
      message: { err: 'Caught in postEvent controller.' }
    });
  }
}

dayController.deleteEvent = async (req, res, next) => {
  try {
    const { day, month } = req.params;
    const { _id } = req.body;
    const deletedEvent = await model.Event.deleteOne({_id: _id})
    const monthDelete = await model.Month.findOne({ month: month })
    const updatedArr = monthDelete[day];
    console.log(updatedArr)
    for (let i = 0; i < updatedArr.length; i++) {
      if(updatedArr[i] == _id) {
        updatedArr.splice(i, 1);
      }
    }
    console.log(updatedArr)
    const finalDelete = await model.Month.updateOne({month: month}, { $set: {[day]: updatedArr}}, {new: true})

    res.locals.event = finalDelete;
    next();
  } catch (err) {
    return next({
      log: 'Caught in deleteEvent controller.',
      message: { err: 'Caught in deleteEvent controller.' }
    });
  }
}

dayController.updateEvent = async (req, res, next) => {
  try {
    const { event, time, _id } = req.body;

    const updatedEvent = await model.Event.findOneAndUpdate({ _id: _id }, { event, time });
    console.log(updatedEvent)
    res.locals.event = updatedEvent;
    next();
  } catch (err) {
  return next({
    log: 'Caught in updateEvent controller.',
    message: { err: 'Caught in updateEvent controller.' }
  });
}
}

module.exports = dayController;