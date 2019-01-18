/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/CalendarLegendRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var n=t.extend(e);n.renderItemsHeader=function(e,t){var n=t.getItemsHeader();if(n&&(t.getItems().length||t.getStandardItems().length)){this._renderItemsHeader(e,n)}};n.renderAppointmentsItemsHeader=function(e,t){var n=t.getAppointmentItemsHeader();if(n&&t.getAppointmentItems().length){this._renderItemsHeader(e,n)}else if(t.getAppointmentItems().length&&(t.getItems().length||t.getStandardItems().length)){e.write("<hr/>")}};n._renderItemsHeader=function(e,t){e.write("<div class='sapMPlanCalLegendHeader'>");e.writeEscaped(t);e.write("</div><hr/>")};n.renderAdditionalContent=function(e,t){var n=t.getAppointmentItems(),r,i;this.renderAppointmentsItemsHeader(e,t);e.write("<div");e.addClass("sapUiUnifiedLegendItems");e.writeClasses();i=t.getColumnWidth();e.writeAttribute("style","column-width:"+i+";-moz-column-width:"+i+";-webkit-column-width:"+i+";");e.writeStyles();e.write(">");for(r=0;r<n.length;r++){this.renderLegendItem(e,"sapUiCalLegDayType"+t._getItemType(n[r],n).slice(4),n[r],["sapUiUnifiedLegendSquareColor","sapMPlanCalLegendAppCircle"])}e.write("</div>")};return n},true);