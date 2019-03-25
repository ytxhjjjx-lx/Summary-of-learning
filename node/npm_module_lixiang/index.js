(function(global) {
	'use strict';

    var datachange = (function() {
        return function(date) {
            var date = date || new Date;
            if (!date instanceof Date) {
                data = new Date(date);
            }

            if (isNaN(data)) {
                throw TypeError('Invalid date');
            }
            let enDate = date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate();
            return enDate;
        }
    })();

    if (typeof define === 'function' && define.amd) {
        define(function () {
          return datechange;
        });
      } else if (typeof exports === 'object') {
        module.exports = datechange;
      } else {
        global.datechange = datechange;
      }

})(this);