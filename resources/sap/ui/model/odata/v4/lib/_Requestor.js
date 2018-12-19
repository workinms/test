/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Batch","./_GroupLock","./_Helper","./_V2Requestor","sap/base/Log","sap/base/util/deepEqual","sap/ui/base/SyncPromise","sap/ui/thirdparty/jquery"],function(e,t,r,n,o,s,i,a){"use strict";var u={Accept:"multipart/mixed"},c;function h(e){var t;e=e.toLowerCase();for(t in this.headers){if(t.toLowerCase()===e){return this.headers[t]}}}function f(e,t,n,o){this.mBatchQueue={};this.mHeaders=t||{};this.oModelInterface=o;this.sQueryParams=r.buildQuery(n);this.mRunningChangeRequests={};this.oSecurityTokenPromise=null;this.iSessionTimer=0;this.iSerialNumber=0;this.sServiceUrl=e}f.prototype.mFinalHeaders={"Content-Type":"application/json;charset=UTF-8;IEEE754Compatible=true"};f.prototype.mPredefinedPartHeaders={Accept:"application/json;odata.metadata=minimal;IEEE754Compatible=true"};f.prototype.mPredefinedRequestHeaders={Accept:"application/json;odata.metadata=minimal;IEEE754Compatible=true","OData-MaxVersion":"4.0","OData-Version":"4.0","X-CSRF-Token":"Fetch"};f.prototype.addChangeSet=function(e){var t=[],r=this.getOrCreateBatchQueue(e);t.iSerialNumber=this.getSerialNumber();r.iChangeSet+=1;r.splice(r.iChangeSet,0,t)};f.prototype.batchRequestSent=function(e,t){if(t){if(e in this.mRunningChangeRequests){this.mRunningChangeRequests[e]+=1}else{this.mRunningChangeRequests[e]=1}}};f.prototype.batchResponseReceived=function(e,t){if(t){this.mRunningChangeRequests[e]-=1;if(this.mRunningChangeRequests[e]===0){delete this.mRunningChangeRequests[e]}}};f.prototype.buildQueryString=function(e,t,n,o){return r.buildQuery(this.convertQueryOptions(e,t,n,o))};f.prototype.cancelChanges=function(e){if(this.mRunningChangeRequests[e]){throw new Error("Cannot cancel the changes for group '"+e+"', the batch request is running")}this.cancelChangesByFilter(function(){return true},e)};f.prototype.cancelChangesByFilter=function(e,t){var r=false,n=this;function o(t){var o=n.mBatchQueue[t],s,i,a,u;i=o[0];for(u=i.length-1;u>=0;u--){s=i[u];if(s.$cancel&&e(s)){s.$cancel();a=new Error("Request canceled: "+s.method+" "+s.url+"; group: "+t);a.canceled=true;s.$reject(a);i.splice(u,1);r=true}}}if(t){if(this.mBatchQueue[t]){o(t)}}else{for(t in this.mBatchQueue){o(t)}}return r};f.prototype.cleanUpChangeSets=function(e){var t,r=false,n;function o(e){if(!s(e)){t.push(e)}}function s(e){if(e.method!=="PATCH"){return false}return t.some(function(t){if(t.method==="PATCH"&&t.headers["If-Match"]===e.headers["If-Match"]){a.extend(true,t.body,e.body);e.$resolve(t.$promise);return true}})}for(n=e.iChangeSet;n>=0;n-=1){t=[];e[n].forEach(o);if(t.length===0){e.splice(n,1)}else if(t.length===1&&this.isChangeSetOptional()){e[n]=t[0]}else{e[n]=t}r=r||t.length>0}return r};f.prototype.clearSessionContext=function(){delete this.mHeaders["SAP-ContextId"];if(this.iSessionTimer){clearInterval(this.iSessionTimer);this.iSessionTimer=0}};f.prototype.convertExpand=function(e,t){var r,n=[],o=this;if(!e||typeof e!=="object"){throw new Error("$expand must be a valid object")}r=Object.keys(e);if(t){r=r.sort()}r.forEach(function(r){var s=e[r];if(s&&typeof s==="object"){n.push(o.convertExpandOptions(r,s,t))}else{n.push(r)}});return n.join(",")};f.prototype.convertExpandOptions=function(e,t,r){var n=[];this.doConvertSystemQueryOptions(undefined,t,function(e,t){n.push(e+"="+t)},undefined,r);return n.length?e+"("+n.join(";")+")":e};f.prototype.convertQueryOptions=function(e,t,r,n){var o={};if(!t){return undefined}this.doConvertSystemQueryOptions(e,t,function(e,t){o[e]=t},r,n);return o};f.prototype.convertResourcePath=function(e){return e};f.prototype.destroy=function(){this.clearSessionContext()};f.prototype.doCheckVersionHeader=function(e,t,r){var n=e("OData-Version"),o=!n&&e("DataServiceVersion");if(o){throw new Error("Expected 'OData-Version' header with value '4.0' but received"+" 'DataServiceVersion' header with value '"+o+"' in response for "+this.sServiceUrl+t)}if(n==="4.0"||!n&&r){return}throw new Error("Expected 'OData-Version' header with value '4.0' but received value '"+n+"' in response for "+this.sServiceUrl+t)};f.prototype.doConvertResponse=function(e,t){return e};f.prototype.doConvertSystemQueryOptions=function(e,t,r,n,o){var s=this;Object.keys(t).forEach(function(e){var i=t[e];if(n&&e[0]==="$"){return}switch(e){case"$expand":i=s.convertExpand(i,o);break;case"$select":if(Array.isArray(i)){i=o?i.sort().join(","):i.join(",")}break;default:}r(e,i)})};f.prototype.fetchMetadata=function(e){return this.oModelInterface.fnFetchMetadata(e)};f.prototype.fetchTypeForPath=function(e,t){return this.fetchMetadata(e+(t?"/$Type":"/"))};f.prototype.formatPropertyAsLiteral=function(e,t){return r.formatLiteral(e,t.$Type)};f.prototype.getGroupSubmitMode=function(e){return this.oModelInterface.fnGetGroupProperty(e,"submit")};f.prototype.getModelInterface=function(){return this.oModelInterface};f.prototype.getOrCreateBatchQueue=function(e){var t,r=this.mBatchQueue[e];if(!r){t=[];t.iSerialNumber=0;r=this.mBatchQueue[e]=[t];r.iChangeSet=0;if(this.oModelInterface.fnOnCreateGroup){this.oModelInterface.fnOnCreateGroup(e)}}return r};f.prototype.getPathAndAddQueryOptions=function(e,t,r){var n=[],o,s={},i,a=this;e=e.slice(1,-5);if(t.$Parameter){t.$Parameter.forEach(function(e){s[e.$Name]=e})}if(t.$kind==="Function"){for(o in r){i=s[o];if(i){if(i.$isCollection){throw new Error("Unsupported collection-valued parameter: "+o)}n.push(encodeURIComponent(o)+"="+encodeURIComponent(a.formatPropertyAsLiteral(r[o],i)))}}e+="("+n.join(",")+")"}else{for(o in r){if(!(o in s)){delete r[o]}}}return e};f.prototype.getSerialNumber=function(){this.iSerialNumber+=1;return this.iSerialNumber};f.prototype.getServiceUrl=function(){return this.sServiceUrl};f.prototype.hasChanges=function(e,t){var r=this.mBatchQueue[e];if(r){return r[0].some(function(e){return e.headers["If-Match"]===t})}return false};f.prototype.hasPendingChanges=function(){var e,t;for(e in this.mBatchQueue){t=this.mBatchQueue[e][0].some(function(e){return e.$cancel});if(t){return true}}return Object.keys(this.mRunningChangeRequests).length>0};f.prototype.isActionBodyOptional=function(){return false};f.prototype.isChangeSetOptional=function(){return true};f.prototype.ready=function(){return i.resolve()};f.prototype.refreshSecurityToken=function(e){var t=this;if(!this.oSecurityTokenPromise){if(e!==this.mHeaders["X-CSRF-Token"]){return Promise.resolve()}this.oSecurityTokenPromise=new Promise(function(e,n){a.ajax(t.sServiceUrl+t.sQueryParams,{method:"HEAD",headers:{"X-CSRF-Token":"Fetch"}}).then(function(r,n,o){t.mHeaders["X-CSRF-Token"]=o.getResponseHeader("X-CSRF-Token");t.oSecurityTokenPromise=null;e()},function(e,o,s){t.oSecurityTokenPromise=null;n(r.createError(e))})})}return this.oSecurityTokenPromise};f.prototype.relocate=function(e,r,n){var o=this.mBatchQueue[e],s=this,i=o&&o[0].some(function(e,i){if(e.body===r){s.request(e.method,e.url,new t(n),e.headers,r,e.$submit,e.$cancel).then(e.$resolve,e.$reject);o[0].splice(i,1);return true}});if(!i){throw new Error("Request not found in group '"+e+"'")}};f.prototype.relocateAll=function(e,r,n){var o=0,s=this.mBatchQueue[e],i=this;if(s){s[0].slice().forEach(function(e){if(e.headers["If-Match"]===r){s[0].splice(o,1);i.request(e.method,e.url,new t(n),e.headers,e.body,e.$submit,e.$cancel).then(e.$resolve,e.$reject)}else{o+=1}})}};f.prototype.removePatch=function(e){var t=this.cancelChangesByFilter(function(t){return t.$promise===e});if(!t){throw new Error("Cannot reset the changes, the batch request is running")}};f.prototype.removePost=function(e,t){var r=this.cancelChangesByFilter(function(e){return e.body===t},e);if(!r){throw new Error("Cannot reset the changes, the batch request is running")}};f.prototype.reportBoundMessages=function(e,t,r){this.oModelInterface.fnReportBoundMessages(e,t,r)};f.prototype.reportUnboundMessages=function(e,t){this.oModelInterface.fnReportUnboundMessages(e,JSON.parse(t||null))};f.prototype.request=function(e,t,r,n,o,s,i,u,h,f){var p,d,l=r&&r.getGroupId()||"$direct",m,y=Infinity,g,S=this;if(l==="$cached"){d=new Error("Unexpected request: "+e+" "+t);d.$cached=true;throw d}if(r){r.unlock();y=r.getSerialNumber()}t=this.convertResourcePath(t);h=h||t;if(this.getGroupSubmitMode(l)!=="Direct"){m=new Promise(function(r,c){var d=S.getOrCreateBatchQueue(l);g={method:e,url:t,headers:a.extend({},S.mPredefinedPartHeaders,S.mHeaders,n,S.mFinalHeaders),body:o,$cancel:i,$metaPath:u,$reject:c,$resolve:r,$resourcePath:h,$submit:s};if(e==="GET"){d.push(g)}else if(f){d[0].unshift(g)}else{p=d.iChangeSet;while(d[p].iSerialNumber>y){p-=1}d[p].push(g)}});g.$promise=m;return m}if(s){s()}return this.sendRequest(e,t,a.extend({},n,this.mFinalHeaders),JSON.stringify(c.cleanPayload(o)),h).then(function(e){S.reportUnboundMessages(e.resourcePath,e.messages);return S.doConvertResponse(e.body,u)})};f.prototype.sendBatch=function(t){var r=e.serializeBatchRequest(t);return this.sendRequest("POST","$batch"+this.sQueryParams,a.extend(r.headers,u),r.body).then(function(t){if(t.messages!==null){throw new Error("Unexpected 'sap-messages' response header for batch request")}return e.deserializeBatchResponse(t.contentType,t.body)})};f.prototype.sendRequest=function(e,t,n,o,s){var i=this.sServiceUrl+t,u=this;return new Promise(function(c,h){function f(p){var d=u.mHeaders["X-CSRF-Token"];return a.ajax(i,{data:o,headers:a.extend({},u.mPredefinedRequestHeaders,u.mHeaders,r.resolveIfMatchHeader(n)),method:e}).then(function(e,r,n){try{u.doCheckVersionHeader(n.getResponseHeader,t,!e)}catch(e){h(e);return}u.mHeaders["X-CSRF-Token"]=n.getResponseHeader("X-CSRF-Token")||u.mHeaders["X-CSRF-Token"];u.setSessionContext(n.getResponseHeader("SAP-ContextId"),n.getResponseHeader("Keep-Alive"));c({body:e,contentType:n.getResponseHeader("Content-Type"),messages:n.getResponseHeader("sap-messages"),resourcePath:t})},function(e,t,n){var o=e.getResponseHeader("SAP-ContextId"),a=e.getResponseHeader("X-CSRF-Token");if(!p&&e.status===403&&a&&a.toLowerCase()==="required"){u.refreshSecurityToken(d).then(function(){f(true)},h)}else{if(o){u.setSessionContext(o,e.getResponseHeader("Keep-Alive"))}else if(e.getResponseHeader("SAP-Err-Id")==="ICMENOSESSION"){u.clearSessionContext()}h(r.createError(e,i,s))}})}if(u.oSecurityTokenPromise&&e!=="GET"){return u.oSecurityTokenPromise.then(f)}return f()})};f.prototype.setSessionContext=function(e,t){var r=/\btimeout=(\d+)/.exec(t),n=r&&parseInt(r[1]),s=Date.now()+15*60*1e3,i=this;this.clearSessionContext();if(e){i.mHeaders["SAP-ContextId"]=e;if(n>=60){this.iSessionTimer=setInterval(function(){if(Date.now()>=s){i.clearSessionContext()}else{a.ajax(i.sServiceUrl+i.sQueryParams,{method:"HEAD",headers:{"SAP-ContextId":i.mHeaders["SAP-ContextId"]}}).fail(function(e){if(e.getResponseHeader("SAP-Err-Id")==="ICMENOSESSION"){i.clearSessionContext()}})}},(n-5)*1e3)}else if(t){o.warning("Unsupported Keep-Alive header",t,"sap.ui.model.odata.v4.lib._Requestor")}}};f.prototype.submitBatch=function(e){var t,n=this.mBatchQueue[e]||[],o=this;function s(e,t){var n;e.forEach(function(e,i){var u,c,f=t[i];if(Array.isArray(f)){s(e,f)}else if(!f){u=new Error("HTTP request was not processed because the previous request failed");u.cause=n;e.$reject(u)}else if(f.status>=400){f.getResponseHeader=h;n=r.createError(f,e.url,e.$resourcePath);a(n,e)}else if(f.responseText){c=JSON.parse(f.responseText);try{o.doCheckVersionHeader(h.bind(f),e.url,true);o.reportUnboundMessages(e.url,h.call(f,"sap-messages"));e.$resolve(o.doConvertResponse(c,e.$metaPath))}catch(t){e.$reject(t)}}else{o.reportUnboundMessages(e.url,h.call(f,"sap-messages"));e.$resolve()}})}function i(e){if(Array.isArray(e)){e.forEach(i)}else if(e.$submit){e.$submit()}}function a(e,t){if(Array.isArray(t)){t.forEach(a.bind(null,e))}else{t.$reject(e)}}delete this.mBatchQueue[e];i(n);t=this.cleanUpChangeSets(n);if(n.length===0){return Promise.resolve()}this.batchRequestSent(e,t);return this.sendBatch(c.cleanBatch(n)).then(function(r){o.batchResponseReceived(e,t);s(n,r)}).catch(function(r){var s=new Error("HTTP request was not processed because $batch failed");function i(e){e.forEach(function(e){if(Array.isArray(e)){i(e)}else{e.$reject(s)}})}o.batchResponseReceived(e,t);s.cause=r;i(n);throw r})};c={cleanBatch:function(e){e.forEach(function(e){if(Array.isArray(e)){c.cleanBatch(e)}else{e.body=c.cleanPayload(e.body)}});return e},cleanPayload:function(e){var t=e;if(t){Object.keys(t).forEach(function(r){if(r.indexOf("@$ui5.")===0){if(t===e){t=a.extend({},e)}delete t[r]}})}return t},create:function(e,t,r,o,s){var i=new f(e,r,o,t);if(s==="2.0"){n(i)}return i}};return c},false);