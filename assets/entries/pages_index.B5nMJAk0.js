import{j as n,i as h,b as m,c as f,d as y,o as g}from"../chunks/chunk-rFtTKmf_.js";import{M as u}from"../chunks/chunk-B5yl8vQs.js";import{D as v}from"../chunks/chunk-BDQ5ptpc.js";/* empty css                      *//* empty css                      */import"../chunks/chunk-6ylWZnrk.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */const T=`
# Welcome to the Fictional Lab

At Fictional Lab, we are driven by curiosity and innovation, pushing the boundaries of knowledge to address real-world challenges. Our interdisciplinary research team is composed of experts in artificial intelligence, robotics, computational biology, and social systems modeling. We believe in open collaboration, fostering creativity, and empowering the next generation of scientists and engineers.

Our mission is simple:

- **Innovate:** Develop cutting-edge technologies that solve complex problems.
- **Collaborate:** Work with academic, industrial, and governmental partners to maximize the impact of our research.
- **Educate:** Mentor students and young researchers to become leaders in their fields.

Whether you are a researcher, student, or industry professional, we invite you to explore our work, join our initiatives, or partner with us to shape the future. Welcome to Fictional Lab—a place where ideas come to life.
`;function l(t){let e=t.join(`
`);return e=e.replace(/^[\s\n\r]+/,""),e=e.replace(/[\s\n\r]+$/,""),e}function S(t,e,i){const o=t.split(`
`),r={header:"",sections:[]};let s="",a=[];e.lastIndex=0;for(let d=0;d<o.length;d++){const p=o[d],c=p.match(e);c?(s?(r.sections.push([i(s),l(a)]),a=[]):a.length>0&&(r.header=l(a),a=[]),s=c[1]):a.push(p)}return s?r.sections.push([i(s),l(a)]):a.length>0&&(r.header=l(a)),r}const w=`# How to use this file

Write sections like
\`\`\`md
# date: YYYY/MM/DD

# Title

Content

\`\`\`
, it will be automatically parsed and displayed.

# date: 2024/12/30

# Test title

test news 1

- 2020年度社区英雄夏一可（黄旭东）上台领奖
- 2018年的黄金系列赛颁奖盛典，夏一可的奖由黄旭东代领
- 2020年夏一可获得2020年度社区英雄称号，黄旭东上台领奖。
  - 同时，黄哥承诺：“2021年绝对会更新，萨尔下，谢谢各位的支持。”看来萨尔永远失去了他的下
- 黄旭东与夏一可都具有一定的毒奶能力，包括在游戏《绝地求生》中开空投挂
- 黄旭东与夏一可都有一个关系密切的喜欢玩风暴英雄的男性友人黄哥是钱赞企，夏一可是黑心喵
- 黄旭东与夏一可从来没有同时登场（杭州鲲之队成立后，此条被修正为“黄旭东、孙一峰、周宁、夏一可四人不能同时登场”）
- 2021年2月4日，黄旭东与夏一可等人直播玩《among us》游戏。黄旭东刀了夏一可后，发言时显示自己死亡。我杀了我自己？后黄旭东被刀之后，夏一可游戏卡死动弹不得。实锤黄旭东开变声器双线操作

数字论证：
\`\`\`
同卵双狗斗鱼直播间id是3484，孙一峰即为F91
十进制表示是3985，3484-3985=-501，
所以黄旭东就是-501（大嘘）
夏一可的直播间id是307876 
3*(0+7)-87*6 = -501 
Q.E.D.
\`\`\`
此后这个梗便在SCBOY和夏一可的粉丝间广泛流传，SCBOY和夏一可本人也经常玩这个梗。在星际老男孩的微信公众号中，经常使用“黄哥小号”来指代夏一可，夏一可也在乔碧萝事件时发黄哥的照片作为自己的照片。有一次夏一可发微博，让粉丝在评论区里发一张图，点赞数最高的拿来当一星期头像，结果黄哥头戴红内裤的照片以2万赞成功登顶。后来黄哥也换上了夏一可的头像。

据黄哥透露，他小时候喜欢对着墙踢足球。可能是某次黄哥踢球时，球反弹击中了脑袋，此后就产生了黄旭东和夏一可两个人格。


# date: 2024/12/29

test news 2

[article link](/articles/test-1)`,x=/^#\s*date\s*:\s*((\d{4}\s*[-/]\s*\d{1,2}\s*[-/]\s*\d{1,2}))\s*$/;function b(t){t=(t||"").replace(/\s+/g,"");const[e,i,o]=t.split(/[-/]/g,3);return{year:Number.isNaN(e)?1:Number(e),month:Number.isNaN(i)?1:Number(i),day:Number.isNaN(o)?1:Number(o)}}const j=S(w,x,b),P=t=>{const i=v.fromObject(t.date).toFormat("ccc, LLL d, yyyy");return n.jsxs("div",{children:[n.jsx("div",{className:"c10v5i09",children:i}),n.jsx("div",{className:"c1564bbp",children:n.jsx(u,{children:t.content})})]})},z=t=>n.jsx(n.Fragment,{children:j.sections.map(([e,i],o)=>n.jsx(P,{date:e,content:i},o))});function D(){return n.jsxs("div",{children:[n.jsx(u,{children:T}),n.jsx("h1",{children:"News"}),n.jsx(z,{})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"})),G={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:g}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:f}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/index/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:N}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layout/Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:m}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Fictional Lab"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:h}}};export{G as configValuesSerialized};
