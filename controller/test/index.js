const handler   = require('./../../db/handler/test');

module.exports = {
  returnTestData:  function() {
    return new Promise((res, rej) => {
      handler.readAll().then((results) => {
        return res(results);
      });
    })
  }
}
