import{bt as G,a4 as R,bM as z,k as g,as as Y,aw as J,cI as X,aG as q,ay as p,W as v,b3 as I,bn as _,X as s,a2 as l,b1 as c,a1 as M,D as m,bT as h,I as E,aE as S,bU as L,cQ as V,bS as T,bF as Z,dj as B,dm as K,U as D,bG as x,A as ee,bH as O,bO as H,bu as te,bp as ne}from"./index-e8eb9d18.js";import{m as ae}from"./marked.esm-4cbe47a7.js";/*!
 * paypal-js v5.1.1 (2022-08-03T17:21:59.218Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(e,t){var n=document.querySelector('script[src="'.concat(e,'"]'));if(n===null)return null;var i=j(e,t),r=n.cloneNode();if(delete r.dataset.uidAuto,Object.keys(r.dataset).length!==Object.keys(i.dataset).length)return null;var o=!0;return Object.keys(r.dataset).forEach(function(d){r.dataset[d]!==i.dataset[d]&&(o=!1)}),o?n:null}function re(e){var t=e.url,n=e.attributes,i=e.onSuccess,r=e.onError,o=j(t,n);o.onerror=r,o.onload=i,document.head.insertBefore(o,document.head.firstElementChild)}function oe(e){var t="https://www.paypal.com/sdk/js";e.sdkBaseURL&&(t=e.sdkBaseURL,delete e.sdkBaseURL),ue(e);var n=Object.keys(e).filter(function(o){return typeof e[o]!="undefined"&&e[o]!==null&&e[o]!==""}).reduce(function(o,d){var u=e[d].toString();return d.substring(0,5)==="data-"?o.dataAttributes[d]=u:o.queryParams[d]=u,o},{queryParams:{},dataAttributes:{}}),i=n.queryParams,r=n.dataAttributes;return{url:"".concat(t,"?").concat(le(i)),dataAttributes:r}}function le(e){var t="";return Object.keys(e).forEach(function(n){t.length!==0&&(t+="&"),t+=n+"="+e[n]}),t}function ie(e){var t=e.split("/* Original Error:")[1];return t?t.replace(/\n/g,"").replace("*/","").trim():e}function j(e,t){t===void 0&&(t={});var n=document.createElement("script");return n.src=e,Object.keys(t).forEach(function(i){n.setAttribute(i,t[i]),i==="data-csp-nonce"&&n.setAttribute("nonce",t["data-csp-nonce"])}),n}function ue(e){var t=e["merchant-id"],n=e["data-merchant-id"],i="",r="";return Array.isArray(t)?t.length>1?(i="*",r=t.toString()):i=t.toString():typeof t=="string"&&t.length>0?i=t:typeof n=="string"&&n.length>0&&(i="*",r=n),e["merchant-id"]=i,e["data-merchant-id"]=r,e}function ce(e,t){if(t===void 0&&(t=P()),F(e,t),typeof window=="undefined")return t.resolve(null);var n=oe(e),i=n.url,r=n.dataAttributes,o=r["data-namespace"]||"paypal",d=Q(o);return se(i,r)&&d?t.resolve(d):de({url:i,attributes:r},t).then(function(){var u=Q(o);if(u)return u;throw new Error("The window.".concat(o," global variable is not available."))})}function de(e,t){t===void 0&&(t=P()),F(e,t);var n=e.url,i=e.attributes;if(typeof n!="string"||n.length===0)throw new Error("Invalid url.");if(typeof i!="undefined"&&typeof i!="object")throw new Error("Expected attributes to be an object.");return new t(function(r,o){if(typeof window=="undefined")return r();re({url:n,attributes:i,onSuccess:function(){return r()},onError:function(){var d=new Error('The script "'.concat(n,'" failed to load.'));return window.fetch?fetch(n).then(function(u){return u.status===200&&o(d),u.text()}).then(function(u){var a=ie(u);o(new Error(a))}).catch(function(u){o(u)}):o(d)}})})}function P(){if(typeof Promise=="undefined")throw new Error("Promise is undefined. To resolve the issue, use a Promise polyfill.");return Promise}function Q(e){return window[e]}function F(e,t){if(typeof e!="object"||e===null)throw new Error("Expected an options object.");if(typeof t!="undefined"&&typeof t!="function")throw new Error("Expected PromisePonyfill to be a function.")}const fe=R({name:"AccountPage",setup(){var $;console.log("AccountPage","setup()");const e=z(),t="Ad8Db5feNlBy6SdFa7O0fpJ2QYIcyFO9SGSg4tNpxOgOlLyWTkN6JmOFBV58ItTpdUwfBGW2L8WuoIAn",n=g(),i=g(!1),r=B.getLicence(),o=g(null),d=g((($=r==null?void 0:r.subscriber)==null?void 0:$.email_address)||""),u=g((r==null?void 0:r.subscriptionId)||""),a=g(null),k=g(!1),U=()=>{o.value=null,d.value&&(u.value||a.value)&&(k.value=!0,K.post("user/invoice",{action:u.value?"getInvoicesBySubscriptionId":"getInvoicesByInvoiceId",email:d.value,subscriptionId:u.value,invoiceId:a.value}).then(f=>{o.value=f.map(w=>(w.selected=r&&w.invoiceId===r.invoiceId,w))}).catch(f=>{o.value=[],console.warn("AccountPage",f.message),n.value=f.message}).finally(()=>{k.value=!1}))},W=f=>{B.setToken(f).then(()=>window.location.reload())};let y=null;Y(()=>{U(),ce({"client-id":t,components:"buttons",currency:"EUR",vault:!0,intent:"subscription"}).then(f=>{const w={style:{shape:"rect",color:"blue",layout:"horizontal",label:"buynow",tagline:!1},createSubscription:(b,C)=>C.subscription.create({plan_id:"P-8EY03930L1769123MMEFPZPI"}),onApprove:(b,C)=>{i.value=!0,B.setToken(null,b.subscriptionID).catch(N=>{console.warn("AccountPage",N.message),n.value=N.message}).finally(()=>{i.value="done",window.location.reload()})}};y=f.Buttons(w),y.render("#paypal-button-subscribe").catch(b=>{console.error("Failed to render the PayPal Buttons",b),n.value=b.message})})}),J(()=>{y&&y.close&&y.close(),Object.keys(window).forEach(f=>{/paypal|zoid|post_robot/.test(f)&&delete window[f]})});const A={};return["SupportByBuying","UsageNotice","Termination","Disclaimer"].forEach(f=>{let w="",b=0;for(A[f]=[];(w=e.t(f+"["+b+"]"))!==f+"["+b+"]";)b++,A[f].push(w)}),{format:X,marked:ae,now:Math.ceil(Date.now()/1e3),t:A,invoiceId:a,subscriptionId:u,email:d,status:k,getInvoices:U,invoices:o,setLicence:W,isPaying:i,error:n}}}),pe={class:"q-ma-sm"},me={class:"row"},ve={class:"col"},be={class:"row no-wrap q-col-gutter-sm"},he={class:"col-8"},we={class:"text-h6"},ge=s("div",{class:"text-subtitle2"},null,-1),ye=["innerHTML"],Ie=["innerHTML"],_e=["innerHTML"],Ee=s("div",{id:"paypal-button-subscribe"},null,-1),Se={class:"col-4"},ke={class:"text-h6"},Le=s("div",{class:"text-subtitle2"},null,-1),Ae={class:"row"},Me={class:"col"},Te={class:"row"},Be={class:"col"},De=s("div",{class:"col-shrink q-px-md q-pb-sm row flex-center"},"or",-1),Oe={class:"col"},Ue={class:"row"},$e={class:"col text-center"},Ce={class:"col text-center"},Ne={class:"text-h6"},qe=s("div",{class:"text-subtitle2"},null,-1),Ve=["innerHTML"];function He(e,t,n,i,r,o){const d=q("alert"),u=q("inputs");return p(),v("div",pe,[I(s("div",me,[s("div",ve,[l(d,null,{default:c(()=>[M(m(e.error),1)]),_:1})])],512),[[_,e.error]]),s("div",be,[s("div",he,[l(T,null,{default:c(()=>[l(h,{class:"bg-primary text-white"},{default:c(()=>[s("div",we,m(e.$t("Buy"))+" & "+m(e.$t("Subscribe")),1),ge]),_:1}),l(h,null,{default:c(()=>[(p(!0),v(E,null,S(e.t.SupportByBuying,a=>(p(),v("p",{key:a},[s("span",{innerHTML:e.marked.parse(a)},null,8,ye)]))),128))]),_:1}),l(L),l(h,null,{default:c(()=>[s("strong",null,m(e.$t("Usage Notice")),1),(p(!0),v(E,null,S(e.t.UsageNotice,a=>(p(),v("p",{key:a},[s("span",{innerHTML:e.marked.parse(a)},null,8,Ie)]))),128))]),_:1}),l(L),l(h,null,{default:c(()=>[s("strong",null,m(e.$t("Legal Remarks")),1),(p(!0),v(E,null,S(e.t.Disclaimer,a=>(p(),v("p",{key:a},[s("span",{innerHTML:e.marked.parse(a)},null,8,_e)]))),128))]),_:1}),l(L),l(h,{class:"text-center"},{default:c(()=>[I(s("div",null,[s("em",null,m(e.$t("buy now")),1),Ee],512),[[_,e.isPaying===!1]]),I(s("div",null,[l(V,{color:"primary",size:"3em"})],512),[[_,e.isPaying===!0]])]),_:1})]),_:1})]),s("div",Se,[l(T,{class:"q-mb-sm"},{default:c(()=>[l(h,{class:"bg-primary text-white"},{default:c(()=>[s("div",ke,m(e.$t("Get Licences")),1),Le]),_:1}),l(h,null,{default:c(()=>[s("div",Ae,[s("div",Me,[l(u,{modelValue:e.email,"onUpdate:modelValue":t[0]||(t[0]=a=>e.email=a),label:"E-Mail",value:e.email},null,8,["modelValue","value"])])]),s("div",Te,[s("div",Be,[l(u,{modelValue:e.subscriptionId,"onUpdate:modelValue":t[1]||(t[1]=a=>e.subscriptionId=a),label:"Abonnement-ID",value:e.subscriptionId},null,8,["modelValue","value"])]),De,s("div",Oe,[l(u,{modelValue:e.invoiceId,"onUpdate:modelValue":t[2]||(t[2]=a=>e.invoiceId=a),label:"Invoice-ID",value:e.invoiceId},null,8,["modelValue","value"])])]),s("div",Ue,[I(s("div",$e,[l(u,{onOnClick:e.getInvoices,type:"button",label:e.$t("Get Licences"),flat:!1,color:"primary"},null,8,["onOnClick","label"])],512),[[_,e.status===!1]]),I(s("div",Ce,[l(V,{color:"primary",size:"3em"})],512),[[_,e.status!==!1]])]),l(L,{class:"q-mx-sm q-my-md"}),l(Z,null,{default:c(()=>[(p(!0),v(E,null,S(e.invoices,a=>(p(),D(x,{key:a._id,class:ee({"bg-positive":a.expires>e.now})},{default:c(()=>[l(O,null,{default:c(()=>[l(H,null,{default:c(()=>[M(m(a.date)+", #"+m(a.invoiceId),1)]),_:2},1024),l(H,{caption:""},{default:c(()=>[M(m(e.$t("valid to"))+" "+m(e.format(a.expires*1e3,"dd. MMM yyyy, HH:mm")),1)]),_:2},1024)]),_:2},1024),a.selected?(p(),D(O,{key:0,side:""},{default:c(()=>[l(te,{name:"mdi-checkbox-marked-circle-outline",color:"white"})]),_:1})):(p(),D(O,{key:1,side:""},{default:c(()=>[l(u,{type:"button",round:"",tooltip:e.$t("Set Licence"),class:"gt-xs",flat:"",icon:"mdi-checkbox-blank-circle-outline",onClick:ne(k=>e.setLicence(a.token),["stop"])},null,8,["tooltip","onClick"])]),_:2},1024))]),_:2},1032,["class"]))),128))]),_:1})]),_:1})]),_:1}),l(T,null,{default:c(()=>[l(h,{class:"bg-primary text-white"},{default:c(()=>[s("div",Ne,m(e.$t("Unsubscribe"))+" / "+m(e.$t("Terminate")),1),qe]),_:1}),l(h,null,{default:c(()=>[(p(!0),v(E,null,S(e.t.Termination,a=>(p(),v("p",{key:a},[s("span",{innerHTML:e.marked.parse(a)},null,8,Ve)]))),128))]),_:1})]),_:1})])])])}var Pe=G(fe,[["render",He]]);export{Pe as default};