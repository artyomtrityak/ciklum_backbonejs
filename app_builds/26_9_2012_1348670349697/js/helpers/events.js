define([],function(){var e={};_.extend(e,Backbone.Events);var t={};return{app:e,ext:t,register:function(e){return _.has(t,e)||_.extend(t[e]={},Backbone.Events),t[e]}}})