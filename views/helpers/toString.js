module.exports = {
  idToString: (string) => `"${string}"`,
  ifEqual: function (a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    }
  },
};
