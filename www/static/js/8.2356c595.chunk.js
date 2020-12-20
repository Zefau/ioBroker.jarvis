(this.webpackJsonpjarvis=this.webpackJsonpjarvis||[]).push([[8],{2069:function(e,t,n){"use strict";n.r(t),t.default={"#introduction.title":"Willkommen zu jarvis","#introduction.content":"jarvis ist eine Material Design Visualisierung, die auf [Material UI](https://material-ui.com/) basiert. jarvis gibt eine Struktur und Module vor, die zur Visualisierung genutzt werden, aber sehr flexibel konfiguriert werden k\xf6nnen.\n\rjarvis ist [*responsive*](https://de.wikipedia.org/wiki/Responsive_Webdesign) und passt sich der Gr\xf6\xdfe des Screens an.\n\rDas Layout ist flexibel konfigurierbar. Es k\xf6nnen optional (beliebig viele) Tabs verwendet werden. Jeder Tab kann entweder `fullscreen` sein oder beliebig viele `columns` haben, die die einzelnen `modules` in flexibler Reihenfolge beinhalten.\n\rJedes Modul hat spezielle Konfigurationsm\xf6glichkeiten ([siehe Wiki je Modul](https://github.com/Zefau/ioBroker.jarvis/wiki/de-Modules#liste-der-module)).","#settings.title":"Die erste jarvis erstellen","#settings.content":"Direkt nach der Installation sieht dein jarvis nat\xfcrlich noch sehr leer aus. \xdcber das Zahnrad kannst du deine jarvis erstellen.\n\nWenn du m\xf6chtest, kann eine erste Visualisierung automatisch auf Basis deiner Ger\xe4te generiert werden? Diese kann im Nachgang nat\xfcrlich frei bearbeitet werden.","#settings.buttons.manually":"manuell erstellen","#settings.buttons.automatically":"automatisch generieren","#jarvis.title":"Suche Ger\xe4te und erstelle jarvis..."}},2070:function(e,t,n){"use strict";n.r(t),t.default={"#introduction.title":"Welcome to jarvis","#introduction.content":""}},2178:function(e,t,n){var a={"./de":2069,"./de.js":2069,"./en":2070,"./en.js":2070};function i(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}i.keys=function(){return Object.keys(a)},i.resolve=r,e.exports=i,i.id=2178},2238:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return N}));var a=n(8),i=n(16),r=n(0),o=n.n(r),s=n(2213),c=n(9),l=n(2223),u=n(63),d=n(35),m=n(15),p=[{target:"body",placement:"center",title:"#introduction.title",content:"#introduction.content"},{target:"#SettingsButton",title:"#settings.title",content:"#settings.content",secondaryButton:"#settings.buttons.manually",secondaryAction:function(e){e.setRun(!1),document.getElementById("SettingsButton").click()},primaryButton:"#settings.buttons.automatically",primaryAction:function(e){var t={};d.a.importDevices(u.a.get("DEFAULT_ADAPTERIMPORT")).then((function(n){n.forEach((function(e){if("fulfilled"===e.status){var n=e.value;t[n.function]=t[n.function]||[],t[n.function].push(n)}})),console.log(t),e.setStep(3)})).catch((function(e){m.a._("Joyride","IMPORT_DEVICES: "+e.message,"error")}))}},{target:"body",placement:"center",title:"#jarvis.title",content:o.a.createElement(l.a,null),buttons:!1},{target:"body",placement:"center",title:"ok",content:"#ok"}],g=n(5),b=n(92),f=n(2036),v=n(91),h=n(42),y=n(169),E=n.n(y),j=n(67),k=Object(j.a)((function(e){return{button:{marginLeft:e.spacing()},grow:{flexGrow:1},content:{"& p":{margin:"0 0 18px",lineHeight:"1.42857143"}},closeButton:{top:e.spacing(1),color:"#9e9e9e",right:"8px",position:"absolute"},closeButtonOnArrow:{top:e.spacing(3)},CardTitle:{display:"flex",margin:0,padding:"16px 24px",flex:"0 0 auto"},CardContent:{minWidth:350,padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)},CardActions:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"}}})),O=new(n(2060)),x=function(e){var t=e.children,n=k();return o.a.createElement("div",{className:n.CardTitle},t)},w=function(e){var t=e.children,n=k();return o.a.createElement("div",{className:n.CardContent},t)},B=function(e){var t=e.children,n=k();return o.a.createElement("div",{className:n.CardActions},t)};function N(e){var t=Object(r.useState)(e.run||!1),n=Object(i.a)(t,2),l=n[0],u=n[1],d=Object(r.useState)(0),m=Object(i.a)(d,2),y=m[0],j=m[1];return o.a.createElement(s.d,{callback:function(e){var t=e.action,n=e.index,a=e.status,i=e.type;[s.b.STEP_AFTER,s.b.TARGET_NOT_FOUND].includes(i)?j(n+(t===s.a.PREV?-1:1)):[s.c.FINISHED,s.c.SKIPPED].includes(a)},continuous:!0,disableOverlayClose:!0,run:l,stepIndex:y,steps:p,tooltipComponent:function(e){return function(e){var t=e.continuous,n=e.index,i=e.step,r=e.isLastStep,s=e.backProps,l=e.skipProps,u=e.closeProps,d=e.primaryProps,m=e.tooltipProps,p=k(),y=Object(a.a)(Object(a.a)({},d),{},{onClick:function(t){i.primaryAction&&i.primaryAction(e),d.onClick(t)}}),j="string"===typeof i.content?o.a.createElement("div",{className:p.content,dangerouslySetInnerHTML:{__html:O.render(c.a.t(i.content))}}):o.a.createElement("div",{className:p.content},i.content);return o.a.createElement(f.a,Object.assign({},m,{open:!0}),o.a.createElement(x,null,o.a.createElement(h.a,{variant:"h6",style:{margin:"auto 0"}},c.a.t(i.title)),o.a.createElement("div",{className:p.grow}),o.a.createElement(v.a,Object.assign({classes:{root:Object(g.a)(p.closeButton,(i.target.indexOf(".")>-1||i.target.indexOf("#")>-1)&&p.closeButtonOnArrow)}},l),o.a.createElement(E.a,null))),o.a.createElement(w,{dividers:!0},j),!1!==i.buttons&&o.a.createElement(B,null,n>0&&o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a,Object.assign({className:p.button,color:"secondary"},s),c.a.t("back")),o.a.createElement("div",{className:p.grow})),!i.primaryButton&&t&&o.a.createElement(b.a,Object.assign({className:p.button,color:"primary",variant:"contained"},d),c.a.t(r?"close":"next")),!i.primaryButton&&!t&&o.a.createElement(b.a,Object.assign({className:p.button},u),c.a.t("close")),i.secondaryButton&&o.a.createElement(b.a,{className:p.button,color:"primary",variant:"text",onClick:i.secondaryAction&&function(){return i.secondaryAction(e)}},c.a.t(i.secondaryButton)),i.primaryButton&&o.a.createElement(b.a,Object.assign({className:p.button,color:"primary",variant:"contained"},y),c.a.t(i.primaryButton))))}(Object(a.a)(Object(a.a)({},e),{},{setStep:j,setRun:u}))}})}c.a.setTranslations((function(e){return n(2178)("./"+e)}))}}]);
//# sourceMappingURL=8.2356c595.chunk.js.map