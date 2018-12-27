!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){var r,i,o;i=[t(1)],void 0===(o="function"==typeof(r=function(e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),r=void 0!==r?r:{},i=48e3,o=4e3,a=20,u=4096,s=function(){function n(t,s){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),this.config={inputSampleRate:t,channelCount:s},this.encodedBuffers=[],this._opus_encoder_create=r._opus_encoder_create,this._opus_encoder_ctl=r._opus_encoder_ctl,this._opus_encode_float=r._opus_encode_float,this._opus_encoder_destroy=r._opus_encoder_destroy,this._speex_resampler_init=r._speex_resampler_init,this._speex_resampler_process_interleaved_float=r._speex_resampler_process_interleaved_float,this._speex_resampler_destroy=r._speex_resampler_destroy,this._contrainer=new r.WebMContainer(i,s,Math.floor(4294967295*Math.random())),this.OpusInitCodec(i,s,l),this.SpeexInitResampler(t,i,s),this.inputSamplesPerChannel=t*a/1e3,this.outputSamplePerChannel=i*a/1e3,this.inputBufferIndex=0,this.mInputBuffer=new e.WasmFloat32Buffer(this.inputSamplesPerChannel*s),this.mResampledBuffer=new e.WasmFloat32Buffer(this.outputSamplePerChannel*s),this.mOutputBuffer=new e.WasmUint8Buffer(o),this.interleavedBuffers=1!==s?new Float32Array(u*s):void 0}return t(n,[{key:"encode",value:function(n){arguments.length>1&&void 0!==arguments[1]&&arguments[1];for(var t=this.interleave(n),r=0;r<t.length;){var i=Math.min(this.mInputBuffer.length-this.inputBufferIndex,t.length-r);if(this.mInputBuffer.set(t.subarray(r,r+i),this.inputBufferIndex),this.inputBufferIndex+=i,this.inputBufferIndex>=this.mInputBuffer.length){var o=new e.WasmUint32(this.inputSamplesPerChannel),a=new e.WasmUint32(this.outputSamplePerChannel),u=this._speex_resampler_process_interleaved_float(this.resampler,this.mInputBuffer.pointer,o.pointer,this.mResampledBuffer.pointer,a.pointer);if(o.free(),a.free(),0!==u)throw new Error("Resampling error.");var s=this._opus_encode_float(this.encoder,this.mResampledBuffer.pointer,this.outputSamplePerChannel,this.mOutputBuffer.pointer,this.mOutputBuffer.length);if(s<0)throw new Error("Opus encoding error.");this._contrainer.writeFrame(this.mOutputBuffer.pointer,s,this.outputSamplePerChannel),this.inputBufferIndex=0}r+=i}}},{key:"close",value:function(){r.destroy(this._contrainer),this.mInputBuffer.free(),this.mResampledBuffer.free(),this.mOutputBuffer.free(),this._opus_encoder_destroy(this.encoder),this._speex_resampler_destroy(this.resampler)}},{key:"interleave",value:function(e){var n=e.length;if(1===n)return e[0];for(var t=0;t<n;t++)for(var r=e[t],i=0;i<r.length;i++)this.interleavedBuffers[i*n+t]=r[i];return this.interleavedBuffers}},{key:"OpusInitCodec",value:function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,i=new e.WasmUint32(void 0);this.encoder=this._opus_encoder_create(n,t,2049,i.pointer);var o=i.value;if(i.free(),0!==o)throw new Error("Opus encodor initialization failed.");r&&this.OpusSetOpusControl(4002,r)}},{key:"OpusSetOpusControl",value:function(n,t){var r=new e.WasmInt32(t);this._opus_encoder_ctl(this.encoder,n,r.pointer),r.free()}},{key:"SpeexInitResampler",value:function(n,t,r){var i=new e.WasmUint32(void 0);this.resampler=this._speex_resampler_init(r,n,t,6,i.pointer);var o=i.value;if(i.free(),0!==o)throw new Error("Initializing resampler failed.")}}]),n}(),l=void 0;r.onRuntimeInitialized=function(){(0,e.setWASM)(r),self.postMessage({command:"readyToInit"}),self.onmessage=function(e){var n=e.data.command;switch(n){case"init":var t=e.data,r=t.sampleRate,i=t.channelCount,o=t.bitsPerSecond;l=new s(r,i,o);break;case"pushInputData":for(var a=e.data,u=a.channelBuffers,f=(a.length,a.duration,0);f<l.config.channelCount;f++)u[f]=new Float32Array(u[f].buffer);l.encode(u);break;case"getEncodedData":case"done":"done"===n&&l.close();var c=l.encodedBuffers;self.postMessage({command:"done"===n?"lastEncodedData":"encodedData",buffers:c},c),l.encodedBuffers=[],"done"===n&&self.close()}}};var f,c={};for(f in r)r.hasOwnProperty(f)&&(c[f]=r[f]);r.arguments=[],r.thisProgram="./this.program",r.quit=function(e,n){throw n},r.preRun=[],r.postRun=[];var _=!1,p=!0,y="";function d(e){return r.locateFile?r.locateFile(e,y):y+e}(_||p)&&(p?y=self.location.href:document.currentScript&&(y=document.currentScript.src),y=0!==y.indexOf("blob:")?y.substr(0,y.lastIndexOf("/")+1):"",r.read=function(e){var n=new XMLHttpRequest;return n.open("GET",e,!1),n.send(null),n.responseText},p&&(r.readBinary=function(e){var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),r.readAsync=function(e,n,t){var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=function(){200==r.status||0==r.status&&r.response?n(r.response):t()},r.onerror=t,r.send(null)},r.setWindowTitle=function(e){document.title=e});var h=r.print||("undefined"!=typeof console?console.log.bind(console):"undefined"!=typeof print?print:null),m=r.printErr||("undefined"!=typeof printErr?printErr:"undefined"!=typeof console&&console.warn.bind(console)||h);for(f in c)c.hasOwnProperty(f)&&(r[f]=c[f]);c=void 0;var v=16;function E(e){var n=N;return N=N+e+15&-16,n}function b(e,n){n||(n=v);var t=e=Math.ceil(e/n)*n;return t}var g={"f64-rem":function(e,n){return e%n},debugger:function(){}};new Array(0);var w=0,A=function(e){w=e},O=!1;function S(e,n){e||Ie("Assertion failed: "+n)}function C(e,n){if(0===n||!e)return"";for(var t,r=0,i=0;t=R[e+i>>0],r|=t,(0!=t||n)&&(i++,!n||i!=n););n||(n=i);var o="";if(r<128){for(var a;n>0;)a=String.fromCharCode.apply(String,R.subarray(e,e+Math.min(n,1024))),o=o?o+a:a,e+=1024,n-=1024;return o}return function(e){return M(R,e)}(e)}var T="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function M(e,n){for(var t=n;e[t];)++t;if(t-n>16&&e.subarray&&T)return T.decode(e.subarray(n,t));for(var r,i,o,a,u,s,l="";;){if(!(r=e[n++]))return l;if(128&r)if(i=63&e[n++],192!=(224&r))if(o=63&e[n++],224==(240&r)?r=(15&r)<<12|i<<6|o:(a=63&e[n++],240==(248&r)?r=(7&r)<<18|i<<12|o<<6|a:(u=63&e[n++],248==(252&r)?r=(3&r)<<24|i<<18|o<<12|a<<6|u:(s=63&e[n++],r=(1&r)<<30|i<<24|o<<18|a<<12|u<<6|s))),r<65536)l+=String.fromCharCode(r);else{var f=r-65536;l+=String.fromCharCode(55296|f>>10,56320|1023&f)}else l+=String.fromCharCode((31&r)<<6|i);else l+=String.fromCharCode(r)}}"undefined"!=typeof TextDecoder&&new TextDecoder("utf-16le");var j,R,P,N,I,B,L,x,D,k=65536,W=16777216;function F(){r.HEAP8=new Int8Array(j),r.HEAP16=new Int16Array(j),r.HEAP32=P=new Int32Array(j),r.HEAPU8=R=new Uint8Array(j),r.HEAPU16=new Uint16Array(j),r.HEAPU32=new Uint32Array(j),r.HEAPF32=new Float32Array(j),r.HEAPF64=new Float64Array(j)}function U(){Ie("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+G+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function H(){U()}N=I=B=L=x=D=0;var V=r.TOTAL_STACK||5242880,G=r.TOTAL_MEMORY||16777216;function K(e){for(;e.length>0;){var n=e.shift();if("function"!=typeof n){var t=n.func;"number"==typeof t?void 0===n.arg?r.dynCall_v(t):r.dynCall_vi(t,n.arg):t(void 0===n.arg?null:n.arg)}else n()}}G<V&&m("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+G+"! (TOTAL_STACK="+V+")"),r.buffer?j=r.buffer:("object"===("undefined"==typeof WebAssembly?"undefined":n(WebAssembly))&&"function"==typeof WebAssembly.Memory?(r.wasmMemory=new WebAssembly.Memory({initial:G/k,maximum:G/k}),j=r.wasmMemory.buffer):j=new ArrayBuffer(G),r.buffer=j),F();var z=[],Y=[],X=[],q=[],Q=!1;function Z(e){z.unshift(e)}function J(e){q.unshift(e)}Math.abs;var $=Math.cos,ee=Math.sin,ne=(Math.tan,Math.acos,Math.asin,Math.atan,Math.atan2,Math.exp,Math.log,Math.sqrt,Math.ceil,Math.floor,Math.pow,Math.imul,Math.fround,Math.round,Math.min,Math.max,Math.clz32,Math.trunc,0),te=null,re=null;r.preloadedImages={},r.preloadedAudios={};var ie="data:application/octet-stream;base64,";function oe(e){return String.prototype.startsWith?e.startsWith(ie):0===e.indexOf(ie)}!function(){var e="WebMOpusWorker.wast",t="WebMOpusWorker.wasm",i="WebMOpusWorker.temp.asm.js";oe(e)||(e=d(e)),oe(t)||(t=d(t)),oe(i)||(i=d(i));var o={global:null,env:null,asm2wasm:g,parent:r},a=null;function u(e){var n=r.buffer;e.byteLength<n.byteLength&&m("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");var t=new Int8Array(n),i=new Int8Array(e);i.set(t),function(e){r.buffer=j=e}(e),F()}function s(){try{if(r.wasmBinary)return new Uint8Array(r.wasmBinary);if(r.readBinary)return r.readBinary(t);throw"both async and sync fetching of the wasm failed"}catch(e){Ie(e)}}function l(e,i,l){if("object"!==("undefined"==typeof WebAssembly?"undefined":n(WebAssembly)))return m("no native wasm support detected"),!1;if(!(r.wasmMemory instanceof WebAssembly.Memory))return m("no native wasm Memory in use"),!1;function f(e,n){(a=e.exports).memory&&u(a.memory),r.asm=a,r.usingWasm=!0,function(e){if(ne--,r.monitorRunDependencies&&r.monitorRunDependencies(ne),0==ne&&(null!==te&&(clearInterval(te),te=null),re)){var n=re;re=null,n()}}()}if(i.memory=r.wasmMemory,o.global={NaN:NaN,Infinity:1/0},o["global.Math"]=Math,o.env=i,ne++,r.monitorRunDependencies&&r.monitorRunDependencies(ne),r.instantiateWasm)try{return r.instantiateWasm(o,f)}catch(e){return m("Module.instantiateWasm callback failed with error: "+e),!1}function c(e){f(e.instance,e.module)}function y(e){(r.wasmBinary||!_&&!p||"function"!=typeof fetch?new Promise(function(e,n){e(s())}):fetch(t,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+t+"'";return e.arrayBuffer()}).catch(function(){return s()})).then(function(e){return WebAssembly.instantiate(e,o)}).then(e,function(e){m("failed to asynchronously prepare wasm: "+e),Ie(e)})}return r.wasmBinary||"function"!=typeof WebAssembly.instantiateStreaming||oe(t)||"function"!=typeof fetch?y(c):WebAssembly.instantiateStreaming(fetch(t,{credentials:"same-origin"}),o).then(c,function(e){m("wasm streaming compile failed: "+e),m("falling back to ArrayBuffer instantiation"),y(c)}),{}}r.asmPreload=r.asm;var f=r.reallocBuffer;r.reallocBuffer=function(e){return"asmjs"===c?f(e):function(e){var n=r.usingWasm?k:W;e=function(e,n){return e%n>0&&(e+=n-e%n),e}(e,n);var t=r.buffer.byteLength;if(r.usingWasm)try{var i=r.wasmMemory.grow((e-t)/65536);return-1!==i?r.buffer=r.wasmMemory.buffer:null}catch(e){return null}}(e)};var c="";r.asm=function(e,t,i){if(!t.table){var o=r.wasmTableSize;void 0===o&&(o=1024);var a=r.wasmMaxTableSize;"object"===("undefined"==typeof WebAssembly?"undefined":n(WebAssembly))&&"function"==typeof WebAssembly.Table?t.table=void 0!==a?new WebAssembly.Table({initial:o,maximum:a,element:"anyfunc"}):new WebAssembly.Table({initial:o,element:"anyfunc"}):t.table=new Array(o),r.wasmTable=t.table}var u;return t.__memory_base||(t.__memory_base=r.STATIC_BASE),t.__table_base||(t.__table_base=0),S(u=l(e,t,i),"no binaryen method succeeded."),u},r.asm}(),N=42336,Y.push(),r.STATIC_BASE=1024,r.STATIC_BUMP=41312;var ae=N;function ue(){return!!ue.uncaught_exception}N+=16;var se={last:0,caught:[],infos:{},deAdjust:function(e){if(!e||se.infos[e])return e;for(var n in se.infos){var t=+n,r=se.infos[t];if(r.adjusted===e)return t}return e},addRef:function(e){if(e){var n=se.infos[e];n.refcount++}},decRef:function(e){if(e){var n=se.infos[e];S(n.refcount>0),n.refcount--,0!==n.refcount||n.rethrown||(n.destructor&&r.dynCall_vi(n.destructor,e),delete se.infos[e],le(e))}},clearRef:function(e){if(e){var n=se.infos[e];n.refcount=0}}};function le(e){try{return Se(e)}catch(e){}}function fe(){var e=se.last;if(!e)return 0|(A(0),0);var n=se.infos[e],t=n.type;if(!t)return 0|(A(0),e);var i=Array.prototype.slice.call(arguments);r.___cxa_is_pointer_type(t),fe.buffer||(fe.buffer=Ce(4)),P[fe.buffer>>2]=e,e=fe.buffer;for(var o=0;o<i.length;o++)if(i[o]&&r.___cxa_can_catch(i[o],t,e))return e=P[e>>2],n.adjusted=e,0|(A(i[o]),e);return e=P[e>>2],0|(A(t),e)}var ce={buffers:[null,[],[]],printChar:function(e,n){var t=ce.buffers[e];S(t),0===n||10===n?((1===e?h:m)(M(t,0)),t.length=0):t.push(n)},varargs:0,get:function(e){ce.varargs+=4;var n=P[ce.varargs-4>>2];return n},getStr:function(){var e=C(ce.get());return e},get64:function(){var e=ce.get(),n=ce.get();return S(e>=0?0===n:-1===n),e},getZero:function(){S(0===ce.get())}},_e=$;function pe(e){return Math.pow(2,e)}function ye(e){return Math.log(e)/Math.LN10}var de=ee;function he(){var e=he;return e.LLVM_SAVEDSTACKS||(e.LLVM_SAVEDSTACKS=[]),e.LLVM_SAVEDSTACKS.push(Me()),e.LLVM_SAVEDSTACKS.length-1}var me={},ve=1,Ee={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};D=E(4),I=B=b(N),x=b(L=I+V),P[D>>2]=x,r.wasmTableSize=126,r.wasmMaxTableSize=126,r.asmGlobalArg={},r.asmLibraryArg={abort:Ie,assert:S,enlargeMemory:H,getTotalMemory:function(){return G},setTempRet0:A,getTempRet0:function(){return w},abortOnCannotGrowMemory:U,invoke_i:function(e){var n=Me();try{return r.dynCall_i(e)}catch(e){if(Te(n),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_ii:function(e,n){var t=Me();try{return r.dynCall_ii(e,n)}catch(e){if(Te(t),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_iii:function(e,n,t){var i=Me();try{return r.dynCall_iii(e,n,t)}catch(e){if(Te(i),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_iiii:function(e,n,t,i){var o=Me();try{return r.dynCall_iiii(e,n,t,i)}catch(e){if(Te(o),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_iij:function(e,n,t,i){var o=Me();try{return r.dynCall_iij(e,n,t,i)}catch(e){if(Te(o),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_iijf:function(e,n,t,i,o){var a=Me();try{return r.dynCall_iijf(e,n,t,i,o)}catch(e){if(Te(a),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_iiji:function(e,n,t,i,o){var a=Me();try{return r.dynCall_iiji(e,n,t,i,o)}catch(e){if(Te(a),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_iijj:function(e,n,t,i,o,a){var u=Me();try{return r.dynCall_iijj(e,n,t,i,o,a)}catch(e){if(Te(u),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_ji:function(e,n){var t=Me();try{return r.dynCall_ji(e,n)}catch(e){if(Te(t),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_jii:function(e,n,t){var i=Me();try{return r.dynCall_jii(e,n,t)}catch(e){if(Te(i),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_jij:function(e,n,t,i){var o=Me();try{return r.dynCall_jij(e,n,t,i)}catch(e){if(Te(o),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_v:function(e){var n=Me();try{r.dynCall_v(e)}catch(e){if(Te(n),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_vi:function(e,n){var t=Me();try{r.dynCall_vi(e,n)}catch(e){if(Te(t),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_vii:function(e,n,t){var i=Me();try{r.dynCall_vii(e,n,t)}catch(e){if(Te(i),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_viii:function(e,n,t,i){var o=Me();try{r.dynCall_viii(e,n,t,i)}catch(e){if(Te(o),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},invoke_vijj:function(e,n,t,i,o,a){var u=Me();try{r.dynCall_vijj(e,n,t,i,o,a)}catch(e){if(Te(u),"number"!=typeof e&&"longjmp"!==e)throw e;r.setThrew(1,0)}},__ZSt18uncaught_exceptionv:ue,___cxa_allocate_exception:function(e){return Ce(e)},___cxa_begin_catch:function(e){var n=se.infos[e];return n&&!n.caught&&(n.caught=!0,ue.uncaught_exception--),n&&(n.rethrown=!1),se.caught.push(e),se.addRef(se.deAdjust(e)),e},___cxa_end_catch:function(){r.setThrew(0);var e=se.caught.pop();e&&(se.decRef(se.deAdjust(e)),se.last=0)},___cxa_find_matching_catch:fe,___cxa_find_matching_catch_2:function(){return fe.apply(null,arguments)},___cxa_find_matching_catch_3:function(){return fe.apply(null,arguments)},___cxa_free_exception:le,___cxa_throw:function(e,n,t){throw se.infos[e]={ptr:e,adjusted:e,type:n,destructor:t,refcount:0,caught:!1,rethrown:!1},se.last=e,"uncaught_exception"in ue?ue.uncaught_exception++:ue.uncaught_exception=1,e},___gxx_personality_v0:function(){},___lock:function(){},___resumeException:function(e){throw se.last||(se.last=e),e},___setErrNo:function(e){return r.___errno_location&&(P[r.___errno_location()>>2]=e),e},___syscall140:function(e,n){ce.varargs=n;try{var t=ce.getStreamFromFD(),r=(ce.get(),ce.get()),i=ce.get(),o=ce.get(),a=r;return FS.llseek(t,a,o),P[i>>2]=t.position,t.getdents&&0===a&&0===o&&(t.getdents=null),0}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___syscall145:function(e,n){ce.varargs=n;try{var t=ce.getStreamFromFD(),r=ce.get(),i=ce.get();return ce.doReadv(t,r,i)}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___syscall146:function(e,n){ce.varargs=n;try{for(var t=ce.get(),r=ce.get(),i=ce.get(),o=0,a=0;a<i;a++){for(var u=P[r+8*a>>2],s=P[r+(8*a+4)>>2],l=0;l<s;l++)ce.printChar(t,R[u+l]);o+=s}return o}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___syscall221:function(e,n){ce.varargs=n;try{return 0}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___syscall5:function(e,n){ce.varargs=n;try{var t=ce.getStr(),r=ce.get(),i=ce.get(),o=FS.open(t,r,i);return o.fd}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___syscall54:function(e,n){ce.varargs=n;try{return 0}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___syscall6:function(e,n){ce.varargs=n;try{var t=ce.getStreamFromFD();return FS.close(t),0}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||Ie(e),-e.errno}},___unlock:function(){},_abort:function(){r.abort()},_emscripten_memcpy_big:function(e,n,t){return R.set(R.subarray(n,n+t),e),e},_llvm_cos_f64:_e,_llvm_exp2_f32:pe,_llvm_exp2_f64:function(){return pe.apply(null,arguments)},_llvm_log10_f32:ye,_llvm_log10_f64:function(){return ye.apply(null,arguments)},_llvm_sin_f64:de,_llvm_stackrestore:function(e){var n=he,t=n.LLVM_SAVEDSTACKS[e];n.LLVM_SAVEDSTACKS.splice(e,1),Te(t)},_llvm_stacksave:he,_pthread_getspecific:function(e){return me[e]||0},_pthread_key_create:function(e,n){return 0==e?Ee.EINVAL:(P[e>>2]=ve,me[ve]=0,ve++,0)},_pthread_once:function e(n,t){e.seen||(e.seen={}),n in e.seen||(r.dynCall_v(t),e.seen[n]=1)},_pthread_setspecific:function(e,n){return e in me?(me[e]=n,0):Ee.EINVAL},_queueBuffer:function(e,n){var t=new Uint8Array(r.HEAPU8.buffer,e,n);l.encodedBuffers.push(new Uint8Array(t).buffer)},_time:function(e){var n=Date.now()/1e3|0;return e&&(P[e>>2]=n),n},flush_NO_FILESYSTEM:function(){var e=r._fflush;e&&e(0);var n=ce.buffers;n[1].length&&ce.printChar(1,10),n[2].length&&ce.printChar(2,10)},DYNAMICTOP_PTR:D,tempDoublePtr:ae,STACKTOP:B,STACK_MAX:L};var be=r.asm(r.asmGlobalArg,r.asmLibraryArg,j);r.asm=be,r.___cxa_can_catch=function(){return r.asm.___cxa_can_catch.apply(null,arguments)},r.___cxa_is_pointer_type=function(){return r.asm.___cxa_is_pointer_type.apply(null,arguments)},r.___em_js__queueBuffer=function(){return r.asm.___em_js__queueBuffer.apply(null,arguments)};var ge=r._emscripten_bind_VoidPtr___destroy___0=function(){return r.asm._emscripten_bind_VoidPtr___destroy___0.apply(null,arguments)},we=r._emscripten_bind_WebMContainer_WebMContainer_3=function(){return r.asm._emscripten_bind_WebMContainer_WebMContainer_3.apply(null,arguments)},Ae=r._emscripten_bind_WebMContainer___destroy___0=function(){return r.asm._emscripten_bind_WebMContainer___destroy___0.apply(null,arguments)},Oe=r._emscripten_bind_WebMContainer_writeFrame_3=function(){return r.asm._emscripten_bind_WebMContainer_writeFrame_3.apply(null,arguments)},Se=r._free=function(){return r.asm._free.apply(null,arguments)},Ce=(r._llvm_bswap_i32=function(){return r.asm._llvm_bswap_i32.apply(null,arguments)},r._malloc=function(){return r.asm._malloc.apply(null,arguments)}),Te=(r._memcpy=function(){return r.asm._memcpy.apply(null,arguments)},r._memmove=function(){return r.asm._memmove.apply(null,arguments)},r._memset=function(){return r.asm._memset.apply(null,arguments)},r._opus_encode_float=function(){return r.asm._opus_encode_float.apply(null,arguments)},r._opus_encoder_create=function(){return r.asm._opus_encoder_create.apply(null,arguments)},r._opus_encoder_ctl=function(){return r.asm._opus_encoder_ctl.apply(null,arguments)},r._opus_encoder_destroy=function(){return r.asm._opus_encoder_destroy.apply(null,arguments)},r._rintf=function(){return r.asm._rintf.apply(null,arguments)},r._sbrk=function(){return r.asm._sbrk.apply(null,arguments)},r._speex_resampler_destroy=function(){return r.asm._speex_resampler_destroy.apply(null,arguments)},r._speex_resampler_init=function(){return r.asm._speex_resampler_init.apply(null,arguments)},r._speex_resampler_process_interleaved_float=function(){return r.asm._speex_resampler_process_interleaved_float.apply(null,arguments)},r.establishStackSpace=function(){return r.asm.establishStackSpace.apply(null,arguments)},r.runPostSets=function(){return r.asm.runPostSets.apply(null,arguments)},r.setThrew=function(){return r.asm.setThrew.apply(null,arguments)},r.stackAlloc=function(){return r.asm.stackAlloc.apply(null,arguments)},r.stackRestore=function(){return r.asm.stackRestore.apply(null,arguments)}),Me=r.stackSave=function(){return r.asm.stackSave.apply(null,arguments)},je=(r.dynCall_i=function(){return r.asm.dynCall_i.apply(null,arguments)},r.dynCall_ii=function(){return r.asm.dynCall_ii.apply(null,arguments)},r.dynCall_iii=function(){return r.asm.dynCall_iii.apply(null,arguments)},r.dynCall_iiii=function(){return r.asm.dynCall_iiii.apply(null,arguments)},r.dynCall_iiiiiii=function(){return r.asm.dynCall_iiiiiii.apply(null,arguments)},r.dynCall_iij=function(){return r.asm.dynCall_iij.apply(null,arguments)},r.dynCall_iijf=function(){return r.asm.dynCall_iijf.apply(null,arguments)},r.dynCall_iiji=function(){return r.asm.dynCall_iiji.apply(null,arguments)},r.dynCall_iijj=function(){return r.asm.dynCall_iijj.apply(null,arguments)},r.dynCall_ji=function(){return r.asm.dynCall_ji.apply(null,arguments)},r.dynCall_jii=function(){return r.asm.dynCall_jii.apply(null,arguments)},r.dynCall_jij=function(){return r.asm.dynCall_jij.apply(null,arguments)},r.dynCall_v=function(){return r.asm.dynCall_v.apply(null,arguments)},r.dynCall_vi=function(){return r.asm.dynCall_vi.apply(null,arguments)},r.dynCall_vii=function(){return r.asm.dynCall_vii.apply(null,arguments)},r.dynCall_viii=function(){return r.asm.dynCall_viii.apply(null,arguments)},r.dynCall_viiii=function(){return r.asm.dynCall_viiii.apply(null,arguments)},r.dynCall_viiiii=function(){return r.asm.dynCall_viiiii.apply(null,arguments)},r.dynCall_viiiiii=function(){return r.asm.dynCall_viiiiii.apply(null,arguments)},r.dynCall_viiiiiii=function(){return r.asm.dynCall_viiiiiii.apply(null,arguments)},r.dynCall_vijj=function(){return r.asm.dynCall_vijj.apply(null,arguments)},0);Math.random=function(){return je=Math.pow(je+1.8912,3)%1};var Re=1e4;function Pe(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function Ne(e){function n(){r.calledRun||(r.calledRun=!0,O||(Q||(Q=!0,K(Y)),K(X),r.onRuntimeInitialized&&r.onRuntimeInitialized(),function(){if(r.postRun)for("function"==typeof r.postRun&&(r.postRun=[r.postRun]);r.postRun.length;)J(r.postRun.shift());K(q)}()))}e=e||r.arguments,ne>0||(function(){if(r.preRun)for("function"==typeof r.preRun&&(r.preRun=[r.preRun]);r.preRun.length;)Z(r.preRun.shift());K(z)}(),ne>0||r.calledRun||(r.setStatus?(r.setStatus("Running..."),setTimeout(function(){setTimeout(function(){r.setStatus("")},1),n()},1)):n()))}function Ie(e){throw r.onAbort&&r.onAbort(e),void 0!==e?(h(e),m(e),e=JSON.stringify(e)):e="",O=!0,"abort("+e+"). Build with -s ASSERTIONS=1 for more info."}if(Date.now=function(){return Re++},"object"===("undefined"==typeof performance?"undefined":n(performance))&&(performance.now=Date.now),r||(r={}),r.thisProgram="thisProgram",r.asm=be,Pe.prototype=new Error,Pe.prototype.constructor=Pe,re=function e(){r.calledRun||Ne(),r.calledRun||(re=e)},r.run=Ne,r.abort=Ie,r.preInit)for("function"==typeof r.preInit&&(r.preInit=[r.preInit]);r.preInit.length>0;)r.preInit.pop()();function Be(){}function Le(e){return(e||Be).__cache__}function xe(e,n){var t=Le(n),r=t[e];return r||((r=Object.create((n||Be).prototype)).ptr=e,t[e]=r)}function De(){throw"cannot construct a VoidPtr, no constructor in IDL"}function ke(e,t,r){e&&"object"===(void 0===e?"undefined":n(e))&&(e=e.ptr),t&&"object"===(void 0===t?"undefined":n(t))&&(t=t.ptr),r&&"object"===(void 0===r?"undefined":n(r))&&(r=r.ptr),this.ptr=we(e,t,r),Le(ke)[this.ptr]=this}r.noExitRuntime=!0,Ne(),Be.prototype=Object.create(Be.prototype),Be.prototype.constructor=Be,Be.prototype.__class__=Be,Be.__cache__={},r.WrapperObject=Be,r.getCache=Le,r.wrapPointer=xe,r.castObject=function(e,n){return xe(e.ptr,n)},r.NULL=xe(0),r.destroy=function(e){if(!e.__destroy__)throw"Error: Cannot destroy object. (Did you create it yourself?)";e.__destroy__(),delete Le(e.__class__)[e.ptr]},r.compare=function(e,n){return e.ptr===n.ptr},r.getPointer=function(e){return e.ptr},r.getClass=function(e){return e.__class__},De.prototype=Object.create(Be.prototype),De.prototype.constructor=De,De.prototype.__class__=De,De.__cache__={},r.VoidPtr=De,De.prototype.__destroy__=De.prototype.__destroy__=function(){var e=this.ptr;ge(e)},ke.prototype=Object.create(Be.prototype),ke.prototype.constructor=ke,ke.prototype.__class__=ke,ke.__cache__={},r.WebMContainer=ke,ke.prototype.writeFrame=ke.prototype.writeFrame=function(e,t,r){var i=this.ptr;e&&"object"===(void 0===e?"undefined":n(e))&&(e=e.ptr),t&&"object"===(void 0===t?"undefined":n(t))&&(t=t.ptr),r&&"object"===(void 0===r?"undefined":n(r))&&(r=r.ptr),Oe(i,e,t,r)},ke.prototype.__destroy__=ke.prototype.__destroy__=function(){var e=this.ptr;Ae(e)},function(){function e(){}r.calledRun||function(e){X.unshift(e)}(e)}()})?r.apply(n,i):r)||(e.exports=o)},function(e,n,t){var r,i,o;i=[n],void 0===(o="function"==typeof(r=function(e){"use strict";function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function t(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),o=void 0,a=function(){function e(n){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];switch(r(this,e),this._size=n,this._size){case 1:this._heapArray=t?o.HEAP8:o.HEAPU8;break;case 2:this._heapArray=t?o.HEAP16:o.HEAPU16;break;case 4:this._heapArray=t?o.HEAP32:o.HEAPU32;break;default:this._heapArray=o.HEAPU8}i&&(this._size=4,this._heapArray=o.HEAPF32),this._pointer=o._malloc(n)}return i(e,[{key:"free",value:function(){o._free(this.pointer)}},{key:"pointer",get:function(){return this._pointer}},{key:"value",get:function(){var e=0;switch(this._size){case 2:e=1;break;case 4:e=2;break;default:throw new Error("Pointer can be only deferenced as integer-sized")}return this._heapArray[this.pointer>>e]},set:function(e){var n=0;switch(this._size){case 2:n=1;break;case 4:n=2;break;default:throw new Error("Pointer can be only deferenced as integer-sized")}this._heapArray[this.pointer>>n]=e}}]),e}(),u=function(e){function i(e){r(this,i);var t=n(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,4,!0));return void 0!==e&&(t.value=e),t}return t(i,e),i}(a),s=function(e){function i(e){r(this,i);var t=n(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,4,!1));return void 0!==e&&(t.value=e),t}return t(i,e),i}(a),l=function(e){function a(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],u=arguments.length>3&&void 0!==arguments[3]&&arguments[3];r(this,a);var s=n(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e*t,i,u)),l=0;switch(t){case 1:s._heapArray=i?o.HEAP8:o.HEAPU8,l=0;break;case 2:s._heapArray=i?o.HEAP16:o.HEAPU16,l=1;break;case 4:s._heapArray=i?o.HEAP32:o.HEAPU32,l=2;break;default:throw new Error("Unit size must be an integer-size")}u&&(s._heapArray=o.HEAPF32,l=2);var f=s._pointer>>l;return s._buffer=s._heapArray.subarray(f,f+e),s._length=e,s}return t(a,e),i(a,[{key:"set",value:function(e,n){this._buffer.set(e,n)}},{key:"subarray",value:function(e,n){return this._buffer.subarray(e,n)}},{key:"length",get:function(){return this._length}}]),a}(a),f=function(e){function i(e){return r(this,i),n(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,4,!0,!0))}return t(i,e),i}(l),c=function(e){function i(e){return r(this,i),n(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,1,!1,!1))}return t(i,e),i}(l);e.writeString=function(e,n,t){for(var r=0;r<t.length;r++)e.setUint8(n+r,t.charCodeAt(r))},e.setWASM=function(e){o=e},e.WasmInt32=u,e.WasmUint32=s,e.WasmUint8Buffer=c,e.WasmFloat32Buffer=f})?r.apply(n,i):r)||(e.exports=o)}]);