import{e as c,o as u,g as f,r as s,h as g,j as d,k as m,l as p,m as S,n as k,q as y,t as P,u as h,v as w,c as N,w as C}from"../chunks/chunk-6ylWZnrk.js";function v(){window.addEventListener("popstate",H)}async function H(){c("onPopState()");const{isHistoryStateEnhanced:t,previous:n,current:i}=u();if(t)await L(n,i);else return}async function L(t,n){const i=n.state.scrollPosition||void 0;if(r(n.url)===r(t.url)&&n.url!==t.url){f(i);return}const o=n.state.triggeredBy==="user"||t.state.triggeredBy==="user",l=!n.state.timestamp||!t.state.timestamp?null:n.state.timestamp<t.state.timestamp;await s({scrollTarget:i,isBackwardNavigation:l,doNotRenderIfSamePage:o})}function r(t){return t.split("#")[0]}function B(){document.addEventListener("click",T)}async function T(t){if(!A(t))return;const n=R(t.target);if(!n)return;const i=n.getAttribute("href");if(i===null)return;if(i.includes("#")&&g(i)){t.preventDefault(),d(i.split("#")[1]);return}if(m(n))return;t.preventDefault();let e;{const a=n.getAttribute("keep-scroll-position");a!==null&&(e={preserveScroll:a!=="false"})}await s({scrollTarget:e,urlOriginal:i,isBackwardNavigation:!1})}function A(t){return t.button===0&&!t.ctrlKey&&!t.shiftKey&&!t.altKey&&!t.metaKey}function R(t){for(;t.tagName!=="A";){const{parentNode:n}=t;if(!n)return null;t=n}return t}async function E(){K();const t=I();B(),p(),await t}async function I(){h(w()===0),await s({scrollTarget:{preserveScroll:!0},isBackwardNavigation:null,isClientSideNavigation:!1})}function K(){S(),k(),y(),P(),v()}N();C();E();
