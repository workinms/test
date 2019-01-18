/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./List","./library","sap/ui/model/ChangeReason","sap/ui/model/Filter","./FacetFilterListRenderer","sap/base/Log"],function(e,t,i,s,o,r){"use strict";var a=t.ListMode;var l=t.FacetFilterListDataType;var n=e.extend("sap.m.FacetFilterList",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},wordWrap:{type:"boolean",group:"Appearance",defaultValue:false},multiSelect:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true},active:{type:"boolean",group:"Behavior",defaultValue:true},enableCaseInsensitiveSearch:{type:"boolean",group:"Behavior",defaultValue:false,deprecated:false},allCount:{type:"int",group:"Appearance",defaultValue:null},sequence:{type:"int",group:"Behavior",defaultValue:-1},key:{type:"string",group:"Identification",defaultValue:null},showRemoveFacetIcon:{type:"boolean",group:"Misc",defaultValue:true},retainListSequence:{type:"boolean",group:"Misc",defaultValue:false},dataType:{type:"sap.m.FacetFilterListDataType",group:"Misc",defaultValue:l.String}},events:{listOpen:{},listClose:{parameters:{selectedItems:{type:"sap.m.FacetFilterItem[]"},allSelected:{type:"boolean"},selectedKeys:{type:"object"}}}}}});n.prototype.setTitle=function(e){this.setProperty("title",e,true);this._updateFacetFilterButtonText();return this};n.prototype.setMultiSelect=function(e){this.setProperty("multiSelect",e,true);var t=e?a.MultiSelect:a.SingleSelectMaster;this.setMode(t);return this};n.prototype.setMode=function(t){if(t===a.MultiSelect||t===a.SingleSelectMaster){e.prototype.setMode.call(this,t);this.setProperty("multiSelect",t===a.MultiSelect?true:false,true)}return this};n.prototype._applySearch=function(){var e=this._getSearchValue();if(e!=null){this._search(e,true);this._updateSelectAllCheckBox()}};n.prototype.getSelectedItems=function(){var e=[];var t={};var i=sap.m.ListBase.prototype.getSelectedItems.apply(this,arguments);i.forEach(function(i){e.push(new sap.m.FacetFilterItem({text:i.getText(),key:i.getKey(),selected:true}));t[i.getKey()]=true});var s=this.getSelectedKeys();var o=Object.getOwnPropertyNames(s);if(i.length<o.length){o.forEach(function(i){if(!t[i]){e.push(new sap.m.FacetFilterItem({text:s[i],key:i,selected:true}))}})}return e};n.prototype.getSelectedItem=function(){var e=sap.m.ListBase.prototype.getSelectedItem.apply(this,arguments);var t=Object.getOwnPropertyNames(this.getSelectedKeys());if(!e&&t.length>0){e=new sap.m.FacetFilterItem({text:this.getSelectedKeys()[t[0]],key:t[0],selected:true})}return e};n.prototype.removeSelections=function(e){if(this._allowRemoveSelections){e?this.setSelectedKeys():sap.m.ListBase.prototype.removeSelections.call(this,e)}return this};n.prototype.getSelectedKeys=function(){var e={};var t=this._oSelectedKeys;Object.getOwnPropertyNames(t).forEach(function(i){e[i]=t[i]});return e};n.prototype.setSelectedKeys=function(e){this._oSelectedKeys={};var t=false;e&&Object.getOwnPropertyNames(e).forEach(function(i){this._addSelectedKey(i,e[i]);t=true},this);if(t){if(this.getMode()===a.MultiSelect){this.setActive(true)}this._selectItemsByKeys()}else{sap.m.ListBase.prototype.removeSelections.call(this)}};n.prototype._getNonGroupItems=function(){var e=[];this.getItems().forEach(function(t){if(t.getMode()!==a.None){e.push(t)}});return e};n.prototype.removeSelectedKey=function(e,t){if(this._removeSelectedKey(e,t)){this._getNonGroupItems().forEach(function(t){var i=t.getKey()||t.getText();e===i&&t.setSelected(false)})}};n.prototype.removeSelectedKeys=function(){this._oSelectedKeys={};sap.m.ListBase.prototype.removeSelections.call(this,true)};n.prototype.removeItem=function(e){var t=sap.m.ListBase.prototype.removeItem.apply(this,arguments);if(!this._filtering){t&&t.getSelected()&&this.removeSelectedKey(t.getKey(),t.getText());return t}};n.prototype.init=function(){this._firstTime=true;this._saveBindInfo;this._oSelectedKeys={};e.prototype.init.call(this);this.setMode(a.MultiSelect);this.setIncludeItemInSelection(true);this.setGrowing(true);this.setRememberSelections(false);this._searchValue="";this.attachUpdateFinished(function(e){var t=e.getParameter("reason");t=t?t.toLowerCase():t;if(t==="change"){var s=this.getBinding("items"),o=s?s.getModel():null;if(o&&o.getProperty(s.getPath())){this._iAllItemsCount=o.getProperty(s.getPath()).length||0}}if(t!=="growing"&&t!==i.Filter.toLowerCase()){this._oSelectedKeys={};this._getNonGroupItems().forEach(function(e){if(e.getSelected()){this._addSelectedKey(e.getKey(),e.getText())}},this)}if(t!==i.Filter.toLowerCase()){this._selectItemsByKeys()}this._updateFacetFilterButtonText();this._updateSelectAllCheckBox()});this._allowRemoveSelections=true;this._bOriginalActiveState;this._iAllItemsCount};n.prototype._resetItemsBinding=function(){if(this.isBound("items")){this._searchValue="";this._allowRemoveSelections=false;sap.m.ListBase.prototype._resetItemsBinding.apply(this,arguments);this._allowRemoveSelections=true}};n.prototype._fireListCloseEvent=function(){var e=this.getSelectedItems();var t=this.getSelectedKeys();var i=e.length===0;this._firstTime=true;this.fireListClose({selectedItems:e,selectedKeys:t,allSelected:i})};n.prototype._updateActiveState=function(){var e=sap.ui.getCore().byId(this.getAssociation("allcheckbox"));if(Object.getOwnPropertyNames(this._oSelectedKeys).length>0||e&&e.getSelected()){this.setActive(true)}};n.prototype._handleSearchEvent=function(e){var t=e.getParameters()["query"];if(t===undefined){t=e.getParameters()["newValue"]}this._search(t);this._updateSelectAllCheckBox()};n.prototype._search=function(e,t){var i;var o=0;function a(e){return e instanceof sap.ui.model.odata.ODataModel||e instanceof sap.ui.model.odata.v2.ODataModel}if(t||e!==this._searchValue){this._searchValue=e;var l=this.getBinding("items");var n=this.getBindingInfo("items");if(n&&n.binding){i=n.binding.aFilters;if(i.length>0){o=i[0].aFilters.length;if(this._firstTime){this._saveBindInfo=i[0].aFilters[0];this._firstTime=false}}}if(l){if(e||o>0){var c=this.getBindingInfo("items").template.getBindingInfo("text").parts[0].path;if(c||c===""){var p=new s(c,sap.ui.model.FilterOperator.Contains,e);if(this.getEnableCaseInsensitiveSearch()&&a(l.getModel())){var h="'"+String(e).replace(/'/g,"''")+"'";h=h.toLowerCase();p=new s("tolower("+c+")",sap.ui.model.FilterOperator.Contains,h)}if(o>1){var u=new s([p,this._saveBindInfo],true)}else{if(this._saveBindInfo>""&&p.sPath!=this._saveBindInfo.sPath){var u=new s([p,this._saveBindInfo],true)}else{if(e==""){var u=[]}else{var u=new s([p],true)}}}l.filter(u,sap.ui.model.FilterType.Control)}}else{l.filter([],sap.ui.model.FilterType.Control)}}else{r.warning("No filtering performed","The list must be defined with a binding for search to work",this)}}};n.prototype._getSearchValue=function(){return this._searchValue};n.prototype._updateSelectAllCheckBox=function(){var e=this._getNonGroupItems(),t=e.length,i,s,o;function r(e){return e.getSelected()}if(this.getMultiSelect()){i=sap.ui.getCore().byId(this.getAssociation("allcheckbox"));s=t>0&&t===e.filter(r).length;o=this.getActive()&&s;i&&i.setSelected(o)}};n.prototype._addSelectedKey=function(e,t){if(!e&&!t){r.error("Both sKey and sText are not defined. At least one must be defined.");return}if(this.getMode()===a.SingleSelectMaster){this.removeSelectedKeys()}if(!e){e=t}this._oSelectedKeys[e]=t||e};n.prototype._removeSelectedKey=function(e,t){if(!e&&!t){r.error("Both sKey and sText are not defined. At least one must be defined.");return false}if(!e){e=t}delete this._oSelectedKeys[e];return true};n.prototype._setSearchValue=function(e){this._searchValue=e};n.prototype._isItemSelected=function(e){return!!this._oSelectedKeys[e&&(e.getKey()||e.getText())]};n.prototype._updateFacetFilterButtonText=function(){if(this.getParent()&&this.getParent()._setButtonText){this.getParent()._setButtonText(this)}};n.prototype._selectItemsByKeys=function(){this._getNonGroupItems().forEach(function(e){e.setSelected(this._isItemSelected(e))},this);this._updateFacetFilterButtonText()};n.prototype._handleSelectAllClick=function(e){var t;this._getNonGroupItems().forEach(function(t){if(e){this._addSelectedKey(t.getKey(),t.getText())}else{this._removeSelectedKey(t.getKey(),t.getText())}t.setSelected(e,true)},this);if(this.getMode()===a.MultiSelect){t=this._getOriginalActiveState()||e;this.setActive(t)}setTimeout(this._updateSelectAllCheckBox.bind(this),0)};n.prototype.onItemTextChange=function(e,t){var i=e.getKey();if(this._oSelectedKeys[i]&&t&&!this._filtering){this._oSelectedKeys[i]=t}};n.prototype.onItemSelectedChange=function(e,t){var i;if(t){this._addSelectedKey(e.getKey(),e.getText())}else{this._removeSelectedKey(e.getKey(),e.getText())}sap.m.ListBase.prototype.onItemSelectedChange.apply(this,arguments);if(this.getMode()===a.MultiSelect){i=this._getOriginalActiveState()||t||this.getSelectedItems().length>1;this.setActive(i)}!this.getDomRef()&&this.getParent()&&this.getParent().getDomRef()&&this.getParent().invalidate();setTimeout(this._updateSelectAllCheckBox.bind(this),0)};n.prototype.updateItems=function(e){this._filtering=e===i.Filter;sap.m.ListBase.prototype.updateItems.apply(this,arguments);this._filtering=false;if(!this.getGrowing()||e===i.Filter){this._selectItemsByKeys()}};n.prototype._getOriginalActiveState=function(){return this._bOriginalActiveState};n.prototype._preserveOriginalActiveState=function(){this._bOriginalActiveState=this.getActive()};return n});