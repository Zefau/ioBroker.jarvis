import{Q as w}from"./QTooltip-175b1fd9.js";import{bt as j,a4 as N,bw as R,bN as V,bM as D,Q as k,da as G,dB as E,k as S,aG as F,b4 as H,ds as O,a2 as l,b1 as t,b3 as g,bn as h,bF as L,ay as i,U as v,a1 as u,D as s,V as m,bG as r,bO as U,W as _,aE as q,X as y,cP as z,by as P,bH as I,A as J,bE as W,bu as X,I as K}from"./index-cf042324.js";import{Q as Y}from"./QBadge-7499330e.js";const Z=N({name:"ModuleAdapterStatus",props:["widget"],setup(a){const C=O.getConnection;R();const c=V(),B=D(),b=k(()=>a.widget.config),p=k(()=>({...G.joinConfig(b.value,E),list:b.value.list?b.value.list.replace(/, /g,",").toLowerCase().split(","):null,blacklist:b.value.blacklist?b.value.blacklist.replace(/, /g,",").toLowerCase().split(","):null})),n=k(()=>{let o=c.instances;if(o=o&&o.val&&!o.val.error?{...o.val}:{},p.value.list)for(const d in o){const f=d.substr(0,d.indexOf("."));!p.value.list.includes(d)&&!p.value.list.includes(f)&&delete o[d]}else if(p.value.blacklist)for(const d in o){const f=d.substr(0,d.indexOf("."));(p.value.blacklist.includes(d)||p.value.blacklist.includes(f))&&delete o[d]}return o}),e=S([]),A=S([]);C.subscribeState("admin.0.info.updatesList",({err:o,state:d})=>{if(d){const f=d&&d.val?d.val.replace("js-controller,","").replace("js-controller",""):"";e.value=f?f.split(","):[],A.value=e.value.map($=>n.value[$+".0"]?n.value[$+".0"].title+" ("+n.value[$+".0"].name+")":$).join(", ")}});const Q=S({}),M=(o,d)=>{Q.value[o]=!0,C.setAdapter(o,d).then(()=>{c.join("instances",{val:{...c.instances.val,[o]:{...c.instances.val[o],enabled:d}},ts:Date.now()})}).catch(f=>{console.error(f)}).finally(()=>{Q.value[o]=!1})},T=k(()=>B.locale.value.substr(0,2));return{activeRepo:k(()=>c.meta.activeRepo),adapterUpdates:e,adapterUpdateList:A,instances:n,language:T,loading:Q,moduleConfig:p,onSet:M}}}),x=y("br",null,null,-1),ee={class:"UpdateAvailable"},ae={key:1},le={key:2};function te(a,C,c,B,b,p){const n=F("icon");return H([a.widget.revision],()=>l(I,null,{default:t(()=>[g(l(L,{class:"UpdateAvailableListItem",style:{"background-color":"var(--q-accent)"}},{default:t(()=>[a.adapterUpdateList.length>60?(i(),v(w,{key:0},{default:t(()=>[u(s(a.adapterUpdateList),1)]),_:1})):m("",!0),l(r,{avatar:""},{default:t(()=>[l(n,{name:"refresh"})]),_:1}),l(r,null,{default:t(()=>[l(U,null,{default:t(()=>[u(s(a.adapterUpdateList.length>60?a.adapterUpdateList.substr(0,58)+"...":a.adapterUpdateList),1)]),_:1}),l(U,{caption:"",style:{color:"#fff"}},{default:t(()=>[u(s(a.adapterUpdates.length)+" "+s(a.$t("Updates available")),1),x,u(" "+s(a.$t("Repository")+": "+a.activeRepo),1)]),_:1})]),_:1}),l(r,{side:""},{default:t(()=>[l(Y,{rounded:"",color:"white",style:{color:"var(--q-accent)"},label:a.adapterUpdates.length},null,8,["label"])]),_:1})]),_:1},512),[[h,a.moduleConfig.updates&&a.adapterUpdates.length>0]]),(i(!0),_(K,null,q(a.instances,e=>(i(),v(L,{key:e.id,clickable:a.moduleConfig.switch&&e.mode!=="none"&&e.mode!=="once"&&a.loading[e.id]!==!0,"v-ripple":a.moduleConfig.switch&&e.mode!=="none"&&e.mode!=="once"&&a.loading[e.id]!==!0},{default:t(()=>[l(r,{avatar:""},{default:t(()=>[l(n,{name:"img:"+e.extIcon},null,8,["name"])]),_:2},1024),l(r,null,{default:t(()=>[l(U,null,{default:t(()=>[u(s(e.titleLang&&(e.titleLang[a.language]||e.titleLang.en||e.titleLang.de)||e.titleLang||e.title),1)]),_:2},1024),l(U,{caption:""},{default:t(()=>[y("span",null,s(e.id)+", v"+s(e.version),1),g(y("span",null,[u(", "),y("span",ee,s(a.$t("Update available")+" v"+e.update),1)],512),[[h,e.update]]),g(y("span",null,", "+s(a.$t("Compact Mode"))+" "+s(a.$t("on"))+" ("+s(a.$t("Group")+" "+e.compactGroup)+")",513),[[h,e.runAsCompactMode]])]),_:2},1024)]),_:2},1024),e.mode!=="none"&&e.mode!=="once"?g((i(),v(r,{key:0,side:""},{default:t(()=>[a.loading[e.id]===!0?(i(),v(z,{key:0,color:"primary",size:"21px"})):m("",!0),a.loading[e.id]!==!0&&e.alive!==!1&&e.connectedToHost!==!1&&e.connectedToInstance!==!1?(i(),_("div",ae,[l(n,{color:"positive",name:"mdi-check-circle"}),l(w,null,{default:t(()=>[u(s(a.$t("Adapter")+" "+a.$t("alive")),1)]),_:1})])):m("",!0),a.loading[e.id]!==!0&&e.alive===!1||e.connectedToHost===!1||e.connectedToInstance===!1?(i(),_("div",le,[l(n,{color:"warning",name:"mdi-alert"}),l(w,null,{default:t(()=>[u(s(a.$t("Adapter")+" "+a.$t("not alive")),1)]),_:1})])):m("",!0)]),_:2},1536)),[[h,e.enabled===!0]]):m("",!0),e.mode!=="none"&&e.mode!=="once"?g((i(),v(r,{key:1,side:""},{default:t(()=>[l(n,{name:"mdi-close"}),l(w,null,{default:t(()=>[u(s(a.$t("Adapter")+" "+a.$t("disabled")),1)]),_:1})]),_:2},1536)),[[h,e.enabled===!1]]):m("",!0),a.moduleConfig.switch&&e.mode!=="none"&&e.mode!=="once"&&a.loading[e.id]!==!0?(i(),v(P,{key:2,ref_for:!0,ref:"menu","touch-position":""},{default:t(()=>[l(I,{style:{"min-width":"120px","man-width":"150px"},class:"body"},{default:t(()=>[l(L,{class:J("text-white bg-"+(e.enabled?"positive":"negative"))},{default:t(()=>[l(r,{avatar:""}),l(r,null,{default:t(()=>[u(s(a.$t(e.enabled?"Currently running":"Currently stopped")),1)]),_:2},1024),l(r,{side:""})]),_:2},1032,["class"]),g((i(),v(L,{clickable:"",onClick:A=>a.onSet(e.id,!e.enabled)},{default:t(()=>[l(r,{avatar:""},{default:t(()=>[l(X,{color:e.enabled?"negative":"positive",name:e.enabled?"mdi-pause":"mdi-play"},null,8,["color","name"])]),_:2},1024),l(r,null,{default:t(()=>[u(s(a.$t(e.enabled?"Stop":"Start")+" "+a.$t("Adapter")),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[W]])]),_:2},1024)]),_:2},1536)):m("",!0)]),_:2},1032,["clickable","v-ripple"]))),128))]),_:1}),C,0)}var ue=j(Z,[["render",te]]);export{ue as default};