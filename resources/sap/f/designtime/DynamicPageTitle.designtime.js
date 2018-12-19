/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{aggregations:{heading:{domRef:":sap-domref .sapFDynamicPageTitleMainHeadingInner"},expandedHeading:{domRef:function(e){return e.$("expand-heading-wrapper").get(0)},ignore:function(e){return e.getHeading()}},snappedHeading:{domRef:function(e){return e.$("snapped-heading-wrapper").get(0)},ignore:function(e){return e.getHeading()}},actions:{domRef:":sap-domref .sapFDynamicPageTitleMainActions",actions:{split:{changeType:"splitMenuButton"},combine:{changeType:"combineButtons"},move:{changeType:"moveActions"}}},content:{domRef:":sap-domref .sapFDynamicPageTitleMainContent",actions:{move:{changeType:"moveControls"}}},snappedContent:{domRef:function(e){return e.$("snapped-wrapper").get(0)},actions:{move:{changeType:"moveControls"}}},expandedContent:{domRef:function(e){return e.$("expand-wrapper").get(0)},actions:{move:{changeType:"moveControls"}}},navigationActions:{ignore:true},breadcrumbs:{ignore:true}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},name:{singular:"DYNAMIC_PAGE_TITLE_NAME",plural:"DYNAMIC_PAGE_TITLE_NAME_PLURAL"}}},false);