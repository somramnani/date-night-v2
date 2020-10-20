module.exports = {
  idToString: (id) => `"${id}"`,
  ifEqual: function (a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    }
  },
  ifStringInArray: function (a, b, opts) {
    if (a.includes(b)) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
};
