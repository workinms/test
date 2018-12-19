/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/Object","sap/ui/core/ResizeHandler","sap/ui/performance/trace/Interaction","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes"],function(t,i,o,s,e,l){"use strict";var r=i.extend("sap.ui.core.delegate.ScrollEnablement",{constructor:function(t,o,s){i.apply(this);this._oControl=t;this._oControl.addDelegate(this);this._sContentId=o;this._sContainerId=s.scrollContainerId;this._bHorizontal=!!s.horizontal;this._bVertical=!!s.vertical;this._scrollX=0;this._scrollY=0;this._scrollCoef=.9;h(this);if(this._init){this._init.apply(this,arguments)}},setHorizontal:function(t){this._bHorizontal=!!t;this._setOverflow&&this._setOverflow()},setVertical:function(t){this._bVertical=!!t;this._setOverflow&&this._setOverflow()},getHorizontal:function(){return this._bHorizontal},getVertical:function(){return this._bVertical},setBounce:function(t){},setPullDown:function(t){this._oPullDown=t;return this},setGrowingList:function(t,i){this._fnScrollLoadCallback=t;this._sScrollLoadDirection=i;return this},setIconTabBar:function(t,i,o){this._oIconTabBar=t;this._fnScrollEndCallback=e.proxy(i,t);this._fnScrollStartCallback=e.proxy(o,t);return this},scrollTo:function(t,i,o){this._scrollX=t;this._scrollY=i;this._scrollTo(t,i,o);return this},getChildPosition:function(t){var i=t instanceof e?t:e(t),o=i.position(),s=i.offsetParent(),l;while(!s.is(this._$Container)){l=s.position();o.top+=l.top;o.left+=l.left;s=s.offsetParent()}return o},scrollToElement:function(t,i,o){o=o||[0,0];if(!this._$Container[0].contains(t)||t.style.display==="none"||t.offsetParent.nodeName.toUpperCase()==="HTML"){return this}var s=e(t),l=this.getChildPosition(s),r=this.getScrollLeft()+l.left+o[0],n=this.getScrollTop()+l.top+o[1];if(this._bFlipX){r=this.getScrollLeft()-(l.left-this._$Container.width())-s.width()}this._scrollTo(r,n,i);return this},destroy:function(){if(this._exit){this._exit()}if(this._oControl){this._oControl.removeDelegate(this);this._oControl=undefined}},refresh:function(){if(this._refresh){this._refresh()}},_useDefaultScroll:function(t){return t.isContentEditable},onkeydown:function(t){if(this._useDefaultScroll(t.target)){return}var i=this._$Container[0];if(t.altKey&&this.getHorizontal()){switch(t.keyCode){case l.PAGE_UP:this._customScrollTo(this._scrollX-i.clientWidth,this._scrollY,t);break;case l.PAGE_DOWN:this._customScrollTo(this._scrollX+i.clientWidth,this._scrollY,t);break}}if(t.ctrlKey){switch(t.keyCode){case l.ARROW_UP:if(this.getVertical()){this._customScrollTo(this._scrollX,this._scrollY-i.clientHeight*this._scrollCoef,t)}break;case l.ARROW_DOWN:if(this.getVertical()){this._customScrollTo(this._scrollX,this._scrollY+i.clientHeight*this._scrollCoef,t)}break;case l.ARROW_LEFT:if(this.getHorizontal()){this._customScrollTo(this._scrollX-i.clientWidth,this._scrollY,t)}break;case l.ARROW_RIGHT:if(this.getHorizontal()){this._customScrollTo(this._scrollX+i.clientWidth,this._scrollY,t)}break;case l.HOME:if(this.getHorizontal()){this._customScrollTo(0,this._scrollY,t)}if(this.getVertical()){this._customScrollTo(this._scrollX,0,t)}break;case l.END:var o=i.scrollWidth-i.clientWidth;var s=i.scrollHeight-i.clientHeight;if(!this.getHorizontal()){s=this._scrollY}if(!this.getVertical()){o=this._scrollX}this._customScrollTo(o,s,t);break}}},_customScrollTo:function(t,i,o){var s=o.target.nodeName;if(s!="INPUT"&&s!="TEXTAREA"){o.preventDefault();o.setMarked();this._scrollTo(t,i)}}});var n={getScrollTop:function(){return this._scrollY||0},getScrollLeft:function(){return this._scrollX||0},getScrollHeight:function(){var t=this._$Container;return t&&t[0]?t[0].scrollHeight:0},getMaxScrollTop:function(){var t=this._$Container;return t&&t[0]?t[0].scrollHeight-t[0].clientHeight:-1},_cleanup:function(){if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}},_setOverflow:function(){var i=this._$Container;if(!i||!i[0]){return}if(t.os.ios){i.css("overflow-x",this._bHorizontal&&!this._bDragScroll?"scroll":"hidden").css("overflow-y",this._bVertical&&!this._bDragScroll?"scroll":"hidden").css("-webkit-overflow-scrolling","touch")}else{i.css("overflow-x",this._bHorizontal&&!this._bDragScroll?"auto":"hidden").css("overflow-y",this._bVertical&&!this._bDragScroll?"auto":"hidden")}},_refresh:function(){var i=this._$Container;if(!(i&&i.length)){return}if(this._oPullDown&&this._oPullDown._bTouchMode){var s=this._oPullDown.getDomRef();if(s){s.style.marginTop=this._oPullDown._iState==2?"":"-"+s.offsetHeight+"px"}}if(i.scrollTop()!=this._scrollY){i.scrollTop(this._scrollY)}if(!(this._oPullDown&&this._oPullDown._bTouchMode)&&!this._fnScrollLoadCallback&&!t.browser.msie){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}},_onScroll:function(){var t=this._$Container,i=t.scrollTop(),o=i-this._scrollY;s.notifyStepStart(this._oControl);this._scrollX=t.scrollLeft();this._scrollY=i;if(this._fnScrollLoadCallback){if(this._sScrollLoadDirection=="Upwards"){if(o<0&&i<10){this._fnScrollLoadCallback()}}else if(o>=0&&t[0].scrollHeight-i-t[0].clientHeight<100){this._fnScrollLoadCallback()}}if(this._oIconTabBar&&this._fnScrollEndCallback){this._fnScrollEndCallback()}},_onStart:function(t){var i=this._$Container[0];if(!i){return}this._bDoDrag=this._bDragScroll;var o=t.touches?t.touches[0]:t;this._iX=o.pageX;this._iY=o.pageY;this._bPullDown=false;this._iDirection=""},_onTouchMove:function(t){var i=this._$Container[0];var o=t.touches?t.touches[0]:t;var s=o.pageX-this._iX;var e=o.pageY-this._iY;if(this._iDirection==""){if(s!=0||e!=0){this._iDirection=Math.abs(e)>Math.abs(s)?"v":"h"}if(this._oPullDown&&this._oPullDown._bTouchMode&&this._iDirection=="v"&&i.scrollTop<=1){if(e>Math.abs(s)){this._bPullDown=true}}}if(this._bPullDown===true){var l=this._oPullDown.getDomRef();var r=t.touches[0].pageY-this._iY-l.offsetHeight;if(r>20){r=20}l.style.marginTop=r+"px";this._oPullDown.doPull(r);t.preventDefault();this._bDoDrag=false}if(this._bDoDrag){var n=i.scrollLeft,h=i.scrollTop;if(this._bHorizontal){if(this._bFlipX){i.scrollLeft=n-this._iX+o.pageX}else{i.scrollLeft=n+this._iX-o.pageX}}if(this._bVertical){i.scrollTop=h+this._iY-o.pageY}if(i.scrollLeft!=n||i.scrollTop!=h){t.setMarked&&t.setMarked();t.preventDefault()}this._iX=o.pageX;this._iY=o.pageY;return}},_onEnd:function(t){s.notifyEventStart(t);if(this._oPullDown&&this._oPullDown._bTouchMode){this._oPullDown.doScrollEnd();this._refresh()}if(this._bDragScroll&&this._iDirection){t.setMarked&&t.setMarked()}},_onMouseDown:function(t){if(this._bDragScroll&&t.button==0){this._bScrolling=true;this._onStart(t)}},_onMouseMove:function(t){if(this._bScrolling){var i=t.originalEvent||t;var o=i.buttons||i.which;if(o==1||t.pressure){var s=this._$Container[0];if(this._bHorizontal){if(this._bFlipX){s.scrollLeft=s.scrollLeft-this._iX+t.pageX}else{s.scrollLeft=s.scrollLeft+this._iX-t.pageX}}if(this._bVertical){s.scrollTop=s.scrollTop+this._iY-t.pageY}this._iX=t.pageX;this._iY=t.pageY}}},_onMouseUp:function(){if(this._bScrolling){this._bScrolling=false;this._onEnd()}},onBeforeRendering:function(){if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}var t=this._$Container;if(t){if(t.height()>0){this._scrollX=t.scrollLeft();this._scrollY=t.scrollTop()}t.off()}},onAfterRendering:function(){var i=this._$Container=this._sContainerId?e(document.getElementById(this._sContainerId)):e(document.getElementById(this._sContentId)).parent();var s=e.proxy(this._refresh,this);var l=i.is(":visible");this._setOverflow();if(this._scrollX!==0||this._scrollY!==0){this._scrollTo(this._scrollX,this._scrollY)}this._refresh();if(!l||t.browser.msie||this._oPullDown||this._fnScrollLoadCallback){this._sResizeListenerId=o.register(i[0],s)}i.on("scroll",this._onScroll.bind(this));var r=i[0];function n(t,i){t.split(" ").forEach(function(t){r&&r.addEventListener(t,i)})}function h(t){return t.pointerType=="touch"?this._onStart(t):this._onMouseDown(t)}function c(t){return t.pointerType=="touch"?this._onTouchMove(t):this._onMouseMove(t)}function a(t){return t.pointerType=="touch"?this._onEnd(t):this._onMouseUp(t)}if(t.support.pointer&&t.system.desktop){if(this._bDragScroll){n("pointerdown",h.bind(this));n("pointermove",c.bind(this));n("pointerup pointercancel pointerleave",a.bind(this))}}else if(t.support.touch){if(this._bDragScroll||this._oPullDown&&this._oPullDown._bTouchMode){i.on("touchcancel touchend",this._onEnd.bind(this)).on("touchstart",this._onStart.bind(this)).on("touchmove",this._onTouchMove.bind(this))}}else if(this._bDragScroll){i.on("mouseup mouseleave",this._onMouseUp.bind(this)).mousedown(this._onMouseDown.bind(this)).mousemove(this._onMouseMove.bind(this))}},_readActualScrollPosition:function(){if(this._$Container.width()>0){this._scrollX=this._$Container.scrollLeft()}if(this._$Container.height()>0){this._scrollY=this._$Container.scrollTop()}},_scrollTo:function(t,i,o){if(this._$Container.length>0){if(o>0){this._$Container.finish().animate({scrollTop:i,scrollLeft:t},o,e.proxy(this._readActualScrollPosition,this))}else{this._$Container.scrollTop(i);this._$Container.scrollLeft(t);this._readActualScrollPosition()}}}};function h(i){var o={_init:function(i,o,s){if(e.event&&e.event.special&&e.event.special.swipe&&e.event.special.swipe.scrollSupressionThreshold<120){e.event.special.swipe.scrollSupressionThreshold=120}e.extend(this,n);if(s.nonTouchScrolling===true){this._bDragScroll=true}if(sap.ui.getCore().getConfiguration().getRTL()){this._scrollX=9999;if(t.browser.msie||t.browser.edge){this._bFlipX=true}}},_exit:function(){if(this._cleanup){this._cleanup()}}};e.extend(i,o)}return r});