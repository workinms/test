/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/theming/Parameters","./FormLayoutRenderer","sap/base/Log"],function(e,t,r,i){"use strict";var a=e.extend(r);a.renderForm=function(e,r,i){var a=r.getSingleColumn();var l=16;var s=false;var n=0;var o=i.getFormContainers();var d=o.length;var f=0;var g;var p;var u=i.getToolbar();var w=i.getTitle();if(a){l=l/2;n=l}else{n=l/2;for(f=0;f<d;f++){p=this.getContainerData(r,o[f]);if(p&&p.getHalfGrid()){s=true;break}}}e.write('<table role="presentation"');e.writeControlData(r);e.write(' cellpadding="0" cellspacing="0"');e.addStyle("border-collapse","collapse");e.addStyle("table-layout","fixed");e.addStyle("width","100%");e.addClass("sapUiGrid");this.addBackgroundClass(e,r);if(u){e.addClass("sapUiFormToolbar")}e.writeStyles();e.writeClasses();e.write(">");e.write("<colgroup>");e.write("<col span="+n+">");if(s){e.write('<col class = "sapUiGridSpace"span=1>')}if(!a){e.write("<col span="+n+">")}e.write("</colgroup><tbody>");if(u||w){var v=l;if(s){v++}e.write('<tr class="sapUiGridTitle"><th colspan='+v+">");var c;if(!u){c=t.get("sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize")}this.renderHeader(e,u,w,undefined,false,c,i.getId());e.write("</th></tr>")}f=0;var C;var h;while(f<d){g=o[f];g._checkProperties();if(g.isVisible()){p=this.getContainerData(r,g);if(p&&p.getHalfGrid()&&!a){C=o[f+1];h=undefined;if(C&&C.isVisible()){h=this.getContainerData(r,C)}if(h&&h.getHalfGrid()){C._checkProperties();this.renderContainerHalfSize(e,r,g,C,l);f++}else{this.renderContainerHalfSize(e,r,g,undefined,l)}}else{this.renderContainerFullSize(e,r,g,l,s)}}f++}e.write("</tbody></table>")};a.renderContainerFullSize=function(e,t,r,i,a){var l=r.getExpandable();var s=r.getTooltip_AsString();var n=r.getToolbar();var o=r.getTitle();if(n||o){var d=i;if(a){d++}e.write('<tr class="sapUiGridConteinerFirstRow sapUiGridConteinerHeaderRow"><td colspan='+d);e.addClass("sapUiGridHeader");if(s){e.writeAttributeEscaped("title",s)}if(n){e.addClass("sapUiFormContainerToolbar")}else if(o){e.addClass("sapUiFormContainerTitle")}e.writeClasses();e.write(">");this.renderHeader(e,n,r.getTitle(),r._oExpandButton,l,false,r.getId());e.write("</td></tr>")}if(!l||r.getExpanded()){var f=r.getFormElements();var g;var p=[];var u;var w=false;for(var v=0,c=f.length;v<c;v++){g=f[v];if(g.isVisible()){u=p[0]&&p[0][0]==i;e.write("<tr");if(!w){w=true;if(!n&&!o){e.addClass("sapUiGridConteinerFirstRow")}}if(!this.checkFullSizeElement(t,g)&&p[0]!="full"&&!u){e.writeElementData(g);e.addClass("sapUiFormElement")}e.writeClasses();e.write(">");if(!u){p=this.renderElement(e,t,g,false,i,a,p)}else{p.splice(0,1)}e.write("</tr>");if(p[0]=="full"||u){v=v-1}}}if(p.length>0){for(var C=0;C<p.length;C++){e.write("<tr></tr>")}}}};a.renderContainerHalfSize=function(e,t,r,i,a){var l=a/2;var s=r.getExpandable();var n=r.getTooltip_AsString();var o;var d=r.getTitle();var f;var g=r.getToolbar();var p;var u=[];if(!s||r.getExpanded()){u=r.getFormElements()}var w=u.length;var v=[];var c=0;var C=false;if(i){C=i.getExpandable();o=i.getTooltip_AsString();f=i.getTitle();p=i.getToolbar();if(!C||i.getExpanded()){v=i.getFormElements()}c=v.length}if(d||f||g||p){e.write('<tr class="sapUiGridConteinerFirstRow sapUiGridConteinerHeaderRow"><td colspan='+l);e.addClass("sapUiGridHeader");if(n){e.writeAttributeEscaped("title",n)}if(g){e.addClass("sapUiFormContainerToolbar")}else if(d){e.addClass("sapUiFormContainerTitle")}e.writeClasses();e.write(">");if(r){this.renderHeader(e,g,d,r._oExpandButton,s,false,r.getId())}e.write("</td><td></td><td colspan="+l);e.addClass("sapUiGridHeader");if(o){e.writeAttributeEscaped("title",o)}if(p){e.addClass("sapUiFormContainerToolbar")}else if(f){e.addClass("sapUiFormContainerTitle")}e.writeClasses();e.write(">");if(i){this.renderHeader(e,p,f,i._oExpandButton,C,false,i.getId())}e.write("</td></tr>")}if(!s||r.getExpanded()||(!C||i.getExpanded())){var h=[],m=[];var E=0,b=0;var F;var T;var U;var G;var H=false;while(E<w||b<c){F=u[E];T=v[b];U=h[0]&&h[0][0]==l;G=m[0]&&m[0][0]==l;if(F&&F.isVisible()||T&&T.isVisible()||U||G){e.write("<tr");if(!H){H=true;if(!g&&!d&&!p&&!f){e.addClass("sapUiGridConteinerFirstRow")}}e.writeClasses();e.write(">");if(!U){if(F&&F.isVisible()&&(!s||r.getExpanded())){h=this.renderElement(e,t,F,true,l,false,h)}else{e.write("<td colspan="+l+"></td>")}if(h[0]!="full"){E++}}else{if(h[0][2]>0){e.write("<td colspan="+h[0][2]+"></td>")}h.splice(0,1)}e.write("<td></td>");if(!G){if(T&&T.isVisible()&&(!C||i.getExpanded())){m=this.renderElement(e,t,T,true,l,false,m)}else{e.write("<td colspan="+l+"></td>")}if(m[0]!="full"){b++}}else{if(m[0][2]>0){e.write("<td colspan="+m[0][2]+"></td>")}m.splice(0,1)}e.write("</tr>")}else{E++;b++}}if(h.length>0||m.length>0){for(var y=0;y<h.length||y<m.length;y++){e.write("<tr></tr>")}}}};a.renderElement=function(e,t,r,a,l,s,n){var o=r.getLabelControl();var d=0;var f=r.getFields();var g=0;var p=0;var u=false;var w=1;var v=1;var c=0;if(this.checkFullSizeElement(t,r)){if(n.length>0&&n[0]!="full"){i.error('Element "'+r.getId()+'" - Too much fields for one row!',"Renderer","GridLayout");return n}if(s){l=l+1}if(o&&n[0]!="full"){e.write("<td colspan="+l+' class="sapUiFormElementLbl sapUiGridLabelFull">');e.renderControl(o);e.write("</td>");return["full"]}else{n.splice(0,1);v=this.getElementData(t,f[0]).getVCells();e.write("<td colspan="+l);if(v>1&&a){e.write(" rowspan="+v);for(c=0;c<v-1;c++){n.push([l,undefined,false])}}e.write(" >");e.renderControl(f[0]);e.write("</td>");return n}}if(n.length>0&&n[0][0]>0){l=l-n[0][0]+n[0][2];u=n[0][1];d=n[0][2];n.splice(0,1)}var C=d;var h;var m="";if(o||d>0){C=3;if(o&&d==0){h=this.getElementData(t,o);if(h){m=h.getHCells();if(m!="auto"&&m!="full"){C=parseInt(m)}}}e.write("<td colspan="+C+' class="sapUiFormElementLbl">');if(o){e.renderControl(o)}l=l-C;e.write("</td>")}if(f&&f.length>0){var E=l;var b=f.length;var F;var T=0;var U=0;for(T=0,U=f.length;T<U;T++){F=f[T];h=this.getElementData(t,F);if(h&&h.getHCells()!="auto"){E=E-parseInt(h.getHCells());b=b-1}}var G=0;for(T=0,G=0,U=f.length;T<U;T++){F=f[T];h=this.getElementData(t,F);m="auto";w=1;v=1;if(h){m=h.getHCells();v=h.getVCells()}if(m=="auto"){if(E>0){w=Math.floor(E/b);if(w<1){w=1}G++;p=p+w;if(G==b&&E>p){w=w+(E-p)}}else{w=1}}else{w=parseInt(m)}g=g+w;if(g>l){i.error('Element "'+r.getId()+'" - Too much fields for one row!',"Renderer","GridLayout");g=g-w;break}if(v>1){for(c=0;c<v-1;c++){if(o){d=C}if(n.length>c){n[c][0]=n[c][0]+w;n[c][2]=d}else{n.push([C+w,undefined,d])}}}if(s&&g>=Math.floor(l/2)&&!u){w=w+1;u=true;if(v>1){for(c=0;c<v-1;c++){n[c][1]=true}}}e.write("<td");if(w>1){e.write(" colspan="+w)}if(v>1){e.write(" rowspan="+v)}e.write(" >");e.renderControl(F);e.write("</td>")}}if(g<l){var H=l-g;if(!a&&s&&!u){H++}e.write("<td colspan="+H+" ></td>")}return n};a.checkFullSizeElement=function(e,t){var r=t.getFields();if(r.length==1&&this.getElementData(e,r[0])&&this.getElementData(e,r[0]).getHCells()=="full"){return true}else{return false}};a.getContainerData=function(e,t){return e.getLayoutDataForElement(t,"sap.ui.layout.form.GridContainerData")};a.getElementData=function(e,t){return e.getLayoutDataForElement(t,"sap.ui.layout.form.GridElementData")};return a},true);