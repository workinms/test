/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./Manifest","./ComponentMetadata","./Core","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/thirdparty/URI","sap/ui/performance/trace/Interaction","sap/base/assert","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/UriParameters","sap/base/util/isPlainObject","sap/base/util/LoaderExtensions"],function(e,t,n,a,r,i,o,s,u,f,c,p,d,l){"use strict";var g={JSON:"JSON",XML:"XML",HTML:"HTML",JS:"JS",Template:"Template"};function m(e){["sap-client","sap-server"].forEach(function(t){if(!e.hasSearch(t)){var n=sap.ui.getCore().getConfiguration().getSAPParam(t);if(n){e.addSearch(t,n)}}})}function y(e,t,n,a){if(n){for(var r in e){if(!t[r]&&n[r]&&n[r].uri){t[r]=a}}}}function h(t,a,r,i){var o=a.getEntry(r);if(o!==undefined&&!d(o)){return o}var s,u;if(i&&(s=t.getParent())instanceof n){u=s.getManifestEntry(r,i)}if(u||o){o=e.extend(true,{},u,o)}return o}function v(e,t){var n=Object.create(Object.getPrototypeOf(e));n._oMetadata=e;n._oManifest=t;for(var a in e){if(!/^(getManifest|getManifestObject|getManifestEntry|getMetadataVersion)$/.test(a)&&typeof e[a]==="function"){n[a]=e[a].bind(e)}}n.getManifest=function(){return t&&t.getJson()};n.getManifestObject=function(){return t};n.getManifestEntry=function(n,a){return h(e,t,n,a)};n.getMetadataVersion=function(){return 2};return n}function M(e,t,n){u(typeof e==="function","fn must be a function");var a=i._sOwnerId;try{i._sOwnerId=t;return e.call(n)}finally{i._sOwnerId=a}}var S=i.extend("sap.ui.core.Component",{constructor:function(e,t){var n=Array.prototype.slice.call(arguments);if(typeof e!=="string"){t=e;e=undefined}if(t&&typeof t._metadataProxy==="object"){this._oMetadataProxy=t._metadataProxy;this._oManifest=t._metadataProxy._oManifest;delete t._metadataProxy;this.getMetadata=function(){return this._oMetadataProxy}}if(t&&typeof t._cacheTokens==="object"){this._mCacheTokens=t._cacheTokens;delete t._cacheTokens}if(t&&typeof t._manifestModels==="object"){this._mManifestModels=t._manifestModels;delete t._manifestModels}else{this._mManifestModels={}}this._mServices={};i.apply(this,n)},metadata:{stereotype:"component",abstract:true,specialSettings:{componentData:"any"},version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},n);S.prototype.getManifest=function(){if(!this._oManifest){return this.getMetadata().getManifest()}else{return this._oManifest.getJson()}};S.prototype.getManifestEntry=function(e){return this._getManifestEntry(e)};S.prototype._getManifestEntry=function(e,t){if(!this._oManifest){return this.getMetadata().getManifestEntry(e,t)}else{return h(this.getMetadata(),this._oManifest,e,t)}};S.prototype.getManifestObject=function(){if(!this._oManifest){return this.getMetadata().getManifestObject()}else{return this._oManifest}};S.prototype._isVariant=function(){if(this._oManifest){var e=this._oMetadataProxy._oMetadata.getManifestEntry("/sap.app/id");return e!==this.getManifestEntry("/sap.app/id")}else{return false}};S.activateCustomizing=function(e){};S.deactivateCustomizing=function(e){};S.getOwnerIdFor=function(e){u(e instanceof i,"oObject must be given and must be a ManagedObject");var t=e instanceof i&&e._sOwnerId;return t||undefined};S.getOwnerComponentFor=function(e){return S.get(S.getOwnerIdFor(e))};S.prototype.runAsOwner=function(e){return M(e,this.getId())};S.prototype.getInterface=function(){return this};S.prototype._initCompositeSupport=function(t){this.oComponentData=t&&t.componentData;if(!this._isVariant()){this.getMetadata().init()}else{this._oManifest.init(this);var n=this._oManifest.getEntry("/sap.app/id");if(n){b(n,this._oManifest.resolveUri("./","manifest"))}}this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=e.proxy(function(e){var t=e.originalEvent;this.onWindowError(t.message,t.filename,t.lineno)},this);e(window).bind("error",this._fnWindowErrorHandler)}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=e.proxy(this.onWindowBeforeUnload,this);e(window).bind("beforeunload",this._fnWindowBeforeUnloadHandler)}if(this.onWindowUnload){this._fnWindowUnloadHandler=e.proxy(this.onWindowUnload,this);e(window).bind("unload",this._fnWindowUnloadHandler)}};S.prototype.destroy=function(){for(var t in this._mServices){if(this._mServices[t].instance){this._mServices[t].instance.destroy()}}delete this._mServices;for(var n in this._mManifestModels){this._mManifestModels[n].destroy()}delete this._mManifestModels;if(this._fnWindowErrorHandler){e(window).unbind("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler}if(this._fnWindowBeforeUnloadHandler){e(window).unbind("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler}if(this._fnWindowUnloadHandler){e(window).unbind("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus}i.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);if(!this._isVariant()){this.getMetadata().exit()}else{this._oManifest.exit(this);delete this._oManifest}};S.prototype.getComponentData=function(){return this.oComponentData};S.prototype.getEventBus=function(){if(!this._oEventBus){var e=this.getMetadata().getName();f.warning("Synchronous loading of EventBus, due to #getEventBus() call on Component '"+e+"'.","SyncXHR",null,function(){return{type:"SyncXHR",name:e}});var t=sap.ui.requireSync("sap/ui/core/EventBus");this._oEventBus=new t}return this._oEventBus};S.prototype.initComponentModels=function(){var e=this.getMetadata();if(e.isBaseClass()){return}var t=this._getManifestEntry("/sap.app/dataSources",true)||{};var n=this._getManifestEntry("/sap.ui5/models",true)||{};this._initComponentModels(n,t,this._mCacheTokens)};S.prototype._initComponentModels=function(e,t,n){var a=S._createManifestModelConfigurations({models:e,dataSources:t,component:this,mergeParent:true,cacheTokens:n});if(!a){return}var r={};for(var i in a){if(!this._mManifestModels[i]){r[i]=a[i]}}var o=S._createManifestModels(r,this.toString());for(var i in o){this._mManifestModels[i]=o[i]}for(var i in this._mManifestModels){var s=this._mManifestModels[i];this.setModel(s,i||undefined)}};S.prototype.getService=function(e){if(!this._mServices[e]){this._mServices[e]={};this._mServices[e].promise=new Promise(function(t,n){sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"],function(a){var r=this.getManifestEntry("/sap.ui5/services/"+e);var i=r&&r.factoryName;if(!i){n(new Error("Service "+e+" not declared!"));return}var o=a.get(i);if(o){o.createInstance({scopeObject:this,scopeType:"component",settings:r.settings||{}}).then(function(a){if(!this.bIsDestroyed){this._mServices[e].instance=a;this._mServices[e].interface=a.getInterface();t(this._mServices[e].interface)}else{n(new Error("Service "+e+" could not be loaded as its Component was destroyed."))}}.bind(this)).catch(n)}else{var s="The ServiceFactory "+i+" for Service "+e+" not found in ServiceFactoryRegistry!";var u=this.getManifestEntry("/sap.ui5/services/"+e+"/optional");if(!u){f.error(s)}n(new Error(s))}}.bind(this),n)}.bind(this))}return this._mServices[e].promise};function C(e){var t=e.getManifestEntry("/sap.ui5/services");for(var n in t){if(t[n].lazy===false){e.getService(n)}}}S.prototype.createComponent=function(e){u(typeof e==="string"&&e||typeof e==="object"&&typeof e.usage==="string"&&e.usage,"vUsage either must be a non-empty string or an object with a non-empty usage id");var t={async:true};if(e){var n;if(typeof e==="object"){n=e.usage;["id","async","settings","componentData"].forEach(function(n){if(e[n]!==undefined){t[n]=e[n]}})}else if(typeof e==="string"){n=e}t=this._enhanceWithUsageConfig(n,t)}return S._createComponent(t,this)};S.prototype._enhanceWithUsageConfig=function(t,n){var a=this.getManifestEntry("/sap.ui5/componentUsages/"+t);if(!a){throw new Error('Component usage "'+t+'" not declared in Component "'+this.getManifestObject().getComponentName()+'"!')}return e.extend(true,a,n)};S._createComponent=function(e,t){function n(){if(e.async===true){return S.create(e)}else{return sap.ui.component(e)}}if(t){return t.runAsOwner(n)}else{return n()}};S._createManifestModelConfigurations=function(e){var t=e.component;var a=e.manifest||t.getManifestObject();var r=e.mergeParent;var i=e.cacheTokens||{};var s=t?t.toString():a.getComponentName();var u=sap.ui.getCore().getConfiguration();if(!e.models){return null}var c={models:e.models,dataSources:e.dataSources||{},origin:{dataSources:{},models:{}}};if(t&&r){var p=t.getMetadata();while(p instanceof n){var d=p.getManifestObject();var l=p.getManifestEntry("/sap.app/dataSources");y(c.dataSources,c.origin.dataSources,l,d);var g=p.getManifestEntry("/sap.ui5/models");y(c.models,c.origin.models,g,d);p=p.getParent()}}var h={};for(var v in c.models){var M=c.models[v];var S=false;var C=null;if(typeof M==="string"){M={dataSource:M}}if(M.dataSource){var _=c.dataSources&&c.dataSources[M.dataSource];if(typeof _==="object"){if(_.type===undefined){_.type="OData"}if(!M.type){switch(_.type){case"OData":if(_.settings&&_.settings.odataVersion==="4.0"){M.type="sap.ui.model.odata.v4.ODataModel"}else{M.type="sap.ui.model.odata.v2.ODataModel"}break;case"JSON":M.type="sap.ui.model.json.JSONModel";break;case"XML":M.type="sap.ui.model.xml.XMLModel";break;default:}}if(M.type==="sap.ui.model.odata.v4.ODataModel"&&_.settings&&_.settings.odataVersion){M.settings=M.settings||{};M.settings.odataVersion=_.settings.odataVersion}if(!M.uri){M.uri=_.uri;S=true}if(_.type==="OData"&&_.settings&&typeof _.settings.maxAge==="number"){M.settings=M.settings||{};M.settings.headers=M.settings.headers||{};M.settings.headers["Cache-Control"]="max-age="+_.settings.maxAge}if(_.type==="OData"&&_.settings&&_.settings.annotations){var w=_.settings.annotations;for(var b=0;b<w.length;b++){var O=c.dataSources[w[b]];if(!O){f.error('Component Manifest: ODataAnnotation "'+w[b]+'" for dataSource "'+M.dataSource+'" could not be found in manifest','["sap.app"]["dataSources"]["'+w[b]+'"]',s);continue}if(O.type!=="ODataAnnotation"){f.error('Component Manifest: dataSource "'+w[b]+'" was expected to have type "ODataAnnotation" but was "'+O.type+'"','["sap.app"]["dataSources"]["'+w[b]+'"]',s);continue}if(!O.uri){f.error('Component Manifest: Missing "uri" for ODataAnnotation "'+w[b]+'"','["sap.app"]["dataSources"]["'+w[b]+'"]',s);continue}var P=new o(O.uri);if(M.type==="sap.ui.model.odata.v2.ODataModel"){["sap-language","sap-client"].forEach(function(e){if(!P.hasQuery(e)&&u.getSAPParam(e)){P.setQuery(e,u.getSAPParam(e))}});var E=i.dataSources&&i.dataSources[O.uri];if(E){var U=function(){if(!P.hasQuery("sap-language")){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for ODataAnnotation "'+w[b]+'" ('+P.toString()+"). "+'Missing "sap-language" URI parameter','["sap.app"]["dataSources"]["'+w[b]+'"]',s);return}if(!P.hasQuery("sap-client")){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for ODataAnnotation "'+w[b]+'" ('+P.toString()+"). "+'Missing "sap-client" URI parameter','["sap.app"]["dataSources"]["'+w[b]+'"]',s);return}if(!P.hasQuery("sap-client",u.getSAPParam("sap-client"))){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for ODataAnnotation "'+w[b]+'" ('+P.toString()+"). "+'URI parameter "sap-client='+P.query(true)["sap-client"]+'" must be identical with configuration "sap-client='+u.getSAPParam("sap-client")+'"','["sap.app"]["dataSources"]["'+w[b]+'"]',s);return}if(P.hasQuery("sap-context-token")&&!P.hasQuery("sap-context-token",E)){var e=P.query(true)["sap-context-token"];f.warning('Component Manifest: Overriding existing "sap-context-token='+e+'" with provided value "'+E+'" for ODataAnnotation "'+w[b]+'" ('+P.toString()+").",'["sap.app"]["dataSources"]["'+w[b]+'"]',s)}P.setQuery("sap-context-token",E)};U()}}var x=c.origin.dataSources[w[b]]||a;var j=x._resolveUri(P).toString();M.settings=M.settings||{};M.settings.annotationURI=M.settings.annotationURI||[];M.settings.annotationURI.push(j)}}}else{f.error('Component Manifest: dataSource "'+M.dataSource+'" for model "'+v+'" not found or invalid','["sap.app"]["dataSources"]["'+M.dataSource+'"]',s)}}if(!M.type){f.error('Component Manifest: Missing "type" for model "'+v+'"','["sap.ui5"]["models"]["'+v+'"]',s);continue}if(M.type==="sap.ui.model.odata.ODataModel"&&(!M.settings||M.settings.json===undefined)){M.settings=M.settings||{};M.settings.json=true}if(M.uri){var k=new o(M.uri);var A=(S?c.origin.dataSources[M.dataSource]:c.origin.models[v])||a;k=A._resolveUri(k);if(M.dataSource){m(k);if(M.type==="sap.ui.model.odata.v2.ODataModel"){C=M.settings&&M.settings.metadataUrlParams;if((!C||typeof C["sap-language"]==="undefined")&&!k.hasQuery("sap-language")&&u.getSAPParam("sap-language")){M.settings=M.settings||{};C=M.settings.metadataUrlParams=M.settings.metadataUrlParams||{};C["sap-language"]=u.getSAPParam("sap-language")}if(i.dataSources){var E=i.dataSources[_.uri];if(E){var D=function(){if(k.hasQuery("sap-context-token")){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for model "'+v+'" ('+k.toString()+"). "+'Model URI already contains parameter "sap-context-token='+k.query(true)["sap-context-token"]+'"','["sap.ui5"]["models"]["'+v+'"]',s);return}if((!C||typeof C["sap-language"]==="undefined")&&!k.hasQuery("sap-language")){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for model "'+v+'" ('+k.toString()+"). "+'Missing "sap-language" parameter','["sap.ui5"]["models"]["'+v+'"]',s);return}if(!k.hasQuery("sap-client")){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for model "'+v+'" ('+k.toString()+"). "+'Missing "sap-client" parameter','["sap.ui5"]["models"]["'+v+'"]',s);return}if(!k.hasQuery("sap-client",u.getSAPParam("sap-client"))){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for model "'+v+'" ('+k.toString()+"). "+'URI parameter "sap-client='+k.query(true)["sap-client"]+'" must be identical with configuration "sap-client='+u.getSAPParam("sap-client")+'"','["sap.ui5"]["models"]["'+v+'"]',s);return}if(C&&typeof C["sap-client"]!=="undefined"){if(C["sap-client"]!==u.getSAPParam("sap-client")){f.warning('Component Manifest: Ignoring provided "sap-context-token='+E+'" for model "'+v+'" ('+k.toString()+"). "+'Parameter metadataUrlParams["sap-client"] = "'+C["sap-client"]+'" must be identical with configuration "sap-client='+u.getSAPParam("sap-client")+'"','["sap.ui5"]["models"]["'+v+'"]',s);return}}if(C&&C["sap-context-token"]&&C["sap-context-token"]!==E){f.warning('Component Manifest: Overriding existing "sap-context-token='+C["sap-context-token"]+'" with provided value "'+E+'" for model "'+v+'" ('+k.toString()+").",'["sap.ui5"]["models"]["'+v+'"]',s)}if(!C){M.settings=M.settings||{};C=M.settings.metadataUrlParams=M.settings.metadataUrlParams||{}}C["sap-context-token"]=E};D()}}}}M.uri=k.toString()}if(M.uriSettingName===undefined){switch(M.type){case"sap.ui.model.odata.ODataModel":case"sap.ui.model.odata.v2.ODataModel":case"sap.ui.model.odata.v4.ODataModel":M.uriSettingName="serviceUrl";break;case"sap.ui.model.resource.ResourceModel":M.uriSettingName="bundleUrl";break;default:}}var N;var I;if(t){I=t.getComponentData()}else{I=e.componentData}N=I&&I.startupParameters&&I.startupParameters["sap-system"];if(!N){N=u.getSAPParam("sap-system")}var R=false;var B;if(N&&["sap.ui.model.odata.ODataModel","sap.ui.model.odata.v2.ODataModel"].indexOf(M.type)!=-1){R=true;B=sap.ui.requireSync("sap/ui/model/odata/ODataUtils")}if(M.uri){if(R){M.preOriginBaseUri=M.uri.split("?")[0];M.uri=B.setOrigin(M.uri,{alias:N});M.postOriginBaseUri=M.uri.split("?")[0]}if(M.uriSettingName!==undefined){M.settings=M.settings||{};if(!M.settings[M.uriSettingName]){M.settings[M.uriSettingName]=M.uri}}else if(M.settings){M.settings=[M.uri,M.settings]}else{M.settings=[M.uri]}}else{if(R&&M.uriSettingName!==undefined&&M.settings&&M.settings[M.uriSettingName]){M.preOriginBaseUri=M.settings[M.uriSettingName].split("?")[0];M.settings[M.uriSettingName]=B.setOrigin(M.settings[M.uriSettingName],{alias:N});M.postOriginUri=M.settings[M.uriSettingName].split("?")[0]}}if(R&&M.settings&&M.settings.annotationURI){var T=[].concat(M.settings.annotationURI);var H=[];for(var b=0;b<T.length;b++){H.push(B.setAnnotationOrigin(T[b],{alias:N,preOriginBaseUri:M.preOriginBaseUri,postOriginBaseUri:M.postOriginBaseUri}))}M.settings.annotationURI=H}if(M.type==="sap.ui.model.resource.ResourceModel"&&M.settings&&Array.isArray(M.settings.enhanceWith)){M.settings.enhanceWith.forEach(function(e){if(e.bundleUrl){e.bundleUrl=a.resolveUri(e.bundleUrl,e.bundleUrlRelativeTo)}})}if(M.settings&&!Array.isArray(M.settings)){M.settings=[M.settings]}h[v]=M}return h};S._createManifestModels=function(e,t){var n={};for(var a in e){var r=e[a];try{sap.ui.requireSync(r.type.replace(/\./g,"/"))}catch(e){f.error('Component Manifest: Class "'+r.type+'" for model "'+a+'" could not be loaded. '+e,'["sap.ui5"]["models"]["'+a+'"]',t);continue}var i=c.get(r.type);if(!i){f.error('Component Manifest: Class "'+r.type+'" for model "'+a+'" could not be found','["sap.ui5"]["models"]["'+a+'"]',t);continue}var o=[null].concat(r.settings||[]);var s=i.bind.apply(i,o);var u=new s;n[a]=u}return n};function _(t,n,a){var r={afterManifest:{},afterPreload:{}};var i=e.extend(true,{},t.getEntry("/sap.app/dataSources"));var o=e.extend(true,{},t.getEntry("/sap.ui5/models"));var s=S._createManifestModelConfigurations({models:o,dataSources:i,manifest:t,componentData:n,cacheTokens:a});var u=new p(window.location.href).get("sap-ui-xx-preload-component-models-"+t.getComponentName());var c=u&&u.split(",");for(var d in s){var l=s[d];if(!l.preload&&c&&c.indexOf(d)>-1){l.preload=true;f.warning('FOR TESTING ONLY!!! Activating preload for model "'+d+'" ('+l.type+")",t.getComponentName(),"sap.ui.core.Component")}if(l.type==="sap.ui.model.resource.ResourceModel"&&Array.isArray(l.settings)&&l.settings.length>0&&l.settings[0].async!==true){r.afterPreload[d]=l}else if(l.preload){if(sap.ui.loader._.getModuleState(l.type.replace(/\./g,"/")+".js")){r.afterManifest[d]=l}else{f.warning('Can not preload model "'+d+'" as required class has not been loaded: "'+l.type+'"',t.getComponentName(),"sap.ui.core.Component")}}}return r}function w(e){return sap.ui.require.toUrl(e.replace(/\./g,"/")+"/manifest.json")}function b(e,t){var n={};n[e.replace(/\./g,"/")]=t;sap.ui.loader.config({paths:n})}function O(e,t){var a=[];var r=[];function i(e,t){if(!e._oManifest){var o=e.getComponentName();var s=w(o);var u;if(t){u=Promise.resolve(JSON.parse(JSON.stringify(t.getRawJson())))}else{u=l.loadResource({url:s,dataType:"json",async:true}).catch(function(e){f.error('Failed to load component manifest from "'+s+'" (component '+o+")! Reason: "+e);return{}})}a.push(u);r.push(e)}var c=e.getParent();if(c&&c instanceof n&&!c.isBaseClass()){i(c)}}i(e,t);return Promise.all(a).then(function(e){for(var t=0;t<e.length;t++){if(e[t]){r[t]._applyManifest(e[t])}}})}S._fnLoadComponentCallback=null;S._fnOnInstanceCreated=null;S.create=function(e){if(e==null||typeof e!=="object"){throw new TypeError("Component.create() must be called with a configuration object.")}var t=r({},e);t.async=true;if(t.manifest===undefined){t.manifest=true}return P(t)};sap.ui.component=function(e){if(!e){throw new Error("sap.ui.component cannot be called without parameter!")}var t=function(e){return{type:"sap.ui.component",name:e}};if(typeof e==="string"){f.warning("Do not use deprecated function 'sap.ui.component' ("+e+") + for Component instance lookup. "+"Use 'Component.get' instead","sap.ui.component",null,t.bind(null,e));return sap.ui.getCore().getComponent(e)}if(e.async){f.info("Do not use deprecated factory function 'sap.ui.component' ("+e["name"]+"). "+"Use 'Component.create' instead","sap.ui.component",null,t.bind(null,e["name"]))}else{f.warning("Do not use synchronous component creation ("+e["name"]+")! "+"Use the new asynchronous factory 'Component.create' instead","sap.ui.component",null,t.bind(null,e["name"]))}return P(e)};function P(t){function n(n){var a=t.name,r=t.id,i=t.componentData,o=a+".Component",s=t.settings;var c=new n(e.extend({},s,{id:r,componentData:i,_cacheTokens:t.asyncHints&&t.asyncHints.cacheTokens}));u(c instanceof S,'The specified component "'+o+'" must be an instance of sap.ui.core.Component!');f.info("Component instance Id = "+c.getId());var p=c.getMetadata().handleValidation()!==undefined||t.handleValidation;if(p){if(c.getMetadata().handleValidation()!==undefined){p=c.getMetadata().handleValidation()}else{p=t.handleValidation}sap.ui.getCore().getMessageManager().registerObject(c,p)}C(c);if(typeof S._fnOnInstanceCreated==="function"){var d=S._fnOnInstanceCreated(c,t);if(t.async&&d instanceof Promise){return d.then(function(){return c})}}return c}var a=E(t,{failOnError:true,createModels:true,waitFor:t.asyncHints&&t.asyncHints.waitFor});if(t.async){var r=i._sOwnerId;return a.then(function(e){return M(function(){return n(e)},r)})}else{return n(a)}}S.load=function(e){var t=r({},e);t.async=true;if(t.manifest===undefined){t.manifest=true}return E(t,{preloadOnly:t.asyncHints&&t.asyncHints.preloadOnly})};S.get=function(e){return sap.ui.getCore().getComponent(e)};sap.ui.component.load=function(e,t){f.warning("Do not use deprecated function 'sap.ui.component.load'! Use 'Component.load' instead");return E(e,{failOnError:t,preloadOnly:e.asyncHints&&e.asyncHints.preloadOnly})};function E(n,a){var r=n.name,i=n.url,o=sap.ui.getCore().getConfiguration(),c=/^(sync|async)$/.test(o.getComponentPreload()),p=n.manifest,d,l,m,y,h,M;function C(e,a){var r=new t(JSON.parse(JSON.stringify(e)),a);return n.async?Promise.resolve(r):r}if(r&&i){b(r,i)}s.setStepComponent(r);if(p===undefined){d=n.manifestFirst===undefined?o.getManifestFirst():!!n.manifestFirst;l=n.manifestUrl}else{if(n.async===undefined){n.async=true}d=!!p;l=p&&typeof p==="string"?p:undefined;m=p&&typeof p==="object"?C(p,{url:n&&n.altManifestUrl}):undefined}if(!m&&l){m=t.load({manifestUrl:l,componentName:r,async:n.async})}if(m&&!n.async){r=m.getComponentName();if(r&&i){b(r,i)}}if(!(m&&n.async)){if(!r){throw new Error("The name of the component is undefined.")}u(typeof r==="string","sName must be a string")}if(d&&!m){m=t.load({manifestUrl:w(r),componentName:r,async:n.async,failOnError:false})}function P(){return(r+".Component").replace(/\./g,"/")}function E(e){var t=r+".Component";if(!e){var n="The specified component controller '"+t+"' could not be found!";if(a.failOnError){throw new Error(n)}else{f.warning(n)}}if(m){var i=v(e.getMetadata(),m);var o=function(){var t=Array.prototype.slice.call(arguments);var n;if(t.length===0||typeof t[0]==="object"){n=t[0]=t[0]||{}}else if(typeof t[0]==="string"){n=t[1]=t[1]||{}}n._metadataProxy=i;if(y){n._manifestModels=y}var a=Object.create(e.prototype);e.apply(a,t);return a};o.getMetadata=function(){return i};o.extend=function(){throw new Error("Extending Components created by Manifest is not supported!")};return o}else{return e}}function U(t,n){u(typeof t==="string"&&t||typeof t==="object"&&typeof t.name==="string"&&t.name,"reference either must be a non-empty string or an object with a non-empty 'name' and an optional 'url' property");if(typeof t==="object"){if(t.url){if(typeof t.url==="object"){if(t.url.final){e.sap.registerModulePath(t.name,t.url)}else{b(t.name,t.url.url)}}else{b(t.name,t.url)}}return t.lazy&&n!==true?undefined:t.name}return t}function x(e,t){var n=e+".Component",a=sap.ui.getCore().getConfiguration().getDepCache(),r;if(c&&e!=null&&!sap.ui.loader._.getModuleState(n.replace(/\./g,"/")+".js")){if(t){r=n.replace(/\./g,"/")+(a?"-h2-preload.js":"-preload.js");return sap.ui.loader._.loadJSResourceAsync(r,true)}try{r=n+"-preload";sap.ui.requireSync(r.replace(/\./g,"/"))}catch(e){f.warning("couldn't preload component from "+r+": "+(e&&e.message||e))}}else if(t){return Promise.resolve()}}function j(e,t,n){var a=[];var r=n?function(e){a.push(e)}:function(){};t.defineResourceRoots();var i=t.getEntry("/sap.ui5/dependencies/libs");if(i){var o=[];for(var s in i){if(!i[s].lazy){o.push(s)}}if(o.length>0){f.info('Component "'+e+'" is loading libraries: "'+o.join(", ")+'"');r(sap.ui.getCore().loadLibraries(o,{async:n}))}}var u=t.getEntry("/sap.ui5/extends/component");if(u){r(x(u,n))}var c=[];var p=t.getEntry("/sap.ui5/dependencies/components");if(p){for(var e in p){if(!p[e].lazy){c.push(e)}}}var d=t.getEntry("/sap.ui5/componentUsages");if(d){for(var l in d){if(d[l].lazy===false&&c.indexOf(d[l].name)===-1){c.push(d[l].name)}}}if(c.length>0){c.forEach(function(e){r(x(e,n))})}return n?Promise.all(a):undefined}if(n.async){var k=n.asyncHints||{},A=[],D=function(e){e=e.then(function(e){return{result:e,rejected:false}},function(e){return{result:e,rejected:true}});return e},N=function(e){if(e){A.push(D(e))}},I=function(e){return e},R,B;if(m&&a.createModels){N(m.then(function(e){h=_(e,n.componentData,k.cacheTokens);return e}).then(function(e){if(Object.keys(h.afterManifest).length>0){y=S._createManifestModels(h.afterManifest,e.getComponentName())}return e}))}R=[];if(Array.isArray(k.preloadBundles)){k.preloadBundles.forEach(function(e){R.push(sap.ui.loader._.loadJSResourceAsync(U(e,true),true))})}if(Array.isArray(k.libs)){B=k.libs.map(U).filter(I);R.push(sap.ui.getCore().loadLibraries(B,{preloadOnly:true}))}R=Promise.all(R);if(B&&!a.preloadOnly){R=R.then(function(){return sap.ui.getCore().loadLibraries(B)})}N(R);if(!m){N(x(r,true))}else{N(m.then(function(e){var t=e.getComponentName();if(i){b(t,i)}return x(t,true).then(function(){return e._processI18n(true)}).then(function(){if(!a.createModels){return null}var n=Object.keys(h.afterPreload);if(n.length===0){return null}return new Promise(function(e,t){sap.ui.require(["sap/ui/model/resource/ResourceModel"],function(t){e(t)},t)}).then(function(a){function r(e){var n=h.afterPreload[e];if(Array.isArray(n.settings)&&n.settings.length>0){var r=n.settings[0];return a.loadResourceBundle(r,true).then(function(e){r.bundle=e},function(n){f.error("Component Manifest: Could not preload ResourceBundle for ResourceModel. "+"The model will be skipped here and tried to be created on Component initialization.",'["sap.ui5"]["models"]["'+e+'"]',t);f.error(n);delete h.afterPreload[e]})}else{return Promise.resolve()}}return Promise.all(n.map(r)).then(function(){if(Object.keys(h.afterPreload).length>0){var t=S._createManifestModels(h.afterPreload,e.getComponentName());if(!y){y={}}for(var n in t){y[n]=t[n]}}})})})}));M=function(t){if(typeof S._fnLoadComponentCallback==="function"){var a=e.extend(true,{},n);var r=e.extend(true,{},t);try{S._fnLoadComponentCallback(a,r)}catch(e){f.error('Callback for loading the component "'+m.getComponentName()+'" run into an error. The callback was skipped and the component loading resumed.',e,"sap.ui.core.Component")}}}}if(k.components){e.each(k.components,function(e,t){N(x(U(t),true))})}return Promise.all(A).then(function(e){var t=[],n=false,a;n=e.some(function(e){if(e&&e.rejected){a=e.result;return true}t.push(e.result)});if(n){return Promise.reject(a)}return t}).then(function(e){if(m&&M){m.then(M)}return e}).then(function(e){f.debug("Component.load: all promises fulfilled, then "+e);if(m){return m.then(function(e){m=e;r=m.getComponentName();return j(r,m,true)})}else{return e}}).then(function(){if(a.preloadOnly){return true}return new Promise(function(e,t){sap.ui.require([P()],function(t){e(t)},t)}).then(function(e){var t=e.getMetadata();var n=t.getComponentName();var a=w(n);var r;if(m&&typeof p!=="object"&&(typeof l==="undefined"||l===a)){r=O(t,m)}else{r=O(t)}return r.then(function(){return E(e)})})}).then(function(t){if(!m){return t}var n=[];var a;var r=m.getEntry("/sap.ui5/rootView");if(typeof r==="string"){a="XML"}else if(r&&typeof r==="object"&&r.type){a=r.type}if(a&&g[a]){var i="sap/ui/core/mvc/"+g[a]+"View";n.push(i)}var o=m.getEntry("/sap.ui5/routing");if(o&&o.routes){var s=m.getEntry("/sap.ui5/routing/config/routerClass")||"sap.ui.core.routing.Router";var u=s.replace(/\./g,"/");n.push(u)}var c=e.extend(true,{},m.getEntry("/sap.ui5/models"));var p=e.extend(true,{},m.getEntry("/sap.app/dataSources"));var d=S._createManifestModelConfigurations({models:c,dataSources:p,manifest:m,cacheTokens:k.cacheTokens});for(var l in d){if(!d.hasOwnProperty(l)){continue}var y=d[l];if(!y.type){continue}var h=y.type.replace(/\./g,"/");if(n.indexOf(h)===-1){n.push(h)}}if(n.length>0){return Promise.all(n.map(function(e){return new Promise(function(t,n){var a=false;function r(n){if(a){return}f.warning('Can not preload module "'+e+'". '+"This will most probably cause an error once the module is used later on.",m.getComponentName(),"sap.ui.core.Component");f.warning(n);a=true;t()}sap.ui.require([e],t,r)})})).then(function(){return t})}else{return t}}).then(function(e){var t=a.waitFor;if(t){var n=Array.isArray(t)?t:[t];return Promise.all(n).then(function(){return e})}return e}).catch(function(e){if(y){for(var t in y){var n=y[t];if(n&&typeof n.destroy==="function"){n.destroy()}}}throw e})}if(m){j(r,m)}x(r);return E(sap.ui.requireSync(P()))}return S});