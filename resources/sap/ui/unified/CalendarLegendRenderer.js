/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText"],function(e){"use strict";var t={};t.render=function(e,t){var i=t.getAggregation("_standardItems"),r=t.getItems(),d,s,n;e.write("<div");e.writeControlData(t);e.addClass("sapUiUnifiedLegend");e.writeClasses();e.write(">");this.renderItemsHeader(e,t);if(i||r){e.write("<div");e.addClass("sapUiUnifiedLegendItems");e.writeClasses();n=t.getColumnWidth();e.writeAttribute("style","column-width:"+n+";-moz-column-width:"+n+";-webkit-column-width:"+n+";");e.writeStyles();e.write(">");if(i){s=t.getId().length+1;for(d=0;d<i.length;++d){var a="sapUiUnifiedLegend"+i[d].getId().slice(s);this.renderLegendItem(e,a,i[d],["sapUiUnifiedLegendSquareColor"])}}if(r){for(d=0;d<r.length;d++){this.renderLegendItem(e,"sapUiCalLegDayType"+t._getItemType(r[d],r).slice(4),r[d],["sapUiUnifiedLegendSquareColor"])}}e.write("</div>")}this.renderAdditionalContent(e,t);e.write("</div>")};t.renderLegendItem=function(e,t,i,r){var d=i.getText();var s=i.getTooltip_AsString();e.write("<div");e.writeElementData(i);if(s){e.writeAttributeEscaped("title",s)}e.addClass("sapUiUnifiedLegendItem");e.addClass(t);e.writeClasses();e.write(">");e.write("<div");e.addClass("sapUiUnifiedLegendSquare");e.writeClasses();e.write(">");this.renderColor(e,i.getColor(),r);e.write("</div>");e.write("<div");e.writeAttribute("id",i.getId()+"-Text");e.addClass("sapUiUnifiedLegendDescription");e.writeClasses();e.write(">");e.writeEscaped(d);e.write("</div></div>")};t.renderItemsHeader=function(e,t){};t.renderAdditionalContent=function(e,t){};t.renderColor=function(e,t,i){e.write("<div");for(var r=0;r<i.length;r++){e.addClass(i[r])}if(t){e.addStyle("background-color",t);e.writeStyles()}e.writeClasses();e.write("></div>")};t.addCalendarTypeAccInfo=function(e,i,r){var d,s;if(r){var n=r._getItemByType(i);if(n){d=n.getText()}}if(d){e["label"]=e["label"]?e["label"]+"; "+d:d}else{s=t.getTypeAriaText(i);if(s){e["describedby"]=e["describedby"]?e["describedby"]+" "+s.getId():s.getId()}}};t.typeARIATexts={};t.getTypeAriaText=function(i){var r,d;if(i.indexOf("Type")!==0){return}if(!t.typeARIATexts[i]){r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");d=r.getText("LEGEND_UNNAMED_TYPE",parseInt(i.slice(4)).toString());t.typeARIATexts[i]=new e({text:d});t.typeARIATexts[i].toStatic()}return t.typeARIATexts[i]};return t},true);