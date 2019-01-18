/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/base/util/UriParameters","sap/ui/thirdparty/jquery","sap/ui/support/RuleAnalyzer","sap/ui/support/library"],function(e,s,t,r,i,n){"use strict";var u=s.extend("sap.ui.core.support.RuleEngineOpaExtension",{metadata:{publicMethods:["getAssertions"]},onAfterInit:function(){var e=sap.ui.getCore().getLoadedLibraries()["sap.ui.support"],s=r.Deferred();if(!e){sap.ui.require(["sap/ui/support/Bootstrap"],function(e){e.initSupportRules(["true","silent"],{onReady:function(){s.resolve()}})})}else{s.resolve()}return s.promise()},getAssertions:function(){var e=function(){return new t(window.location.href).get("sap-skip-rules-issues")=="true"};var s=function(){var e=window.parent;e._$files=e._$files||[];return e};return{noRuleFailures:function(s){var t=r.Deferred(),s=s[0]||{},n=s["failOnAnyIssues"],u=s["failOnHighIssues"],o=s.rules,a=s.preset,l=s.executionScope;i.analyze(l,o||a).then(function(){var s=i.getAnalysisHistory(),r={issues:[]};if(s.length){r=s[s.length-1]}var o=r.issues.reduce(function(e,s){e[s.severity.toLowerCase()]+=1;return e},{high:0,medium:0,low:0});var a=r.issues.length===0;if(u){a=o.high===0}else if(n===false||u===false){a=true}if(e()){a=true}t.resolve({result:a,message:"Support Assistant issues found: [High: "+o.high+", Medium: "+o.medium+", Low: "+o.low+"]",expected:"0 high 0 medium 0 low",actual:o.high+" high "+o.medium+" medium "+o.low+" low"})});return t.promise()},getFinalReport:function(){var s=r.Deferred(),t=i.getFormattedAnalysisHistory(),n=i.getAnalysisHistory(),u=n.reduce(function(e,s){return e+s.issues.length},0),o=u===0,a="Support Assistant Analysis History",l=a;if(o){a+=" - no issues found"}else if(e()){o=true;a+=' - issues are found. To see them remove the "sap-skip-rules-issues=true" URI parameter'}s.resolve({result:o,message:a,actual:l,expected:t});return s.promise()},getReportAsFileInFormat:function(e){var t,u,e=e[0]||{},o=r.Deferred(),a=e["historyFormat"],l=e["fileName"];switch(a){case n.HistoryFormats.Abap:if(!l){l="abap-report.json"}u=i.getFormattedAnalysisHistory(a);break;case n.HistoryFormats.String:if(!l){l="string-report.json"}u=i.getFormattedAnalysisHistory(a);break;default:if(!l){l="report.json"}u=i.getAnalysisHistory()}t=s();t._$files.push({name:l,content:JSON.stringify(u)});o.resolve({result:true,message:"Support Assistant Analysis History was stored in window._$files with following name "+l,actual:true,expected:true});return o.promise()}}}});return u});