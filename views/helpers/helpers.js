module.exports = {
  idToString: (id) => `"${id}"`,
  ifEqual: function (a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  ifDoesNotEqual: function(a,b,opts){
    if(a !== b){
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    
    }
  },
  ifStringInArray: function (a, b, opts) {
    if (a.includes(b)) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  ifItemInObject: function (a, opts) {
    if (a) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  toUpperCase: function(str){
    str = str.split(' ');
    for(let i = 0; i < str.length; i++){
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  },
  math: function(value1, value2){
    value1 = parseFloat(value1);
    value2= parseFloat(value2);

    return value1+value2;
  }
};
