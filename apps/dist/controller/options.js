(()=>{var p="__qrcodeAutoPaste",d="__qrcodeAutoJump",r="__qrcodeAutoCopy";var T=t=>t.type.includes("image"),x=()=>{chrome.runtime.openOptionsPage(),window.close()},B=(t,e)=>{let n;return function(...a){n&&clearTimeout(n),n=setTimeout(()=>{t.apply(this,a)},e)}},v=t=>fetch(t).then(e=>e.blob()),h=t=>{let e=document.createElement("canvas");return e.width=t.width,e.height=t.height,e.getContext("2d").drawImage(t,0,0),e},y=t=>{let e=["image/webp","image/jpeg","image/png"],n="image/png";return t.toDataURL(n)},w=t=>{try{return y(h(t))}catch(e){return null}},c=t=>typeof t=="boolean"?t:typeof t=="string"?t==="true":!1;var i=class{save(e,n){localStorage.setItem(e,n)}getValue(e){return localStorage.getItem(e)}initialSave(e,n){this.getValue(e)===null&&this.save(e,n)}};var o=class extends i{constructor(n){super();this.configs=n,this.getValue(r)===null&&this.setDefault()}static getInstance(n){return o.instance||(o.instance=new o(n)),o.instance}add(n,a,s){this.configs.push({type:n,defaultValue:a,postHandle:s})}emit(n,...a){c(this.getValue(n))&&this.configs.forEach(s=>{s.type===n&&s.postHandle(...a)})}setDefault(){this.configs.forEach(n=>{this.initialSave(n.type,n.defaultValue)})}};var g=o.getInstance(),u=new bootstrap.Modal(document.getElementById("modal"),{keyboard:!0});u.show(),u.hide=()=>{window.close()},document.getElementById("confirm").addEventListener("click",()=>{u.hide()});var l=(t,e)=>{t.checked=c(g.getValue(e)),t.addEventListener("change",n=>{let a=n.target.checked;g.save(e,a)})},m=(t,e)=>{new bootstrap.Tooltip(t,{title:e})},f=document.getElementById("autoPasteEl"),E=document.getElementById("autoCopyEl"),I=document.getElementById("autoJump");l(f,p),l(E,r),l(I,d),m(document.getElementById("tip1"),"\u53EF\u5B9E\u73B0\u590D\u5236\u4E8C\u7EF4\u7801\u540E\uFF0C\u6253\u5F00\u63D2\u4EF6\u5C31\u80FD\u81EA\u52A8\u89E3\u6790\u4E8C\u7EF4\u7801\u5185\u5BB9\uFF0C\u7701\u53BB\u624B\u52A8\u7C98\u8D34\u4E8C\u7EF4\u7801\u8FC7\u7A0B"),m(document.getElementById("tip2"),"\u89E3\u6790\u4E8C\u7EF4\u7801\u540E\u81EA\u52A8\u590D\u5236\u4E8C\u7EF4\u7801\u5185\u5BB9\u5230\u526A\u5207\u677F\uFF0C\u4E0D\u4F1A\u590D\u5236\u591A\u4F59\u5185\u5BB9\uFF0C\u6587\u672C\u6846\u591A\u4F59\u5185\u5BB9\u662F\u4E3A\u4E86\u63D0\u793A\u7528\u6237"),m(document.getElementById("tip3"),"\u89E3\u6790\u4E8C\u7EF4\u7801\u5982\u679C\u4E3A\u94FE\u63A5\uFF0C\u53EF\u4EE5\u81EA\u52A8\u6253\u5F00\u94FE\u63A5");})();
