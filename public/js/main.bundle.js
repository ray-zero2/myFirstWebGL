!function(e){function r(r){for(var o,u,i=r[0],c=r[1],f=r[2],p=0,d=[];p<i.length;p++)u=i[p],Object.prototype.hasOwnProperty.call(n,u)&&n[u]&&d.push(n[u][0]),n[u]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(l&&l(r);d.length;)d.shift()();return a.push.apply(a,f||[]),t()}function t(){for(var e,r=0;r<a.length;r++){for(var t=a[r],o=!0,i=1;i<t.length;i++){var c=t[i];0!==n[c]&&(o=!1)}o&&(a.splice(r--,1),e=u(u.s=t[0]))}return e}var o={},n={0:0},a=[];function u(r){if(o[r])return o[r].exports;var t=o[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=e,u.c=o,u.d=function(e,r,t){u.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,r){if(1&r&&(e=u(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)u.d(t,o,function(r){return e[r]}.bind(null,o));return t},u.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(r,"a",r),r},u.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},u.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=r,i=i.slice();for(var f=0;f<i.length;f++)r(i[f]);var l=c;a.push([56,1]),t()}({56:function(e,r,t){"use strict";t.r(r);t(42),t(74),t(76),t(78),t(88),t(90),t(91),t(92),t(93),t(94),t(95),t(96),t(97),t(98),t(99),t(100),t(103),t(104),t(105),t(106),t(107),t(108),t(109),t(110),t(111),t(112),t(113);var o=function(e){var r=document.querySelector(e),t="f-shader"==r.type?a.createShader(a.FRAGMENT_SHADER):a.createShader(a.VERTEX_SHADER);return a.shaderSource(t,r.text),a.compileShader(t),t},n=document.querySelector(".canvas");n.width=500,n.height=300;var a=n.getContext("webgl"),u=o(".vShader"),i=o(".fShader"),c=a.createProgram();a.attachShader(c,u),a.attachShader(c,i),a.linkProgram(c),a.useProgram(c);new Array;attLocation[0]=a.getAttribLocation(c,"position"),attLocation[1]=a.getAttribLocation(c,"color"),attLocation[2]=a.getAttribLocation(c,"textureCoord");var f=new Array;f[0]=3,f[1]=4,f[2]=2;a.clearColor(0,0,0,0),a.bindBuffer(a.ARRAY_BUFFER,verticesBuffer),a.vertexAttribPointer(verticesBuffer,2,a.FLOAT,!1,0,0),a.drawArrays(a.TRIANGLES,0,6),a.flush()}});