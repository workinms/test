/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/_OpaLogger","sap/ui/thirdparty/jquery"],function(t,e,i){"use strict";var s="http://localhost:8090";var n=e.getLogger("sap.ui.test._UsageReport");var o=t.extend("sap.ui.test._UsageReport",{constructor:function(t){this.enabled=t&&t.enableUsageReport;this.baseUrl=(t&&t.usageReportUrl||s)+"/api/opa/suites/";if(this.enabled){n.info("Enabled OPA usage report")}var e=sap.ui.test._UsageReport.prototype;Object.keys(e).forEach(function(t){var s=["constructor","getMetadata"].indexOf(t)>-1;if(e.hasOwnProperty(t)&&i.isFunction(e[t])&&!s){var n=e[t];e[t]=function(){if(this.enabled){return n.apply(this,arguments)}}}})},begin:function(t){this._suiteBeginPromise=r(this.baseUrl+"begin",t).done(function(t){this._id=t.id;n.debug("Begin report with ID "+t.id)}.bind(this)).fail(function(t){n.debug("Failed to begin report. Error: "+JSON.stringify(t))})},moduleUpdate:function(t){this._postSuiteJson("/modules",t).done(function(e){n.debug("Sent report for module "+t.name)}).fail(function(e){n.debug("Failed to send report for module '"+t.name+"'. Error: "+JSON.stringify(e))})},testDone:function(t){if(this._isOpaEmpty){this._reportTest(t);this._isOpaEmpty=false}else{this._QUnitTimeoutTest=t}},opaEmpty:function(t){this._isOpaEmpty=true;if(this._QUnitTimeoutTest){var e=this._QUnitTimeoutTest.assertions;e[e.length-1].message+="\n"+t.errorMessage;this._reportTest(this._QUnitTimeoutTest);this._QUnitTimeoutTest=null}},done:function(t){this._postSuiteJson("/done",t).done(function(t){n.debug("Completed report with ID "+this._id)}.bind(this)).fail(function(t){n.debug("Failed to complete report with ID "+this._id+". Error: "+JSON.stringify(t))}.bind(this))},_reportTest:function(t){this._postSuiteJson("/tests",t).done(function(e){n.debug("Sent report for test "+t.name)}).fail(function(e){n.debug("Failed send report for test '"+t.name+"'. Error: "+JSON.stringify(e))})},_postSuiteJson:function(t,e){var s=this._suiteBeginPromise||i.Deferred().resolve().promise();return s.done(function(){return r.call(this,this.baseUrl+this._id+t,e)}.bind(this))}});function r(t,e){return i.ajax({url:t,type:"XHR_WAITER_IGNORE:POST",data:e,dataType:"json"})}return o});