/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/ShareMenuPage","sap/m/semantic/SemanticConfiguration","sap/m/semantic/SemanticPageRenderer","sap/m/library"],function(e,t,i,a){"use strict";var n=a.semantic.SemanticRuleSetType;var s=e.extend("sap.m.semantic.DetailPage",{metadata:{library:"sap.m",aggregations:{addAction:{type:"sap.m.semantic.AddAction",multiple:false},mainAction:{type:"sap.m.semantic.MainAction",multiple:false},positiveAction:{type:"sap.m.semantic.PositiveAction",multiple:false},negativeAction:{type:"sap.m.semantic.NegativeAction",multiple:false},forwardAction:{type:"sap.m.semantic.ForwardAction",multiple:false},editAction:{type:"sap.m.semantic.EditAction",multiple:false},saveAction:{type:"sap.m.semantic.SaveAction",multiple:false},deleteAction:{type:"sap.m.semantic.DeleteAction",multiple:false},cancelAction:{type:"sap.m.semantic.CancelAction",multiple:false},flagAction:{type:"sap.m.semantic.FlagAction",multiple:false},favoriteAction:{type:"sap.m.semantic.FavoriteAction",multiple:false},openInAction:{type:"sap.m.semantic.OpenInAction",multiple:false},discussInJamAction:{type:"sap.m.semantic.DiscussInJamAction",multiple:false},shareInJamAction:{type:"sap.m.semantic.ShareInJamAction",multiple:false},sendEmailAction:{type:"sap.m.semantic.SendEmailAction",multiple:false},sendMessageAction:{type:"sap.m.semantic.SendMessageAction",multiple:false},printAction:{type:"sap.m.semantic.PrintAction",multiple:false},messagesIndicator:{type:"sap.m.semantic.MessagesIndicator",multiple:false},saveAsTileAction:{type:"sap.m.Button",multiple:false},pagingAction:{type:"sap.m.PagingButton",multiple:false},draftIndicator:{type:"sap.m.DraftIndicator",multiple:false}},dnd:{draggable:false,droppable:true},designtime:"sap/m/designtime/semantic/DetailPage.designtime"},renderer:i.render});s.prototype.init=function(){e.prototype.init.call(this);this._getPage().getLandmarkInfo().setRootLabel(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("SEMANTIC_DETAIL_PAGE_TITLE"))};s.prototype.setAggregation=function(i,a,n){if(i==="saveAsTileAction"||i==="pagingAction"||i==="draftIndicator"){var s="_"+i;if(a){this._addToInnerAggregation(a,t.getPositionInPage(i),t.getSequenceOrderIndex(i),n);this[s]=a}else{if(this[s]){this._removeFromInnerAggregation(this[s],t.getPositionInPage(i),n);this[s]=null}}return this}return e.prototype.setAggregation.call(this,i,a,n)};s.prototype.getAggregation=function(t,i,a){if(t==="saveAsTileAction"||t==="pagingAction"||t==="draftIndicator"){return this["_"+t]}return e.prototype.getAggregation.call(this,t,i,a)};s.prototype.destroyAggregation=function(i,a){if(i==="saveAsTileAction"||i==="pagingAction"||i==="draftIndicator"){var n="_"+i;if(this[n]){this._removeFromInnerAggregation(this[n],t.getPositionInPage(i),a);this[n].destroy();this[n]=null}return this}return e.prototype.destroyAggregation.call(this,i,a)};s.prototype.getSemanticRuleSet=function(){return n.Classic};return s});