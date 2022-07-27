import{_ as z,q as W,Y as J,dh as j,cq as w,d5 as G,A as C,a4 as g,di as S,B as V,cG as Y,j as E,o as c,d,K as p,a2 as m,e as t,k as s,w as o,i as P,t as r,a7 as u,cN as F,a6 as k,O as K,F as I,l as B,a8 as _,de as H,M as R,f as Z,N as X,$ as q}from"./index-608510c8.js";import{m as x}from"./marked.esm-5f440e4b.js";const ee=W({name:"AccountPage",setup(){console.log("AccountPage","setup()");const e=J(),T=j(),y=w.get("sessionId")||G();w.set("sessionId",y);const $="Ad8Db5feNlBy6SdFa7O0fpJ2QYIcyFO9SGSg4tNpxOgOlLyWTkN6JmOFBV58ItTpdUwfBGW2L8WuoIAn";C(()=>{const n=document.createElement("script");n.setAttribute("src","https://www.paypal.com/sdk/js?client-id="+$+"&components=buttons&currency=EUR&vault=true&intent=subscription"),n.setAttribute("data-namespace","paypal_sdk"),document.body.appendChild(n)});const D=g(),L=g(!1),f=g(w.get("userId")!==null),v=g(w.get("userId")),a=g([]),M=g(),N=g([]);S.post("user/details",{action:"getLoginBySessionId",sessionId:y}).then(n=>{if(!n)throw new Error("User not signed in!");console.log("AccountPage","UserDetails",n),f.value=!0,v.value=n,w.set("userId",n),console.log("AccountPage","User signed-in: "+n),S.post("user/invoice",{action:"getInvoicesByUserId",userId:n}).then(l=>{N.value=l}).catch(l=>{console.warn("AccountPage",l.message)}),S.post("user/details",{action:"getInstallations",userId:n}).then(l=>{a.value=l.map(i=>{const h=JSON.parse(i.system),Q={value:i.ioBrokerId,label:"System: "+h.hostname+" ("+h.platform+"), ID: "+i.ioBrokerId};return i.selected==="1"&&(M.value=Q),Q})}).catch(l=>{console.warn("AccountPage",y,l.message)})}).catch(n=>{console.warn("AccountPage",y,n.message),n.value=n.message,f.value=!1});let b=null;const O=()=>{window.paypal?window.paypal.use(["login"],n=>{const l=T.meta.uuid,i=T.meta.system,h=H.getSystemId(i);n.render({appid:"Ad8Db5feNlBy6SdFa7O0fpJ2QYIcyFO9SGSg4tNpxOgOlLyWTkN6JmOFBV58ItTpdUwfBGW2L8WuoIAn",scopes:"openid",containerid:"paypal-button-login",responseType:"code",locale:"de-de",buttonType:"LWP",buttonShape:"pill",buttonSize:"lg",fullPage:"true",state:btoa(y+"|"+l+"|"+h+"|"+JSON.stringify(i)+"|"+window.location.href),returnurl:"https://www.zefau.net/jarvis/user/paypal_login.php"})}):setTimeout(()=>O(),100)},U=()=>{if(!window.paypal_sdk)setTimeout(()=>U(),100);else{document.querySelector("#paypal-button-subscribe");const n={style:{shape:"rect",color:"blue",layout:"horizontal",label:"buynow",tagline:!1},createSubscription:(l,i)=>i.subscription.create({plan_id:"P-8EY03930L1769123MMEFPZPI"}),onApprove:(l,i)=>{L.value=!0,S.post("user/invoice",{action:"assignUserToInvoice",userId:v.value,subscriptionId:l.subscriptionID}).then(h=>H.setToken(h,l.subscriptionID,M.value.value)).catch(h=>console.error(h)).finally(()=>{L.value="done",window.location.reload()})}};b=window.paypal_sdk.Buttons(n),b.render("#paypal-button-subscribe")}};C(()=>{O(),U()}),V(()=>{b&&b.close&&b.close(),Object.keys(window).forEach(n=>{/paypal|zoid|post_robot/.test(n)&&delete window[n]})});const A={};return["SupportByBuying","Termination","Disclaimer"].forEach(n=>{let l="",i=0;for(A[n]=[];(l=e.t(n+"["+i+"]"))!==n+"["+i+"]";)i++,A[n].push(l)}),{format:Y,marked:x,now:Math.ceil(Date.now()/1e3),t:A,installations:a,invoices:N,userId:v,isLogin:f,isPaying:L,error:D}}}),se={class:"row q-px-sm"},te={class:"col"},ne={class:"row q-pa-md no-wrap justify-center"},oe={class:"col-3"},ae={class:"text-h6"},le=t("div",{class:"text-subtitle2"},null,-1),ie={class:"text-center"},re={class:"row"},ue={class:"col-12"},ce={class:"text-center"},de=t("div",{id:"paypal-button-login"},null,-1),pe=[de],me={class:"text-h6"},he=t("div",{class:"text-subtitle2"},null,-1),ge={class:"col-shrink items-center"},ye={class:"col-5"},_e={class:"text-h6"},fe=t("div",{class:"text-subtitle2"},null,-1),ve=["innerHTML"],be=["innerHTML"],we=t("div",{id:"paypal-button-subscribe"},null,-1),Ie={class:"col-shrink items-center"},Le={class:"col-3"},Se={class:"text-h6"},Pe=t("div",{class:"text-subtitle2"},null,-1),ke=["innerHTML"];function Be(e,T,y,$,D,L){const f=E("alert"),v=E("inputs");return c(),d("div",null,[p(t("div",se,[t("div",te,[s(f,null,{default:o(()=>[P(r(e.error),1)]),_:1})])],512),[[m,e.error]]),t("div",ne,[t("div",oe,[s(k,null,{default:o(()=>[s(u,{class:"bg-primary text-white"},{default:o(()=>[t("div",ae,r(e.isLogin===!0?e.$t("User")+" ID":e.$t("Sign In")),1),le]),_:1}),s(u,null,{default:o(()=>[p(t("div",ie,[s(F,{color:"primary",size:"3em"})],512),[[m,e.isLogin===null]]),p(t("div",null,[t("div",re,[t("div",ue,[s(v,{standout:"",value:e.userId,label:"User",disable:""},null,8,["value"])])])],512),[[m,e.isLogin===!0]]),p(t("div",ce,pe,512),[[m,e.isLogin===!1]])]),_:1})]),_:1}),p(s(k,{class:"q-mt-md"},{default:o(()=>[s(u,{class:"bg-primary text-white"},{default:o(()=>[t("div",me,r(e.$t("Bills")),1),he]),_:1}),s(u,null,{default:o(()=>[s(K,null,{default:o(()=>[(c(!0),d(I,null,B(e.invoices,a=>(c(),d(I,{key:"item-"+a.invoiceId},[s(R,{class:Z({"bg-positive":a.expires>e.now})},{default:o(()=>[s(X,null,{default:o(()=>[s(q,null,{default:o(()=>[P(r(a.date)+", #"+r(a.invoiceId),1)]),_:2},1024),s(q,{caption:""},{default:o(()=>[P(r(e.$t("valid to"))+" "+r(e.format(a.expires*1e3,"dd. MMM yyyy, HH:mm")),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["class"]),s(_)],64))),128))]),_:1})]),_:1})]),_:1},512),[[m,e.invoices.length>0]])]),t("div",ge,[s(_,{vertical:"",style:{margin:"0 16px",height:"100%"}})]),t("div",ye,[s(k,null,{default:o(()=>[s(u,{class:"bg-primary text-white"},{default:o(()=>[t("div",_e,r(e.$t("Buy"))+" & "+r(e.$t("Subscribe")),1),fe]),_:1}),s(u,null,{default:o(()=>[(c(!0),d(I,null,B(e.t.SupportByBuying,a=>(c(),d("p",{key:a},[t("span",{innerHTML:e.marked.parse(a)},null,8,ve)]))),128))]),_:1}),s(_),s(u,null,{default:o(()=>[t("strong",null,r(e.$t("Legal Remarks")),1),(c(!0),d(I,null,B(e.t.Disclaimer,a=>(c(),d("p",{key:a},[t("span",{innerHTML:e.marked.parse(a)},null,8,be)]))),128))]),_:1}),s(_),p(s(u,{class:"text-center"},{default:o(()=>[P(r(e.$t("Login first to buy & subscribe"))+". ",1)]),_:1},512),[[m,e.isLogin===!1]]),p(s(u,{class:"text-center"},{default:o(()=>[p(t("div",null,[we,t("em",null,r(e.$t("buy now")),1),s(_,{class:"q-mt-sm"})],512),[[m,e.isPaying===!1]]),p(t("div",null,[s(F,{color:"primary",size:"3em"})],512),[[m,e.isPaying===!0]])]),_:1},512),[[m,e.isLogin===!0&&e.userId]])]),_:1})]),t("div",Ie,[s(_,{vertical:"",style:{margin:"0 16px",height:"100%"}})]),t("div",Le,[s(k,null,{default:o(()=>[s(u,{class:"bg-primary text-white"},{default:o(()=>[t("div",Se,r(e.$t("Unsubscribe"))+" / "+r(e.$t("Terminate")),1),Pe]),_:1}),s(u,null,{default:o(()=>[(c(!0),d(I,null,B(e.t.Termination,a=>(c(),d("p",{key:a},[t("span",{innerHTML:e.marked.parse(a)},null,8,ke)]))),128))]),_:1})]),_:1})])])])}var $e=z(ee,[["render",Be]]);export{$e as default};