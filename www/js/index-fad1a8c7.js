import{Q as I}from"./QToolbarTitle-b2122d67.js";import{Q as H}from"./QTooltip-38559cbf.js";import{bt as U,a4 as F,cp as G,cq as P,cn as R,bw as q,cr as z,cs as K,Q as m,ct as X,k as Y,aG as h,ay as d,W as y,U as p,b1 as r,a2 as n,a1 as L,D as k,b3 as Z,bn as _,bB as v,I as T,aE as x,cu as ee,V as M,bD as te,bQ as W,cv as ie}from"./index-42c3e059.js";import{Q as B}from"./QToolbar-a55f128f.js";import{Q as se,a as oe,b as ne,c as ae}from"./QFooter-820a7260.js";import{Q as re}from"./QHeader-d108cc4a.js";const V=[{id:"devices",title:"Devices",icon:"mdi-devices"},{id:"widgets",title:"Widgets",icon:"mdi-view-grid"},{id:"layout",title:"Layout",icon:"mdi-file"},{id:"styles",title:"Styles",icon:"mdi-code-tags",pro:!0},{id:"scripts",title:"scripts",icon:"mdi-language-javascript",pro:!0},{id:"settings",title:"Settings",icon:"mdi-cog"},{id:"account",title:"Pro-Account",icon:"mdi-star"},{id:"help",title:"Help",icon:"mdi-help-box"}],le=F({name:"ConfigurationLayout",components:{Login:G},setup(){var J,O;P.dev("DEBUG","ConfigurationLayout","setup()");const e=R(),i=q(),c=z(),b=K(),E=m(()=>c.name!=="StylesPage"&&c.name!=="ScriptsPage"&&c.name!=="AccountPage"&&c.name!=="HelpPage");if(e.init({devices:i.devices,layout:Array.isArray(i.layout)&&i.layout.length>0?i.layout:[{id:"2bbbe067-7506-4fac-8a1f-bfbf9f48a9e7",type:"page",icon:"mdi-view-dashboard-variant",title:"Overview",tabs:[{icon:"mdi-desktop-mac-dashboard",title:"Dashboard",id:"674d30a6-83d8-4876-9135-55791d7dfec9",widgetsDesktop:[],widgetsSmartphone:[]}]}],styles:i.styles,scripts:i.scripts,settings:{...i.settings,configTab:((J=e.settings)==null?void 0:J.configTab)||i.settings.configTab},widgets:i.widgets}),c.name==="Configuration"){const s=X(((O=e.settings)==null?void 0:O.configTab)||V[0].id)+"Page";setTimeout(()=>{b.replace({name:s,params:c.params}).catch(t=>console.error(t))},500)}const Q=Y(!1),w=m(()=>i.settings),S=m(()=>e.hasErrors),C=m({get(){var s;return(s=e.settings)==null?void 0:s.configExpertMode},set(s){e.set("settings.configExpertMode",s),s===!1&&e.commitJson()}}),o=m({get(){var s;return(s=e.settings)==null?void 0:s.configTab},set(s){s&&e.set("settings.configTab",s),e.commitJson()}}),$=window.open,j=s=>window.location.href.endsWith("configuration")||window.location.href.endsWith("configuration/")?"/configuration/"+s:s,A=(s,t)=>(P.dev("DEBUG","ConfigurationLayout","setPageContainer",s,t),i.set("pageHeight",t-s),{"min-height":t-s+"px"}),D=s=>{i.set("drawerSidebar",!1),b.push({name:"home",params:{...c.params,tabId:i.getSelectedTabId}}).then(()=>{s&&window.location.reload()}).catch(()=>{})};return{jsonPage:E,hasErrors:S,settings:w,login:Q,version:"3.1.0-alpha.61",configTab:o,expertMode:C,tabs:V,setPageContainer:A,to:j,onOpen:$,onCancel:D,onSave:s=>{e.commitJson();const t={devices:e.devices,widgets:W(e.widgets),layout:W(e.getLayoutWithoutDeletions)||[],styles:e.styles,scripts:e.scripts,settings:e.settings};for(const g in t.widgets)t.widgets[g].items=t.widgets[g].items||[],t.widgets[g].items=t.widgets[g].items.filter(a=>a&&t.devices[a.deviceId]&&(!t.devices[a.deviceId].attributes||t.devices[a.deviceId].attributes&&t.devices[a.deviceId].attributes.deleted!==!0));t.layout.forEach(g=>{g.tabs=g.tabs||[],g.tabs.forEach(a=>{delete a.widgets,a.widgetsDesktop=a.widgetsDesktop||[],a.widgetsDesktop.forEach(l=>{l.items=l.items||[],l.items=l.items.filter(f=>t.widgets[f]&&t.widgets[f]._deleted!==!0)}),a.widgetsSmartphone=a.widgetsSmartphone||[],a.widgetsSmartphone.forEach(l=>{l.items=l.items||[],l.items=l.items.filter(f=>t.widgets[f]&&t.widgets[f]._deleted!==!0)})})}),t.devices=e.getDevicesWithoutDeletions,t.widgets=e.getWidgetsWithoutDeletions;const u={};let N=!1;JSON.stringify(i.devices)!==JSON.stringify(t.devices)&&(u.devices=t.devices),JSON.stringify(i.widgets)!==JSON.stringify(t.widgets)&&(u.widgets=t.widgets),JSON.stringify(i.layout)!==JSON.stringify(t.layout)&&(u.layout=t.layout),JSON.stringify(i.settings)!==JSON.stringify(t.settings)&&(u.settings=t.settings),JSON.stringify(i.styles)!==JSON.stringify(t.styles)&&(u.styles=t.styles),JSON.stringify(i.scripts)!==JSON.stringify(t.scripts)&&(u.scripts=t.scripts,N=!0),e.save(u),s?D(N):e.init(t)}}}}),de={key:1};function ce(e,i,c,b,E,Q){const w=h("icon"),S=h("Login"),C=h("router-view");return d(),y(T,null,[!e.settings.secureConfiguration||e.settings.secureConfiguration&&e.login?(d(),p(re,{key:0},{default:r(()=>[n(B,null,{default:r(()=>[n(I,null,{default:r(()=>[n(w,{name:"mdi-cog",vAlign:"middle"}),L(" "+k(e.$t("Configuration"))+" (v"+k(e.version)+") ",1)]),_:1}),Z(n(v,{flat:"",dense:"",round:"",icon:e.expertMode?"mdi-code-tags-check":"mdi-code-tags","aria-label":"$t('Expert Mode')",onClick:i[0]||(i[0]=o=>e.expertMode=!e.expertMode)},{default:r(()=>[n(H,null,{default:r(()=>[L(k(e.$t("Expert Mode")),1)]),_:1})]),_:1},8,["icon"]),[[_,e.jsonPage]])]),_:1}),n(ee,{modelValue:e.configTab,"onUpdate:modelValue":i[1]||(i[1]=o=>e.configTab=o),"inline-label":"",dense:"","outside-arrows":"","mobile-arrows":"",align:"left"},{default:r(()=>[(d(!0),y(T,null,x(e.tabs,o=>(d(),y(T,null,[o.link?(d(),p(ie,{key:o.id,name:o.id,label:e.$t(o.title),icon:o.icon,onClick:$=>e.onOpen(o.link,"_blank")},null,8,["name","label","icon","onClick"])):(d(),p(ae,{key:o.id,name:o.id,label:e.$t(o.title),icon:o.icon,to:e.to(o.id)},null,8,["name","label","icon","to"]))],64))),256))]),_:1},8,["modelValue"])]),_:1})):M("",!0),n(oe,{class:"jarvis-configuration body"},{default:r(()=>[n(se,{"style-fn":e.setPageContainer},{default:r(()=>[e.settings.secureConfigurationType&&!e.login?(d(),p(S,{key:0,ns:"secureConfiguration",onOnSuccess:i[2]||(i[2]=o=>e.login=!0)})):(d(),y("div",de,[n(C)]))]),_:1},8,["style-fn"])]),_:1}),!e.settings.secureConfiguration||e.settings.secureConfiguration&&e.login?(d(),p(ne,{key:1},{default:r(()=>[n(B,null,{default:r(()=>[n(v,{flat:"",icon:"mdi-window-close","aria-label":"Cancel",label:e.$t("Cancel"),class:"text-red",onClick:e.onCancel},null,8,["label","onClick"]),n(te),n(v,{disable:e.hasErrors,icon:"mdi-content-save","aria-label":"Save",label:e.$t("Save"),flat:"",color:"primary",onClick:i[3]||(i[3]=o=>e.onSave(!1)),style:{"margin-right":"8px"}},null,8,["disable","label"]),n(v,{disable:e.hasErrors,icon:"mdi-content-save","aria-label":"Save & Exit",label:e.$t("Save")+" & "+e.$t("Exit"),color:"primary",onClick:i[4]||(i[4]=o=>e.onSave(!0))},null,8,["disable","label"])]),_:1})]),_:1})):M("",!0)],64)}var be=U(le,[["render",ce]]);export{be as default};