"use strict";

(function() {
  let _ = function(element) {
    let u = {
      first() {
        return element[0];
      },

      last() {
        return element[element.length - 1];
      },

      without(...values) {
        return element.filter(el => {
          return !values.includes(el);
        });
      },

      uniq() { 
        let newArray = [];
        element.forEach(el => {
          if (!newArray.includes(el)) {
            newArray.push(el);
          }
        });
        return newArray;
      },

      lastIndexOf(search) {
        for (let i = element.length - 1; i >= 0; i -= 1) {
          if (element[i] === search) {
            return i;
          }
        }
        return -1;
      },

      sample(qty) {
        let sampled = [],
            copy = element.slice(),
            get = function() {
              let idx = Math.floor(Math.random() * copy.length),
                  el = copy[idx];
              copy.splice(idx, 1);
              return el;
            };

        if (!qty) { return get(); }
        while(qty) {
          sampled.push(get());
          qty -= 1;
        }
        
        return sampled;
      },

      findWhere(obj) {
        for (let i = 0; i < element.length; i += 1) {
          if (Object.keys(obj).every(key => obj[key] === element[i][key])) {
            return element[i];
          }
        }
      },

      where(obj) {
        return element.filter(el => {
          return Object.keys(obj).some(key => obj[key] === el[key]);
        });
      },

      pluck(prop) {
        let plucked = [];
        element.forEach(el => {
          if(Object.keys(el).includes(prop)) {
            plucked.push(el[prop]);
          }
        });
        return plucked;
      },

      keys() {
        return Object.keys(element);
      },

      values() {
        return Object.values(element);
      },

      pick(...props) {
        let newObj = {};
        props.forEach(prop => {
          newObj[prop] = element[prop];
        });
        return newObj;
      },

      omit(...props) {
        let newObj = {};
        for (let prop in element) {
          if (!props.includes(prop)) {
            newObj[prop] = element[prop];
          }
        }
        return newObj;
      },

      has(prop) {
        return Object.keys(element).includes(prop);
      },
    };

    (["isElement", "isNumber", "isArray", "isBoolean", "isString", "isObject", "isFunction"]).forEach(func => {
      u[func] = function() {
        _[func].call(u, element);
      }
    })

    return u;
  };

  _.range = function(start, stop) {
    let range = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    for (let i = start; i < stop; i += 1) {
      range.push(i);
    }
    return range;
  },

  _.extend = function(...objects) {
    let proto = objects[objects.length - 1],
        mod  = objects[objects.length - 2];

    if(!mod) { return proto };

    for (let prop in proto) {
      mod[prop] = proto[prop];
    }

    return _.extend.apply(_, objects.slice(0, objects.length - 1));
  },

  _.isArray = function(arr) {
    return Array.isArray(arr);
  },

  _.isObject = function(obj) {
    let type = typeof obj
    return type === 'object' || type === 'function';
  },

  _.isFunction = function(func) {
    return typeof func === 'function';
  },

  _.isElement = function(el) {
    return el && el.nodeType === 1;
  },

  ['Number', 'String', 'Boolean'].forEach(func => {
    _['is' + func] = function(arg) {
      let value = arg.valueOf();
      return typeof value === func.toLowerCase();
    }
  });

  window._ = _;
})();
