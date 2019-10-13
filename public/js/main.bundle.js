!function(e){function r(r){for(var n,i,u=r[0],c=r[1],l=r[2],s=0,d=[];s<u.length;s++)i=u[s],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(f&&f(r);d.length;)d.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,r=0;r<a.length;r++){for(var t=a[r],n=!0,u=1;u<t.length;u++){var c=t[u];0!==o[c]&&(n=!1)}n&&(a.splice(r--,1),e=i(i.s=t[0]))}return e}var n={},o={0:0},a=[];function i(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=n,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,r){if(1&r&&(e=i(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)i.d(t,n,function(r){return e[r]}.bind(null,n));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=r,u=u.slice();for(var l=0;l<u.length;l++)r(u[l]);var f=c;a.push([115,1]),t()}({115:function(e,r,t){"use strict";t.r(r);t(43),t(75),t(77),t(79),t(88),t(89),t(91),t(92),t(93),t(94),t(95),t(96),t(97),t(98),t(99),t(100),t(101),t(104),t(105),t(106),t(107),t(108),t(109),t(110),t(111),t(112),t(113),t(114);var n=t(42);!function(e){var r=document.querySelector(e);r.width=300,r.height=300;var t=r.getContext("webgl");t.clearColor(0,0,0,1),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);var o,a,i=function(e,r){var n=t.createProgram();if(t.attachShader(n,e),t.attachShader(n,r),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS))return t.useProgram(n),n;alert(t.getProgramInfoLog(n))}((o="attribute vec3 position;\nattribute vec4 color;\nattribute vec2 textureCoord;\nvarying   vec4 vColor;\nvarying   vec2 vTextureCoord;\n\nvoid main(void){\n    vColor        = color;\n    vTextureCoord = textureCoord ;\n    gl_Position   = vec4(position, 1.0);\n}\n",a=t.createShader(t.VERTEX_SHADER),t.shaderSource(a,o),t.compileShader(a),a),function(e){var r=t.createShader(t.FRAGMENT_SHADER);return t.shaderSource(r,e),t.compileShader(r),r}("precision mediump float;\nuniform sampler2D texture0;\nuniform sampler2D texture1;\nuniform sampler2D dispTexture;\nuniform float ratio;\nvarying vec4      vColor;\nvarying vec2      vTextureCoord;\n\nvoid main(void){\n    vec4 disp = texture2D(dispTexture, vTextureCoord*3.0);\n    vec2 calcPosition2 = vTextureCoord + vec2(disp.r,disp.g) *(1.0 - ratio);\n    vec2 calcPosition1 = vTextureCoord + vec2(disp.g,disp.b) *ratio;\n    vec4 image1 = texture2D(texture0, calcPosition1);\n    vec4 image2 = texture2D(texture1, calcPosition2);\n    vec4 dist = mix(image1, image2, ratio);\n    gl_FragColor = dist;\n}\n")),u=new Array(3);u[0]=t.getAttribLocation(i,"position"),u[1]=t.getAttribLocation(i,"color"),u[2]=t.getAttribLocation(i,"textureCoord");var c=new Array(3);c[0]=3,c[1]=4,c[2]=2;var l=[0,1,2,3,2,1];!function(e,r,n){for(var o in e)t.bindBuffer(t.ARRAY_BUFFER,e[o]),t.enableVertexAttribArray(r[o]),t.vertexAttribPointer(r[o],n[o],t.FLOAT,!1,0,0)}([E([-1,1,0,1,1,0,-1,-1,0,1,-1,0]),E([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),E([0,0,1,0,0,1,1,1])],u,c);var f=function(e){var r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Int16Array(e),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),r}(l);t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,f);var s=new Array(4);s[0]=t.getUniformLocation(i,"texture0"),s[1]=t.getUniformLocation(i,"texture1"),s[2]=t.getUniformLocation(i,"dispTexture"),s[3]=t.getUniformLocation(i,"ratio"),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL);var d=null,v=null,T=null;g("./images/image1.jpg",0),g("./images/image2.jpg",1),g("./images/disp.jpg",2);var p={translate:0};function E(e){var r=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null),r}function g(e,r){var n=new Image;n.onload=function(){var e=t.createTexture();switch(t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,n),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,null),r){case 0:d=e;break;case 1:v=e;break;case 2:T=e}},n.src=e}!function e(){t.clearColor(0,0,0,1);t.clearDepth(1);t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);t.uniform1f(s[3],p.translate);t.activeTexture(t.TEXTURE0);t.bindTexture(t.TEXTURE_2D,d);t.uniform1i(s[0],0);t.activeTexture(t.TEXTURE1);t.bindTexture(t.TEXTURE_2D,v);t.uniform1i(s[1],1);t.activeTexture(t.TEXTURE2);t.bindTexture(t.TEXTURE_2D,T);t.uniform1i(s[2],2);t.drawElements(t.TRIANGLES,l.length,t.UNSIGNED_SHORT,0);t.flush();requestAnimationFrame(e)}(),r.addEventListener("mouseenter",(function(){Object(n.a)({targets:p,translate:1,easing:"easeInOutCubic",duration:500})})),r.addEventListener("mouseleave",(function(){Object(n.a)({targets:p,translate:0,easing:"easeInOutCubic",duration:500})}))}(".canvas")}});