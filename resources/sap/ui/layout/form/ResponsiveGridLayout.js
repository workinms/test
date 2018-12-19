/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/layout/library","sap/ui/layout/Grid","sap/ui/layout/GridData","./Form","./FormContainer","./FormElement","./FormLayout","./ResponsiveGridLayoutRenderer","sap/ui/thirdparty/jquery"],function(e,t,a,i,n,r,s,o,l,u,f){"use strict";var d=l.extend("sap.ui.layout.form.ResponsiveGridLayout",{metadata:{library:"sap.ui.layout",properties:{labelSpanXL:{type:"int",group:"Misc",defaultValue:-1},labelSpanL:{type:"int",group:"Misc",defaultValue:4},labelSpanM:{type:"int",group:"Misc",defaultValue:2},labelSpanS:{type:"int",group:"Misc",defaultValue:12},adjustLabelSpan:{type:"boolean",group:"Misc",defaultValue:true},emptySpanXL:{type:"int",group:"Misc",defaultValue:-1},emptySpanL:{type:"int",group:"Misc",defaultValue:0},emptySpanM:{type:"int",group:"Misc",defaultValue:0},emptySpanS:{type:"int",group:"Misc",defaultValue:0},columnsXL:{type:"int",group:"Misc",defaultValue:-1},columnsL:{type:"int",group:"Misc",defaultValue:2},columnsM:{type:"int",group:"Misc",defaultValue:1},singleContainerFullSize:{type:"boolean",group:"Misc",defaultValue:true},breakpointXL:{type:"int",group:"Misc",defaultValue:1440},breakpointL:{type:"int",group:"Misc",defaultValue:1024},breakpointM:{type:"int",group:"Misc",defaultValue:600}}}});var p=e.extend("sap.ui.layout.form.ResponsiveGridLayoutPanel",{metadata:{aggregations:{content:{type:"sap.ui.layout.Grid",multiple:false}},associations:{container:{type:"sap.ui.layout.form.FormContainer",multiple:false},layout:{type:"sap.ui.layout.form.ResponsiveGridLayout",multiple:false}}},getLayoutData:function(){var e=sap.ui.getCore().byId(this.getContainer());var t=sap.ui.getCore().byId(this.getLayout());var a;if(t&&e){a=t.getLayoutDataForElement(e,"sap.ui.layout.GridData")}if(a){return a}else{return this.getAggregation("layoutData")}},getCustomData:function(){var e=sap.ui.getCore().byId(this.getContainer());if(e){return e.getCustomData()}},refreshExpanded:function(){var e=sap.ui.getCore().byId(this.getContainer());if(e){if(e.getExpanded()){this.$().removeClass("sapUiRGLContainerColl")}else{this.$().addClass("sapUiRGLContainerColl")}}},renderer:function(e,t){var a=sap.ui.getCore().byId(t.getContainer());var i=sap.ui.getCore().byId(t.getLayout());var n=t.getContent();var r=a.getExpandable();var s=a.getTooltip_AsString();var o=a.getToolbar();var l=a.getTitle();e.write("<div");e.writeControlData(t);e.addClass("sapUiRGLContainer");if(r&&!a.getExpanded()){e.addClass("sapUiRGLContainerColl")}if(o){e.addClass("sapUiFormContainerToolbar")}else if(l){e.addClass("sapUiFormContainerTitle")}if(s){e.writeAttributeEscaped("title",s)}e.writeClasses();i.getRenderer().writeAccessibilityStateContainer(e,a);e.write(">");i.getRenderer().renderHeader(e,o,l,a._oExpandButton,r,false,a.getId());if(n){e.write("<div");e.addClass("sapUiRGLContainerCont");e.writeClasses();e.write(">");e.renderControl(n);e.write("</div>")}e.write("</div>")}});d.prototype.init=function(){this.mContainers={};this.oDummyLayoutData=new n(this.getId()+"--Dummy")};d.prototype.exit=function(){for(var e in this.mContainers){_.call(this,e)}if(this._mainGrid){this._mainGrid.destroy();delete this._mainGrid}this.oDummyLayoutData.destroy();this.oDummyLayoutData=undefined};d.prototype.onBeforeRendering=function(e){var t=this.getParent();if(!t||!(t instanceof r)){return}t._bNoInvalidate=true;g.call(this,t);b.call(this,t);t._bNoInvalidate=false};d.prototype.onAfterRendering=function(e){if(this._mainGrid&&this._mainGrid.__bIsUsed){for(var a in this.mContainers){if(this.mContainers[a][1]._sContainerResizeListener){t.deregister(this.mContainers[a][1]._sContainerResizeListener);this.mContainers[a][1]._sContainerResizeListener=null}}}};d.prototype.toggleContainerExpanded=function(e){var t=e.getId();if(this.mContainers[t]&&this.mContainers[t][0]){var a=this.mContainers[t][0];a.refreshExpanded()}};d.prototype.onLayoutDataChange=function(e){var t=e.srcControl;if(t instanceof s){if(this._mainGrid){this._mainGrid.onLayoutDataChange(e);this.invalidate()}}else if(!(t instanceof o)){var a=t.getParent();if(a instanceof o){var i=a.getParent();var n=i.getId();if(this.mContainers[n]&&this.mContainers[n][1]){this.mContainers[n][1].onLayoutDataChange(e)}}}};d.prototype.onsapup=function(e){this.onsapleft(e)};d.prototype.onsapdown=function(e){this.onsapright(e)};d.prototype.getContainerRenderedDomRef=function(e){if(this.getDomRef()){var t=e.getId();if(this.mContainers[t]){if(this.mContainers[t][0]){var a=this.mContainers[t][0];return a.getDomRef()}else if(this.mContainers[t][1]){var i=this.mContainers[t][1];return i.getDomRef()}}}return null};d.prototype.getElementRenderedDomRef=function(e){return null};function g(e){var t=e.getVisibleFormContainers();var a=t.length;var i=0;var n;var r;var s;var o;var l=0;for(l=0;l<a;l++){s=t[l];s._checkProperties();if(s.isVisible()){i++;o=s.getId();n=undefined;r=undefined;var u=t[l+1];if(this.mContainers[o]&&this.mContainers[o][1]){r=this.mContainers[o][1]}else{r=h.call(this,s)}var f=s.getTitle();var d=s.getToolbar();if(d||f||s.getExpandable()){if(this.mContainers[o]&&this.mContainers[o][0]){n=this.mContainers[o][0]}else{n=m.call(this,s,r);v(r,true)}C(n,s,i,u,a)}else{if(this.mContainers[o]&&this.mContainers[o][0]){y(this.mContainers[o][0])}v(r,false);C(r,s,i,u,a)}this.mContainers[o]=[n,r]}}var p=Object.keys(this.mContainers).length;if(a<p){for(o in this.mContainers){var g=false;for(l=0;l<a;l++){s=t[l];if(o==s.getId()){g=true;break}}if(!g){_.call(this,o)}}}}function m(e,t){var a=e.getId();var i=new p(a+"---Panel",{container:e,layout:this,content:t});return i}function y(e){e.setContent(null);e.setLayout(null);e.setContainer(null);e.destroy()}function h(e){var t=e.getId()+"--Grid";var a=new i(t,{vSpacing:0,hSpacing:0,containerQuery:true});a.__myParentLayout=this;a.__myParentContainerId=e.getId();a.addStyleClass("sapUiFormResGridCont").addStyleClass("sapUiRespGridOverflowHidden");a.getContent=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);if(e){var t=[];var a=e.getVisibleFormElements();var i;var n;for(var r=0;r<a.length;r++){var s=a[r];n=s.getLabelControl();if(n){t.push(n)}i=s.getFields();for(var o=0;o<i.length;o++){t.push(i[o])}}return t}else{return false}};a.getAriaLabelledBy=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);if(e&&!e.getToolbar()&&!e.getTitle()&&!e.getExpandable()){return e.getAriaLabelledBy()}return[]};var n={labelSpan:0,span:0,firstField:false,defaultFields:0,row:0,myRow:false,freeFields:0,finished:false};var r={id:"XL",getEffectiveSpan:function(e){var t=e._getEffectiveSpanXLarge();if(!t){t=e._getEffectiveSpanLarge()}return t},getEmptySpan:function(e){var t=e.getEmptySpanXL();if(t<0){t=e.getEmptySpanL()}return t},getLabelSpan:function(e){return e.getLabelSpanXL()},setIndent:function(e,t){e.setIndentXL(t)},setLinebreak:function(e,t){e.setLinebreakXL(t)}};f.extend(r,n);var s={id:"L",getEffectiveSpan:function(e){return e._getEffectiveSpanLarge()},getEmptySpan:function(e){return e.getEmptySpanL()},getLabelSpan:function(e){return e.getLabelSpanL()},setIndent:function(e,t){e.setIndentL(t)},setLinebreak:function(e,t){e.setLinebreakL(t)}};f.extend(s,n);var o={id:"M",getEffectiveSpan:function(e){return e._getEffectiveSpanMedium()},getEmptySpan:function(e){return e.getEmptySpanM()},getLabelSpan:function(e){return e.getLabelSpanM()},setIndent:function(e,t){e.setIndentM(t)},setLinebreak:function(e,t){e.setLinebreakM(t)}};f.extend(o,n);var l={id:"S",getEffectiveSpan:function(e){return e._getEffectiveSpanSmall()},getEmptySpan:function(e){return e.getEmptySpanS()},getLabelSpan:function(e){return e.getLabelSpanS()},setIndent:function(e,t){e.setIndentS(t)},setLinebreak:function(e,t){e.setLinebreakS(t)}};f.extend(l,n);var u=[r,s,o,l];a._getLayoutDataForControl=function(e){var t=this.__myParentLayout;var a=t.getLayoutDataForElement(e,"sap.ui.layout.GridData");var i=e.getParent();var d=i.getLabelControl();if(a){if(d==e){a._setStylesInternal("sapUiFormElementLbl")}return a}else{var p=sap.ui.getCore().byId(this.__myParentContainerId);var g=t.getLayoutDataForElement(p,"sap.ui.layout.GridData");var m=p.getParent();var y;var h=0;for(h=0;h<u.length;h++){y=u[h];f.extend(y,n);y.labelSpan=y.getLabelSpan(t)}if(t.getAdjustLabelSpan()){if(m.getVisibleFormContainers().length>=1&&t.getColumnsM()>1){o.labelSpan=t.getLabelSpanL()}if(g){if(g._getEffectiveSpanLarge()==12){s.labelSpan=t.getLabelSpanM();o.labelSpan=t.getLabelSpanM()}}if(m.getVisibleFormContainers().length==1||t.getColumnsL()==1){s.labelSpan=t.getLabelSpanM();o.labelSpan=t.getLabelSpanM()}}if(r.labelSpan<0){r.labelSpan=s.labelSpan}if(d==e){t.oDummyLayoutData.setSpan("XL"+r.labelSpan+" L"+s.labelSpan+" M"+o.labelSpan+" S"+l.labelSpan);t.oDummyLayoutData.setLinebreak(true);t.oDummyLayoutData.setIndentXL(0).setIndentL(0).setIndentM(0).setIndentS(0);t.oDummyLayoutData._setStylesInternal("sapUiFormElementLbl");return t.oDummyLayoutData}else{var L;if(d){L=t.getLayoutDataForElement(d,"sap.ui.layout.GridData")}var v=i.getFields();var C=v.length;var _;var b;var c=1;var S=false;var D;var G=0;for(h=0;h<u.length;h++){y=u[h];y.span=12-y.getEmptySpan(t);if(d){if(L){D=y.getEffectiveSpan(L);if(D){y.labelSpan=D}}if(y.labelSpan<12){y.span=y.span-y.labelSpan}}y.spanFields=y.span}for(G=0;G<C;G++){_=v[G];if(_!=e){b=t.getLayoutDataForElement(_,"sap.ui.layout.GridData");if(b){for(h=0;h<u.length;h++){y=u[h];D=y.getEffectiveSpan(b);if(D&&D<y.span){y.span=y.span-D}}}else{c++}}else{if(c==1){S=true}}}var F=[];for(h=0;h<u.length;h++){y=u[h];y.firstField=S;y.defaultFields=c;if(y.span<c){y.defaultFields=0;y.row=0;y.myRow=false;y.freeFields=y.spanFields;y.span=y.spanFields;y.finished=false;F.push(y)}}if(F.length>0){for(G=0;G<C;G++){_=v[G];b=undefined;if(_!=e){b=t.getLayoutDataForElement(_,"sap.ui.layout.GridData")}for(h=0;h<F.length;h++){y=F[h];if(y.finished){continue}if(b){D=y.getEffectiveSpan(b);y.span=y.span-D}else{D=1}if(y.freeFields>=D){y.freeFields=y.freeFields-D;if(!b){y.defaultFields++}}else{if(y.myRow){y.finished=true}else{y.freeFields=y.spanFields-D;y.row++;if(b){y.defaultFields=0;y.span=y.spanFields-D}else{y.defaultFields=1;y.span=y.spanFields}if(_==e){y.firstField=true}}}if(_==e){y.myRow=true}}}}var I=0;var R="";var M;for(h=0;h<u.length;h++){y=u[h];if(y.id!="S"||y.labelSpan<12){if(y.firstField){I=y.span-Math.floor(y.span/y.defaultFields)*y.defaultFields;M=Math.floor(y.span/y.defaultFields)+I}else{M=Math.floor(y.span/y.defaultFields)}}else{M=12}if(R){R=R+" "}R=R+y.id+M;y.setLinebreak(t.oDummyLayoutData,y.firstField&&y.row>0);y.setIndent(t.oDummyLayoutData,y.firstField&&y.row>0?y.labelSpan:0)}t.oDummyLayoutData.setSpan(R);t.oDummyLayoutData.setLinebreak(S&&!d);t.oDummyLayoutData._setStylesInternal(undefined);return t.oDummyLayoutData}return a}};a._onParentResizeOrig=a._onParentResize;a._onParentResize=function(){if(!this.getDomRef()){this._cleanup();return}if(!f(this.getDomRef()).is(":visible")){return}var e=this.__myParentLayout;if(!e._mainGrid||!e._mainGrid.__bIsUsed){var t=e.getParent().getVisibleFormContainers();var a;for(var i=0;i<t.length;i++){a=t[i];break}if(!a||!e.mContainers[a.getId()]||a.getId()!=this.__myParentContainerId){return}if(e.mContainers[this.__myParentContainerId][0]){var n=e.mContainers[this.__myParentContainerId][0].getDomRef();var r=n.clientWidth;if(r<=e.getBreakpointM()){this._toggleClass("Phone")}else if(r>e.getBreakpointM()&&r<=e.getBreakpointL()){this._toggleClass("Tablet")}else if(r>e.getBreakpointL()&&r<=e.getBreakpointXL()){this._toggleClass("Desktop")}else{this._toggleClass("LargeDesktop")}}else{this._setBreakPointTablet(e.getBreakpointM());this._setBreakPointDesktop(e.getBreakpointL());this._setBreakPointLargeDesktop(e.getBreakpointXL());this._onParentResizeOrig()}}else{var s=e._mainGrid.$();if(s.hasClass("sapUiRespGridMedia-Std-Phone")){this._toggleClass("Phone")}else if(s.hasClass("sapUiRespGridMedia-Std-Tablet")){this._toggleClass("Tablet")}else if(s.hasClass("sapUiRespGridMedia-Std-Desktop")){this._toggleClass("Desktop")}else{this._toggleClass("LargeDesktop")}}};a._getAccessibleRole=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);var t=this.__myParentLayout;if(t._mainGrid&&t._mainGrid.__bIsUsed&&!e.getToolbar()&&!e.getTitle()&&!e.getExpandable()&&e.getAriaLabelledBy().length>0){return"form"}};a.getUIArea=function(){var e=this.__myParentLayout;if(e){return e.getUIArea()}else{return null}};return a}function L(e){if(e.__myParentContainerId){e.__myParentContainerId=undefined}e.__myParentLayout=undefined;e.destroy()}function v(e,t){if(t){if(e.__originalGetLayoutData){e.getLayoutData=e.__originalGetLayoutData;delete e.__originalGetLayoutData}}else if(!e.__originalGetLayoutData){e.__originalGetLayoutData=e.getLayoutData;e.getLayoutData=function(){var e=this.__myParentLayout;var t=sap.ui.getCore().byId(this.__myParentContainerId);var a;if(t){a=e.getLayoutDataForElement(t,"sap.ui.layout.GridData")}if(a){return a}else{return this.getAggregation("layoutData")}}}}function C(e,t,a,i,r){var s;if(e instanceof p){s=sap.ui.getCore().byId(e.getLayout())}else{s=e.__myParentLayout}var o=s.getLayoutDataForElement(t,"sap.ui.layout.GridData");if(!o){var l=s.getColumnsM();var u=s.getColumnsL();var f=s.getColumnsXL();var d=a%u==1;var g=a%u==0;var m=a>u*(Math.ceil(r/u)-1);var y=a<=u;var h=a%l==1;var L=a%l==0;var v=a>l*(Math.ceil(r/l)-1);var C=a<=l;var _=false;var b=g;var c=m;var S=y;if(f>0){_=a%f==1;b=a%f==0;c=a>f*(Math.ceil(r/f)-1);S=a<=f}if(i){var D=s.getLayoutDataForElement(i,"sap.ui.layout.GridData");if(D&&(D.getLinebreak()||D.getLinebreakXL())){b=true;c=false}if(D&&(D.getLinebreak()||D.getLinebreakL())){g=true;m=false}if(D&&(D.getLinebreak()||D.getLinebreakM())){L=true;v=false}}var G="";if(b){G="sapUiFormResGridLastContXL"}if(g){if(G){G=G+" "}G=G+"sapUiFormResGridLastContL"}if(L){if(G){G=G+" "}G=G+"sapUiFormResGridLastContM"}if(c){if(G){G=G+" "}G=G+"sapUiFormResGridLastRowXL"}if(m){if(G){G=G+" "}G=G+"sapUiFormResGridLastRowL"}if(v){if(G){G=G+" "}G=G+"sapUiFormResGridLastRowM"}if(S){if(G){G=G+" "}G=G+"sapUiFormResGridFirstRowXL"}if(y){if(G){G=G+" "}G=G+"sapUiFormResGridFirstRowL"}if(C){if(G){G=G+" "}G=G+"sapUiFormResGridFirstRowM"}o=e.getLayoutData();if(!o){o=new n(e.getId()+"--LD",{linebreakL:d,linebreakM:h});e.setLayoutData(o)}else{o.setLinebreakL(d);o.setLinebreakM(h)}if(f>0){o.setLinebreakXL(_)}o._setStylesInternal(G)}}function _(e){var t=this.mContainers[e];var a=t[1];if(a){L(a)}var i=t[0];if(i){y(i)}delete this.mContainers[e]}function b(e){var t=e.getVisibleFormContainers();var a;var n=t.length;var r=0;var s=0;var o=0;if(n>1||!this.getSingleContainerFullSize()){var l=Math.floor(12/this.getColumnsM());var u=Math.floor(12/this.getColumnsL());var f;var d="";var p=this.getColumnsXL();if(p>=0){f=Math.floor(12/p);d=d+"XL"+f+" "}d=d+"L"+u+" M"+l+" S12";if(!this._mainGrid){this._mainGrid=new i(e.getId()+"--Grid",{defaultSpan:d,hSpacing:0,vSpacing:0,containerQuery:true}).setParent(this);this._mainGrid.addStyleClass("sapUiFormResGridMain").addStyleClass("sapUiRespGridOverflowHidden");this._mainGrid._onParentResizeOrig=this._mainGrid._onParentResize;this._mainGrid._onParentResize=function(){this._onParentResizeOrig();var e=this.getParent();for(var t in e.mContainers){e.mContainers[t][1]._onParentResize()}}}else{this._mainGrid.setDefaultSpan(d);var g=this._mainGrid.getContent();r=g.length;var m=false;for(s=0;s<r;s++){var y=g[s];a=undefined;if(y.getContainer){a=sap.ui.getCore().byId(y.getContainer())}else{a=sap.ui.getCore().byId(y.__myParentContainerId)}if(a&&a.isVisible()){var h=t[o];if(a!=h){m=true;break}var L=this.mContainers[a.getId()];if(L[0]&&L[0]!=y){m=true;break}if(!L[0]&&L[1]&&L[1]!=y){m=true;break}o++}else{this._mainGrid.removeContent(y)}}if(m){this._mainGrid.removeAllContent();r=0}}this._mainGrid._setBreakPointTablet(this.getBreakpointM());this._mainGrid._setBreakPointDesktop(this.getBreakpointL());this._mainGrid._setBreakPointLargeDesktop(this.getBreakpointXL());this._mainGrid.__bIsUsed=true;if(r<n){var v=0;if(r>0){v=r--}for(s=v;s<n;s++){a=t[s];var C=a.getId();if(this.mContainers[C]){if(this.mContainers[C][0]){this._mainGrid.addContent(this.mContainers[C][0])}else if(this.mContainers[C][1]){this._mainGrid.addContent(this.mContainers[C][1])}}}}}else if(this._mainGrid){this._mainGrid.__bIsUsed=false}}return d});