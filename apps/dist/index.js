(()=>{var ft=Object.create;var j=Object.defineProperty;var gt=Object.getOwnPropertyDescriptor;var ct=Object.getOwnPropertyNames;var pt=Object.getPrototypeOf,dt=Object.prototype.hasOwnProperty;var mt=(l,a)=>()=>(a||l((a={exports:{}}).exports,a),a.exports);var vt=(l,a,s,p)=>{if(a&&typeof a=="object"||typeof a=="function")for(let m of ct(a))!dt.call(l,m)&&m!==s&&j(l,m,{get:()=>a[m],enumerable:!(p=gt(a,m))||p.enumerable});return l};var _t=(l,a,s)=>(s=l!=null?ft(pt(l)):{},vt(a||!l||!l.__esModule?j(s,"default",{value:l,enumerable:!0}):s,l));var R=(l,a,s)=>new Promise((p,m)=>{var c=E=>{try{_(s.next(E))}catch(w){m(w)}},f=E=>{try{_(s.throw(E))}catch(w){m(w)}},_=E=>E.done?p(E.value):Promise.resolve(E.value).then(c,f);_((s=s.apply(l,a)).next())});var ut=mt((Xt,st)=>{(function(l){"use strict";l.exports.is_uri=s,l.exports.is_http_uri=p,l.exports.is_https_uri=m,l.exports.is_web_uri=c,l.exports.isUri=s,l.exports.isHttpUri=p,l.exports.isHttpsUri=m,l.exports.isWebUri=c;var a=function(f){var _=f.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);return _};function s(f){if(!!f&&!/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(f)&&!/%[^0-9a-f]/i.test(f)&&!/%[0-9a-f](:?[^0-9a-f]|$)/i.test(f)){var _=[],E="",w="",C="",y="",b="",D="";if(_=a(f),E=_[1],w=_[2],C=_[3],y=_[4],b=_[5],!!(E&&E.length&&C.length>=0)){if(w&&w.length){if(!(C.length===0||/^\//.test(C)))return}else if(/^\/\//.test(C))return;if(!!/^[a-z][a-z0-9\+\-\.]*$/.test(E.toLowerCase()))return D+=E+":",w&&w.length&&(D+="//"+w),D+=C,y&&y.length&&(D+="?"+y),b&&b.length&&(D+="#"+b),D}}}function p(f,_){if(!!s(f)){var E=[],w="",C="",y="",b="",D="",P="",M="";if(E=a(f),w=E[1],C=E[2],y=E[3],D=E[4],P=E[5],!!w){if(_){if(w.toLowerCase()!="https")return}else if(w.toLowerCase()!="http")return;if(!!C)return/:(\d+)$/.test(C)&&(b=C.match(/:(\d+)$/)[0],C=C.replace(/:\d+$/,"")),M+=w+":",M+="//"+C,b&&(M+=b),M+=y,D&&D.length&&(M+="?"+D),P&&P.length&&(M+="#"+P),M}}}function m(f){return p(f,!0)}function c(f){return p(f)||m(f)}})(st)});var N;(function(){function l(t){this.mode=s.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var n=[],i=this.data.charCodeAt(e);i>65536?(n[0]=240|(i&1835008)>>>18,n[1]=128|(i&258048)>>>12,n[2]=128|(i&4032)>>>6,n[3]=128|i&63):i>2048?(n[0]=224|(i&61440)>>>12,n[1]=128|(i&4032)>>>6,n[2]=128|i&63):i>128?(n[0]=192|(i&1984)>>>6,n[1]=128|i&63):n[0]=i,this.parsedData.push(n)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}l.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}};function a(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}a.prototype={addData:function(t){var e=new l(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),this.dataCache==null&&(this.dataCache=a.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(0<=r&&r<=6&&(n==0||n==6)||0<=n&&n<=6&&(r==0||r==6)||2<=r&&r<=4&&2<=n&&n<=4?this.modules[t+r][e+n]=!0:this.modules[t+r][e+n]=!1)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=c.getLostPoint(this);(r==0||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){var n=t.createEmptyMovieClip(e,r),i=1;this.make();for(var u=0;u<this.modules.length;u++)for(var h=u*i,o=0;o<this.modules[u].length;o++){var g=o*i,v=this.modules[u][o];v&&(n.beginFill(0,100),n.moveTo(g,h),n.lineTo(g+i,h),n.lineTo(g+i,h+i),n.lineTo(g,h+i),n.endFill())}return n},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)this.modules[t][6]==null&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)this.modules[6][e]==null&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=c.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],i=t[r];if(this.modules[n][i]==null)for(var u=-2;u<=2;u++)for(var h=-2;h<=2;h++)u==-2||u==2||h==-2||h==2||u==0&&h==0?this.modules[n+u][i+h]=!0:this.modules[n+u][i+h]=!1}},setupTypeNumber:function(t){for(var e=c.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&(e>>r&1)==1;this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(var r=0;r<18;r++){var n=!t&&(e>>r&1)==1;this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=c.getBCHTypeInfo(r),i=0;i<15;i++){var u=!t&&(n>>i&1)==1;i<6?this.modules[i][8]=u:i<8?this.modules[i+1][8]=u:this.modules[this.moduleCount-15+i][8]=u}for(var i=0;i<15;i++){var u=!t&&(n>>i&1)==1;i<8?this.modules[8][this.moduleCount-i-1]=u:i<9?this.modules[8][15-i-1+1]=u:this.modules[8][15-i-1]=u}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,i=7,u=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var o=0;o<2;o++)if(this.modules[n][h-o]==null){var g=!1;u<t.length&&(g=(t[u]>>>i&1)==1);var v=c.getMask(e,n,h-o);v&&(g=!g),this.modules[n][h-o]=g,i--,i==-1&&(u++,i=7)}if(n+=r,n<0||this.moduleCount<=n){n-=r,r=-r;break}}}},a.PAD0=236,a.PAD1=17,a.createData=function(t,e,r){for(var n=w.getRSBlocks(t,e),i=new C,u=0;u<r.length;u++){var h=r[u];i.put(h.mode,4),i.put(h.getLength(),c.getLengthInBits(h.mode,t)),h.write(i)}for(var o=0,u=0;u<n.length;u++)o+=n[u].dataCount;if(i.getLengthInBits()>o*8)throw new Error("code length overflow. ("+i.getLengthInBits()+">"+o*8+")");for(i.getLengthInBits()+4<=o*8&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=o*8||(i.put(a.PAD0,8),i.getLengthInBits()>=o*8));)i.put(a.PAD1,8);return a.createBytes(i,n)},a.createBytes=function(t,e){for(var r=0,n=0,i=0,u=new Array(e.length),h=new Array(e.length),o=0;o<e.length;o++){var g=e[o].dataCount,v=e[o].totalCount-g;n=Math.max(n,g),i=Math.max(i,v),u[o]=new Array(g);for(var d=0;d<u[o].length;d++)u[o][d]=255&t.buffer[d+r];r+=g;var T=c.getErrorCorrectPolynomial(v),I=new E(u[o],T.getLength()-1),x=I.mod(T);h[o]=new Array(T.getLength()-1);for(var d=0;d<h[o].length;d++){var L=d+x.getLength()-h[o].length;h[o][d]=L>=0?x.get(L):0}}for(var A=0,d=0;d<e.length;d++)A+=e[d].totalCount;for(var k=new Array(A),H=0,d=0;d<n;d++)for(var o=0;o<e.length;o++)d<u[o].length&&(k[H++]=u[o][d]);for(var d=0;d<i;d++)for(var o=0;o<e.length;o++)d<h[o].length&&(k[H++]=h[o][d]);return k};for(var s={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3},p={L:1,M:0,Q:3,H:2},m={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},c={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,G18:1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,G15_MASK:1<<14|1<<12|1<<10|1<<4|1<<1,getBCHTypeInfo:function(t){for(var e=t<<10;c.getBCHDigit(e)-c.getBCHDigit(c.G15)>=0;)e^=c.G15<<c.getBCHDigit(e)-c.getBCHDigit(c.G15);return(t<<10|e)^c.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;c.getBCHDigit(e)-c.getBCHDigit(c.G18)>=0;)e^=c.G18<<c.getBCHDigit(e)-c.getBCHDigit(c.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;t!=0;)e++,t>>>=1;return e},getPatternPosition:function(t){return c.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case m.PATTERN000:return(e+r)%2==0;case m.PATTERN001:return e%2==0;case m.PATTERN010:return r%3==0;case m.PATTERN011:return(e+r)%3==0;case m.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case m.PATTERN101:return e*r%2+e*r%3==0;case m.PATTERN110:return(e*r%2+e*r%3)%2==0;case m.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new E([1],0),r=0;r<t;r++)e=e.multiply(new E([1,f.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case s.MODE_NUMBER:return 10;case s.MODE_ALPHA_NUM:return 9;case s.MODE_8BIT_BYTE:return 8;case s.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case s.MODE_NUMBER:return 12;case s.MODE_ALPHA_NUM:return 11;case s.MODE_8BIT_BYTE:return 16;case s.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else if(e<41)switch(t){case s.MODE_NUMBER:return 14;case s.MODE_ALPHA_NUM:return 13;case s.MODE_8BIT_BYTE:return 16;case s.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}else throw new Error("type:"+e)},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var i=0;i<e;i++){for(var u=0,h=t.isDark(n,i),o=-1;o<=1;o++)if(!(n+o<0||e<=n+o))for(var g=-1;g<=1;g++)i+g<0||e<=i+g||o==0&&g==0||h==t.isDark(n+o,i+g)&&u++;u>5&&(r+=3+u-5)}for(var n=0;n<e-1;n++)for(var i=0;i<e-1;i++){var v=0;t.isDark(n,i)&&v++,t.isDark(n+1,i)&&v++,t.isDark(n,i+1)&&v++,t.isDark(n+1,i+1)&&v++,(v==0||v==4)&&(r+=3)}for(var n=0;n<e;n++)for(var i=0;i<e-6;i++)t.isDark(n,i)&&!t.isDark(n,i+1)&&t.isDark(n,i+2)&&t.isDark(n,i+3)&&t.isDark(n,i+4)&&!t.isDark(n,i+5)&&t.isDark(n,i+6)&&(r+=40);for(var i=0;i<e;i++)for(var n=0;n<e-6;n++)t.isDark(n,i)&&!t.isDark(n+1,i)&&t.isDark(n+2,i)&&t.isDark(n+3,i)&&t.isDark(n+4,i)&&!t.isDark(n+5,i)&&t.isDark(n+6,i)&&(r+=40);for(var d=0,i=0;i<e;i++)for(var n=0;n<e;n++)t.isDark(n,i)&&d++;var T=Math.abs(100*d/e/e-50)/5;return r+=T*10,r}},f={glog:function(t){if(t<1)throw new Error("glog("+t+")");return f.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return f.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},_=0;_<8;_++)f.EXP_TABLE[_]=1<<_;for(var _=8;_<256;_++)f.EXP_TABLE[_]=f.EXP_TABLE[_-4]^f.EXP_TABLE[_-5]^f.EXP_TABLE[_-6]^f.EXP_TABLE[_-8];for(var _=0;_<255;_++)f.LOG_TABLE[f.EXP_TABLE[_]]=_;function E(t,e){if(t.length==null)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&t[r]==0;)r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}E.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<t.getLength();n++)e[r+n]^=f.gexp(f.glog(this.get(r))+f.glog(t.get(n)));return new E(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=f.glog(this.get(0))-f.glog(t.get(0)),r=new Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(var n=0;n<t.getLength();n++)r[n]^=f.gexp(f.glog(t.get(n))+e);return new E(r,0).mod(t)}};function w(t,e){this.totalCount=t,this.dataCount=e}w.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],w.getRSBlocks=function(t,e){var r=w.getRsBlockTable(t,e);if(r==null)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=[],u=0;u<n;u++)for(var h=r[u*3+0],o=r[u*3+1],g=r[u*3+2],v=0;v<h;v++)i.push(new w(o,g));return i},w.getRsBlockTable=function(t,e){switch(e){case p.L:return w.RS_BLOCK_TABLE[(t-1)*4+0];case p.M:return w.RS_BLOCK_TABLE[(t-1)*4+1];case p.Q:return w.RS_BLOCK_TABLE[(t-1)*4+2];case p.H:return w.RS_BLOCK_TABLE[(t-1)*4+3];default:return}};function C(){this.buffer=[],this.length=0}C.prototype={get:function(t){var e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)==1},put:function(t,e){for(var r=0;r<e;r++)this.putBit((t>>>e-r-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var y=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function b(){return typeof CanvasRenderingContext2D!="undefined"}function D(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var r=e.toString().match(/android ([0-9]\.[0-9])/i);r&&r[1]&&(t=parseFloat(r[1]))}return t}var P=function(){var t=function(e,r){this._el=e,this._htOption=r};return t.prototype.draw=function(e){var r=this._htOption,n=this._el,i=e.getModuleCount(),u=Math.floor(r.width/i),h=Math.floor(r.height/i);this.clear();function o(I,x){var L=document.createElementNS("http://www.w3.org/2000/svg",I);for(var A in x)x.hasOwnProperty(A)&&L.setAttribute(A,x[A]);return L}var g=o("svg",{viewBox:"0 0 "+String(i)+" "+String(i),width:"100%",height:"100%",fill:r.colorLight});g.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),n.appendChild(g),g.appendChild(o("rect",{fill:r.colorLight,width:"100%",height:"100%"})),g.appendChild(o("rect",{fill:r.colorDark,width:"1",height:"1",id:"template"}));for(var v=0;v<i;v++)for(var d=0;d<i;d++)if(e.isDark(v,d)){var T=o("use",{x:String(v),y:String(d)});T.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),g.appendChild(T)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),M=document.documentElement.tagName.toLowerCase()==="svg",Z=M?P:b()?function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(this._android&&this._android<=2.1){var e=1/window.devicePixelRatio,r=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(u,h,o,g,v,d,T,I,x){if("nodeName"in u&&/img/i.test(u.nodeName))for(var L=arguments.length-1;L>=1;L--)arguments[L]=arguments[L]*e;else typeof I=="undefined"&&(arguments[1]*=e,arguments[2]*=e,arguments[3]*=e,arguments[4]*=e);r.apply(this,arguments)}}function n(u,h){var o=this;if(o._fFail=h,o._fSuccess=u,o._bSupportDataURI===null){var g=document.createElement("img"),v=function(){o._bSupportDataURI=!1,o._fFail&&o._fFail.call(o)},d=function(){o._bSupportDataURI=!0,o._fSuccess&&o._fSuccess.call(o)};g.onabort=v,g.onerror=v,g.onload=d,g.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";return}else o._bSupportDataURI===!0&&o._fSuccess?o._fSuccess.call(o):o._bSupportDataURI===!1&&o._fFail&&o._fFail.call(o)}var i=function(u,h){this._bIsPainted=!1,this._android=D(),this._htOption=h,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=h.width,this._elCanvas.height=h.height,u.appendChild(this._elCanvas),this._el=u,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return i.prototype.draw=function(u){var h=this._elImage,o=this._oContext,g=this._htOption,v=u.getModuleCount(),d=g.width/v,T=g.height/v,I=Math.round(d),x=Math.round(T);h.style.display="none",this.clear();for(var L=0;L<v;L++)for(var A=0;A<v;A++){var k=u.isDark(L,A),H=A*d,X=L*T;o.strokeStyle=k?g.colorDark:g.colorLight,o.lineWidth=1,o.fillStyle=k?g.colorDark:g.colorLight,o.fillRect(H,X,d,T),o.strokeRect(Math.floor(H)+.5,Math.floor(X)+.5,I,x),o.strokeRect(Math.ceil(H)-.5,Math.ceil(X)-.5,I,x)}this._bIsPainted=!0},i.prototype.makeImage=function(){this._bIsPainted&&n.call(this,t)},i.prototype.isPainted=function(){return this._bIsPainted},i.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},i.prototype.round=function(u){return u&&Math.floor(u*1e3)/1e3},i}():function(){var t=function(e,r){this._el=e,this._htOption=r};return t.prototype.draw=function(e){for(var r=this._htOption,n=this._el,i=e.getModuleCount(),u=Math.floor(r.width/i),h=Math.floor(r.height/i),o=['<table style="border:0;border-collapse:collapse;">'],g=0;g<i;g++){o.push("<tr>");for(var v=0;v<i;v++)o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+u+"px;height:"+h+"px;background-color:"+(e.isDark(g,v)?r.colorDark:r.colorLight)+';"></td>');o.push("</tr>")}o.push("</table>"),n.innerHTML=o.join("");var d=n.childNodes[0],T=(r.width-d.offsetWidth)/2,I=(r.height-d.offsetHeight)/2;T>0&&I>0&&(d.style.margin=I+"px "+T+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}();function lt(t,e){for(var r=1,n=ht(t),i=0,u=y.length;i<=u;i++){var h=0;switch(e){case p.L:h=y[i][0];break;case p.M:h=y[i][1];break;case p.Q:h=y[i][2];break;case p.H:h=y[i][3];break}if(n<=h)break;r++}if(r>y.length)throw new Error("Too long data");return r}function ht(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}N=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:p.H},typeof e=="string"&&(e={text:e}),e)for(var r in e)this._htOption[r]=e[r];typeof t=="string"&&(t=document.getElementById(t)),this._htOption.useSVG&&(Z=P),this._android=D(),this._el=t,this._oQRCode=null,this._oDrawing=new Z(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},N.prototype.makeCode=function(t){this._oQRCode=new a(lt(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},N.prototype.makeImage=function(){typeof this._oDrawing.makeImage=="function"&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},N.prototype.clear=function(){this._oDrawing.clear()},N.CorrectLevel=p})();var q=N;var U=class{constructor(a){this.container=a}buildQrcode(a){this.container.innerHTML="";try{new q(this.container,{text:a,width:260,height:260})}catch(s){this.container.innerHTML="\u751F\u6210\u4E8C\u7EF4\u7801\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u5185\u5BB9\u662F\u5426\u6B63\u786E"}}};var Bt=l=>l.type.includes("image"),tt=()=>{chrome.runtime.openOptionsPage(),window.close()},et=(l,a)=>{let s;return function(...p){s&&clearTimeout(s),s=setTimeout(()=>{l.apply(this,p)},a)}},rt=l=>fetch(l).then(a=>a.blob()),Et=l=>{let a=document.createElement("canvas");return a.width=l.width,a.height=l.height,a.getContext("2d").drawImage(l,0,0),a},wt=l=>{let a=["image/webp","image/jpeg","image/png"],s="image/png";return l.toDataURL(s)},bt=l=>{try{return wt(Et(l))}catch(a){return null}},nt=l=>typeof l=="boolean"?l:typeof l=="string"?l==="true":!1;var S=document.getElementById("copyQrcode"),J=document.getElementById("urlConiner"),it=new U(document.getElementById("qrcodeWrap"));S.addEventListener("click",()=>{let l=document.querySelector("#qrcodeWrap img"),a=rt(l.src),s=new ClipboardItem({"image/png":a});navigator.clipboard?(navigator.clipboard.write([s]),S.innerHTML="\u5DF2\u590D\u5236"):S.innerHTML="\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236"}),S.addEventListener("blur",()=>{S.innerHTML="\u590D\u5236\u4E8C\u7EF4\u7801"});var Ct=et(()=>{it.buildQrcode(J.value)},300);J.addEventListener("input",Ct);var at=()=>{let l=document.getElementById("qrcodeWrap");chrome.tabs.query({active:!0,currentWindow:!0},function(a){Array.isArray(a)&&a.length>0?(J.value=a[0].url,l&&it.buildQrcode(a[0].url)):l.innerHTML="\u8BF7\u6253\u5F00\u4E00\u4E2A\u9875\u9762"})};var Tt=document.getElementById("funcGroup"),ot=["parseQrcodeWrap","buildQrcodeWrap"];Tt.addEventListener("click",l=>{let a=l.target.getAttribute("index");$(a)});var $=l=>{Array.from(document.getElementsByClassName("func")).forEach((s,p)=>{p==l?(s.classList.add("active"),ot.forEach((m,c)=>{let f=document.getElementById(ot[c]);c==l?(f.style.display="block",c===1&&at(),c===0&&document.getElementById("content").focus()):f.style.display="none"})):s.classList.remove("active")})};var F="__qrcodeAutoPaste",Q="__qrcodeAutoJump",O="__qrcodeAutoCopy";var G=class{constructor(a){this.img=a}parse(){return R(this,null,function*(){let a=yield this.parseWithBrowser();return a||this.parseWithZxing()})}parseWithBrowser(){return R(this,null,function*(){if(BarcodeDetector)try{if((yield BarcodeDetector.getSupportedFormats()).includes("qr_code")){let p=yield new BarcodeDetector().detect(this.img);for(let m of p)if(m.rawValue)return m.rawValue}}catch(a){return null}return null})}parseWithZxing(){return R(this,null,function*(){let a=new ZXing.BrowserQRCodeReader;try{return(yield a.decodeFromImage(this.img)).text}catch(s){return null}})}};var V=class{save(a,s){localStorage.setItem(a,s)}getValue(a){return localStorage.getItem(a)}initialSave(a,s){this.getValue(a)===null&&this.save(a,s)}};var B=class extends V{constructor(s){super();this.configs=s,this.getValue(O)===null&&this.setDefault()}static getInstance(s){return B.instance||(B.instance=new B(s)),B.instance}add(s,p,m){this.configs.push({type:s,defaultValue:p,postHandle:m})}emit(s,...p){nt(this.getValue(s))&&this.configs.forEach(m=>{m.type===s&&m.postHandle(...p)})}setDefault(){this.configs.forEach(s=>{this.initialSave(s.type,s.defaultValue)})}};var W=class{constructor(a){this.promptContainer=a}err(a="\u975E\u5E38\u62B1\u6B49\uFF0C\u89E3\u6790\u5931\u8D25\uFF0C\u8BF7\u60A8\u786E\u8BA4\u4E00\u4E0B\u56FE\u7247\u4E8C\u7EF4\u7801\u662F\u5426\u6E05\u6670\uFF0C\u6216\u8005\u56FE\u7247\u662F\u4E8C\u7EF4\u7801\u5417"){this.promptContainer.classList.remove("success"),this.promptContainer.value=a,this.promptContainer.classList.add("error")}success(a){this.promptContainer.classList.remove("error"),this.promptContainer.value=a,this.promptContainer.classList.add("success")}setPromptContainer(a){this.promptContainer=a}};var Y=_t(ut()),K=class{constructor(){this.defaultConfigs=[{type:F,defaultValue:!0,postHandle:a=>{setTimeout(()=>{a.select(),document.execCommand("paste")})}},{type:O,defaultValue:!0,postHandle:(a,s)=>{a.value=s,a.select(),document.execCommand("copy")}},{type:Q,defaultValue:!1,postHandle:a=>{Y.default.isUri(a)&&window.open(a)}}];this.copyParseAns=(a,s)=>{a.value=s,a.select(),document.execCommand("copy")};this.jumpToUrl=a=>{Y.default.isUri(a)&&window.open(a)};this.configurer=B.getInstance(this.defaultConfigs)}main(){}pasteToEl(a){setTimeout(()=>{a.select(),document.execCommand("paste")})}};var z=class extends W{constructor(s){super(s);this.openOptionsPage=()=>{chrome.runtime.openOptionsPage(),window.close()};this.addPasteEvent=()=>{this.container.addEventListener("paste",s=>{let p=s.clipboardData&&s.clipboardData.items,m=null,c=!1;if(p&&p.length)for(let f=0;f<p.length;f++)p[f].type.indexOf("image")!==-1&&(c=!0,m=p[f].getAsFile(),this.container.value="\u6B63\u5728\u89E3\u6790\u4E2D, \u8BF7\u7A0D\u7B49...",this.parseQrcode(m));!c&&this.isInit&&($(1),this.isInit=!1)})};this.container=s,this.container.focus(),new K,this.addPasteEvent(),this.isInit=!0,this.config=B.getInstance(),this.config.emit(F,this.container)}loadImage(s){return R(this,null,function*(){return new Promise((p,m)=>{let c=new Image;c.onload=()=>p(c),c.onerror=m,c.src=s})})}parseQrcode(s){let p=new FileReader;p.onload=m=>R(this,null,function*(){let c=yield this.loadImage(m.target.result);this.parser=new G(c);let f=yield this.parser.parse();try{f?(this.config.emit(O,this.container,f),this.config.emit(Q,f),this.container.value=`\u4E8C\u7EF4\u7801\u5185\u5BB9\u4E3A\uFF1A${f}${this.config.getValue(F)?",\u5DF2\u81EA\u52A8\u590D\u5236\u5230\u526A\u8D34\u677F":""}`):this.err()}catch(_){this.err()}}),p.readAsDataURL(s)}};new z(document.getElementById("content"));var Lt=document.getElementById("settings");Lt.addEventListener("click",tt);})();
