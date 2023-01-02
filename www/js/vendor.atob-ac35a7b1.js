var u={exports:{}};(function(t){(function(r){function i(e){return typeof e=="function"?e:typeof Buffer=="function"?function(o){//!! Deliberately using an API that's deprecated in node.js because
//!! this file is for browsers and we expect them to cope with it.
//!! Discussion: github.com/node-browser-compat/atob/pull/9
return new Buffer(o,"base64").toString("binary")}:typeof r.base64js=="object"?function(o){var a=r.base64js.b64ToByteArray(o);return Array.prototype.map.call(a,function(b){return String.fromCharCode(b)}).join("")}:function(){throw new Error("You're probably in an old browser or an iOS webworker. It might help to include beatgammit's base64-js.")}}var n=i(r.atob);r.atob=n,t&&t.exports&&(t.exports=n)})(window)})(u);export{u as b};
