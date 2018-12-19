/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ResponsivePopover","./Button","./Toolbar","./ToolbarSpacer","./Bar","./List","./StandardListItem","./library","sap/ui/core/Control","sap/ui/core/IconPool","./SegmentedButton","./Page","./NavContainer","./ViewSettingsItem","sap/ui/base/ManagedObject","sap/ui/Device","sap/ui/core/InvisibleText","./ViewSettingsPopoverRenderer","sap/base/Log"],function(t,e,i,s,r,o,n,a,g,l,h,p,d,u,f,_,c,m,I){"use strict";var y=a.VerticalPlacementType;var v=a.ListType;var S=a.ListMode;var b="-toolbar";var C="-segmented";var P="-listitem";var F="-group";var L="-filter";var T="-sort";var A="-filterdetailItem";var B="-navContainer";var w="-mainPage";var D="-detailspage";var E="-backbutton";var M="-title";var V="-searchfield";var x="-selectall";var k="-custom-button";var O=g.extend("sap.m.ViewSettingsPopover",{metadata:{library:"sap.m",aggregations:{sortItems:{type:"sap.ui.core.Item",multiple:true,singularName:"sortItem"},filterItems:{type:"sap.ui.core.Item",multiple:true,singularName:"filterItem"},filterDetailItems:{type:"sap.ui.core.Item",multiple:true,singularName:"filterDetailItem"},groupItems:{type:"sap.ui.core.Item",multiple:true,singularName:"groupItem"},customTabs:{type:"sap.m.ViewSettingsCustomTab",multiple:true,singularName:"customTab",bindable:"bindable"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},sortSelected:{allowPreventDefault:true,parameters:{items:{type:"array"}}},filterSelected:{allowPreventDefault:true,parameters:{items:{type:"array"}}},groupSelected:{allowPreventDefault:true,parameters:{items:{type:"array"}}},afterFilterDetailPageOpened:{parameters:{parentFilterItem:{type:"sap.m.ViewSettingsFilterItem"}}}}},constructor:function(t,e){this._stashedItems={};if(!e&&t&&typeof t==="object"){e=t}this._stashItems(e);if(e&&Array.isArray(e["sortItems"])){e["sortItems"]=null}if(e&&Array.isArray(e["filterItems"])){e["filterItems"]=null}if(e&&Array.isArray(e["groupItems"])){e["groupItems"]=null}f.prototype.constructor.apply(this,arguments);this._getPopover().addContent(this._getNavContainer());this._addStashedItems()}});O.prototype.init=function(){this._tabMap={sort:"sort",filter:"filter",filterDetail:"filterDetail",group:"group"}};O.prototype.openBy=function(t,e){var i=this._getPopover(t),s=this._determinePageToOpen();i.openBy(t);if(s){if(_.system.phone){this._showContentFor(s)}else{this._removeSegmentedButtonSelection();if(e){this._getPopover().setContentWidth(e)}else{this._adjustInitialWidth()}}}this._initialHeight=this._getPopover().getContentHeight();if(this._getSegmentedButton().getItems()&&this._getSegmentedButton().getItems().length===1&&s){this._showContentFor(s)}if(i.getAriaLabelledBy()&&i.getAriaLabelledBy().indexOf(this._getPopoverAriaLabel())===-1){i.addAriaLabelledBy(this._getPopoverAriaLabel())}};O.prototype._removeSegmentedButtonSelection=function(){this._getSegmentedButton().setProperty("selectedKey","",true).removeAllAssociation("selectedButton",true);this._getSegmentedButton().setAssociation("selectedButton","no_selected_button",true);this._getSegmentedButton().getButtons().forEach(function(t){t.$().removeClass("sapMSegBBtnSel").attr("aria-checked",false)})};O.prototype.toggle=function(t){if(this.isOpen()){this.close()}else{this.openBy(t)}return this};O.prototype.isOpen=function(){return this._getPopover().isOpen()};O.prototype.close=function(){this._getPopover().close();this._cleanAfterClose();return this};O.prototype._determinePageToOpen=function(){var t,e,i,s,r,o,n,a,g=this.getCustomTabs();for(i in this._tabMap){s=this._tabMap[i];s=s.slice(0,1).toUpperCase()+s.slice(1);r=this["_get"+s+"List"]().getItems();if(r.length===1){return}else if(r.length>1){return this._tabMap[i]}}if(g){o=this._getSegmentedButton().getItems();for(t=0;t<g.length;t++){n=g[t];a=this.getId()+n.getId()+k;if(!this._isEmptyCustomTab(n)){for(e=0;e<o.length;e++){if(a===o[e].getId()){return n.getId()}}}}}return this._tabMap["sort"]};O.prototype._removeFooter=function(){if(this._getPopover()._oFooter){this._getPopover()._oFooter.destroy();this._getPopover()._oFooter=null}this._getPopover().destroyAggregation("beginButton");this._getPopover().destroyAggregation("endButton")};O.prototype._showContentFor=function(t,e,i){var s=sap.ui.getCore().byId(this._getPopoverAriaLabel()),r;this._getPopover().setContentHeight("300px");this._getPopover().setContentWidth("300px");this._removePageContents(t);this._addPageContents(t);if(t===this._tabMap["filterDetail"]){r=this._getText("VIEWSETTINGS_TITLE_FILTERBY")+this._updateTitleText(e.getTitle(),true);this._goToDetailsPage(e,i)}else{if(t in this._tabMap){r=this._updateTitleText(t);if(t===this._tabMap["filter"]){this._updateFilterListItemsCount()}}this._goToMainPage()}s.setText(r);this._getSegmentedButton().setSelectedKey(t);this._currentPageId=t};O.prototype._updateTitleText=function(t,e){var i,s=t;if(!e){i=t;if(i=="filterDetail"){i="filter"}i="VIEWSETTINGS_TITLE_"+i.toUpperCase();s=this._getText(i)}if(e&&this._getDetailsPage().getHeaderContent()[0].getContentMiddle()){this._getDetailsPage().getHeaderContent()[0].getContentMiddle()[0].setText(s)}else{this._getTitle().setText(s)}return s};O.prototype._goToDetailsPage=function(t,e){var s=this._findViewSettingsItemFromListItem(t).getMultiSelect();if(s){this._getSearchField().setValue("");this._getDetailsPage().insertAggregation("content",new i({content:[this._getSearchField().addStyleClass("sapMVSDFilterSearchField"),this._getShowSelectedOnlyButton()]}),0);this._getFilterDetailList().setHeaderToolbar(new i({content:[this._getSelectAllCheckbox(this._findViewSettingsItemFromListItem(t).getItems(),this._getFilterDetailList())]}).addStyleClass("sapMVSDFilterHeaderToolbar"))}else{this._getFilterDetailList().removeAllAggregation("headerToolbar")}this._updateFilterDetailListFor(t);this._navigateToPage("Details",e);this._addFooterButtons();this._updateSelectAllCheckBoxState();if(_.system.phone){this._hideToolbarButtons()}this._lastViewedFilterParent=t;this._oPreviousSelectedFilters={selectedItemIds:this._getFilterDetailList().getSelectedItems().map(function(t){return t.getId()})};this.fireAfterFilterDetailPageOpened({parentFilterItem:t})};O.prototype._getShowSelectedOnlyButton=function(){var t=false;if(!this._oShowSelectedOnlyButton){this._oShowSelectedOnlyButton=new e({icon:l.getIconURI("multiselect-all"),tooltip:this._getText("SHOW_SELECTED_ONLY"),press:function(e){t=!t;if(t){e.getSource().$("inner").addClass("sapMBtnActive")}this._getFilterDetailList().getItems().forEach(function(e){if(t){if(!e.getSelected()){e.setVisible(false)}}else if(!t){this._filterItemsBy(this._getSearchField().getValue())}},this);this._updateSelectAllCheckBoxState()}.bind(this)})}return this._oShowSelectedOnlyButton};O.prototype._updateSelectAllCheckBoxState=function(){var t=sap.ui.getCore().byId(this.getId()+x),e=this._getFilterDetailList().getItems()||[],i=true,s=0,r;for(r=0;r<e.length;r++){if(e[r].getVisible()){s++;if(!e[r].getSelected()){i=false}}}if(t){t.setSelected(i&&s>0)}};O.prototype._addFooterButtons=function(){var t=new e({text:this._getText("VIEWSETTINGS_ACCEPT"),press:this._confirmFilterDetail.bind(this)}),i=new e({text:this._getText("VIEWSETTINGS_CANCEL"),press:this._cancel.bind(this)});this._getPopover().setBeginButton(t);this._getPopover().setEndButton(i)};O.prototype._confirmFilterDetail=function(){var t=this._getFilterDetailList().getItems().filter(function(t){return t.getSelected()});this.fireFilterSelected({items:t.map(function(t){return this._findViewSettingsItemFromListItem(t)}.bind(this))});this.close()};O.prototype._cancel=function(){this._restorePreviousState();this._updateFilterListItemsCount();this.close()};O.prototype._restorePreviousState=function(){var t;if(this._oPreviousSelectedFilters){t=function(t,e,i){var s;for(s=0;s<t.length;s++){if(e.getId()===t[s]){i.setProperty("selected",true,true);break}}};this._getFilterDetailList().getItems().forEach(function(e){var i=this._findViewSettingsItemFromListItem(e);i.setProperty("selected",false,true);t(this._oPreviousSelectedFilters.selectedItemIds,e,i)},this);this._updateSelectAllCheckBoxState()}};O.prototype._hideToolbarButtons=function(){this._getPopover().setShowHeader(false);setTimeout(function(){if(this._getPopover().getAggregation("_popup")._internalHeader){this._getPopover().getAggregation("_popup")._internalHeader.$().hide()}}.bind(this),0)};O.prototype._goToMainPage=function(){this._getPopover().setShowHeader(true);this._getPopover().setCustomHeader(this._getToolbar());this._oPreviousSelectedFilters=null;this._navigateToPage("Main")};O.prototype._adjustInitialWidth=function(){var t,e,i,s,r=this._getSegmentedButton(),o=r&&r.getButtons();if(!o||!o[0]){return}t=o[0].$().width();e=parseInt(o[0].$().css("margin-right"));i=o.length;if(a._bSizeCompact||!!document.querySelector(".sapUiSizeCompact")){t=t*2}s=(t+e)*(i+1.6);this._getPopover().setContentWidth(s+"px")};O.prototype._navigateToPage=function(t,e){var i;if(this._getNavContainer().getCurrentPage().getId()!==this["_get"+t+"PageId"]()){if(t==="Details"){if(e){this._getNavContainer().to(this["_get"+t+"Page"](),"show");i=sap.ui.getCore().byId(this.getId()+E);i&&i.destroy();i=null}else{setTimeout(this._getNavContainer()["to"].bind(this._getNavContainer(),this["_get"+t+"Page"](),"slide"),0)}}else{setTimeout(this._getNavContainer()["back"].bind(this._getNavContainer()),0)}}this._getNavContainer().attachEventOnce("afterNavigate",function(){if(this._currentPageId!==this._tabMap["filterDetail"]){this._removeFooter();if(_.system.desktop&&this._lastViewedFilterParent&&this._lastViewedFilterParent.getFocusDomRef()){this._lastViewedFilterParent.getFocusDomRef().focus()}}else{if(_.system.desktop&&this._getFilterDetailList().getItems()[0]&&this._getFilterDetailList().getItems()[0].getFocusDomRef()){this._getFilterDetailList().getItems()[0].getFocusDomRef().focus()}}}.bind(this))};O.prototype._updateFilterListItemsCount=function(){var t,e,i=this._getFilterList().getItems();i.forEach(function(i){if(i.getId().indexOf("nofiltering")===-1){e=this._findViewSettingsItemFromListItem(i);if(e instanceof sap.m.ViewSettingsCustomItem){t=e.getFilterCount()}else if(e instanceof sap.m.ViewSettingsFilterItem){t=e.getItems().filter(function(t){return t.getSelected()}).length}i.setCounter(t)}},this)};O.prototype._updateFilterDetailListFor=function(t){var e=this._findViewSettingsItemFromListItem(t).getMultiSelect();var i=sap.ui.getCore().byId(t.getId().split(P).shift());var s=i&&i.getItems()||[];var r=this._getFilterDetailList();r.destroyAggregation("items");if(e){r.setIncludeItemInSelection(true);r.setMode(S.MultiSelect)}else{r.setMode(S.SingleSelectLeft)}s.forEach(function(t){r.addItem(new n({id:t.getId()+A,title:t.getText(),type:v.Active,selected:t.getSelected()}))},this)};O.prototype._removePageContents=function(t){var e,i,s,r,o="_getMainPage";if(t==="filterDetail"){o="_getDetailsPage"}s=this[o]().getContent();r=s[0];for(e in this._tabMap){i=this._tabMap[e];if(r){if(r.getId()===i+"list"){this["_"+i+"List"]=r}}}if(!(t in this._tabMap)||N.call(this)){this.getCustomTabs().forEach(function(t){if(this._currentPageId===t.getId()){s.forEach(function(e){t.addAggregation("content",e,true)})}},this)}this[o]().removeAllContent()};O.prototype._addPageContents=function(t){var e,i,s,r=this.getCustomTabs(),o="_getMainPage";if(t==="filterDetail"){o="_getDetailsPage"}for(e in this._tabMap){i=this._tabMap[e];if(i===t){i=i.slice(0,1).toUpperCase()+i.slice(1);s=this["_get"+i+"List"]();this[o]().addContent(s)}}if(!(t in this._tabMap)){r.forEach(function(e){if(e.getId()===t){e.getContent().forEach(function(t){this[o]().addContent(t)},this)}},this)}};O.prototype._stashItems=function(t){var e=["sort","filter","group"];e.forEach(function(e){if(t&&Array.isArray(t[e+"Items"])){this._stashedItems[e]=t[e+"Items"]}},this)};O.prototype._addStashedItems=function(t){var e,i,s,r;for(e in this._tabMap){var r=this._tabMap[e];i=this._stashedItems[r];for(s in i){var o=i[s];this.addAggregation(r+"Items",o)}}};O.prototype._handleBack=function(t){if(this._currentPageId==="filterDetail"){this._showContentFor("filter")}};O.prototype._getSelectAllCheckbox=function(t,e){var i=sap.ui.getCore().byId(this.getId()+x);if(i){return i}return new sap.m.CheckBox({id:this.getId()+x,text:"Select All",selected:t&&t.every(function(t){return t&&t.getSelected()}),select:function(t){var i=t.getParameter("selected");e.getItems().filter(function(t){return t.getVisible()}).forEach(function(t){var e=this._findViewSettingsItemFromListItem(t);e.setProperty("selected",i,true)}.bind(this));this._toggleRemoveFilterItem()}.bind(this)})};O.prototype._createList=function(t){var e,i=t.slice(0,1).toUpperCase()+t.slice(1),s=new o({id:this.getId()+"-"+t+"list",itemPress:function(s){e=this._findViewSettingsItemFromListItem(s.getParameter("listItem"));if(t==="group"||t==="sort"){this["fire"+i+"Selected"]({items:[e]});this.close()}}.bind(this),selectionChange:function(r){var o;var n;var a=[];this._updateSelectAllCheckBoxState();e=this._findViewSettingsItemFromListItem(r.getParameter("listItem"));e.setProperty("selected",r.getParameter("selected"),true);if(s.getMode()!==S.MultiSelect){o=this.getFilterItems();if(o){o.forEach(function(t){n=t.getItems();if(n){a=a.concat(n)}})}a.forEach(function(t){if(t.getParent().getId()===e.getParent().getId()&&t.getSelected(true)&&t.getId()!==e.getId()){t.setProperty("selected",false,true)}})}if(t==="filterDetail"){i="Filter"}else{this["fire"+i+"Selected"]({items:[e]});this.close()}switch(t){case"group":this._getGroupList().addItem(this._getRemoveGroupingItem());break}}.bind(this)});if(t!=="filter"){s.setMode(S.SingleSelectMaster)}this["_"+t+"List"]=s};O.prototype._getRemoveGroupingItem=function(){if(!this._removeGroupingItem){this._removeGroupingItem=new n({id:this.getId()+"-nogrouping",title:this._getText("NO_GROUPING"),type:v.Active})}return this._removeGroupingItem};O.prototype._getRemoveFilterItem=function(){if(!this._removeFilteringItem){this._removeFilteringItem=new n({id:this.getId()+"-nofiltering",title:this._getText("REMOVE_FILTER"),type:v.Active,press:function(){this.getFilterItems().forEach(function(t){t.getItems().forEach(function(t){t.setProperty("selected",false,true)})});this.close();this._removeFilteringItem.destroy();this._removeFilteringItem=null}.bind(this)})}return this._removeFilteringItem};O.prototype._getTabButtonItem=function(t){var e=this.getId()+t.getId()+k,i=sap.ui.getCore().byId(e);if(i){return i}else{return new sap.m.SegmentedButtonItem({key:e,id:e,icon:t.getIcon(),tooltip:t.getTooltip()})}};O.prototype._addPredefinedTab=function(t){var e=this._tabMap[t];switch(e){case"group":e=e+"-2";break}var i=new sap.m.SegmentedButtonItem({key:t,icon:l.getIconURI(e),tooltip:this._getText("VIEWSETTINGS_TITLE_"+t.toUpperCase()),press:function t(e){var i=e.getSource().getProperty("key");var s=this["get"+i.slice(0,1).toUpperCase()+i.slice(1)+"Items"]();if(this._currentPageId===i||this._currentPageId===this._tabMap["filterDetail"]&&s&&s.length>1){if(_.system.phone){this._cancel()}else{this._hideContent()}}else{if(s&&s.length===1){if(i!=="filter"){s.forEach(function(t){t.setSelected(!t.getSelected())});this["fire"+i.slice(0,1).toUpperCase()+i.slice(1)+"Selected"]({items:s});this.close()}else{this._showContentFor("filterDetail",this._findListItemFromViewSettingsItem(s[0]),true)}}else{this._showContentFor(i)}}}.bind(this)});switch(t){case"sort":this._getSegmentedButton().insertItem(i,0);break;case"filter":this._getSegmentedButton().insertItem(i,1);break;case"group":this._getSegmentedButton().insertItem(i,2);break}};O.prototype.addCustomTab=function(t,e,i){var s=t.getId();if(s==="sort"||s==="filter"||s==="group"){throw new Error('Id "'+s+'" is reserved and cannot be used as custom tab id.')}this.addAggregation("customTabs",t);if(!this._isEmptyCustomTab(t)){var r=this._getTabButtonItem(t);if(!e){r.attachEvent("press",this._handleCustomTabPress,this)}else{r.attachEvent("press",e,i)}this._getSegmentedButton().addItem(r)}return this};O.prototype._handleCustomTabPress=function(t){var e,i,s,r,o=this.getCustomTabs(),n=o.length,a=t.getParameter("id");for(e=0;e<n;e++){i=o[e];s=this.getId()+i.getId()+k;r=this.getId()+this._currentPageId+k;if(r===a){if(_.system.phone){this._cancel();break}else{this._hideContent();break}}else{if(!this._isEmptyCustomTab(i)&&a===s){this._showContentFor(i.getId());break}}}};O.prototype._hideContent=function(){this._removeSegmentedButtonSelection();this._cleanAfterClose();setTimeout(this["_adjustInitialWidth"].bind(this),0)};O.prototype._cleanAfterClose=function(){this._removePageContents(this._currentPageId);this._getPopover().setContentHeight(this._initialHeight);this._removeFooter();this._navigateToPage("Main");this._currentPageId=null};O.prototype._removePredefinedTab=function(t){var e=this._getSegmentedButton().getItems();e.forEach(function(e){if(e.getKey()===t.toLowerCase()){this._getSegmentedButton().removeItem(e)}},this);if(this._currentPageId===t.toLowerCase()){this._showContentFor(this._determinePageToOpen())}};O.prototype._removeCustomTab=function(t){var e,i,s=this.getId()+this._currentPageId+k,r=false,o=this._getSegmentedButton().getItems();o.forEach(function(o){if(o.getKey().indexOf(k)!==-1){if(t){e=this._currentPageId===t.getId();i=this.getId()+t.getId()+k;r=t&&i===o.getId()}else{e=s===o.getId()}if(!t||r){this._getSegmentedButton().removeItem(o)}if(e){this._showContentFor(this._determinePageToOpen())}}},this)};O.prototype._getPopoverAriaLabel=function(){var t=this.getAssociation("ariaLabelledBy");if(!t){t=new c({text:this._getText("ARIA_LABELLED_BY_POPOVER")}).toStatic().getId();this.setAssociation("ariaLabelledBy",t,true)}return t};O.prototype._isItemsAggregation=function(t){var e=[];var i;for(i in this._tabMap){e.push(i+"Items")}if(e.indexOf(t)===-1){return false}return true};O.prototype.addAggregation=function(t,e,i){if(this._isItemsAggregation(t)){(!this.getAggregation(t)||this.getAggregation(t).length===0)&&this._addPredefinedTab(t.replace("Items",""));this._handleItemsAggregation.call(this,["addAggregation",t,e,i],true)}return g.prototype.addAggregation.call(this,t,e,i)};O.prototype.insertAggregation=function(t,e,i,s){if(this._isItemsAggregation(t)){(!this.getAggregation(t)||this.getAggregation(t).length===0)&&this._addPredefinedTab(t.replace("Items",""));this._handleItemsAggregation.call(this,["insertAggregation",t,e,i,s],true)}return g.prototype.insertAggregation.call(this,t,e,i,s)};O.prototype.removeAggregation=function(t,e,i){if(this._isItemsAggregation(t)){this._handleItemsAggregation.call(this,["removeAggregation",t,e,i]);if(!this["getAggregation"](t)){this._removePredefinedTab(t.replace("Items",""))}}else{this._removeCustomTab(e)}return g.prototype.removeAggregation.call(this,t,e,i)};O.prototype.removeAllAggregation=function(t,e){if(this._isItemsAggregation(t)){this._handleItemsAggregation.call(this,["removeAllAggregation",t,null,e]);this._removePredefinedTab(t.replace("Items",""))}else{this._removeCustomTab()}return g.prototype.removeAllAggregation.call(this,t,e)};O.prototype.destroyAggregation=function(t,e){if(this._isItemsAggregation(t)){var i=t.replace("Items","");this._handleItemsAggregation.call(this,["destroyAggregation",t,e]);this._removePredefinedTab(i.slice(0,1).toUpperCase()+i.slice(1))}else if(this._segmentedButton){this._removeCustomTab()}return g.prototype.destroyAggregation.call(this,t,e)};O.prototype._handleItemsAggregation=function(t,e){var i=t[0],s=t[1],r=t[2],o=t.slice(1);if(!this._isItemsAggregation(s)){return this}if(e){this._handleItemEventListeners(r)}this._handleListItemsAggregation(o,e,i,r);return this};O.prototype._handleListItemsAggregation=function(t,e,i,s){var r,o,n,a,g,l=t[0],h=false;switch(l){case"sortItems":r=this._getSortList();break;case"groupItems":r=this._getGroupList();break;case"filterItems":r=this._getFilterList();break;case"filterDetailItems":r=this._getFilterDetailList();break}if(i==="destroyAggregation"&&!r){return}if(s===null||typeof s!=="object"){return r[i]["apply"](r,t)}if(e){h=l==="filterItems"&&s.getItems;n=this._createListItemFromViewSettingsItem(s,l.replace("Items",""),h)}else{n=this._findListItemFromViewSettingsItem(s)}t.forEach(function(e,i){if(e&&typeof e==="object"){t[i]=n}});for(a in this._tabMap){g=this._tabMap[a];t[0]=t[0].replace(g+"I","i")}o=r[i].apply(r,t);if(i=="removeAggregation"){o.destroy()}switch(l){case"filterItems":this._toggleRemoveFilterItem();break}return o};O.prototype._toggleRemoveFilterItem=function(){var t=false;this.getFilterItems().forEach(function(e){if(e.getItems){e.getItems().forEach(function(e){if(e.getSelected()){t=true}})}});if(t){if(!this._getRemoveFilterItem().getParent()){this._getFilterList().addItem(this._getRemoveFilterItem())}}else{if(this._removeFilteringItem){this._removeFilteringItem.destroy();this._removeFilteringItem=null}}};O.prototype._handleItemEventListeners=function(t){if(t instanceof u&&t.getId().indexOf("nogrouping")===-1){t.detachItemPropertyChanged(this._handleViewSettingsItemPropertyChanged,this);t.attachItemPropertyChanged(this._handleViewSettingsItemPropertyChanged,this)}if(t instanceof sap.m.ViewSettingsFilterItem){t.detachFilterDetailItemsAggregationChange(this._handleFilterDetailItemsAggregationChange,this);t.attachFilterDetailItemsAggregationChange(this._handleFilterDetailItemsAggregationChange,this)}};O.prototype._handleViewSettingsItemPropertyChanged=function(t){var e=t.getParameter("changedItem");var i=this._findListItemFromViewSettingsItem(e);var s=t.getParameter("propertyKey");var r=t.getParameter("propertyValue");if(s==="text"){s="title"}if(i&&["key","multiSelect"].indexOf(s)==-1){i.setProperty(s,r)}};O.prototype._handleFilterDetailItemsAggregationChange=function(t){var e=t.getParameters(),i=e.item||e.changedItem;if(i&&i.getParent&&i.getParent()instanceof u){this._updateFilterDetailListFor(i.getParent())}};O.prototype._createListItemFromViewSettingsItem=function(t,e,i){var s,r=P;if(!t&&!(t instanceof u)){I.error('Expecting instance of "sap.m.ViewSettingsItem": instead of '+t+" given.");return}switch(e){case"group":r+=F;break;case"filter":r+=L;break;case"sort":r+=T;break}s=new n({id:t.getId()+r,title:t.getText(),type:v.Active});i&&s.attachPress(this._showContentFor.bind(this,"filterDetail",s,false))&&s.setType(v.Navigation);return s};O.prototype._findViewSettingsItemFromListItem=function(t){var e=P;if(t.getId().indexOf("filterdetail")!==-1){e=A}return sap.ui.getCore().byId(t.getId().split(e).shift())};O.prototype._findListItemFromViewSettingsItem=function(t){var e=t.getId()+P,i=sap.ui.getCore().byId(e+F)||sap.ui.getCore().byId(e+L)||sap.ui.getCore().byId(e+T);if(!i){i=sap.ui.getCore().byId(t.getId()+A)}return i};O.prototype._getMainPage=function(){if(!this._mainPage){this._mainPage=new p({showHeader:false,id:this._getMainPageId()})}return this._mainPage};O.prototype._getDetailsPage=function(){var t,i;if(!this._detailsPage){this._detailsPage=new p({showHeader:true,id:this._getDetailsPageId()});var s=new sap.m.Label({text:this._getText("VIEWSETTINGS_TITLE")}).addStyleClass("sapMVSDTitle");i=new r({contentMiddle:[s]}).addStyleClass("sapMVSPCompactHeaderBar");this._getDetailsPage().addHeaderContent(i);t=new e(this.getId()+E,{icon:l.getIconURI("nav-back"),press:this._handleBack.bind(this)});i.addContentLeft(t)}return this._detailsPage};O.prototype._getMainPageId=function(){return this.getId()+w};O.prototype._getDetailsPageId=function(){return this.getId()+D};O.prototype._getPopover=function(e){if(!this._popover){this._popover=new t({showHeader:true,contentWidth:"300px",placement:y.Vertical,showCloseButton:false,modal:false,afterOpen:function(t){this.fireAfterOpen({openBy:t.getParameter("openBy")});this.$().attr("aria-labelledby",this._getPopoverAriaLabel());this._getSegmentedButton().getFocusDomRef().focus()}.bind(this),afterClose:function(t){this._cleanAfterClose();this.fireAfterClose({openBy:t.getParameter("openBy")})}.bind(this),beforeOpen:function(t){this.fireBeforeOpen({openBy:t.getParameter("openBy")})}.bind(this),beforeClose:function(t){this.fireBeforeClose({openBy:t.getParameter("openBy")})}.bind(this)}).addStyleClass("sapMVSPopover");this._popover.setCustomHeader(this._getToolbar());if(this._popover.getAggregation("_popup").setShowArrow){this._popover.getAggregation("_popup").setShowArrow(false)}}if(e&&e.$()){this._popover.setOffsetY(-e.$().outerHeight())}return this._popover};O.prototype._getNavContainer=function(){if(!this._navContainer){this._navContainer=new d(this.getId()+B,{initialPage:this._getMainPageId(),pages:[this._getMainPage(),this._getDetailsPage()]})}return this._navContainer};O.prototype._getSortList=function(){if(!this._sortList){this._createList("sort")}return this._sortList};O.prototype._getGroupList=function(){if(!this._groupList){this._createList("group")}return this._groupList};O.prototype._getFilterList=function(){if(!this._filterList){this._createList("filter")}return this._filterList};O.prototype._getFilterDetailList=function(){if(!this._filterDetailList){this._createList("filterDetail");this._filterDetailList.attachEvent("selectionChange",function(){this._toggleRemoveFilterItem()}.bind(this))}return this._filterDetailList};O.prototype._getToolbar=function(){if(!this._toolbar){var t;this._toolbar=new i({id:this.getId()+b});t=new e({icon:l.getIconURI("decline"),press:this._cancel.bind(this)}).addStyleClass("sapMVSPCloseBtn");this._toolbar.addContent(this._getSegmentedButton());this._toolbar.addContent(new s);this._toolbar.addContent(t)}return this._toolbar};O.prototype._getTitle=function(){if(!this._title){this._title=new sap.m.Label(this.getId()+"-title",{id:this.getId()+M,text:this._getText("VIEWSETTINGS_TITLE")}).addStyleClass("sapMVSDTitle")}return this._title};O.prototype._getSearchField=function(){if(!this._filterSearchField){this._filterSearchField=new sap.m.SearchField({id:this.getId()+V,liveChange:function(t){this._filterItemsBy(t.getParameter("newValue").toLowerCase())}.bind(this)});this._updateSelectAllCheckBoxState()}return this._filterSearchField};O.prototype._filterItemsBy=function(t){this._getFilterDetailList().getItems().forEach(function(e){var i=e.getTitle().toLowerCase().indexOf(t)===0;e.setVisible(i)});this._updateSelectAllCheckBoxState()};O.prototype._getSegmentedButton=function(){if(!this._segmentedButton){this._segmentedButton=new h(this.getId()+C)}return this._segmentedButton};O.prototype._getText=function(t){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(t)};O.prototype.getDomRef=function(t){return this._popover&&this._popover.getAggregation("_popup").getDomRef(t)};["invalidate","close","isOpen","addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass","setBindingContext","getBindingContext","getBinding","getBindingInfo","getBindingPath","setBusy","getBusy","setBusyIndicatorDelay","getBusyIndicatorDelay"].forEach(function(t){O.prototype[t]=function(){if(this._popover&&this._popover[t]){var e=this._popover[t].apply(this._popover,arguments);return e===this._popover?this:e}}});O.prototype.exit=function(){if(this._sortList){this._sortList.destroy();this._sortList=null}if(this._filterList){this._filterList.destroy();this._filterList=null}if(this._filterDetailList){this._filterDetailList.destroy();this._filterDetailList=null}if(this._groupList){this._groupList.destroy();this._groupList=null}this._popover.destroy();this._popover=null;this._title=null;this._navContainer=null;this._mainPage=null;this._detailsPage=null;this._toolbar=null;this._segmentedButton=null;this._currentPageId=null;this._tabMap=null;this._oPreviousSelectedFilters=null;var t=sap.ui.getCore().byId(this.getAssociation("ariaLabelledBy"));if(t&&t.destroy&&!t.bIsDestroyed){t.destroy();t=null}if(this._removeFilteringItem){this._removeFilteringItem.destroy();this._removeFilteringItem=null}};O.prototype._isEmptyCustomTab=function(t){var e=t.getContent().length,i=this._currentPageId===t.getId()&&this._getMainPage().getContent().length;return!(e||i)};function N(){return this._getMainPage().getContent().length&&!(this._currentPageId in this._tabMap)}return O});