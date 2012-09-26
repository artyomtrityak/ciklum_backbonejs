define(['helpers/events'], function(Events) {

    /*Example app*/
    Events.app.on('reset', function() {
        console.log('reset');
    });
    Events.app.trigger('reset');

    /*Example custom*/
    Events.register('test');
    Events.ext.test.on('eventname', function(attr) {
        console.log('got event with attr: ' + attr);
    });
    Events.ext.test.trigger('eventname', 'some');
});