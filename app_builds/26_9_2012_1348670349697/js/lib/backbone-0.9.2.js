//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){var e=this,t=e.Backbone,n=Array.prototype.splice,r;typeof exports!="undefined"?r=exports:r=e.Backbone={},r.VERSION="0.9.2";var i=e._;!i&&typeof require!="undefined"&&(i=require("underscore")),r.$=e.jQuery||e.Zepto||e.ender,r.noConflict=function(){return e.Backbone=t,this},r.emulateHTTP=!1,r.emulateJSON=!1;var s=/\s+/,o=r.Events={on:function(e,t,n){var r,i,o;if(!t)return this;e=e.split(s),r=this._callbacks||(this._callbacks={});while(i=e.shift())o=r[i]||(r[i]=[]),o.push(t,n);return this},off:function(e,t,n){var r,o,u,a;if(!(o=this._callbacks))return this;if(!(e||t||n))return delete this._callbacks,this;e=e?e.split(s):i.keys(o);while(r=e.shift()){if(!(u=o[r])||!t&&!n){delete o[r];continue}for(a=u.length-2;a>=0;a-=2)t&&u[a]!==t||n&&u[a+1]!==n||u.splice(a,2)}return this},trigger:function(e){var t,n,r,i,o,u,a,f;if(!(n=this._callbacks))return this;f=[],e=e.split(s);for(i=1,o=arguments.length;i<o;i++)f[i-1]=arguments[i];while(t=e.shift()){if(a=n.all)a=a.slice();if(r=n[t])r=r.slice();if(r)for(i=0,o=r.length;i<o;i+=2)r[i].apply(r[i+1]||this,f);if(a){u=[t].concat(f);for(i=0,o=a.length;i<o;i+=2)a[i].apply(a[i+1]||this,u)}}return this}};o.bind=o.on,o.unbind=o.off;var u=r.Model=function(e,t){var n;e||(e={}),t&&t.collection&&(this.collection=t.collection),t&&t.parse&&(e=this.parse(e));if(n=N(this,"defaults"))e=i.extend({},n,e);this.attributes={},this._escapedAttributes={},this.cid=i.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(e,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=i.clone(this.attributes),this.initialize.apply(this,arguments)};i.extend(u.prototype,o,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(e){return i.clone(this.attributes)},sync:function(){return r.sync.apply(this,arguments)},get:function(e){return this.attributes[e]},escape:function(e){var t;if(t=this._escapedAttributes[e])return t;var n=this.get(e);return this._escapedAttributes[e]=i.escape(n==null?"":""+n)},has:function(e){return this.get(e)!=null},set:function(e,t,n){var r,s,o;i.isObject(e)||e==null?(r=e,n=t):(r={},r[e]=t),n||(n={});if(!r)return this;r instanceof u&&(r=r.attributes);if(n.unset)for(s in r)r[s]=void 0;if(!this._validate(r,n))return!1;this.idAttribute in r&&(this.id=r[this.idAttribute]);var a=n.changes={},f=this.attributes,l=this._escapedAttributes,c=this._previousAttributes||{};for(s in r){o=r[s];if(!i.isEqual(f[s],o)||n.unset&&i.has(f,s))delete l[s],(n.silent?this._silent:a)[s]=!0;n.unset?delete f[s]:f[s]=o,!i.isEqual(c[s],o)||i.has(f,s)!==i.has(c,s)?(this.changed[s]=o,n.silent||(this._pending[s]=!0)):(delete this.changed[s],delete this._pending[s])}return n.silent||this.change(n),this},unset:function(e,t){return t=i.extend({},t,{unset:!0}),this.set(e,null,t)},clear:function(e){return e=i.extend({},e,{unset:!0}),this.set(i.clone(this.attributes),e)},fetch:function(e){e=e?i.clone(e):{};var t=this,n=e.success;return e.success=function(r,i,s){if(!t.set(t.parse(r,s),e))return!1;n&&n(t,r,e),t.trigger("sync",t,r,e)},e.error=r.wrapError(e.error,t,e),this.sync("read",this,e)},save:function(e,t,n){var s,o,u;i.isObject(e)||e==null?(s=e,n=t):(s={},s[e]=t),n=n?i.clone(n):{};if(n.wait){if(!this._validate(s,n))return!1;o=i.clone(this.attributes)}var a=i.extend({},n,{silent:!0});if(s&&!this.set(s,n.wait?a:n))return!1;if(!s&&!this.isValid())return!1;var f=this,l=n.success;n.success=function(e,t,r){u=!0;var o=f.parse(e,r);n.wait&&(o=i.extend(s||{},o));if(!f.set(o,n))return!1;l&&l(f,e,n),f.trigger("sync",f,e,n)},n.error=r.wrapError(n.error,f,n);var c=this.sync(this.isNew()?"create":"update",this,n);return!u&&n.wait&&(this.clear(a),this.set(o,a)),c},destroy:function(e){e=e?i.clone(e):{};var t=this,n=e.success,s=function(){t.trigger("destroy",t,t.collection,e)};e.success=function(r){(e.wait||t.isNew())&&s(),n&&n(t,r,e),t.isNew()||t.trigger("sync",t,r,e)};if(this.isNew())return e.success(),!1;e.error=r.wrapError(e.error,t,e);var o=this.sync("delete",this,e);return e.wait||s(),o},url:function(){var e=N(this,"urlRoot")||N(this.collection,"url")||C();return this.isNew()?e:e+(e.charAt(e.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(e,t){return e},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(e){e||(e={});var t=this._changing;this._changing=!0;for(var n in this._silent)this._pending[n]=!0;var r=i.extend({},e.changes,this._silent);this._silent={};for(var n in r)this.trigger("change:"+n,this,this.get(n),e);if(t)return this;while(!i.isEmpty(this._pending)){this._pending={},this.trigger("change",this,e);for(var n in this.changed){if(this._pending[n]||this._silent[n])continue;delete this.changed[n]}this._previousAttributes=i.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(e){return e==null?!i.isEmpty(this.changed):i.has(this.changed,e)},changedAttributes:function(e){if(!e)return this.hasChanged()?i.clone(this.changed):!1;var t,n=!1,r=this._previousAttributes;for(var s in e){if(i.isEqual(r[s],t=e[s]))continue;(n||(n={}))[s]=t}return n},previous:function(e){return e==null||!this._previousAttributes?null:this._previousAttributes[e]},previousAttributes:function(){return i.clone(this._previousAttributes)},isValid:function(){return!this.validate||!this.validate(this.attributes)},_validate:function(e,t){if(t.silent||!this.validate)return!0;e=i.extend({},this.attributes,e);var n=this.validate(e,t);return n?(t&&t.error?t.error(this,n,t):this.trigger("error",this,n,t),!1):!0}});var a=r.Collection=function(e,t){t||(t={}),t.model&&(this.model=t.model),t.comparator!==void 0&&(this.comparator=t.comparator),this._reset(),this.initialize.apply(this,arguments),e&&this.reset(e,{silent:!0,parse:t.parse})};i.extend(a.prototype,o,{model:u,initialize:function(){},toJSON:function(e){return this.map(function(t){return t.toJSON(e)})},sync:function(){return r.sync.apply(this,arguments)},add:function(e,t){var r,s,o,u,a,f,l={},c={},h=[];t||(t={}),e=i.isArray(e)?e.slice():[e];for(r=0,o=e.length;r<o;r++){if(!(u=e[r]=this._prepareModel(e[r],t)))throw new Error("Can't add an invalid model to a collection");a=u.cid,f=u.id;if(l[a]||this._byCid[a]||f!=null&&(c[f]||this._byId[f])){h.push(r);continue}l[a]=c[f]=u}r=h.length;while(r--)h[r]=e.splice(h[r],1)[0];for(r=0,o=e.length;r<o;r++)(u=e[r]).on("all",this._onModelEvent,this),this._byCid[u.cid]=u,u.id!=null&&(this._byId[u.id]=u);this.length+=o,s=t.at!=null?t.at:this.models.length,n.apply(this.models,[s,0].concat(e));if(t.merge)for(r=0,o=h.length;r<o;r++)(u=this._byId[h[r].id])&&u.set(h[r],t);this.comparator&&t.at==null&&this.sort({silent:!0});if(t.silent)return this;for(r=0,o=this.models.length;r<o;r++){if(!l[(u=this.models[r]).cid])continue;t.index=r,u.trigger("add",u,this,t)}return this},remove:function(e,t){var n,r,s,o;t||(t={}),e=i.isArray(e)?e.slice():[e];for(n=0,r=e.length;n<r;n++){o=this.getByCid(e[n])||this.get(e[n]);if(!o)continue;delete this._byId[o.id],delete this._byCid[o.cid],s=this.indexOf(o),this.models.splice(s,1),this.length--,t.silent||(t.index=s,o.trigger("remove",o,this,t)),this._removeReference(o)}return this},push:function(e,t){return e=this._prepareModel(e,t),this.add(e,t),e},pop:function(e){var t=this.at(this.length-1);return this.remove(t,e),t},unshift:function(e,t){return e=this._prepareModel(e,t),this.add(e,i.extend({at:0},t)),e},shift:function(e){var t=this.at(0);return this.remove(t,e),t},slice:function(e,t){return this.models.slice(e,t)},get:function(e){return e==null?void 0:this._byId[e.id!=null?e.id:e]},getByCid:function(e){return e&&this._byCid[e.cid||e]},at:function(e){return this.models[e]},where:function(e){return i.isEmpty(e)?[]:this.filter(function(t){for(var n in e)if(e[n]!==t.get(n))return!1;return!0})},sort:function(e){e||(e={});if(!this.comparator)throw new Error("Cannot sort a set without a comparator");var t=i.bind(this.comparator,this);return this.comparator.length===1?this.models=this.sortBy(t):this.models.sort(t),e.silent||this.trigger("reset",this,e),this},pluck:function(e){return i.map(this.models,function(t){return t.get(e)})},reset:function(e,t){e||(e=[]),t||(t={});for(var n=0,r=this.models.length;n<r;n++)this._removeReference(this.models[n]);return this._reset(),this.add(e,i.extend({silent:!0},t)),t.silent||this.trigger("reset",this,t),this},fetch:function(e){e=e?i.clone(e):{},e.parse===void 0&&(e.parse=!0);var t=this,n=e.success;return e.success=function(r,i,s){t[e.add?"add":"reset"](t.parse(r,s),e),n&&n(t,r,e),t.trigger("sync",t,r,e)},e.error=r.wrapError(e.error,t,e),this.sync("read",this,e)},create:function(e,t){var n=this;t=t?i.clone(t):{},e=this._prepareModel(e,t);if(!e)return!1;t.wait||n.add(e,t);var r=t.success;return t.success=function(e,t,i){i.wait&&n.add(e,i),r&&r(e,t,i)},e.save(null,t),e},parse:function(e,t){return e},clone:function(){return new this.constructor(this.models)},chain:function(){return i(this.models).chain()},_reset:function(e){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(e,t){if(e instanceof u)return e.collection||(e.collection=this),e;t||(t={}),t.collection=this;var n=new this.model(e,t);return n._validate(n.attributes,t)?n:!1},_removeReference:function(e){this===e.collection&&delete e.collection,e.off("all",this._onModelEvent,this)},_onModelEvent:function(e,t,n,r){if((e==="add"||e==="remove")&&n!==this)return;e==="destroy"&&this.remove(t,r),t&&e==="change:"+t.idAttribute&&(delete this._byId[t.previous(t.idAttribute)],t.id!=null&&(this._byId[t.id]=t)),this.trigger.apply(this,arguments)}});var f=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];i.each(f,function(e){a.prototype[e]=function(){return i[e].apply(i,[this.models].concat(i.toArray(arguments)))}});var l=r.Router=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},c=/:\w+/g,h=/\*\w+/g,p=/[-[\]{}()+?.,\\^$|#\s]/g;i.extend(l.prototype,o,{initialize:function(){},route:function(e,t,n){return r.history||(r.history=new d),i.isRegExp(e)||(e=this._routeToRegExp(e)),n||(n=this[t]),r.history.route(e,i.bind(function(i){var s=this._extractParameters(e,i);n&&n.apply(this,s),this.trigger.apply(this,["route:"+t].concat(s)),r.history.trigger("route",this,t,s)},this)),this},navigate:function(e,t){r.history.navigate(e,t)},_bindRoutes:function(){if(!this.routes)return;var e=[];for(var t in this.routes)e.unshift([t,this.routes[t]]);for(var n=0,r=e.length;n<r;n++)this.route(e[n][0],e[n][1],this[e[n][1]])},_routeToRegExp:function(e){return e=e.replace(p,"\\$&").replace(c,"([^/]+)").replace(h,"(.*?)"),new RegExp("^"+e+"$")},_extractParameters:function(e,t){return e.exec(t).slice(1)}});var d=r.History=function(t){this.handlers=[],i.bindAll(this,"checkUrl"),this.location=t&&t.location||e.location,this.history=t&&t.history||e.history},v=/^[#\/]/,m=/msie [\w.]+/,g=/\/$/;d.started=!1,i.extend(d.prototype,o,{interval:50,getHash:function(e){var t=(e||this).location.href.match(/#(.*)$/);return t?t[1]:""},getFragment:function(e,t){if(e==null)if(this._hasPushState||!this._wantsHashChange||t){e=this.location.pathname;var n=this.options.root.replace(g,"");e.indexOf(n)||(e=e.substr(n.length))}else e=this.getHash();return decodeURIComponent(e.replace(v,""))},start:function(e){if(d.started)throw new Error("Backbone.history has already been started");d.started=!0,this.options=i.extend({},{root:"/"},this.options,e),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var t=this.getFragment(),n=document.documentMode,s=m.exec(navigator.userAgent.toLowerCase())&&(!n||n<=7);g.test(this.options.root)||(this.options.root+="/"),s&&this._wantsHashChange&&(this.iframe=r.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(t)),this._hasPushState?r.$(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!s?r.$(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=t;var o=this.location,u=o.pathname.replace(/[^/]$/,"$&/")===this.options.root&&!o.search;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!u)return this.fragment=this.getFragment(null,!0),this.location.replace(this.options.root+this.location.search+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&u&&o.hash&&(this.fragment=this.getHash().replace(v,""),this.history.replaceState({},document.title,o.protocol+"//"+o.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){r.$(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),d.started=!1},route:function(e,t){this.handlers.unshift({route:e,callback:t})},checkUrl:function(e){var t=this.getFragment();t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe)));if(t===this.fragment)return!1;this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(e){var t=this.fragment=this.getFragment(e),n=i.any(this.handlers,function(e){if(e.route.test(t))return e.callback(t),!0});return n},navigate:function(e,t){if(!d.started)return!1;if(!t||t===!0)t={trigger:t};var n=(e||"").replace(v,"");if(this.fragment===n)return;this.fragment=n;var r=(n.indexOf(this.options.root)!==0?this.options.root:"")+n;if(this._hasPushState)this.history[t.replace?"replaceState":"pushState"]({},document.title,r);else{if(!this._wantsHashChange)return this.location.assign(r);this._updateHash(this.location,n,t.replace),this.iframe&&n!==this.getFragment(this.getHash(this.iframe))&&(t.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,n,t.replace))}t.trigger&&this.loadUrl(e)},_updateHash:function(e,t,n){n?e.replace(e.href.replace(/(javascript:|#).*$/,"")+"#"+t):e.hash=t}});var y=r.View=function(e){this.cid=i.uniqueId("view"),this._configure(e||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},b=/^(\S+)\s*(.*)$/,w=["model","collection","el","id","attributes","className","tagName"];i.extend(y.prototype,o,{tagName:"div",$:function(e){return this.$el.find(e)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(e,t,n){var i=document.createElement(e);return t&&r.$(i).attr(t),n!=null&&r.$(i).html(n),i},setElement:function(e,t){return this.$el&&this.undelegateEvents(),this.$el=e instanceof r.$?e:r.$(e),this.el=this.$el[0],t!==!1&&this.delegateEvents(),this},delegateEvents:function(e){if(!e&&!(e=N(this,"events")))return;this.undelegateEvents();for(var t in e){var n=e[t];i.isFunction(n)||(n=this[e[t]]);if(!n)throw new Error('Method "'+e[t]+'" does not exist');var r=t.match(b),s=r[1],o=r[2];n=i.bind(n,this),s+=".delegateEvents"+this.cid,o===""?this.$el.bind(s,n):this.$el.delegate(o,s,n)}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(e){this.options&&(e=i.extend({},this.options,e));for(var t=0,n=w.length;t<n;t++){var r=w[t];e[r]&&(this[r]=e[r])}this.options=e},_ensureElement:function(){if(!this.el){var e=i.extend({},N(this,"attributes"));this.id&&(e.id=N(this,"id")),this.className&&(e["class"]=N(this,"className")),this.setElement(this.make(N(this,"tagName"),e),!1)}else this.setElement(this.el,!1)}});var E=function(e,t){return T(this,e,t)};u.extend=a.extend=l.extend=y.extend=E;var S={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};r.sync=function(e,t,n){var s=S[e];n||(n={});var o={type:s,dataType:"json"};return n.url||(o.url=N(t,"url")||C()),!n.data&&t&&(e==="create"||e==="update")&&(o.contentType="application/json",o.data=JSON.stringify(t)),r.emulateJSON&&(o.contentType="application/x-www-form-urlencoded",o.data=o.data?{model:o.data}:{}),r.emulateHTTP&&(s==="PUT"||s==="DELETE")&&(r.emulateJSON&&(o.data._method=s),o.type="POST",o.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",s)}),o.type!=="GET"&&!r.emulateJSON&&(o.processData=!1),r.ajax(i.extend(o,n))},r.ajax=function(){return r.$.ajax.apply(r.$,arguments)},r.wrapError=function(e,t,n){return function(r,i){i=r===t?i:r,e?e(t,i,n):t.trigger("error",t,i,n)}};var x=function(){},T=function(e,t,n){var r;return t&&t.hasOwnProperty("constructor")?r=t.constructor:r=function(){e.apply(this,arguments)},i.extend(r,e),x.prototype=e.prototype,r.prototype=new x,t&&i.extend(r.prototype,t),n&&i.extend(r,n),r.prototype.constructor=r,r.__super__=e.prototype,r},N=function(e,t){return!e||!e[t]?null:i.isFunction(e[t])?e[t]():e[t]},C=function(){throw new Error('A "url" property or function must be specified')}}).call(this)