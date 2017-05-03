const model = require('./../../model/test');

module.exports = {
  readAll: () => {
    return new Promise((resolve, reject) => {
      model.find({}, (err, data) => {
        return resolve(data);
      })

    });
  }
}
