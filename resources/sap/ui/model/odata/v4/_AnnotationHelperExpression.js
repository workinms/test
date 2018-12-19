/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../_AnnotationHelperBasics","sap/base/Log","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/performance/Measurement"],function(e,t,r,a,n){"use strict";var s="sap.ui.model.odata.v4.AnnotationHelper",i=[s],o=s+"/getExpression",u,l=/^\{@i18n>[^\\\{\}:]+\}$/,p={And:"&&",Eq:"===",Ge:">=",Gt:">",Le:"<=",Lt:"<",Ne:"!==",Not:"!",Or:"||"},c=false,d={"Edm.Boolean":"boolean","Edm.Byte":"number","Edm.Date":"Date","Edm.DateTimeOffset":"DateTimeOffset","Edm.Decimal":"Decimal","Edm.Double":"number","Edm.Guid":"string","Edm.Int16":"number","Edm.Int32":"number","Edm.Int64":"Decimal","Edm.SByte":"number","Edm.Single":"number","Edm.String":"string","Edm.TimeOfDay":"TimeOfDay"},m={Bool:"Edm.Boolean",Float:"Edm.Double",Date:"Edm.Date",DateTimeOffset:"Edm.DateTimeOffset",Decimal:"Edm.Decimal",Guid:"Edm.Guid",Int:"Edm.Int64",Int32:"Edm.Int32",String:"Edm.String",TimeOfDay:"Edm.TimeOfDay"},f={boolean:false,Date:false,DateTimeOffset:true,Decimal:true,number:false,string:false,TimeOfDay:false};function y(t,r){e.error(t,r,s)}u={adjustOperands:function(e,t){if(e.result!=="constant"&&e.category==="number"&&t.result==="constant"&&t.type==="Edm.Int64"){t.category="number"}if(e.result!=="constant"&&e.category==="Decimal"&&t.result==="constant"&&t.type==="Edm.Int32"){t.category="Decimal";t.type=e.type}},apply:function(t,r){var a=e.descend(t,"$Function","string");switch(a.value){case"odata.concat":return u.concat(r);case"odata.fillUriTemplate":return u.fillUriTemplate(r);case"odata.uriEncode":return u.uriEncode(r);default:y(a,"unknown function: "+a.value)}},concat:function(t){var r=t.asExpression,a=[],n,s=[];e.expectType(t,"array");t.value.forEach(function(e,a){n=u.parameter(t,a);r=r||n.result==="expression";s.push(n)});s.forEach(function(t){if(r){u.wrapExpression(t)}if(t.type!=="edm:Null"){a.push(e.resultToString(t,r))}});n=r?{result:"expression",value:a.join("+")}:{result:"composite",value:a.join("")};n.type="Edm.String";return n},conditional:function(t){var r=u.parameter(t,0,"Edm.Boolean"),a=u.parameter(t,1),n=u.parameter(t,2),s=a.type;if(a.type==="edm:Null"){s=n.type}else if(n.type!=="edm:Null"&&a.type!==n.type){y(t,"Expected same type for second and third parameter, types are '"+a.type+"' and '"+n.type+"'")}return{result:"expression",type:s,value:e.resultToString(u.wrapExpression(r),true)+"?"+e.resultToString(u.wrapExpression(a),true)+":"+e.resultToString(u.wrapExpression(n),true)}},constant:function(e,t){var r=e.value;if(t==="String"){if(l.test(r)){return{ignoreTypeInPath:true,result:"binding",type:"Edm.String",value:r.slice(1,-1)}}}return{result:"constant",type:m[t],value:r}},expression:function(t){var r=t.value,a=t,n;if(r===null){n="Null"}else if(typeof r==="boolean"){n="Bool"}else if(typeof r==="number"){n=isFinite(r)&&Math.floor(r)===r?"Int32":"Float"}else if(typeof r==="string"){n="String"}else{e.expectType(t,"object");["$And","$Apply","$Date","$DateTimeOffset","$Decimal","$Float","$Eq","$Ge","$Gt","$Guid","$If","$Int","$Le","$Lt","$Ne","$Not","$Null","$Or","$Path","$PropertyPath","$TimeOfDay"].forEach(function(s){if(r.hasOwnProperty(s)){n=s.slice(1);a=e.descend(t,s)}})}switch(n){case"Apply":return u.apply(t,a);case"If":return u.conditional(a);case"Path":case"PropertyPath":return u.path(a);case"Date":case"DateTimeOffset":case"Decimal":case"Guid":case"Int":case"String":case"TimeOfDay":e.expectType(a,"string");case"Bool":case"Float":case"Int32":return u.constant(a,n);case"And":case"Eq":case"Ge":case"Gt":case"Le":case"Lt":case"Ne":case"Or":return u.operator(a,n);case"Not":return u.not(a);case"Null":return{result:"constant",type:"edm:Null",value:null};default:y(t,"Unsupported OData expression")}},fillUriTemplate:function(t){var r,a,n,s=t.value,i=[],o="",l,p=u.parameter(t,0,"Edm.String");i.push("odata.fillUriTemplate(",e.resultToString(p,true),",{");for(r=1;r<s.length;r+=1){n=e.descend(t,r,"object");a=e.property(n,"$Name","string");l=u.expression(e.descend(n,"$LabeledElement",true));i.push(o,e.toJSON(a),":",e.resultToString(l,true));o=","}i.push("})");return{result:"expression",type:"Edm.String",value:i.join("")}},formatOperand:function(t,r,a,n){if(a.result==="constant"){switch(a.category){case"boolean":case"number":return String(a.value)}}if(n){u.wrapExpression(a)}return e.resultToString(a,true)},getExpression:function(l){var p;if(l.value===undefined){return undefined}n.average(o,"",i);if(!c&&a.bindingParser===r.simpleParser){t.warning("Complex binding syntax not active",null,s);c=true}try{p=u.expression(l);n.end(o);return e.resultToString(p,false)}catch(t){n.end(o);if(t instanceof SyntaxError){return"Unsupported: "+r.complexParser.escape(e.toErrorString(l.value))}throw t}},not:function(t){var r;t.asExpression=true;r=u.expression(t);return{result:"expression",type:"Edm.Boolean",value:"!"+e.resultToString(u.wrapExpression(r),true)}},operator:function(e,t){var r=t==="And"||t==="Or"?"Edm.Boolean":undefined,a,n=u.parameter(e,0,r),s=u.parameter(e,1,r),i="",o,l;if(n.type!=="edm:Null"&&s.type!=="edm:Null"){n.category=d[n.type];s.category=d[s.type];u.adjustOperands(n,s);u.adjustOperands(s,n);if(n.category!==s.category){y(e,"Expected two comparable parameters but instead saw "+n.type+" and "+s.type)}switch(n.category){case"Decimal":i=",'Decimal'";break;case"DateTimeOffset":i=",'DateTime'";break}a=f[n.category]}o=u.formatOperand(e,0,n,!a);l=u.formatOperand(e,1,s,!a);return{result:"expression",type:"Edm.Boolean",value:a?"odata.compare("+o+","+l+i+")"+p[t]+"0":o+p[t]+l}},parameter:function(t,r,a){var n=e.descend(t,r,true),s=u.expression(n);if(a&&a!==s.type){y(n,"Expected "+a+" but instead saw "+s.type)}return s},path:function(t){e.expectType(t,"string");return{result:"binding",type:t.model.getProperty(t.path+"/$Type"),value:t.value}},uriEncode:function(t){var r=u.parameter(t,0);return{result:"expression",type:"Edm.String",value:r.type==="Edm.String"?"odata.uriEncode("+e.resultToString(r,true)+","+e.toJSON(r.type)+")":"String("+e.resultToString(r,true)+")"}},wrapExpression:function(e){if(e.result==="expression"){e.value="("+e.value+")"}return e}};return u},false);