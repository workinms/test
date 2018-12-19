/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/m/library","sap/base/Log"],function(t,e,s){"use strict";var i=e.IBarHTMLTag;var r={footer:{contextClass:"sapMFooter-CTX sapContrast sapContrastPlus",tag:"Footer",internalAriaLabel:"BAR_ARIA_DESCRIPTION_FOOTER"},header:{contextClass:"sapMHeader-CTX",tag:"Header",internalAriaLabel:"BAR_ARIA_DESCRIPTION_HEADER"},subheader:{contextClass:"sapMSubHeader-CTX",tag:"Header",internalAriaLabel:"BAR_ARIA_DESCRIPTION_SUBHEADER"}};var a="sapMIBar";var n=t.extend("sap.m.BarInPageEnabler",{isContextSensitive:function(){return this.getDesign&&this.getDesign()==="Auto"},setHTMLTag:function(t){if(t===this.sTag){return this}this.sTag=t;return this},getHTMLTag:function(){if(!this.hasOwnProperty("sTag")){this.sTag=i.Div}return this.sTag},getContext:function(){return r},_getRootAccessibilityRole:function(){var t=this._sRootAccessibilityRole||"toolbar";return t},_setRootAccessibilityRole:function(t){this._sRootAccessibilityRole=t;return this},applyTagAndContextClassFor:function(t){this._applyTag(t);return this._applyContextClassFor(t)},_applyContextClassFor:function(t){var e=this._getContextOptions(t);if(!e){return this}if(!this.isContextSensitive){s.error("The bar control you are using does not implement all the members of the IBar interface",this);return this}if(!this.getRenderer().shouldAddIBarContext()){this.addStyleClass(a+"-CTX")}if(this.isContextSensitive()){this.addStyleClass(e.contextClass)}return this},_applyTag:function(t){var e=this._getContextOptions(t);if(!e){return this}if(!this.setHTMLTag){s.error("The bar control you are using does not implement all the members of the IBar interface",this);return this}this.setHTMLTag(e.tag);return this},_getContextOptions:function(t){var e;if(this.getContext){e=this.getContext()}else{e=r}var i=e[t];if(!i){s.error("The context "+t+" is not known",this);return null}return i},render:function(t,e){var s=e.getHTMLTag().toLowerCase();t.write("<"+s);t.addClass(a);if(this.shouldAddIBarContext(e)){t.addClass(a+"-CTX")}t.writeControlData(e);n.renderTooltip(t,e);this.decorateRootElement(t,e);t.writeClasses();t.writeStyles();t.write(">");this.renderBarContent(t,e);t.write("</"+s+">")}});n.renderTooltip=function(t,e){var s=e.getTooltip_AsString();if(s){t.writeAttributeEscaped("title",s)}};n.addChildClassTo=function(t){t.addStyleClass("sapMBarChild")};return n});