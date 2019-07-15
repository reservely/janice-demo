const app = require('./app');

const port = 3010;

module.exports = app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});