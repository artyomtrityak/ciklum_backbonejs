define(["./model"],function(e){return Backbone.View.extend({el:$("#ciklumers-search"),search_timer:!1,events:{keyup:"search"},initialize:function(){this.model=new e},search:function(){this.timer_search&&clearTimeout(this.timer_search),this.timer_search=setTimeout(_.bind(function(){this.timer_search=!1;var e=this.$el.val();this.model.get("search")!=e&&(this.model.set({search:e}),this.trigger("search",e))},this),500)},make_search:function(e){this.$el.val(e),this.search()}})})