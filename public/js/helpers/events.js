define(function() {
    "use strict";

    /*Global*/
    var globalEventsHandler = {};
    _.extend(globalEventsHandler, Backbone.Events);

    /*Custom*/
    var customEventsHandlers = {};

    return {
        app: globalEventsHandler,
        ext: customEventsHandlers,
        register: function(name) {
            if (!_.has(customEventsHandlers, name)) {
                _.extend((customEventsHandlers[name] = {}), Backbone.Events);
            }
            return customEventsHandlers[name];
        }
    };
});