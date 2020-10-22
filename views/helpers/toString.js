module.exports = {
  idToString: (id) => `"${id}"`,
  ifEqual: function (a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    }
  },
};
