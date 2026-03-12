(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=globalThis,Ee=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fe=Symbol(),xe=new WeakMap;let ze=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==Fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(Ee&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=xe.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&xe.set(r,e))}return e}toString(){return this.cssText}};const qe=t=>new ze(typeof t=="string"?t:t+"",void 0,Fe),We=(t,e)=>{if(Ee)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),s=pe.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}},Te=Ee?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return qe(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Je,defineProperty:Ge,getOwnPropertyDescriptor:Ye,getOwnPropertyNames:Ke,getOwnPropertySymbols:Ze,getPrototypeOf:Xe}=Object,B=globalThis,Se=B.trustedTypes,Qe=Se?Se.emptyScript:"",be=B.reactiveElementPolyfillSupport,ee=(t,e)=>t,ue={toAttribute(t,e){switch(e){case Boolean:t=t?Qe:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Ce=(t,e)=>!Je(t,e),$e={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:Ce};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),B.litPropertyMetadata??(B.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=$e){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,r);s!==void 0&&Ge(this.prototype,e,s)}}static getPropertyDescriptor(e,r,i){const{get:s,set:n}=Ye(this.prototype,e)??{get(){return this[r]},set(o){this[r]=o}};return{get:s,set(o){const d=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$e}static _$Ei(){if(this.hasOwnProperty(ee("elementProperties")))return;const e=Xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ee("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ee("properties"))){const r=this.properties,i=[...Ke(r),...Ze(r)];for(const s of i)this.createProperty(s,r[s])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,s]of r)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const s=this._$Eu(r,i);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)r.unshift(Te(s))}else e!==void 0&&r.push(Te(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return We(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostConnected)==null?void 0:i.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostDisconnected)==null?void 0:i.call(r)})}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){var n;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:ue).toAttribute(r,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,r){var n,o;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const d=i.getPropertyOptions(s),c=typeof d.converter=="function"?{fromAttribute:d.converter}:((n=d.converter)==null?void 0:n.fromAttribute)!==void 0?d.converter:ue;this._$Em=s;const g=c.fromAttribute(r,d.type);this[s]=g??((o=this._$Ej)==null?void 0:o.get(s))??g,this._$Em=null}}requestUpdate(e,r,i,s=!1,n){var o;if(e!==void 0){const d=this.constructor;if(s===!1&&(n=this[e]),i??(i=d.getPropertyOptions(e)),!((i.hasChanged??Ce)(n,r)||i.useDefault&&i.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(d._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??r??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:d}=o,c=this[n];d!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(r)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[ee("elementProperties")]=new Map,G[ee("finalized")]=new Map,be==null||be({ReactiveElement:G}),(B.reactiveElementVersions??(B.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=globalThis,He=t=>t,fe=te.trustedTypes,De=fe?fe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ue="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,Be="?"+U,et=`<${Be}>`,W=document,ie=()=>W.createComment(""),se=t=>t===null||typeof t!="object"&&typeof t!="function",we=Array.isArray,tt=t=>we(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",ye=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,Ie=/>/g,V=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Re=/'/g,Me=/"/g,je=/^(?:script|style|textarea|title)$/i,rt=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),L=rt(1),Y=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),Oe=new WeakMap,z=W.createTreeWalker(W,129);function Ve(t,e){if(!we(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return De!==void 0?De.createHTML(e):e}const it=(t,e)=>{const r=t.length-1,i=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=Q;for(let d=0;d<r;d++){const c=t[d];let g,m,y=-1,C=0;for(;C<c.length&&(o.lastIndex=C,m=o.exec(c),m!==null);)C=o.lastIndex,o===Q?m[1]==="!--"?o=Ne:m[1]!==void 0?o=Ie:m[2]!==void 0?(je.test(m[2])&&(s=RegExp("</"+m[2],"g")),o=V):m[3]!==void 0&&(o=V):o===V?m[0]===">"?(o=s??Q,y=-1):m[1]===void 0?y=-2:(y=o.lastIndex-m[2].length,g=m[1],o=m[3]===void 0?V:m[3]==='"'?Me:Re):o===Me||o===Re?o=V:o===Ne||o===Ie?o=Q:(o=V,s=void 0);const w=o===V&&t[d+1].startsWith("/>")?" ":"";n+=o===Q?c+et:y>=0?(i.push(g),c.slice(0,y)+Ue+c.slice(y)+U+w):c+U+(y===-2?d:w)}return[Ve(t,n+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class ne{constructor({strings:e,_$litType$:r},i){let s;this.parts=[];let n=0,o=0;const d=e.length-1,c=this.parts,[g,m]=it(e,r);if(this.el=ne.createElement(g,i),z.currentNode=this.el.content,r===2||r===3){const y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(s=z.nextNode())!==null&&c.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(const y of s.getAttributeNames())if(y.endsWith(Ue)){const C=m[o++],w=s.getAttribute(y).split(U),A=/([.?@])?(.*)/.exec(C);c.push({type:1,index:n,name:A[2],strings:w,ctor:A[1]==="."?nt:A[1]==="?"?ot:A[1]==="@"?at:me}),s.removeAttribute(y)}else y.startsWith(U)&&(c.push({type:6,index:n}),s.removeAttribute(y));if(je.test(s.tagName)){const y=s.textContent.split(U),C=y.length-1;if(C>0){s.textContent=fe?fe.emptyScript:"";for(let w=0;w<C;w++)s.append(y[w],ie()),z.nextNode(),c.push({type:2,index:++n});s.append(y[C],ie())}}}else if(s.nodeType===8)if(s.data===Be)c.push({type:2,index:n});else{let y=-1;for(;(y=s.data.indexOf(U,y+1))!==-1;)c.push({type:7,index:n}),y+=U.length-1}n++}}static createElement(e,r){const i=W.createElement("template");return i.innerHTML=e,i}}function K(t,e,r=t,i){var o,d;if(e===Y)return e;let s=i!==void 0?(o=r._$Co)==null?void 0:o[i]:r._$Cl;const n=se(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((d=s==null?void 0:s._$AO)==null||d.call(s,!1),n===void 0?s=void 0:(s=new n(t),s._$AT(t,r,i)),i!==void 0?(r._$Co??(r._$Co=[]))[i]=s:r._$Cl=s),s!==void 0&&(e=K(t,s._$AS(t,e.values),s,i)),e}class st{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??W).importNode(r,!0);z.currentNode=s;let n=z.nextNode(),o=0,d=0,c=i[0];for(;c!==void 0;){if(o===c.index){let g;c.type===2?g=new oe(n,n.nextSibling,this,e):c.type===1?g=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(g=new lt(n,this,e)),this._$AV.push(g),c=i[++d]}o!==(c==null?void 0:c.index)&&(n=z.nextNode(),o++)}return z.currentNode=W,s}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class oe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,i,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=K(this,e,r),se(e)?e===D||e==null||e===""?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==Y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&se(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){var n;const{values:r,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ne.createElement(Ve(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(r);else{const o=new st(s,this),d=o.u(this.options);o.p(r),this.T(d),this._$AH=o}}_$AC(e){let r=Oe.get(e.strings);return r===void 0&&Oe.set(e.strings,r=new ne(e)),r}k(e){we(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,s=0;for(const n of e)s===r.length?r.push(i=new oe(this.O(ie()),this.O(ie()),this,this.options)):i=r[s],i._$AI(n),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,r);e!==this._$AB;){const s=He(e).nextSibling;He(e).remove(),e=s}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class me{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,s,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}_$AI(e,r=this,i,s){const n=this.strings;let o=!1;if(n===void 0)e=K(this,e,r,0),o=!se(e)||e!==this._$AH&&e!==Y,o&&(this._$AH=e);else{const d=e;let c,g;for(e=n[0],c=0;c<n.length-1;c++)g=K(this,d[i+c],r,c),g===Y&&(g=this._$AH[c]),o||(o=!se(g)||g!==this._$AH[c]),g===D?e=D:e!==D&&(e+=(g??"")+n[c+1]),this._$AH[c]=g}o&&!s&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class nt extends me{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}}class ot extends me{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}}class at extends me{constructor(e,r,i,s,n){super(e,r,i,s,n),this.type=5}_$AI(e,r=this){if((e=K(this,e,r,0)??D)===Y)return;const i=this._$AH,s=e===D&&i!==D||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==D&&(i===D||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class lt{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const ve=te.litHtmlPolyfillSupport;ve==null||ve(ne,oe),(te.litHtmlVersions??(te.litHtmlVersions=[])).push("3.3.2");const ct=(t,e,r)=>{const i=(r==null?void 0:r.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const n=(r==null?void 0:r.renderBefore)??null;i._$litPart$=s=new oe(e.insertBefore(ie(),n),n,void 0,r??{})}return s._$AI(t),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis;class re extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ct(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Y}}var Le;re._$litElement$=!0,re.finalized=!0,(Le=q.litElementHydrateSupport)==null||Le.call(q,{LitElement:re});const _e=q.litElementPolyfillSupport;_e==null||_e({LitElement:re});(q.litElementVersions??(q.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt={attribute:!0,type:String,converter:ue,reflect:!1,hasChanged:Ce},pt=(t=dt,e,r)=>{const{kind:i,metadata:s}=r;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),i==="accessor"){const{name:o}=r;return{set(d){const c=e.get.call(this);e.set.call(this,d),this.requestUpdate(o,c,t,!0,d)},init(d){return d!==void 0&&this.C(o,void 0,t,d),d}}}if(i==="setter"){const{name:o}=r;return function(d){const c=this[o];e.call(this,d),this.requestUpdate(o,c,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function Z(t){return(e,r)=>typeof r=="object"?pt(t,e,r):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(t){return Z({...t,state:!0,attribute:!1})}const M={E_INVALID_CONFIG:"E_INVALID_CONFIG",E_MISSING_METADATA:"E_MISSING_METADATA",E_CONTENT_LOAD_FAILED:"E_CONTENT_LOAD_FAILED",E_LIBRARY_NOT_FOUND:"E_LIBRARY_NOT_FOUND",E_UNSUPPORTED_MIME:"E_UNSUPPORTED_MIME",E_IFRAME_BLOCKED:"E_IFRAME_BLOCKED",E_OFFLINE_UNAVAILABLE:"E_OFFLINE_UNAVAILABLE",E_STATE_RESTORE_FAILED:"E_STATE_RESTORE_FAILED",E_MEDIA_DECODE:"E_MEDIA_DECODE",E_FULLSCREEN_DENIED:"E_FULLSCREEN_DENIED"};function ut(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Pe={exports:{}},ke;function ft(){return ke||(ke=1,(function(t,e){(function(r,i){t.exports=i()})(self,(()=>(()=>{var r={633:o=>{function d(c,g){var m=c.length,y=new Array(m),C={},w=m,A=(function($){for(var H=new Map,I=0,_=$.length;I<_;I++){var p=$[I];H.has(p[0])||H.set(p[0],new Set),H.has(p[1])||H.set(p[1],new Set),H.get(p[0]).add(p[1])}return H})(g),N=(function($){for(var H=new Map,I=0,_=$.length;I<_;I++)H.set($[I],I);return H})(c);for(g.forEach((function($){if(!N.has($[0])||!N.has($[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")}));w--;)C[w]||R(c[w],w,new Set);return y;function R($,H,I){if(I.has($)){var _;try{_=", node was:"+JSON.stringify($)}catch{_=""}throw new Error("Cyclic dependency"+_)}if(!N.has($))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify($));if(!C[H]){C[H]=!0;var p=A.get($)||new Set;if(H=(p=Array.from(p)).length){I.add($);do{var a=p[--H];R(a,N.get(a),I)}while(H);I.delete($)}y[--m]=$}}}o.exports=function(c){return d((function(g){for(var m=new Set,y=0,C=g.length;y<C;y++){var w=g[y];m.add(w[0]),m.add(w[1])}return Array.from(m)})(c),c)},o.exports.array=d}},i={};function s(o){var d=i[o];if(d!==void 0)return d.exports;var c=i[o]={exports:{}};return r[o](c,c.exports,s),c.exports}s.d=(o,d)=>{for(var c in d)s.o(d,c)&&!s.o(o,c)&&Object.defineProperty(o,c,{enumerable:!0,get:d[c]})},s.o=(o,d)=>Object.prototype.hasOwnProperty.call(o,d);var n={};return(()=>{s.d(n,{default:()=>I});var o=function(_,p,a,f){return new(a||(a=Promise))((function(l,b){function u(E){try{v(f.next(E))}catch(h){b(h)}}function P(E){try{v(f.throw(E))}catch(h){b(h)}}function v(E){var h;E.done?l(E.value):(h=E.value,h instanceof a?h:new a((function(S){S(h)}))).then(u,P)}v((f=f.apply(_,[])).next())}))},d=function(_,p){var a,f,l,b,u={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return b={next:P(0),throw:P(1),return:P(2)},typeof Symbol=="function"&&(b[Symbol.iterator]=function(){return this}),b;function P(v){return function(E){return(function(h){if(a)throw new TypeError("Generator is already executing.");for(;b&&(b=0,h[0]&&(u=0)),u;)try{if(a=1,f&&(l=2&h[0]?f.return:h[0]?f.throw||((l=f.return)&&l.call(f),0):f.next)&&!(l=l.call(f,h[1])).done)return l;switch(f=0,l&&(h=[2&h[0],l.value]),h[0]){case 0:case 1:l=h;break;case 4:return u.label++,{value:h[1],done:!1};case 5:u.label++,f=h[1],h=[0];continue;case 7:h=u.ops.pop(),u.trys.pop();continue;default:if(!((l=(l=u.trys).length>0&&l[l.length-1])||h[0]!==6&&h[0]!==2)){u=0;continue}if(h[0]===3&&(!l||h[1]>l[0]&&h[1]<l[3])){u.label=h[1];break}if(h[0]===6&&u.label<l[1]){u.label=l[1],l=h;break}if(l&&u.label<l[2]){u.label=l[2],u.ops.push(h);break}l[2]&&u.ops.pop(),u.trys.pop();continue}h=p.call(_,u)}catch(S){h=[6,S],f=0}finally{a=l=0}if(5&h[0])throw h[1];return{value:h[0]?h[1]:void 0,done:!0}})([v,E])}}};function c(_){if((_=_.trim()).match(/^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*|localhost)(:\d{1,5})?(\/[^\s]*)?$/i))return _;if(_.startsWith("//"))return window.location.protocol+_;if(_.startsWith("/"))return window.location.origin+_;var p="".concat(window.location.protocol,"//").concat(window.location.host);return window.location.pathname.indexOf("/")>-1?p+=window.location.pathname.split("/").slice(0,-1).join("/"):p+=window.location.pathname,"".concat(p,"/").concat(_)}function g(_,p){return o(this,void 0,void 0,(function(){return d(this,(function(a){switch(a.label){case 0:return p||(p={credentials:"same-origin"}),[4,fetch(_,p)];case 1:return[2,a.sent().json()]}}))}))}function m(_,p){return o(this,void 0,void 0,(function(){var a,f,l,b;return d(this,(function(u){switch(u.label){case 0:for(a=_.getElementsByTagName("script"),f=[],l=0;l<a.length;l++)a[l].dataset.h5p&&f.push(a[l]);return b=[],p.forEach((function(P){if(!f.some((function(h){return h.dataset.h5p===P}))){var v=document.createElement("script");v.src=P,v.async=!1,v.defer=!1,v.dataset.h5p=P;var E=new Promise((function(h){v.onload=h}));_.append(v),b.push(E)}})),[4,Promise.all(b)];case 1:return u.sent(),[2]}}))}))}function y(_,p){for(var a=_.getElementsByTagName("link"),f=[],l=0;l<a.length;l++)a[l].dataset.h5p&&f.push(a[l]);p.forEach((function(b){if(!f.some((function(P){return P.dataset.h5p===b}))){var u=document.createElement("link");u.href=b,u.dataset.h5p=b,u.rel="stylesheet",u.type="text/css",_.append(u)}}))}function C(_){return _ instanceof Object&&!Array.isArray(_)}function w(_){for(var p,a,f=[],l=1;l<arguments.length;l++)f[l-1]=arguments[l];if(!f.length)return _;var b=f.shift();if(C(_)&&C(b))for(var u in b)C(b[u])?(_[u]||Object.assign(_,((p={})[u]={},p)),w(_[u],b[u])):Object.assign(_,((a={})[u]=b[u],a));return w.apply(void 0,(function(P,v,E){if(arguments.length===2)for(var h,S=0,k=v.length;S<k;S++)!h&&S in v||(h||(h=Array.prototype.slice.call(v,0,S)),h[S]=v[S]);return P.concat(h||Array.prototype.slice.call(v))})([_],f,!1))}function A(_,p){return p.filter((function(a){return _.indexOf(a)<0})).concat(_)}var N=function(_,p,a,f){return new(a||(a=Promise))((function(l,b){function u(E){try{v(f.next(E))}catch(h){b(h)}}function P(E){try{v(f.throw(E))}catch(h){b(h)}}function v(E){var h;E.done?l(E.value):(h=E.value,h instanceof a?h:new a((function(S){S(h)}))).then(u,P)}v((f=f.apply(_,[])).next())}))},R=function(_,p){var a,f,l,b,u={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return b={next:P(0),throw:P(1),return:P(2)},typeof Symbol=="function"&&(b[Symbol.iterator]=function(){return this}),b;function P(v){return function(E){return(function(h){if(a)throw new TypeError("Generator is already executing.");for(;b&&(b=0,h[0]&&(u=0)),u;)try{if(a=1,f&&(l=2&h[0]?f.return:h[0]?f.throw||((l=f.return)&&l.call(f),0):f.next)&&!(l=l.call(f,h[1])).done)return l;switch(f=0,l&&(h=[2&h[0],l.value]),h[0]){case 0:case 1:l=h;break;case 4:return u.label++,{value:h[1],done:!1};case 5:u.label++,f=h[1],h=[0];continue;case 7:h=u.ops.pop(),u.trys.pop();continue;default:if(!((l=(l=u.trys).length>0&&l[l.length-1])||h[0]!==6&&h[0]!==2)){u=0;continue}if(h[0]===3&&(!l||h[1]>l[0]&&h[1]<l[3])){u.label=h[1];break}if(h[0]===6&&u.label<l[1]){u.label=l[1],l=h;break}if(l&&u.label<l[2]){u.label=l[2],u.ops.push(h);break}l[2]&&u.ops.pop(),u.trys.pop();continue}h=p.call(_,u)}catch(S){h=[6,S],f=0}finally{a=l=0}if(5&h[0])throw h[1];return{value:h[0]?h[1]:void 0,done:!0}})([v,E])}}},$=s(633),H=(function(){function _(p,a){var f=this;this.libraryFolderContainsVersion=!0;var l=a.id||Math.random().toString(36).substr(2,9);return this.prepareH5PEnvironment(l,a).then((function(b){window.H5P||(window.H5P={}),window.H5P.preventInit=!0;var u=a.embedType?a.embedType:"iframe";return f.renderPlayerFrame({anchorElement:p,contentId:l,embedType:u,H5PIntegration:b}).then((function(){return(a.preventH5PInit===void 0||a.preventH5PInit)&&(typeof window.H5P.init=="function"&&window.H5P.init(),window.H5P.preventInit=!1),l}))}))}return _.prototype.renderPlayerFrame=function(p){return N(this,void 0,void 0,(function(){var a,f,l,b,u,P;return R(this,(function(v){switch(v.label){case 0:if(!(p.anchorElement instanceof HTMLElement))throw new Error("createH5P must be passed an element");return p.embedType!=="iframe"?[3,2]:((f=document.createElement("div")).classList.add("h5p-iframe-wrapper"),f.style.backgroundColor="#DDD;",(a=document.createElement("iframe")).id="h5p-iframe-".concat(p.contentId),a.src="about:blank",a.classList.add("h5p-iframe"),a.setAttribute("scrolling","no"),a.setAttribute("data-content-id",p.contentId),a.setAttribute("frameBorder","0"),a.style.width="100%",a.style.height="100%",a.style.border="none",a.style.display="block",f.append(a),p.anchorElement.append(f),y(document.head||document.body||p.anchorElement,p.H5PIntegration.core.styles),[4,m(a,p.H5PIntegration.core.scripts)]);case 1:return v.sent(),[3,4];case 2:return(f=document.createElement("div")).classList.add("h5p-iframe"),(l=document.createElement("div")).classList.add("h5p-content"),l.setAttribute("data-content-id",p.contentId),f.append(l),p.anchorElement.append(f),b=document.head||document.body||p.anchorElement,u=(p.H5PIntegration.core.styles||[]).concat(p.H5PIntegration.contents["cid-".concat(p.contentId)].styles),y(b,u),P=(p.H5PIntegration.core.scripts||[]).concat(p.H5PIntegration.contents["cid-".concat(p.contentId)].scripts),[4,m(b,P)];case 3:v.sent(),v.label=4;case 4:return[2]}}))}))},_.prototype.prepareH5PEnvironment=function(p,a){var f,l;return N(this,void 0,void 0,(function(){var b,u,P,v,E,h,S,k,ae,X,F,le,x,ce,he,Ae,de;return R(this,(function(J){switch(J.label){case 0:return b=this.getH5PPaths(a),u=b.h5pJsonPath,P=b.contentJsonPath,v=b.librariesPath,[4,g("".concat(u,"/h5p.json"),a==null?void 0:a.assetsRequestFetchOptions)];case 1:return E=J.sent(),h=this,[4,this.libraryFolderNameIncludesVersion(v,E.preloadedDependencies[0],a==null?void 0:a.assetsRequestFetchOptions)];case 2:return h.libraryFolderContainsVersion=J.sent(),[4,g("".concat(P,"/content.json"),a==null?void 0:a.assetsRequestFetchOptions)];case 3:return S=J.sent(),[4,this.findMainLibrary(E,v,a==null?void 0:a.assetsRequestFetchOptions)];case 4:return k=J.sent(),[4,this.findAllDependencies(E,v,a==null?void 0:a.assetsRequestFetchOptions)];case 5:return ae=J.sent(),X=this.sortDependencies(ae,v),F=X.styles,le=X.scripts,x={baseUrl:window.location.origin,url:"",contents:{},saveFreq:!1,postUserStatistics:!1,ajax:{},l10n:{H5P:{fullscreen:"Fullscreen",disableFullscreen:"Disable fullscreen",download:"Download",copyrights:"Rights of use",embed:"Embed",size:"Size",showAdvanced:"Show advanced",hideAdvanced:"Hide advanced",advancedHelp:"Include this script on your website if you want dynamic sizing of the embedded content:",copyrightInformation:"Rights of use",close:"Close",title:"Title",author:"Author",year:"Year",source:"Source",license:"License",thumbnail:"Thumbnail",noCopyrights:"No copyright information available for this content.",reuse:"Reuse",reuseContent:"Reuse Content",reuseDescription:"Reuse this content.",downloadDescription:"Download this content as a H5P file.",copyrightsDescription:"View copyright information for this content.",embedDescription:"View the embed code for this content.",h5pDescription:"Visit H5P.org to check out more cool content.",contentChanged:"This content has changed since you last used it.",startingOver:"You'll be starting over.",by:"by",showMore:"Show more",showLess:"Show less",subLevel:"Sublevel",confirmDialogHeader:"Confirm action",confirmDialogBody:"Please confirm that you wish to proceed. This action is not reversible.",cancelLabel:"Cancel",confirmLabel:"Confirm",licenseU:"Undisclosed",licenseCCBY:"Attribution",licenseCCBYSA:"Attribution-ShareAlike",licenseCCBYND:"Attribution-NoDerivs",licenseCCBYNC:"Attribution-NonCommercial",licenseCCBYNCSA:"Attribution-NonCommercial-ShareAlike",licenseCCBYNCND:"Attribution-NonCommercial-NoDerivs",licenseCC40:"4.0 International",licenseCC30:"3.0 Unported",licenseCC25:"2.5 Generic",licenseCC20:"2.0 Generic",licenseCC10:"1.0 Generic",licenseGPL:"General Public License",licenseV3:"Version 3",licenseV2:"Version 2",licenseV1:"Version 1",licensePD:"Public Domain",licenseCC010:"CC0 1.0 Universal (CC0 1.0) Public Domain Dedication",licensePDM:"Public Domain Mark",licenseC:"Copyright",contentType:"Content Type",licenseExtras:"License Extras",changes:"Changelog",contentCopied:"Content is copied to the clipboard",connectionLost:"Connection lost. Results will be stored and sent when you regain connection.",connectionReestablished:"Connection reestablished.",resubmitScores:"Attempting to submit stored results.",offlineDialogHeader:"Your connection to the server was lost",offlineDialogBody:"We were unable to send information about your completion of this task. Please check your internet connection.",offlineDialogRetryMessage:"Retrying in :num....",offlineDialogRetryButtonLabel:"Retry now",offlineSuccessfulSubmit:"Successfully submitted results."}}},window&&window.H5PIntegration&&(x=w(x,window.H5PIntegration)),ce=[c("./frame.bundle.js")],he=[c("./styles/h5p.css")],a.frameJs&&(ce=[c(a.frameJs)]),a.frameCss&&(he=[c(a.frameCss)]),x.core?(x.core.styles=A(x.core.styles,he),x.core.scripts=A(x.core.scripts,ce)):x.core={styles:he,scripts:ce},x.url=p,x.urlLibraries=v,x.postUserStatistics=!!a.postUserStatistics,x.reportingIsEnabled=!!a.reportingIsEnabled,a.saveFreq&&typeof a.saveFreq=="number"&&(x.saveFreq=a.saveFreq),a.user&&(x.user=a.user),!((f=a.ajax)===null||f===void 0)&&f.contentUserDataUrl&&(x.ajax.contentUserData=a.ajax.contentUserDataUrl),!((l=a.ajax)===null||l===void 0)&&l.setFinishedUrl&&(x.ajax.setFinished=a.ajax.setFinishedUrl),a.translations&&(x.l10n=w(x.l10n,a.translations)),a.customCss&&typeof a.customCss=="string"&&(a.customCss=[a.customCss]),a.customJs&&typeof a.customJs=="string"&&(a.customJs=[a.customJs]),F=F.concat((a.customCss||[]).map((function(ge){return c(ge)}))),le=le.concat((a.customJs||[]).map((function(ge){return c(ge)}))),Ae={copyright:!!a.copyright,embed:!!a.embed,export:!!a.export,frame:!!a.frame,icon:!!a.icon,copy:!!a.copy},de="".concat(k.machineName," "),k.majorVersion&&(de+=k.majorVersion),k.minorVersion&&(de+=".".concat(k.minorVersion)),x.contents||(x.contents={}),a!=null&&a.metadata||(a.metadata={title:a.title?a.title:"",license:"U"}),x.contents["cid-".concat(p)]={library:de,title:a.title?a.title:"",url:u,contentUrl:P,jsonContent:JSON.stringify(S),styles:F,scripts:le,fullScreen:!!a.fullScreen,exportUrl:a.downloadUrl?c(a.downloadUrl):void 0,embedCode:a.embedCode?a.embedCode:"",resizeCode:a.resizeCode?a.resizeCode:"",displayOptions:Ae,contentUserData:a.contentUserData,metadata:a.metadata},a.xAPIObjectIRI&&(x.contents["cid-".concat(p)].url=a.xAPIObjectIRI),window.H5PIntegration=x,[2,x]}}))}))},_.prototype.getH5PPaths=function(p){var a=c("workspace");p.h5pJsonPath&&(a=c(p.h5pJsonPath));var f="".concat(a,"/content");p.contentJsonPath&&(f=c(p.contentJsonPath));var l=a;return p.librariesPath&&(l=c(p.librariesPath)),{h5pJsonPath:a,contentJsonPath:f,librariesPath:l}},_.prototype.libraryFolderNameIncludesVersion=function(p,a,f){return N(this,void 0,void 0,(function(){var l,b;return R(this,(function(u){switch(u.label){case 0:l=this.libraryToFolderName(a),u.label=1;case 1:return u.trys.push([1,3,,4]),[4,g("".concat(p,"/").concat(l,"/library.json"),f)];case 2:return u.sent(),b=!0,[3,4];case 3:return u.sent(),b=!1,[3,4];case 4:return[2,b]}}))}))},_.prototype.libraryToFolderName=function(p){var a=p.machineName;return this.libraryFolderContainsVersion&&(p.majorVersion!==void 0&&(a+="-".concat(p.majorVersion)),p.minorVersion!==void 0&&(a+=".".concat(p.minorVersion))),a},_.prototype.findMainLibrary=function(p,a,f){return N(this,void 0,void 0,(function(){var l,b;return R(this,(function(u){return l=p.preloadedDependencies.find((function(P){return P.machineName===p.mainLibrary})),b=this.libraryToFolderName(l),[2,g("".concat(a,"/").concat(b,"/library.json"),f)]}))}))},_.prototype.findAllDependencies=function(p,a,f){return N(this,void 0,void 0,(function(){var l,b=this;return R(this,(function(u){return l=p.preloadedDependencies.map((function(P){return b.libraryToFolderName(P)})),[2,this.loadDependencies(l,[],a,f)]}))}))},_.prototype.loadDependencies=function(p,a,f,l){return N(this,void 0,void 0,(function(){var b,u,P,v,E=this;return R(this,(function(h){switch(h.label){case 0:return b=a,u=[],P=p.map((function(S){return E.findLibraryDependencies(S,f,l)})),[4,Promise.all(P)];case 1:return(v=h.sent()).forEach((function(S){b.push(S),S.dependencies.forEach((function(k){var ae=b.find((function(F){return F.libraryFolderName===k})),X=v.find((function(F){return F.libraryFolderName===k}));ae||X||u.push(k)}))})),u.length>0?[2,this.loadDependencies(u,b,f,l)]:[2,b]}}))}))},_.prototype.findLibraryDependencies=function(p,a,f){return N(this,void 0,void 0,(function(){var l,b,u=this;return R(this,(function(P){switch(P.label){case 0:return[4,g("".concat(a,"/").concat(p,"/library.json"),f)];case 1:return l=P.sent(),b=[],l.preloadedDependencies&&(b=l.preloadedDependencies.map((function(v){return u.libraryToFolderName(v)}))),[2,{libraryFolderName:p,dependencies:b,preloadedCss:l.preloadedCss,preloadedJs:l.preloadedJs}]}}))}))},_.prototype.sortDependencies=function(p,a){var f=[],l={},b={};p.forEach((function(v){v.dependencies.length===0&&f.push([v.libraryFolderName]),v.dependencies.forEach((function(E){f.push([v.libraryFolderName,E])})),v.preloadedCss&&(l[v.libraryFolderName]=[],l[v.libraryFolderName]&&(l[v.libraryFolderName]=l[v.libraryFolderName]),v.preloadedCss.forEach((function(E){var h="".concat(a,"/").concat(v.libraryFolderName,"/").concat(E.path);l[v.libraryFolderName].push(h)}))),v.preloadedJs&&(b[v.libraryFolderName]=[],b[v.libraryFolderName]&&(b[v.libraryFolderName]=b[v.libraryFolderName]),v.preloadedJs.forEach((function(E){var h="".concat(a,"/").concat(v.libraryFolderName,"/").concat(E.path);b[v.libraryFolderName].push(h)})))}));var u=[],P=[];return $(f).reverse().forEach((function(v){Array.prototype.push.apply(u,l[v]),Array.prototype.push.apply(P,b[v])})),{styles:u,scripts:P}},_})();H.EventDispatcher=function(){};const I={H5P:H}})(),n.default})()))})(Pe)),Pe.exports}var mt=ft();const gt=ut(mt);var bt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,O=(t,e,r,i)=>{for(var s=i>1?void 0:i?yt(e,r):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&bt(e,r,s),s};let T=class extends re{constructor(){super(...arguments),this.locale="en",this.theme="light",this.width="100%",this.height="100%",this.isLoaded=!1,this.error=null,this._fullscreenActive=!1,this.currentPage=0,this.totalPages=0,this.progressPercent=0,this.pageLabel="",this._contentCategory=null,this._contentType="",this._isDocumentReader=!1,this._pendingRestoreState=null,this._destroyed=!1,this._zoomLevel=100,this._searchResolvers=new Map,this._retryCount=0,this._lastErrorCode=null,this._sessionStartTime=0,this._interactionsCount=0,this._pageViewsCount=0,this._pageTimespent=new Map,this._lastPageEntryTime=0,this._score=0,this._maxScore=0,this._responses=[],this._assessmentCompleted=!1,this._boundContentMessage=this._handleContentMessage.bind(this),this._boundFullscreenChange=this._handleFullscreenChange.bind(this),this._boundKeyboard=this._handleKeyboard.bind(this),this._boundXAPI=this._handleXAPI.bind(this),this._heartbeatInterval=null,this._isMediaPlaying=!1,this._lastInteractionTime=Date.now(),this._autoSaveInterval=null,this.componentStyles=`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 400px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--sbp-host-bg, #1a1a2e);
      position: relative;
      overflow: hidden;
      transition: background 0.25s ease, color 0.25s ease;
    }

    /* Fullscreen mode: fill the entire viewport */
    :host(:fullscreen) {
      width: 100vw !important;
      height: 100vh !important;
    }

    :host(:fullscreen) .player-content {
      flex-grow: 1;
    }

    :host(:fullscreen) #h5p-container,
    :host(:fullscreen) #h5p-container > iframe {
      width: 100% !important;
      height: 100% !important;
    }

    /* ─── Unified Top Toolbar ─── */
    .player-toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
      height: 48px;
      min-height: 48px;
      background: var(--sbp-toolbar-bg, #16213e);
      color: var(--sbp-toolbar-color, #e0e0e0);
      font-size: 14px;
      flex-shrink: 0;
      z-index: 30;
      border-bottom: 1px solid var(--sbp-toolbar-border, rgba(255,255,255,0.08));
      transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }

    .toolbar-title {
      font-weight: 600;
      font-size: 15px;
      color: var(--sbp-toolbar-title-color, #fff);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 280px;
      flex-shrink: 0;
    }

    .toolbar-spacer {
      flex-grow: 1;
    }

    .toolbar-btn {
      background: transparent;
      border: 1px solid var(--sbp-toolbar-btn-border, rgba(255,255,255,0.15));
      color: var(--sbp-toolbar-color, #e0e0e0);
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      min-width: 36px;
      min-height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .toolbar-btn:hover {
      background: var(--sbp-toolbar-btn-hover, rgba(255,255,255,0.1));
      border-color: rgba(255,255,255,0.25);
    }

    .toolbar-btn:active {
      background: var(--sbh5p-toolbar-btn-active-bg, rgba(255,255,255,0.15));
      transform: scale(0.96);
    }

    .toolbar-separator {
      width: 1px;
      height: 24px;
      background: var(--sbp-toolbar-separator, rgba(255,255,255,0.12));
      flex-shrink: 0;
    }

    /* ─── Content Area ─── */
    .player-content {
      flex: 1 1 0;
      width: 100%;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      background: var(--sbp-content-bg, #f4f4f4);
      min-height: 0;
      transition: background 0.25s ease;
      display: flex;
      flex-direction: column;
    }

    /* Slotted H5P container: fill the content area */
    ::slotted(#h5p-container) {
      width: 100%;
      height: 100%;
      flex-grow: 1;
      display: block;
      border: none;
    }

    /* SVG icons in toolbar buttons */
    .toolbar-btn svg, .bottom-btn svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: var(--sbp-toolbar-color, #fff);
      stroke-width: 2.5; /* Slightly thicker for better visibility */
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .loading-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--sbp-loading-bg, rgba(255,255,255,0.9));
      z-index: 10;
      color: var(--sbp-loading-color, #333);
      font-size: 15px;
      font-weight: 500;
      transition: background 0.25s ease, color 0.25s ease;
    }

    .error-card {
      padding: 2rem;
      color: var(--sbp-error-color, #721c24);
      background-color: var(--sbp-error-bg, #f8d7da);
      border: 1px solid var(--sbp-error-border, #f5c6cb);
      border-radius: 4px;
      margin: 2rem;
      transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }

    .retry-btn {
      margin-top: 1rem;
      background: var(--sbp-toolbar-bg, #16213e);
      color: var(--sbp-toolbar-color, #e0e0e0);
      border: 1px solid var(--sbp-toolbar-btn-border, rgba(255,255,255,0.15));
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .retry-btn:hover {
      background: var(--sbp-toolbar-btn-hover, rgba(255,255,255,0.1));
    }

    /* ─── Bottom Navigation Bar ─── */
    .player-bottombar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
      height: 44px;
      min-height: 44px;
      background: var(--sbp-bottombar-bg, #16213e);
      color: var(--sbp-bottombar-color, #e0e0e0);
      font-size: 13px;
      flex-shrink: 0;
      z-index: 30;
      border-top: 1px solid var(--sbp-bottombar-border, rgba(255,255,255,0.08));
      transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }

    .bottom-btn {
      background: transparent;
      border: 1px solid var(--sbp-toolbar-btn-border, rgba(255,255,255,0.15));
      color: var(--sbp-bottombar-color, #e0e0e0);
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      min-width: 36px;
      min-height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .bottom-btn:hover {
      background: var(--sbp-toolbar-btn-hover, rgba(255,255,255,0.1));
    }

    .bottom-btn:active {
      transform: scale(0.96);
    }

    .bottom-page-info {
      font-size: 13px;
      color: var(--sbp-page-info-color, rgba(255,255,255,0.7));
      white-space: nowrap;
    }

    .bottom-progress {
      flex-grow: 1;
      height: 4px;
      background: var(--sbp-progress-track, rgba(255,255,255,0.1));
      border-radius: 2px;
      overflow: hidden;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `}_t(t){var e,r;return((e=T._i18n[this.locale])==null?void 0:e[t])||((r=T._i18n.en)==null?void 0:r[t])||t}connectedCallback(){var e,r;super.connectedCallback(),this.setAttribute("role","application");const t=((r=(e=this.playerConfig)==null?void 0:e.metadata)==null?void 0:r.name)||"Sunbird H5P Player";this.setAttribute("aria-label",t),this._applyTheme(),this._injectLightDomStyles(),this.playerConfig&&this.initPlayer(),window.addEventListener("message",this._boundContentMessage),document.addEventListener("fullscreenchange",this._boundFullscreenChange),document.addEventListener("keydown",this._boundKeyboard)}_injectLightDomStyles(){const t="sbp-light-dom-styles";if(document.getElementById(t))return;const e=document.createElement("style");e.id=t,e.textContent=`
      /* Protect H5P internal icon fonts from global CSS overrides (like Tailwind reset) */
      #h5p-container [class^="h5p-icon-"], 
      #h5p-container [class*=" h5p-icon-"],
      #h5p-container .h5p-icon,
      #h5p-container .h5p-play,
      #h5p-container .h5p-pause,
      #h5p-container .h5p-fullscreen,
      #h5p-container .h5p-exit-fullscreen,
      #h5p-container .h5p-volume-controls,
      #h5p-container .h5p-dr-icon {
        font-family: unset !important; /* Allow H5P's own CSS to take over */
      }

      /* Force document reader iframes to fill the container */
      #h5p-container.sunbird-doc-reader-active iframe {
        height: 100% !important;
        min-height: 100% !important;
      }
    `,document.head.appendChild(e)}disconnectedCallback(){var r,i;if(this._destroyed)return;this._destroyed=!0,this._emitSummary();const t=this._sessionStartTime>0?Math.floor((Date.now()-this._sessionStartTime)/1e3):0;if(this.emitTelemetry("END",{type:"player",mode:(i=(r=this.playerConfig)==null?void 0:r.context)==null?void 0:i.mode,duration:t,summary:[{progress:this.progressPercent}]}),super.disconnectedCallback(),window.removeEventListener("message",this._boundContentMessage),document.removeEventListener("fullscreenchange",this._boundFullscreenChange),document.removeEventListener("keydown",this._boundKeyboard),window.H5P&&window.H5P.externalDispatcher)try{window.H5P.externalDispatcher.off("xAPI",this._boundXAPI)}catch(s){console.warn("Failed to remove H5P.externalDispatcher listener:",s)}const e=this.querySelector("#h5p-container");e&&(e.innerHTML="",e.remove()),this.isLoaded=!1,this.error=null,this._fullscreenActive=!1,this.currentPage=0,this.totalPages=0,this.progressPercent=0,this.pageLabel="",this._stopHeartbeat(),this._stopAutoSave()}destroy(){var r,i;if(this._destroyed)return;this._destroyed=!0,this._emitSummary();const t=this._sessionStartTime>0?Math.floor((Date.now()-this._sessionStartTime)/1e3):0;if(this.emitTelemetry("END",{type:"player",mode:(i=(r=this.playerConfig)==null?void 0:r.context)==null?void 0:i.mode,duration:t,summary:[{progress:this.progressPercent}]}),window.removeEventListener("message",this._boundContentMessage),document.removeEventListener("fullscreenchange",this._boundFullscreenChange),document.removeEventListener("keydown",this._boundKeyboard),window.H5P&&window.H5P.externalDispatcher)try{window.H5P.externalDispatcher.off("xAPI",this._boundXAPI)}catch(s){console.warn("Failed to remove H5P.externalDispatcher listener:",s)}this._stopHeartbeat(),this._stopAutoSave();const e=this.querySelector("#h5p-container");e&&(e.innerHTML="",e.remove()),this.isLoaded=!1,this.error=null,this._fullscreenActive=!1,this.currentPage=0,this.totalPages=0,this.progressPercent=0,this.pageLabel="",this._contentCategory=null,this._contentType="",this._isDocumentReader=!1,this._isMediaPlaying=!1,this._autoSaveInterval=null,this.parentNode&&this.parentNode.removeChild(this)}_startHeartbeat(){this._stopHeartbeat(),this._heartbeatInterval=setInterval(()=>{this._shouldEmitHeartbeat()&&this._emitHeartbeat()},3e4)}_stopHeartbeat(){this._heartbeatInterval&&(clearInterval(this._heartbeatInterval),this._heartbeatInterval=null)}_startAutoSave(){var e,r,i;this._stopAutoSave();const t=(i=(r=(e=this.playerConfig)==null?void 0:e.config)==null?void 0:r.h5pOptions)==null?void 0:i.saveFreq;t&&t>0&&(this._autoSaveInterval=setInterval(()=>{if(this.isLoaded&&!this.error&&!this._destroyed){const s=this.getCurrentState();this._dispatchPlayerEvent("autoSave",s)}},t*1e3))}_stopAutoSave(){this._autoSaveInterval&&(clearInterval(this._autoSaveInterval),this._autoSaveInterval=null)}_shouldEmitHeartbeat(){var e;return!this.isLoaded||this.error?!1:((e=this._contentCategory)==null?void 0:e.includes("A"))?this._isMediaPlaying:Date.now()-this._lastInteractionTime<12e4}_emitHeartbeat(){var r,i,s;let t=0;const e=(i=(r=window.H5P)==null?void 0:r.instances)==null?void 0:i[0];(s=e==null?void 0:e.video)!=null&&s.getCurrentTime?t=e.video.getCurrentTime():e!=null&&e.getCurrentTime&&(t=e.getCurrentTime()),this.emitTelemetry("HEARTBEAT",{type:"player",pageid:`page-${this.currentPage}`,extra:{currentTime:t,currentPage:this.currentPage,progress:this.progressPercent}})}_updateInteractionTime(){this._lastInteractionTime=Date.now()}_dispatchPlayerEvent(t,e={}){var r,i;this.dispatchEvent(new CustomEvent("playerEvent",{detail:{action:t,identifier:(i=(r=this.playerConfig)==null?void 0:r.metadata)==null?void 0:i.identifier,data:e},bubbles:!0,composed:!0})),t==="pageChange"&&e.currentPage?this._announce(`Page ${e.currentPage} of ${e.totalPages}`):t==="scoreChange"?this._announce(`Score: ${e.score} of ${e.maxScore}`):t==="loadComplete"&&this._announce("Content loaded and ready")}_announce(t){var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("#announcement-region");e&&(e.textContent=t,setTimeout(()=>{e.textContent===t&&(e.textContent="")},3e3))}_focusContent(){const t=this.querySelector("#h5p-container"),e=t==null?void 0:t.querySelector("iframe");e?e.focus():t&&(t.tabIndex=-1,t.focus())}_emitError(t,e,r="SYSTEM"){var i,s;this.error=`${t}: ${e}`,this._lastErrorCode=t,this.emitTelemetry("ERROR",{err:t,errtype:r,stacktrace:new Error().stack||"",pageid:(s=(i=this.playerConfig)==null?void 0:i.metadata)!=null&&s.identifier?`h5p-player-${this.playerConfig.metadata.identifier}`:"h5p-player"}),this._dispatchPlayerEvent("error",{code:t,message:e}),this._dispatchPlayerEvent("stateChange",{state:"error"}),console.warn(`[Sunbird-H5P Wrapper] Error [${t}]: ${e}`)}updated(t){var e,r;if(t.has("playerConfig")){const i=((r=(e=this.playerConfig)==null?void 0:e.metadata)==null?void 0:r.name)||"Sunbird H5P Player";this.setAttribute("aria-label",i),this.playerConfig&&!this.isLoaded&&!this.error&&this.initPlayer()}t.has("theme")&&this._applyTheme()}_applyTheme(){this.classList.remove("theme-light","theme-dark","theme-sepia"),this.classList.add(`theme-${this.theme}`);const t=T._themeVars[this.theme]||T._themeVars.light;for(const[e,r]of Object.entries(t))this.style.setProperty(e,r)}async initPlayer(){var g;if(this._dispatchPlayerEvent("loadStart"),this._dispatchPlayerEvent("stateChange",{state:"loading"}),this.error=null,this._lastErrorCode=null,this._sessionStartTime=Date.now(),this._lastPageEntryTime=Date.now(),this._interactionsCount=0,this._pageViewsCount=1,this._pageTimespent.clear(),!this.playerConfig){this._emitError(M.E_INVALID_CONFIG,"playerConfig is missing.");return}if(!this.playerConfig.context||!this.playerConfig.context.mode){this._emitError(M.E_INVALID_CONFIG,"playerConfig.context.mode is missing.");return}if(!this.playerConfig.metadata){this._emitError(M.E_MISSING_METADATA,"playerConfig.metadata is missing.");return}const{identifier:t,artifactUrl:e,mimeType:r}=this.playerConfig.metadata;if(!t){this._emitError(M.E_MISSING_METADATA,"metadata.identifier is missing.");return}if(!e){this._emitError(M.E_MISSING_METADATA,"metadata.artifactUrl is missing.");return}if(!r){this._emitError(M.E_MISSING_METADATA,"metadata.mimeType is missing.");return}if(!["application/vnd.ekstep.h5p-archive","application/vnd.h5p","application/epub","application/epub+zip","application/pdf","video/mp4","video/webm","video/x-youtube","audio/mp3"].includes(r)){this._emitError(M.E_UNSUPPORTED_MIME,`Unsupported mimeType: ${r}`);return}this.emitTelemetry("START",{type:"player",mode:this.playerConfig.context.mode,pageid:`h5p-player-${this.playerConfig.metadata.identifier}`}),await this.updateComplete;let s=this.querySelector("#h5p-container");if(s||(s=document.createElement("div"),s.id="h5p-container",s.slot="h5p-content",s.className="w-full h-full",this.appendChild(s)),!s){this._emitError(M.E_CONTENT_LOAD_FAILED,"H5P Container initialization failed.");return}if(!(r==="application/vnd.ekstep.h5p-archive"||r==="application/vnd.h5p")){if(this._detectContent(),["video/mp4","video/webm","audio/mp3","audio/wav"].includes(r)){const m=r.startsWith("audio")?"audio":"video",y=document.createElement(m);y.src=e,y.controls=!0,y.playsInline=!0,y.style.width="100%",y.style.height="100%",y.style.display="block",s.appendChild(y)}else if(r==="video/x-youtube"||r==="video/youtube"){const m=e.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,"https://www.youtube.com/embed/$1"),y=document.createElement("iframe");y.src=m,y.style.width="100%",y.style.height="100%",y.style.border="none",y.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",y.allowFullscreen=!0,s.appendChild(y)}else{const m=document.createElement("iframe");m.src=e,m.style.width="100%",m.style.height="100%",m.style.border="none",s.appendChild(m)}this.isLoaded=!0,this._retryCount=0,this._startHeartbeat(),this._startAutoSave(),this._dispatchPlayerEvent("loadComplete",{contentType:this._contentType}),this._dispatchPlayerEvent("stateChange",{state:"ready"}),this._focusContent(),this._pendingRestoreState&&(this._applyRestoredState(this._pendingRestoreState),this._pendingRestoreState=null);return}const o=this.playerConfig.config.h5pOptions||{},d=this.playerConfig.metadata.artifactUrl||"/h5p-workspace";try{const m=d.endsWith("/")?`${d}h5p.json`:`${d}/h5p.json`,y=await fetch(m),C=y.headers.get("content-type");if(!y.ok||C&&C.includes("text/html")){this._emitError(M.E_CONTENT_LOAD_FAILED,`Failed to load h5p.json from ${m}. Received ${C||"no"} response. Please verify artifactUrl.`,"CONTENT");return}await y.clone().json()}catch(m){this._emitError(M.E_CONTENT_LOAD_FAILED,`Unexpected response format for h5p.json. Received HTML/text instead of JSON. (Technical error: ${m.message})`,"CONTENT");return}const c={h5pJsonPath:d,librariesPath:"/h5p-libraries",frameJs:"/h5p-standalone-assets/frame.bundle.js",frameCss:"/h5p-standalone-assets/h5p.css",...o,displayOptions:{copy:!1,copyright:!1,embed:!1,export:!1,icon:!1,...o.displayOptions||{}}};try{await new gt.H5P(s,c),this.isLoaded=!0,this._retryCount=0,this.setupH5PDispatcherListener(),this._detectContent();const m=s.querySelector("iframe");if(m){const y=()=>{var C,w;try{const A=m.contentDocument||((C=m.contentWindow)==null?void 0:C.document);if(A!=null&&A.head){if(A.getElementById("sbp-iframe-shared"))return;const N=A.createElement("style");if(N.id="sbp-iframe-shared",N.textContent=`
                /* 1. Restore font-icon families used by H5P core and libraries */
                @font-face {
                  font-family: 'h5p-theme';
                  src: url('/h5p-libraries/H5P.FontIcons-1.0/fonts/h5p.woff') format('woff'),
                       url('/h5p-libraries/H5P.FontIcons-1.0/fonts/h5p.ttf') format('truetype');
                }
                @font-face {
                  font-family: 'H5PFontIcons';
                  src: url('/h5p-libraries/H5P.FontIcons-1.0/fonts/h5p.woff') format('woff'),
                       url('/h5p-libraries/H5P.FontIcons-1.0/fonts/h5p.ttf') format('truetype');
                }
                @font-face {
                  font-family: 'H5Picons';
                  src: url('/h5p-libraries/H5P.FontIcons-1.0/fonts/h5p.woff') format('woff'),
                       url('/h5p-libraries/H5P.FontIcons-1.0/fonts/h5p.ttf') format('truetype');
                }
                @font-face {
                  font-family: 'H5PFontAwesome4';
                  src: url('/h5p-libraries/FontAwesome-4.5/fontawesome-webfont.woff') format('woff'),
                       url('/h5p-libraries/FontAwesome-4.5/fontawesome-webfont.ttf') format('truetype');
                }

                /* 2. Force these families on all H5P icon content to win over host resets */
                .h5p-control::before, .h5p-control::after,
                .h5p-icon::before, .h5p-icon::after,
                .h5p-interaction-button::before, .h5p-interaction-button::after,
                [class^="h5p-icon-"]::before, [class^="h5p-icon-"]::after,
                [class*=" h5p-icon-"]::before, [class*=" h5p-icon-"]::after,
                .fa, .fa::before, .fa::after,
                [class^="fa-"]::before, [class^="fa-"]::after,
                [class*=" fa-"]::before, [class*=" fa-"]::after { 
                  font-family: 'h5p-theme', 'H5PFontIcons', 'H5Picons', 'H5PFontAwesome4', 'FontAwesome', sans-serif !important; 
                }

                /* 3. Defensive resets for H5P internal elements */
                ul, ol { list-style: revert; padding: revert; margin: revert; }
                h1, h2, h3, h4, h5, h6 { font-size: revert; font-weight: revert; margin: revert; }

                /* 4. Ensure H5P overlays, popups, and dialogs are correctly visible and layered */
                .h5p-popup, .h5p-dialog, .h5p-overlay, .h5p-dialog-wrapper, .h5p-warning-mask { 
                  z-index: 1000 !important;
                }
                .h5p-visible { display: block !important; visibility: visible !important; }
              `,A.head.appendChild(N),this._isDocumentReader){const R=A.createElement("style");R.id="sbp-iframe-docreader",R.textContent="html, body { height: 100% !important; overflow: hidden !important; }",A.head.appendChild(R)}}}catch{}if(this._isDocumentReader){m.style.height="100%";let A=m.parentElement;for(;A&&A.id!=="h5p-container";)A.style.height="100%",A=A.parentElement}try{(w=m.contentWindow)==null||w.addEventListener("keydown",this._boundKeyboard)}catch{}};try{const C=m.contentDocument||((g=m.contentWindow)==null?void 0:g.document);(C==null?void 0:C.readyState)==="complete"&&y()}catch{}m.addEventListener("load",y)}this._startHeartbeat(),this._startAutoSave(),this._dispatchPlayerEvent("loadComplete",{contentType:this._contentType}),this._dispatchPlayerEvent("stateChange",{state:"ready"}),this._focusContent(),this._pendingRestoreState&&(this._applyRestoredState(this._pendingRestoreState),this._pendingRestoreState=null)}catch(m){this._emitError(M.E_CONTENT_LOAD_FAILED,m.message,"CONTENT")}}_detectContent(){var r,i,s;const{mimeType:t}=this.playerConfig.metadata;t==="application/pdf"?(this._contentType="Sunbird.PDFReader",this._contentCategory="E",this._isDocumentReader=!0):t==="application/epub"||t==="application/epub+zip"?(this._contentType="Sunbird.EPUBReader",this._contentCategory="E",this._isDocumentReader=!0):["video/mp4","video/webm","video/x-youtube","audio/mp3"].includes(t)&&(this._contentCategory="A",this._contentType="H5P.Video");const e=(i=(r=window.H5P)==null?void 0:r.instances)==null?void 0:i[0];if(e){const n=(s=e.libraryInfo)==null?void 0:s.machineName;if(n){this._contentType=n;const o=T.CONTENT_CATEGORY_MAP[n];o&&(this._contentCategory=o)}}if(this._contentCategory==="E"&&(this._isDocumentReader=!0),this._isDocumentReader){const n=this.querySelector("#h5p-container");n&&n.classList.add("sunbird-doc-reader-active")}}getContentType(){return this._contentType}getContentCategory(){return this._contentCategory||"D"}replay(){var e,r,i,s,n,o;const t=(r=(e=window.H5P)==null?void 0:e.instances)==null?void 0:r[0];t!=null&&t.resetTask&&t.resetTask(),this.progressPercent=0,this.currentPage=0,this._isMediaPlaying=!1,this.emitTelemetry("START",{type:"player",mode:(s=(i=this.playerConfig)==null?void 0:i.context)==null?void 0:s.mode,pageid:`h5p-player-${(o=(n=this.playerConfig)==null?void 0:n.metadata)==null?void 0:o.identifier}`}),this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"REPLAY",id:"replay-btn"}),this._dispatchPlayerEvent("replay")}exitPlayer(){this._handleExit()}getProgress(){return this.progressPercent}getCurrentState(){var r,i,s,n,o,d;const t=(i=(r=window.H5P)==null?void 0:r.instances)==null?void 0:i[0],e={version:"1.0"};if(t!=null&&t.getCurrentState)try{e.h5pState=t.getCurrentState()}catch{}if((s=this._contentCategory)!=null&&s.includes("A")){(n=t==null?void 0:t.video)!=null&&n.getCurrentTime?e.currentTime=t.video.getCurrentTime():t!=null&&t.getCurrentTime&&(e.currentTime=t.getCurrentTime());const c=this._getMediaElement();c&&(e.volume=c.volume,e.playbackRate=c.playbackRate)}return((o=this._contentCategory)!=null&&o.includes("C")||(d=this._contentCategory)!=null&&d.includes("E"))&&(e.currentPage=this.currentPage),e}restoreState(t){if(!t||!t.version){console.warn("[Sunbird-H5P] restoreState: invalid state object — missing version.");return}if(t.version!=="1.0"){console.warn(`[Sunbird-H5P] restoreState: unsupported state version "${t.version}". Expected "1.0".`);return}if(!this.isLoaded){this._pendingRestoreState=t;return}this._applyRestoredState(t)}_applyRestoredState(t){var r,i,s,n,o,d;const e=(i=(r=window.H5P)==null?void 0:r.instances)==null?void 0:i[0];if(t.h5pState&&e&&e.setCurrentState)try{e.setCurrentState(t.h5pState)}catch(c){console.warn("[Sunbird-H5P] restoreState: failed to set H5P state:",c)}if((s=this._contentCategory)!=null&&s.includes("A")&&t.currentTime!==void 0){if((n=e==null?void 0:e.video)!=null&&n.seek)e.video.seek(t.currentTime);else if(e!=null&&e.seek)e.seek(t.currentTime);else{const g=this._getMediaElement();g&&(g.currentTime=t.currentTime)}const c=this._getMediaElement();c&&(t.volume!==void 0&&(c.volume=t.volume),t.playbackRate!==void 0&&(c.playbackRate=t.playbackRate))}if(((o=this._contentCategory)!=null&&o.includes("C")||(d=this._contentCategory)!=null&&d.includes("E"))&&t.currentPage!==void 0){const c=this.querySelector("#h5p-container"),g=c==null?void 0:c.querySelector("iframe");g!=null&&g.contentWindow&&g.contentWindow.postMessage({type:"sunbird-player-nav",action:"goto",page:t.currentPage},"*")}this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"RESUME"})}toggleFullscreen(){this._handleFullscreen()}isFullscreen(){return this._fullscreenActive}setLocale(t){this.locale=t}play(){var e,r,i,s;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=(i=(r=window.H5P)==null?void 0:r.instances)==null?void 0:i[0];if((s=t==null?void 0:t.video)!=null&&s.play)t.video.play();else if(t!=null&&t.play)t.play();else{const n=this._getMediaElement();n&&n.play()}this._isMediaPlaying=!0,this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"PLAY"}),this._dispatchPlayerEvent("play",{currentTime:this.getCurrentTime()??0})}pause(){var e,r,i,s;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=(i=(r=window.H5P)==null?void 0:r.instances)==null?void 0:i[0];if((s=t==null?void 0:t.video)!=null&&s.pause)t.video.pause();else if(t!=null&&t.pause)t.pause();else{const n=this._getMediaElement();n&&n.pause()}this._isMediaPlaying=!1,this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"PAUSE"}),this._dispatchPlayerEvent("pause",{currentTime:this.getCurrentTime()??0})}seek(t){var i,s,n,o;if(!((i=this._contentCategory)!=null&&i.includes("A")))return;const e=this.getCurrentTime()??0,r=(n=(s=window.H5P)==null?void 0:s.instances)==null?void 0:n[0];if((o=r==null?void 0:r.video)!=null&&o.seek)r.video.seek(t);else if(r!=null&&r.seek)r.seek(t);else{const d=this._getMediaElement();d&&(d.currentTime=t)}this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"SEEK",extra:{values:[{from:e,to:t}]}}),this._dispatchPlayerEvent("seek",{from:e,to:t})}getCurrentTime(){var r,i,s,n;if(!((r=this._contentCategory)!=null&&r.includes("A")))return;const t=(s=(i=window.H5P)==null?void 0:i.instances)==null?void 0:s[0];if((n=t==null?void 0:t.video)!=null&&n.getCurrentTime)return t.video.getCurrentTime();if(t!=null&&t.getCurrentTime)return t.getCurrentTime();const e=this._getMediaElement();return e?e.currentTime:void 0}getDuration(){var r,i,s,n;if(!((r=this._contentCategory)!=null&&r.includes("A")))return;const t=(s=(i=window.H5P)==null?void 0:i.instances)==null?void 0:s[0];if((n=t==null?void 0:t.video)!=null&&n.getDuration)return t.video.getDuration();if(t!=null&&t.getDuration)return t.getDuration();const e=this._getMediaElement();return e&&isFinite(e.duration)?e.duration:void 0}setVolume(t){var i;if(!((i=this._contentCategory)!=null&&i.includes("A")))return;const e=Math.max(0,Math.min(1,t)),r=this._getMediaElement();r&&(r.volume=e,this._dispatchPlayerEvent("volumeChange",{volume:e,muted:r.muted}))}getVolume(){var e;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=this._getMediaElement();return t?t.volume:void 0}setPlaybackRate(t){var i;if(!((i=this._contentCategory)!=null&&i.includes("A")))return;const e=Math.max(.25,Math.min(4,t)),r=this._getMediaElement();r&&(r.playbackRate=e,this._dispatchPlayerEvent("rateChange",{rate:e}))}getPlaybackRate(){var e;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=this._getMediaElement();return t?t.playbackRate:void 0}setMuted(t){var r;if(!((r=this._contentCategory)!=null&&r.includes("A")))return;const e=this._getMediaElement();e&&(e.muted=t,this._dispatchPlayerEvent("volumeChange",{volume:e.volume,muted:t}))}isMuted(){var e;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=this._getMediaElement();return t?t.muted:void 0}isPaused(){var e;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=this._getMediaElement();return t?t.paused:void 0}isEnded(){var e;if(!((e=this._contentCategory)!=null&&e.includes("A")))return;const t=this._getMediaElement();return t?t.ended:void 0}_getMediaElement(){try{const t=this.querySelector("#h5p-container"),e=t==null?void 0:t.querySelector("iframe");if(e!=null&&e.contentDocument)return e.contentDocument.querySelector("video, audio")}catch{}return null}goToPage(t){this._isNavigable()&&(t<1||this.totalPages>0&&t>this.totalPages||(this._postNavToContent("goto",{page:t}),this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"PAGE_JUMP",id:`page-${t}`,extra:{values:[{from:this.currentPage,to:t}]}}),this._dispatchPlayerEvent("pageChange",{currentPage:t,totalPages:this.totalPages,label:this.pageLabel})))}nextPage(){this._isNavigable()&&this._handleNextPage()}prevPage(){this._isNavigable()&&this._handlePrevPage()}getCurrentPage(){return this._isNavigable()?this.currentPage:0}getTotalPages(){return this._isNavigable()?this.totalPages:0}getPageLabel(){return this._isNavigable()?this.pageLabel:""}setZoom(t){var r;if(!((r=this._contentCategory)!=null&&r.includes("E")))return;const e=Math.max(25,Math.min(400,t));this._zoomLevel=e,this._postNavToContent("zoom",{level:e}),this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"ZOOM",id:"zoom",extra:{values:[{level:e}]}})}getZoom(){var t;return(t=this._contentCategory)!=null&&t.includes("E")?this._zoomLevel:100}async search(t){var r;if(!((r=this._contentCategory)!=null&&r.includes("E")))return{query:t,results:[]};if(!t||t.trim().length===0)return{query:"",results:[]};const e=this._generateUUID();return this._postNavToContent("search",{query:t,requestId:e}),this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"SEARCH",id:"search",extra:{values:[{query:t}]}}),new Promise(i=>{const s=setTimeout(()=>{this._searchResolvers.delete(e),i({query:t,results:[]})},5e3);this._searchResolvers.set(e,n=>{clearTimeout(s),this._searchResolvers.delete(e),i(n)})})}_isNavigable(){var t,e;return((t=this._contentCategory)==null?void 0:t.includes("C"))===!0||((e=this._contentCategory)==null?void 0:e.includes("E"))===!0}getScore(){return this._score}getMaxScore(){return this._maxScore}getScorePercent(){return this._maxScore<=0?0:Math.round(this._score/this._maxScore*100)}getResponses(){return[...this._responses]}isCompleted(){return this._assessmentCompleted}resetResponses(){var e,r;const t=(r=(e=window.H5P)==null?void 0:e.instances)==null?void 0:r[0];if(t!=null&&t.resetTask)try{t.resetTask()}catch(i){console.warn("[Sunbird-H5P] resetResponses: H5P resetTask failed:",i)}this._score=0,this._maxScore=0,this._responses=[],this._assessmentCompleted=!1,this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"RESET_RESPONSES"}),this._dispatchPlayerEvent("scoreChange",{score:0,maxScore:0})}setupH5PDispatcherListener(){window.H5P&&window.H5P.externalDispatcher&&window.H5P.externalDispatcher.on("xAPI",this._boundXAPI)}_handleXAPI(t){const e=t.data.statement;this.dispatchEvent(new CustomEvent("xAPIEvent",{detail:e,bubbles:!0,composed:!0})),this.translateAndEmitXAPI(e)}translateAndEmitXAPI(t){var d,c;const e=(d=t.verb)==null?void 0:d.id,r=t.result||{},i=t.object||{},s=r.extensions||{};let n="LOG",o={type:"process",level:"INFO",message:"unmapped-verb"};if(this._updateInteractionTime(),e.endsWith("initialized"))n="START",o={type:"player",mode:this.playerConfig.context.mode,pageid:`h5p-player-${this.playerConfig.metadata.identifier}`};else if(e.endsWith("attempted"))n="START",o={type:"assessment",mode:this.playerConfig.context.mode};else if(e.endsWith("played")){const g=s["https://h5p.org/x-api/extensions/currentTime"];n="INTERACT",o={type:"TOUCH",subtype:"PLAY",id:"play-btn",extra:{currentTime:g}},this._isMediaPlaying=!0,this._dispatchPlayerEvent("play",{currentTime:g})}else if(e.endsWith("paused")){const g=s["https://h5p.org/x-api/extensions/currentTime"];n="INTERACT",o={type:"TOUCH",subtype:"PAUSE",id:"pause-btn",extra:{currentTime:g}},this._isMediaPlaying=!1,this._dispatchPlayerEvent("pause",{currentTime:g})}else if(e.endsWith("seeked")){const g=s["https://h5p.org/x-api/extensions/from"],m=s["https://h5p.org/x-api/extensions/to"];n="INTERACT",o={type:"TOUCH",subtype:"SEEK",extra:{values:[{from:g,to:m}]}},this._dispatchPlayerEvent("seek",{from:g,to:m})}else if(e.endsWith("suspended"))n="INTERACT",o={type:"TOUCH",subtype:"SUSPEND"};else if(e.endsWith("resumed"))n="INTERACT",o={type:"TOUCH",subtype:"RESUME"};else if(e.endsWith("experienced")){const g=`page-${this.currentPage}`,m=Date.now()-this._lastPageEntryTime;this._pageTimespent.set(g,(this._pageTimespent.get(g)||0)+m),this._lastPageEntryTime=Date.now(),this._pageViewsCount++,n="IMPRESSION";const y=s["http://sunbird.org/xapi/extensions/page"]||s["http://id.tincanapi.com/extension/page-index"];y!==void 0&&(this.currentPage=y),o={type:"view",pageid:`page-${this.currentPage}`,uri:i.id},this._dispatchPlayerEvent("pageChange",{currentPage:this.currentPage,totalPages:this.totalPages,label:this.pageLabel})}else if(e.endsWith("completed")||e.endsWith("terminated")){n="END";const g=r.duration?this._parseISODuration(r.duration):0;o={type:"player",mode:this.playerConfig.context.mode,duration:g,summary:[{progress:100}]},this._isMediaPlaying=!1,this._dispatchPlayerEvent("ended",{duration:g})}else if(e.endsWith("progressed")){n="LOG";const g=s["http://sunbird.org/xapi/extensions/progress"]||((c=r.score)==null?void 0:c.scaled)*100;g!==void 0&&(this.progressPercent=Math.round(g)),o={type:"process",level:"INFO",message:"progress"},this._dispatchPlayerEvent("progress",{percent:this.progressPercent})}else if(e.endsWith("scored")){n="ASSESS";const{score:g,maxScore:m,pass:y}=this._extractScore(r);this._score=g,this._maxScore=m,o={item:{id:i.id,type:"Content",ver:"1.0"},pass:y?"Yes":"No",score:g,maxscore:m,resvalues:r.response?[r.response]:[],duration:r.duration?this._parseISODuration(r.duration):0},this._dispatchPlayerEvent("scoreChange",{score:g,maxScore:m})}else if(e.endsWith("interacted"))s["http://sunbird.org/xapi/extensions/progress"]!==void 0?(n="HEARTBEAT",o={type:"player",pageid:`page-${this.currentPage}`,extra:{currentTime:s["https://h5p.org/x-api/extensions/currentTime"],currentPage:this.currentPage,progress:this.progressPercent}}):(n="INTERACT",o={type:"TOUCH",subtype:"INTERACT"});else if(e.endsWith("answered"))if(this._contentType==="H5P.InteractiveVideo")n="INTERACT",o={type:"TOUCH",subtype:"OVERLAY_ANSWER",id:i.id,values:[r.response]};else{const{score:m,maxScore:y,pass:C}=this._extractScore(r);this._score=m,this._maxScore=y,this._responses.push({item:i.id||"",pass:C,score:m,resvalues:r.response?[r.response]:[],duration:r.duration?this._parseISODuration(r.duration):0}),r.completion===!0&&(this._assessmentCompleted=!0);const w={item:{id:i.id,type:"Question",ver:"1.0"},pass:C?"Yes":"No",score:m,maxscore:y,resvalues:r.response?[{[i.id]:r.response}]:[],duration:r.duration?this._parseISODuration(r.duration):0};this.emitTelemetry("ASSESS",w),n="RESPONSE",o={target:{id:i.id,type:"Question",ver:"1.0"},type:"CHOOSE",values:[r.response]},this._dispatchPlayerEvent("scoreChange",{score:m,maxScore:y})}this.emitTelemetry(n,o)}_parseISODuration(t){const e=/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/,r=t.match(e);if(!r)return 0;const i=parseInt(r[1]||"0"),s=parseInt(r[2]||"0"),n=parseFloat(r[3]||"0");return i*3600+s*60+n}_extractScore(t){var n,o,d;const e=((n=t.score)==null?void 0:n.raw)||0,r=((o=t.score)==null?void 0:o.max)||100,i=((d=t.score)==null?void 0:d.scaled)||e/r,s=t.success??i>=.5;return{score:e,maxScore:r,pass:s}}emitTelemetry(t,e){if(!this.playerConfig)return;const r={channel:this.playerConfig.context.channel,pdata:this.playerConfig.context.pdata,env:"h5p-player",sid:this.playerConfig.context.sid,did:this.playerConfig.context.did,cdata:this.playerConfig.context.cdata,rollup:this.playerConfig.context.contextRollup},i={id:this.playerConfig.metadata.identifier,type:"Content",ver:String(this.playerConfig.metadata.pkgVersion||"1.0"),rollup:this.playerConfig.context.objectRollup},s={eid:t,ets:Date.now(),ver:"3.1",mid:this._generateUUID(),actor:{type:"User",id:this.playerConfig.context.uid||"anonymous"},context:r,object:i,edata:e,tags:this.playerConfig.context.tags};["INTERACT","ASSESS","RESPONSE","IMPRESSION"].includes(t)&&this._interactionsCount++;const n=new CustomEvent("telemetryEvent",{detail:s,bubbles:!0,composed:!0});this.dispatchEvent(n)}_generateUUID(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)})}_handleDownload(){this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"DOWNLOAD",id:"download-btn"}),this._dispatchPlayerEvent("download")}_handleShare(){this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"SHARE",id:"share-btn"}),this._dispatchPlayerEvent("share")}_handlePrint(){var t;this.emitTelemetry("INTERACT",{type:"TOUCH",subtype:"PRINT",id:"print-btn"}),this._dispatchPlayerEvent("print"),(t=this._contentCategory)!=null&&t.includes("E")?this._postNavToContent("print"):window.print()}_handleRetry(){this._retryCount++,this.initPlayer()}_handleExit(){var e,r;this._emitSummary();const t=this._sessionStartTime>0?Math.floor((Date.now()-this._sessionStartTime)/1e3):0;this.emitTelemetry("END",{type:"player",mode:(r=(e=this.playerConfig)==null?void 0:e.context)==null?void 0:r.mode,duration:t,summary:[{progress:this.progressPercent}]}),this._dispatchPlayerEvent("exit")}_emitSummary(){if(this._sessionStartTime===0)return;const t=`page-${this.currentPage}`,e=Date.now()-this._lastPageEntryTime;this._pageTimespent.set(t,(this._pageTimespent.get(t)||0)+e);const r=Array.from(this._pageTimespent.entries()).map(([i,s])=>({id:i,timespent:Math.floor(s/1e3),pageviews:i===`page-${this.currentPage}`?1:0}));this.emitTelemetry("SUMMARY",{type:"player",starttime:this._sessionStartTime,endtime:Date.now(),timespent:Math.floor((Date.now()-this._sessionStartTime)/1e3),pageviews:this._pageViewsCount,interactions:this._interactionsCount,summary:r})}_handleFullscreen(){var t,e,r,i;if(this._isDocumentReader)document.fullscreenElement?(e=document.exitFullscreen)==null||e.call(document):(t=this.requestFullscreen)==null||t.call(this).catch(s=>{this._emitError(M.E_FULLSCREEN_DENIED,s.message)});else{const s=this.querySelector("#h5p-container"),n=s==null?void 0:s.querySelector("iframe");if(n!=null&&n.contentWindow)try{const o=n.contentDocument||n.contentWindow.document,d=o==null?void 0:o.querySelector(".h5p-enable-fullscreen, .h5p-disable-fullscreen");if(d){d.click();return}}catch{}document.fullscreenElement?(i=document.exitFullscreen)==null||i.call(document):(r=this.requestFullscreen)==null||r.call(this).catch(o=>{this._emitError(M.E_FULLSCREEN_DENIED,o.message)})}}_handleFullscreenChange(){this._fullscreenActive=!!document.fullscreenElement,this._dispatchPlayerEvent("fullscreenChange",{isFullscreen:this._fullscreenActive}),this._fullscreenActive||this._focusContent()}_postNavToContent(t,e={}){const r=this.querySelector("#h5p-container");if(!r)return;const i=r.querySelector("iframe");i!=null&&i.contentWindow&&i.contentWindow.postMessage({type:"sunbird-player-nav",action:t,...e},"*")}_handlePrevPage(){this._postNavToContent("prev")}_handleNextPage(){this._postNavToContent("next")}_handleContentMessage(t){var e,r,i;if(((e=t.data)==null?void 0:e.type)==="sunbird-page-update"){const s=this.currentPage,n=this.totalPages;this.currentPage=t.data.currentPage||0,this.totalPages=t.data.totalPages||0,this.pageLabel=t.data.label||"";const o=this.totalPages>0?Math.round(this.currentPage/this.totalPages*100):0,d=o!==this.progressPercent;this.progressPercent=o,(s!==this.currentPage||n!==this.totalPages)&&this._dispatchPlayerEvent("pageChange",{currentPage:this.currentPage,totalPages:this.totalPages,label:this.pageLabel}),d&&this._dispatchPlayerEvent("progress",{percent:this.progressPercent})}if(((r=t.data)==null?void 0:r.type)==="sunbird-search-result"){const{requestId:s,results:n,query:o}=t.data;s&&this._searchResolvers.has(s)&&this._searchResolvers.get(s)({query:o||"",results:n||[]})}((i=t.data)==null?void 0:i.type)==="sunbird-zoom-update"&&(this._zoomLevel=t.data.level||100)}_handleKeyboard(t){var n,o,d;const e=t.target;if(["INPUT","TEXTAREA","SELECT"].includes(e.tagName)||e.isContentEditable)return;const r=this._isNavigable(),i=(n=this._contentCategory)==null?void 0:n.includes("A"),s=(o=this._contentCategory)==null?void 0:o.includes("E");switch(t.key){case"f":case"F":this._handleFullscreen();break;case"Escape":this._fullscreenActive&&((d=document.exitFullscreen)==null||d.call(document));break;case"ArrowLeft":r?this._handlePrevPage():i&&this.seek(Math.max(0,(this.getCurrentTime()||0)-5));break;case"ArrowRight":r?this._handleNextPage():i&&this.seek((this.getCurrentTime()||0)+5);break;case"Home":r?(t.preventDefault(),this.goToPage(1)):i&&(t.preventDefault(),this.seek(0));break;case"End":if(r&&this.totalPages>0)t.preventDefault(),this.goToPage(this.totalPages);else if(i){t.preventDefault();const c=this.getDuration();c&&this.seek(c)}break;case" ":i&&(t.preventDefault(),this.isPaused()?this.play():this.pause());break;case"r":case"R":this.replay();break;case"m":case"M":i&&this.setMuted(!this.isMuted());break;case"ArrowUp":i&&(t.preventDefault(),this.setVolume((this.getVolume()||0)+.1));break;case"ArrowDown":i&&(t.preventDefault(),this.setVolume((this.getVolume()||0)-.1));break;case"+":case"=":s&&(t.preventDefault(),this.setZoom(this.getZoom()+10));break;case"-":case"_":s&&(t.preventDefault(),this.setZoom(this.getZoom()-10));break;case"0":s&&(t.preventDefault(),this.setZoom(100));break}}render(){var s,n,o,d,c,g,m;if(this.error)return L`
        <div class="error-card" role="alert" aria-live="assertive">
          <div>${this.error}</div>
          ${this._lastErrorCode===M.E_CONTENT_LOAD_FAILED&&this._retryCount<3?L`
            <button class="retry-btn" @click=${this._handleRetry}>
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2;">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              ${this._t("retry")} (${this._retryCount+1}/3)
            </button>
          `:""}
        </div>
      `;const t=(n=(s=this.playerConfig)==null?void 0:s.config)==null?void 0:n.sideMenu,e=((d=(o=this.playerConfig)==null?void 0:o.metadata)==null?void 0:d.name)||"Untitled",r=(g=(c=this.playerConfig)==null?void 0:c.config)==null?void 0:g.progressBar,i=this.totalPages>0&&(r==null?void 0:r.enabled)!==!1;return this.style.width=this.width,this.style.height=this.height,L`
      <style>${this.componentStyles}</style>

      <!-- ═══ TOP TOOLBAR ═══ -->
      <div class="player-toolbar" role="toolbar" aria-label="Player toolbar">
        <span class="toolbar-title" title="${e}">${e}</span>
        <div class="toolbar-spacer"></div>

        ${(t==null?void 0:t.showReplay)!==!1?L`
          <button class="toolbar-btn" 
                  title="${this._t("replay")}" 
                  aria-label="${this._t("replay")}"
                  @click=${this.replay}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        `:""}

        ${(m=this._contentCategory)!=null&&m.includes("E")&&(t!=null&&t.showPrint)?L`
          <button class="toolbar-btn" 
                  title="${this._t("print")}" 
                  aria-label="${this._t("print")}"
                  @click=${this._handlePrint}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          </button>
        `:""}

        ${(t==null?void 0:t.showFullscreen)!==!1?L`
          <button class="toolbar-btn" 
                  title="${this._fullscreenActive?this._t("exitFullscreen"):this._t("fullscreen")}"
                  aria-label="${this._fullscreenActive?this._t("exitFullscreen"):this._t("fullscreen")}"
                  aria-pressed="${this._fullscreenActive}"
                  @click=${this._handleFullscreen}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${this._fullscreenActive?"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3":"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"}"/></svg>
          </button>
        `:""}

        ${t!=null&&t.showDownload?L`
          <button class="toolbar-btn" 
                  title="${this._t("download")}" 
                  aria-label="${this._t("download")}"
                  @click=${this._handleDownload}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
        `:""}

        ${t!=null&&t.showShare?L`
          <button class="toolbar-btn" 
                  title="${this._t("share")}" 
                  aria-label="${this._t("share")}"
                  @click=${this._handleShare}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        `:""}

        ${(t==null?void 0:t.showExit)!==!1?L`
          <div class="toolbar-separator" aria-hidden="true"></div>
          <button class="toolbar-btn" 
                  title="${this._t("exit")}" 
                  aria-label="${this._t("exit")}"
                  @click=${this._handleExit}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        `:""}
      </div>

      <!-- ═══ CONTENT ═══ -->
      <div class="player-content overflow-hidden flex flex-col relative" role="main">
        ${!this.isLoaded&&!this.error?L`<div class="loading-overlay" role="status" aria-live="polite">${this._t("loading")}</div>`:""}
        <slot name="h5p-content"></slot>
        <!-- Task 5.3: Screen Reader Announcement Region -->
        <div id="announcement-region" class="sr-only" role="status" aria-live="polite"></div>
      </div>

      <!-- ═══ BOTTOM NAVIGATION BAR ═══ -->
      ${i?L`
        <div class="player-bottombar" role="navigation" aria-label="Player navigation">
          <button class="bottom-btn" 
                  title="${this._t("previous")}" 
                  aria-label="${this._t("previous")}"
                  @click=${this._handlePrevPage}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <span class="bottom-page-info">
            ${(r==null?void 0:r.showChapterName)!==!1&&this.pageLabel?this.pageLabel:""}
            ${(r==null?void 0:r.showChapterName)!==!1&&this.pageLabel&&(r==null?void 0:r.showPageCount)!==!1?" | ":""}
            ${(r==null?void 0:r.showPageCount)!==!1?`Page ${this.currentPage} / ${this.totalPages}`:""}
          </span>

          <button class="bottom-btn" 
                  title="${this._t("next")}" 
                  aria-label="${this._t("next")}"
                  @click=${this._handleNextPage}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <div class="bottom-progress" 
               role="progressbar" 
               aria-label="Content progress"
               aria-valuenow="${this.progressPercent}" 
               aria-valuemin="0" 
               aria-valuemax="100">
            <div class="bottom-progress-fill" style="width: ${this.progressPercent}%"></div>
          </div>

          ${(r==null?void 0:r.showPercentage)!==!1?L`
            <span class="bottom-page-info" aria-hidden="true">${this.progressPercent}%</span>
          `:""}
        </div>
      `:""}
    `}};T._i18n={en:{fullscreen:"Fullscreen",exitFullscreen:"Exit Fullscreen",download:"Download",share:"Share",exit:"Exit",previous:"Previous",next:"Next",loading:"Loading content…",replay:"Replay",print:"Print",retry:"Retry"},hi:{fullscreen:"पूर्ण स्क्रीन",exitFullscreen:"पूर्ण स्क्रीन से बाहर",download:"डाउनलोड",share:"शेयर",exit:"बाहर",previous:"पिछला",next:"अगला",loading:"सामग्री लोड हो रही है…",replay:"दोबारा चलाएं",print:"प्रिंट",retry:"पुनः प्रयास करें"}};T._themeVars={light:{"--sbp-toolbar-bg":"#16213e","--sbp-toolbar-color":"#e0e0e0","--sbp-toolbar-title-color":"#fff","--sbp-toolbar-border":"rgba(255,255,255,0.08)","--sbp-toolbar-btn-border":"rgba(255,255,255,0.15)","--sbp-toolbar-btn-hover":"rgba(255,255,255,0.1)","--sbp-toolbar-separator":"rgba(255,255,255,0.12)","--sbp-content-bg":"#f4f4f4","--sbp-host-bg":"#1a1a2e","--sbp-loading-bg":"rgba(255,255,255,0.9)","--sbp-loading-color":"#333","--sbp-error-color":"#721c24","--sbp-error-bg":"#f8d7da","--sbp-error-border":"#f5c6cb","--sbp-bottombar-bg":"#16213e","--sbp-bottombar-color":"#e0e0e0","--sbp-bottombar-border":"rgba(255,255,255,0.08)","--sbp-page-info-color":"rgba(255,255,255,0.7)","--sbp-progress-track":"rgba(255,255,255,0.1)","--sbp-progress-fill":"#0f3460"},dark:{"--sbp-toolbar-bg":"#0d0d0d","--sbp-toolbar-color":"#c8c8c8","--sbp-toolbar-title-color":"#e8e8e8","--sbp-toolbar-border":"rgba(255,255,255,0.06)","--sbp-toolbar-btn-border":"rgba(255,255,255,0.12)","--sbp-toolbar-btn-hover":"rgba(255,255,255,0.08)","--sbp-toolbar-separator":"rgba(255,255,255,0.1)","--sbp-content-bg":"#121212","--sbp-host-bg":"#0a0a0a","--sbp-loading-bg":"rgba(18,18,18,0.95)","--sbp-loading-color":"#ccc","--sbp-error-color":"#f5c6cb","--sbp-error-bg":"#3b1a1e","--sbp-error-border":"#5a2a30","--sbp-bottombar-bg":"#0d0d0d","--sbp-bottombar-color":"#c8c8c8","--sbp-bottombar-border":"rgba(255,255,255,0.06)","--sbp-page-info-color":"rgba(255,255,255,0.55)","--sbp-progress-track":"rgba(255,255,255,0.08)","--sbp-progress-fill":"#1a73e8"},sepia:{"--sbp-toolbar-bg":"#3e2f1c","--sbp-toolbar-color":"#d9c9a8","--sbp-toolbar-title-color":"#f0e4cc","--sbp-toolbar-border":"rgba(240,228,204,0.12)","--sbp-toolbar-btn-border":"rgba(240,228,204,0.2)","--sbp-toolbar-btn-hover":"rgba(240,228,204,0.1)","--sbp-toolbar-separator":"rgba(240,228,204,0.15)","--sbp-content-bg":"#f5eed6","--sbp-host-bg":"#2e2214","--sbp-loading-bg":"rgba(245,238,214,0.95)","--sbp-loading-color":"#4a3c28","--sbp-error-color":"#8a4a2a","--sbp-error-bg":"#f0dcc0","--sbp-error-border":"#d4b896","--sbp-bottombar-bg":"#3e2f1c","--sbp-bottombar-color":"#d9c9a8","--sbp-bottombar-border":"rgba(240,228,204,0.12)","--sbp-page-info-color":"rgba(240,228,204,0.6)","--sbp-progress-track":"rgba(240,228,204,0.15)","--sbp-progress-fill":"#8a6d3b"}};T.CONTENT_CATEGORY_MAP={"H5P.InteractiveVideo":"A+B","H5P.CoursePresentation":"A+B+C","H5P.AudioRecorder":"A","H5P.MultiChoice":"B","H5P.TrueFalse":"B","H5P.Blanks":"B","H5P.DragQuestion":"B","H5P.DragText":"B","H5P.MarkTheWords":"B","H5P.SingleChoiceSet":"B","H5P.QuestionSet":"B","H5P.Essay":"B","H5P.Summary":"B","H5P.ImageHotspotQuestion":"B","H5P.FindTheHotspot":"B","H5P.Dictation":"B","H5P.SortParagraphs":"B","H5P.ArithmeticQuiz":"B","H5P.AdvancedBlanks":"B","H5P.SpeakTheWords":"B","H5P.SpeakTheWordsSet":"B","H5P.Crossword":"B","H5P.FindTheWords":"B","H5P.ImagePair":"B","H5P.ImageSequencing":"B","H5P.MemoryGame":"B","H5P.MultiMediaChoice":"B","H5P.InteractiveBook":"B+C","H5P.Timeline":"C","H5P.Accordion":"C","H5P.BranchingScenario":"B+C","H5P.ImageHotspots":"D","H5P.ImageJuxtaposition":"D","H5P.ImageSlider":"D","H5P.Agamotto":"D","H5P.Chart":"D","H5P.Collage":"D","H5P.CornellNotes":"D","H5P.DocumentationTool":"D","H5P.IFrameEmbed":"D","H5P.KewArCode":"D","H5P.InformationWall":"D","H5P.Column":"D","H5P.PersonalityQuiz":"D","H5P.Questionnaire":"D","H5P.StructureStrip":"D","H5P.ThreeSixty":"D","H5P.AdventCalendar":"D","H5P.ARScavenger":"D","H5P.GameMap":"D","H5P.Flashcards":"D","H5P.DialogCards":"D","H5P.GuessTheAnswer":"D","Sunbird.EPUBReader":"E","Sunbird.PDFReader":"E"};O([Z({type:Object})],T.prototype,"playerConfig",2);O([Z({type:String,reflect:!0})],T.prototype,"locale",2);O([Z({type:String,reflect:!0})],T.prototype,"theme",2);O([Z({type:String,reflect:!0})],T.prototype,"width",2);O([Z({type:String,reflect:!0})],T.prototype,"height",2);O([j()],T.prototype,"isLoaded",2);O([j()],T.prototype,"error",2);O([j()],T.prototype,"_fullscreenActive",2);O([j()],T.prototype,"currentPage",2);O([j()],T.prototype,"totalPages",2);O([j()],T.prototype,"progressPercent",2);O([j()],T.prototype,"pageLabel",2);O([j()],T.prototype,"_contentCategory",2);T=O([ht("sunbird-h5p-player")],T);
