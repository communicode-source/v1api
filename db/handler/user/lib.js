const userModel = require('./../../model/user');


module.exports = {
  lCaseIndex : (payload) => {
    let base = {};
    for(let i in payload) {
      base[i.toLowerCase()] = payload[i];
    }
    return base;
  },

  updateUrl : (fname, lname) => {
    let urlBase = fname+'.'+lname; // Base of the URL.
    let reg = new RegExp("^"+urlBase+"[0-9]*$"); // Regex used for matching.
    return userModel.find({url: {$regex: reg, $options: 'i'}}, null, {sort: {urlnum: 1}}).exec();
  },

  getUrlNumber : (set) => {
    let length = set.length-1;
    if(length === -1) {
      return 1;
    }
    let cor = 0;
    let inc = length;
    let userNum = getMatch(set, length);
    let iterator = 0;
    // All is well.
    if(userNum == (length+1)) {
      return (+userNum + 1);
    }
    if(getMatch(set, 0) != 1) {
      return +1;
    }
    length = Math.floor(newLength(cor, inc));
    while(cor + 1 != inc && iterator < 30) {
      iterator++;
      userNum = getMatch(set, length);
      if(userNum == length + 1) {
        cor = length;
      } else {
        inc = length;
      }
      length = Math.floor(newLength(cor, inc));
    }
    return (+getMatch(set, cor) + 1);
  },
}
const newLength = (cor, inc) => ((cor + inc)/2);
const getMatch = (set, length) => set[length].urlnum;
