/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,s=e.Severity,a=e.Audiences;var i=function(e){return e.getDomRef().getBoundingClientRect().height};var n={id:"messagePageShouldNotBeInAContainerWithoutSetHeight",audiences:[a.Application],categories:[t.Usability],enabled:true,minversion:"1.28",title:"Message Page: In a container without set height",description:"Message Page should not be used in a container which has no set height",resolution:"Use Message Page in a container with set height, such as sap.m.App",resolutionurls:[{text:"sap.m.MessagePage API Reference",href:"https://openui5.hana.ondemand.com/#/api/sap.m.MessagePage"}],check:function(e,t,a){a.getElementsByClassName("sap.m.MessagePage").forEach(function(t){var a=t.getId(),n=i(t),o=t.getShowHeader()?i(t.getAggregation("_internalHeader")):0,g=n-o;if(t.getParent()===t.getUIArea()&&g<=0){e.addIssue({severity:s.High,details:"Message Page"+" ("+a+") is used in a container which has no height set.",context:{id:a}})}})}};var o={id:"messagePageShouldNotBeTopLevel",audiences:[a.Application],categories:[t.Usability],enabled:true,minversion:"1.28",title:"Message Page: Top-level control",description:"Message Page should not be a top-level control",resolution:"Use Message Page as described in the SAP Fiori Design Guidelines",resolutionurls:[{text:"SAP Fiori Design Guidelines: Message Page",href:"https://experience.sap.com/fiori-design-web/message-page"}],check:function(e,t,a){a.getElementsByClassName("sap.m.MessagePage").forEach(function(t){var a=t.getUIArea().getAggregation("content"),i=t.getId();if(a.length>1&&t.getParent()===t.getUIArea()){e.addIssue({severity:s.Medium,details:"Message Page"+" ("+i+") is a top-level control.",context:{id:i}})}})}};return[n,o]},true);