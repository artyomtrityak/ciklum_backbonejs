define(["./model"],function(e){return Backbone.Collection.extend({url:"/ciklumers",model:e,loading:!1,options:{page:0,search:"",role:""},is_loading:function(){return this.loading},set_loading:function(e){this.loading=e?!0:!1},set_options:function(e){e||(e={}),this.options=_.extend({search:this.options.search,role:this.options.role,page:this.options.page},e)},get_options:function(){return this.options},incr_page:function(){this.options.page++},reset_data:function(){this.options.page=0,this.reset()}})})