(this.webpackJsonpclient2=this.webpackJsonpclient2||[]).push([[0],{169:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return i}));var r=n(24),a=(n(47),n(66)),i=function(t,e,n,i,c){var o=t.ownerDocument.defaultView;return Object(a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/o.innerWidth;i(e)},onEnd:function(t){var e=t.deltaX,n=o.innerWidth,a=e/n,i=t.velocityX,u=n/2,s=i>=0&&(i>.2||t.deltaX>u),d=(s?1-a:a)*n,h=0;if(d>5){var l=d/Math.abs(i);h=Math.min(l,540)}c(s,a<=0?.01:Object(r.e)(0,a,.9999),h)}})}}}]);
//# sourceMappingURL=0.78983cae.chunk.js.map