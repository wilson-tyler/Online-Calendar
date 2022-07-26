const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
// const monthController = require('./controllers/monthController');

// REQUIRE ROUTERS
const monthRouter = require("./routers.js/monthRouter");
const eventRouter = require("./routers.js/eventRouter");

// PARSING
app.use(express.json())
app.use(express.urlencoded())


// GIVE USER DIST BUNDLED FILES
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// ENDPOINT PATHS
app.use('/month', monthRouter);

app.use('/event', eventRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


// CATCH ALL
app.use('*', (req, res) => {
  return res.status(404).send('404 NOT FOUND');
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Global Error Handler Caught.',
    status: 400,
    message: {err: 'Caught in global error handler.'}
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.json(errorObj.message);
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));