import{_ as Q,q as S,dh as w,c as p,d8 as B,dy as I,a4 as h,z as M,cl as A,j as N,o as d,d as P,K as b,a2 as k,k as n,d0 as T,w as i,i as m,t as u,Q as c,a as g,e as V,f as j,n as $,dq as D,d5 as E,cG as F}from"./index-608510c8.js";import{Q as O,b as y,c as q}from"./QTable-eba194c0.js";import"./QVirtualScroll-0ac389a1.js";const H=S({name:"ModuleAdapterLogs",props:["widget","_containerSize"],setup(a){const v=D.getConnection,_=w(),C=p(()=>a.widget.config),o=p(()=>({...B.joinConfig(C.value,I)})),z=[{name:"from",field:"from",label:"Adapter",align:"left",sortable:!0},{name:"ts",field:"ts",label:"Time",align:"left",sortable:!0},{name:"severity",field:"severity",label:"Severity",align:"left",sortable:!0},{name:"message",field:"message",label:"Message",align:"left",sortable:!1}],l=e=>!(!o.value.adapters.includes(e.from)||!o.value.severity.includes(e.severity)||o.value.message&&RegExp(o.value.message,"gi").test(e.message)),t=(e,r)=>(e.from.startsWith("host.")||e.from,e.raw=e.message,e._id=E(),e.ts=Number.isInteger(e.ts)?F(e.ts,o.value.timeFormat||"dd.MM.yyyy HH:mm:ss"):e.ts,e.icon=r[e.from]&&r[e.from].extIcon?"img:"+r[e.from].extIcon:"",e.message=e.message.replace(e.from,""),e.message=e.message.indexOf(") ")!==-1?e.message.substr(e.message.indexOf(") ")+2):e.message,e),x=h(!1),L=h(null),f=h();return M(()=>{const e=_.instances.val||{};v.getLogs("current").then(r=>{f.value=r.filter(s=>l(s)).map(s=>t(s,e)),A.getInstance().on("message",s=>{l(s)&&f.value.unshift(t(s,e))}),v.on("_log",s=>{l(s)&&f.value.unshift(t(s,e))})}).catch(r=>{console.error(r),L.value=r.message||r}).finally(()=>{x.value=!0})},{flush:"post"}),{moduleConfig:o,columns:z,columnsVisible:["from","ts","severity","message"],pagination:p(()=>({sortBy:o.value.sortColumn,descending:o.value.sortDirection,rowsPerPage:o.value.rowsPerPage})),loaded:x,error:L,logs:f}}});function G(a,v,_,C,o,z){const l=N("alert");return d(),P("div",{key:a.widget.revision,class:"jarvis-AdapterLogs",style:$({height:a._containerSize.height+"px"})},[b(n(T,{indeterminate:""},null,512),[[k,!a.loaded&&!a.error]]),b(n(l,null,{default:i(()=>[m(u(a.error),1)]),_:1},512),[[k,a.loaded&&a.error]]),b(n(q,{rows:a.logs,flat:"",dense:a.moduleConfig.dense,pagination:a.pagination,"binary-state-sort":"",columns:a.columns,"row-key":"_id","visible-columns":a.columnsVisible,class:"sticky-table-header full-height"},{body:i(({row:t})=>[n(O,null,{default:i(()=>[n(y,null,{default:i(()=>[n(c,{name:t.icon},null,8,["name"]),m(" \xA0"+u(t.from),1)]),_:2},1024),n(y,null,{default:i(()=>[m(u(t.ts),1)]),_:2},1024),n(y,null,{default:i(()=>[t.severity==="info"?(d(),g(c,{key:0,size:"xs",name:"mdi-information",color:"blue"})):t.severity==="warn"?(d(),g(c,{key:1,size:"xs",name:"mdi-alert-box",color:"warning"})):t.severity==="error"?(d(),g(c,{key:2,size:"xs",name:"mdi-close-box",color:"negative"})):(d(),g(c,{key:3,size:"xs",name:"mdi-bug",color:"grey"})),V("span",{style:{"margin-left":"4px"},class:j("text-"+(t.severity==="info"?"primary":t.severity==="warn"?"warning":t.severity==="error"?"negative":"grey"))},u(t.severity),3)]),_:2},1024),n(y,null,{default:i(()=>[m(u(typeof t.message=="object"?JSON.stringify(t.message):t.message),1)]),_:2},1024)]),_:2},1024)]),_:1},8,["rows","dense","pagination","columns","visible-columns"]),[[k,a.loaded&&!a.error]])],4)}var W=Q(H,[["render",G]]);export{W as default};