define(function() {
    "use strict";

    var cache = {};

    return function(key, tpl) {
        if (!_.has(cache, key)) {
            cache[key] = _.template(tpl);
        }
        return cache[key];
    };
});