"use strict";var o=function(e,r){return function(){try{return r||e((r={exports:{}}).exports,r),r.exports}catch(i){throw (r=0, i)}};};var f=o(function(A,l){
var c=require('@stdlib/math-base-assert-is-nanf/dist'),x=require('@stdlib/number-float64-base-to-float32/dist');function R(e,r,i,s){var v,u,t,a,n;if(e<=0)return NaN;if(e===1||i===0)return c(r[s])?r[s]:0;for(t=s,n=0;n<e&&(a=r[t],a!==a);n++)t+=i;if(n===e)return NaN;for(u=a,v=u,n+=1,n;n<e;n++)t+=i,a=r[t],!c(a)&&(a<u?u=a:a>v&&(v=a));return x(v-u)}l.exports=R
});var p=o(function(B,m){
var _=require('@stdlib/strided-base-stride2offset/dist'),b=f();function k(e,r,i){return b(e,r,i,_(e,i))}m.exports=k
});var d=o(function(C,g){
var E=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),y=p(),F=f();E(y,"ndarray",F);g.exports=y
});var O=require("path").join,T=require('@stdlib/utils-try-require/dist'),h=require('@stdlib/assert-is-error/dist'),w=d(),q,j=T(O(__dirname,"./native.js"));h(j)?q=w:q=j;module.exports=q;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
