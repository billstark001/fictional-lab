import{j as n,s as c,I as g,r as m,k as f,G as y,L as p,i as A,b,c as P,d as S,o as v}from"../chunks/chunk-BNLd3F8P.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-ggjunuD_.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */function j(e){const r=[];let t="",a=0;for(let i=0;i<e.length;i++){const o=e[i];if(o==="{"?a++:o==="}"&&a--,a===0&&e.slice(i,i+5).toLowerCase()===" and "){r.push(t),t="",i+=4;continue}t+=o}return r.push(t),r.map(i=>i.trim()).filter(i=>i.length>0).map(i=>{const o={first:"",middle:[],last:""};if(i=i.replace(/^\{|\}$/g,"").trim(),i.includes(",")){const[s,d]=i.split(",").map(l=>l.trim());if(o.last=s,d){const l=d.split(/\s+/);o.first=l[0]||"",o.middle=l.slice(1)}}else{const s=i.split(/\s+/);s.length===1?o.last=s[0]:(o.first=s[0],o.last=s[s.length-1],o.middle=s.slice(1,-1))}return o})}const C=e=>{const{errors:r,raw:t}=e;if(r!=null&&r.length)return n.jsxs("div",{className:"c1xtvhbp",children:[n.jsx("pre",{children:n.jsx("code",{children:t})}),"Errors occurred while parsing the citation:",r.map((a,i)=>n.jsx("div",{children:a},i))]})},I=c("div")({name:"AuthorListWrapper",class:"a1u4owzb",propsAsIs:!1}),w=e=>{var a;if(!e||(a=e.middle)!=null&&a.length||!e.last||!e.first)return!1;const r=e.first.toLowerCase().trim();return e.last.toLowerCase().trim()==="doe"&&(r==="jane"||r==="j.")},x=e=>`${e.first} ${e.middle.join(" ")} ${e.last}`.trim(),E=e=>{const r=m.useMemo(()=>j(e.entry.author??""),[e.entry.author]);return n.jsx(I,{children:r.map((t,a)=>t&&n.jsx("span",{className:f("author",w(t)&&"highlight"),children:x(t)},a))})},D=e=>{const{entry:r}=e;let t="";r.journal&&(t=`${r.journal}`,r.volume&&(t+=`, ${r.volume}`),r.pages&&(t+=`: ${r.pages}`));const a=r.journal||r.booktitle||void 0;return n.jsxs(n.Fragment,{children:[!!r.year&&n.jsxs("span",{children:["(",r.year,")"]}),n.jsxs("span",{children:[" ",r.title,"."]}),a&&n.jsxs("span",{children:[" ",a,"."]}),r.publisher&&n.jsxs("span",{children:[" ",r.publisher,"."]})]})},T=c("div")({name:"PublicationWrapper",class:"p9taii5",propsAsIs:!1}),k=c("a")({name:"DOILink",class:"d2m9rft",propsAsIs:!1}),z=({entry:e,index:r})=>n.jsxs(T,{children:[!!r&&n.jsxs("span",{children:["[",r,"] "]}),n.jsx(E,{entry:e}),n.jsx("span",{children:". "}),n.jsx(D,{entry:e}),!!e.doi&&n.jsxs(k,{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",children:["DOI: ",e.doi]}),n.jsx(C,{errors:e.errors,raw:e.raw}),!!e.url&&n.jsx("a",{className:"cite-copy clickable-icon",href:e.url,children:n.jsx(g,{})})]}),h=({entries:e,headCharacter:r})=>n.jsx("div",{children:e.map((t,a)=>n.jsx(z,{entry:t,index:r?`${r}${a+1}`:a+1},a))}),L=[{id:"lee2025personalized",type:"misc",raw:`@misc{lee2025personalized,\r
  title={A Framework for AI-Powered Personalized Education Systems},\r
  author={Lee, Ethan and Doe, Jane},\r
  note={Working Paper},\r
  year={2025}\r
}`,title:"A Framework for AI-Powered Personalized Education Systems",author:"Lee, Ethan and Doe, Jane",note:"Working Paper",year:"2025"},{id:"martinez2025drugmodeling",type:"misc",raw:`@misc{martinez2025drugmodeling,\r
  title={Bridging Computational Biology and AI for Next-Generation Drug Modeling},\r
  author={Martinez, Bob and Patel, Diana},\r
  note={Working Paper},\r
  year={2025}\r
}`,title:"Bridging Computational Biology and AI for Next-Generation Drug Modeling",author:"Martinez, Bob and Patel, Diana",note:"Working Paper",year:"2025"},{id:"doe2025ethics",type:"misc",raw:`@misc{doe2025ethics,\r
  title={Ethics in Artificial Intelligence: Addressing the Challenges of Bias and Fairness},\r
  author={Doe, Jane and Johnson, Alice},\r
  note={Working Paper},\r
  year={2025}\r
}`,title:"Ethics in Artificial Intelligence: Addressing the Challenges of Bias and Fairness",author:"Doe, Jane and Johnson, Alice",note:"Working Paper",year:"2025"},{id:"smith2025collabrobots",type:"misc",raw:`@misc{smith2025collabrobots,\r
  title={Collaborative Robots in Healthcare: A Review of Current Trends and Future Directions},\r
  author={Smith, John and Nguyen, Charlie},\r
  note={Working Paper},\r
  year={2025}\r
}`,title:"Collaborative Robots in Healthcare: A Review of Current Trends and Future Directions",author:"Smith, John and Nguyen, Charlie",note:"Working Paper",year:"2025"},{id:"patel2025game",type:"misc",raw:`@misc{patel2025game,\r
  title={Game Theory and AI: Optimizing Urban Resource Allocation in Emerging Economies},\r
  author={Patel, Diana and Wang, Fiona},\r
  note={Working Paper},\r
  year={2025}\r
}`,title:"Game Theory and AI: Optimizing Urban Resource Allocation in Emerging Economies",author:"Patel, Diana and Wang, Fiona",note:"Working Paper",year:"2025"}],R=[{id:"doe2024interpretability",type:"inproceedings",raw:`@inproceedings{doe2024interpretability,\r
  title={Exploring Interpretability in Reinforcement Learning: A Framework for Transparent Decision-Making},\r
  author={Doe, Jane and Johnson, Alice},\r
  booktitle={Proceedings of the Conference on Neural Information Processing Systems (NeurIPS)},\r
  pages={1234--1245},\r
  year={2024},\r
  organization={NeurIPS}\r
}`,title:"Exploring Interpretability in Reinforcement Learning: A Framework for Transparent Decision-Making",author:"Doe, Jane and Johnson, Alice",booktitle:"Proceedings of the Conference on Neural Information Processing Systems (NeurIPS)",pages:"1234--1245",year:"2024",organization:"NeurIPS"},{id:"smith2024swarm",type:"inproceedings",raw:`@inproceedings{smith2024swarm,\r
  title={Swarm Robotics for Dynamic Environmental Monitoring},\r
  author={Smith, John and Nguyen, Charlie},\r
  booktitle={Proceedings of the IEEE International Conference on Robotics and Automation (ICRA)},\r
  pages={567--576},\r
  year={2024},\r
  organization={IEEE}\r
}`,title:"Swarm Robotics for Dynamic Environmental Monitoring",author:"Smith, John and Nguyen, Charlie",booktitle:"Proceedings of the IEEE International Conference on Robotics and Automation (ICRA)",pages:"567--576",year:"2024",organization:"IEEE"},{id:"patel2023games",type:"inproceedings",raw:`@inproceedings{patel2023games,\r
  title={Game-Theoretic Modeling of Urban Traffic Systems},\r
  author={Patel, Diana and Wang, Fiona},\r
  booktitle={Proceedings of the ACM SIGCOMM Workshop on Smart Cities},\r
  pages={88--97},\r
  year={2023},\r
  organization={ACM}\r
}`,title:"Game-Theoretic Modeling of Urban Traffic Systems",author:"Patel, Diana and Wang, Fiona",booktitle:"Proceedings of the ACM SIGCOMM Workshop on Smart Cities",pages:"88--97",year:"2023",organization:"ACM"},{id:"martinez2025drug",type:"inproceedings",raw:`@inproceedings{martinez2025drug,\r
  title={AI-Driven Discovery of Drug Compounds: A Computational Biology Approach},\r
  author={Martinez, Bob and Doe, Jane},\r
  booktitle={Proceedings of the International Conference on Bioinformatics and Computational Biology (ICBCB)},\r
  pages={432--440},\r
  year={2025},\r
  organization={Springer}\r
}`,title:"AI-Driven Discovery of Drug Compounds: A Computational Biology Approach",author:"Martinez, Bob and Doe, Jane",booktitle:"Proceedings of the International Conference on Bioinformatics and Computational Biology (ICBCB)",pages:"432--440",year:"2025",organization:"Springer"},{id:"lee2024education",type:"inproceedings",raw:`@inproceedings{lee2024education,\r
  title={Adaptive Learning Systems: Leveraging AI for Personalized Education},\r
  author={Lee, Ethan and Doe, Jane},\r
  booktitle={Proceedings of the International Conference on Artificial Intelligence in Education (AIED)},\r
  pages={101--110},\r
  year={2024},\r
  organization={Springer}\r
}`,title:"Adaptive Learning Systems: Leveraging AI for Personalized Education",author:"Lee, Ethan and Doe, Jane",booktitle:"Proceedings of the International Conference on Artificial Intelligence in Education (AIED)",pages:"101--110",year:"2024",organization:"Springer"}],M=[{id:"doe2023ai",type:"article",raw:`@article{doe2023ai,\r
  title={Towards Interpretable AI: Bridging Theory and Practice},\r
  author={Doe, Jane and Lee, Ethan},\r
  journal={Journal of Artificial Intelligence Research (JAIR)},\r
  volume={67},\r
  pages={123--145},\r
  year={2023},\r
  publisher={AI Research Publishing}\r
}`,title:"Towards Interpretable AI: Bridging Theory and Practice",author:"Doe, Jane and Lee, Ethan",journal:"Journal of Artificial Intelligence Research (JAIR)",volume:"67",pages:"123--145",year:"2023",publisher:"AI Research Publishing"},{id:"smith2024autonomy",type:"article",raw:`@article{smith2024autonomy,\r
  title={Autonomous Robots for Healthcare: Challenges and Opportunities},\r
  author={Smith, John and Nguyen, Charlie},\r
  journal={Robotics and Automation Letters (RAL)},\r
  volume={9},\r
  number={2},\r
  pages={290--310},\r
  year={2024},\r
  publisher={IEEE}\r
}`,title:"Autonomous Robots for Healthcare: Challenges and Opportunities",author:"Smith, John and Nguyen, Charlie",journal:"Robotics and Automation Letters (RAL)",volume:"9",number:"2",pages:"290--310",year:"2024",publisher:"IEEE"},{id:"patel2023networks",type:"article",raw:`@article{patel2023networks,\r
  title={Social Network Analysis for Misinformation Detection: A Data-Driven Approach},\r
  author={Patel, Diana and Wang, Fiona},\r
  journal={Social Network Analysis and Mining (SNAM)},\r
  volume={15},\r
  number={6},\r
  pages={789--805},\r
  year={2023},\r
  publisher={Springer}\r
}`,title:"Social Network Analysis for Misinformation Detection: A Data-Driven Approach",author:"Patel, Diana and Wang, Fiona",journal:"Social Network Analysis and Mining (SNAM)",volume:"15",number:"6",pages:"789--805",year:"2023",publisher:"Springer"},{id:"martinez2025genomics",type:"article",raw:`@article{martinez2025genomics,\r
  title={Genomic Data Analysis Using Machine Learning: A Roadmap for Precision Medicine},\r
  author={Martinez, Bob and Doe, Jane},\r
  journal={Nature Computational Biology},\r
  volume={13},\r
  number={1},\r
  pages={56--72},\r
  year={2025},\r
  publisher={Springer}\r
}`,title:"Genomic Data Analysis Using Machine Learning: A Roadmap for Precision Medicine",author:"Martinez, Bob and Doe, Jane",journal:"Nature Computational Biology",volume:"13",number:"1",pages:"56--72",year:"2025",publisher:"Springer"},{id:"johnson2024healthcare",type:"article",raw:`@article{johnson2024healthcare,\r
  title={Reinforcement Learning for Adaptive Healthcare Systems},\r
  author={Johnson, Alice and Smith, John},\r
  journal={Transactions on Machine Learning Research (TMLR)},\r
  volume={16},\r
  number={3},\r
  pages={45--67},\r
  year={2024},\r
  publisher={TMLR}\r
}`,title:"Reinforcement Learning for Adaptive Healthcare Systems",author:"Johnson, Alice and Smith, John",journal:"Transactions on Machine Learning Research (TMLR)",volume:"16",number:"3",pages:"45--67",year:"2024",publisher:"TMLR"}];function J(e){return y({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",clipRule:"evenodd"},child:[]}]})(e)}const B=()=>e=>e.hasHashtag?"120px":"20px",N=c("div")({name:"Container",class:"c12yhtrs",propsAsIs:!1,vars:{"c12yhtrs-0":[B()]}}),W=c("span")({name:"Link",class:"lnsxhty",propsAsIs:!1}),U=c("span")({name:"Hashtag",class:"h1utybq",propsAsIs:!1}),u=e=>{const{level:r=1,children:t,hashtag:a,...i}=e,o=`h${r}`,s=()=>{if(a&&window){const d=new URL(location.origin+location.pathname);d.hash=a,window.history.pushState({},"",d)}};return n.jsxs(N,{...i,children:[a&&n.jsx(U,{id:a}),n.jsxs(o,{onMouseEnter:d=>{const l=d.currentTarget.querySelector(".heading-link");l&&(l.style.opacity="1")},onMouseLeave:d=>{const l=d.currentTarget.querySelector(".heading-link");l&&(l.style.opacity="0")},children:[n.jsx(W,{className:"heading-link",role:"button",onClick:s,tabIndex:0,children:n.jsx(J,{size:20})}),t]})]})};function F(){return n.jsxs(n.Fragment,{children:[n.jsx(u,{hashtag:"working",children:n.jsx(p,{children:({locale:e})=>e==="zh"?"工作中的出版物":e==="ja"?"作業中の出版物":"Working Publications"})}),n.jsx(h,{entries:L,headCharacter:"W"}),n.jsx(u,{hashtag:"journal",children:n.jsx(p,{children:({locale:e})=>e==="zh"?"期刊论文":e==="ja"?"ジャーナル論文":"Journal Papers"})}),n.jsx(h,{entries:M,headCharacter:"J"}),n.jsx(u,{hashtag:"conf",children:n.jsx(p,{children:({locale:e})=>e==="zh"?"会议论文":e==="ja"?"会議論文":"Conference Papers"})}),n.jsx(h,{entries:R,headCharacter:"C"})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"})),le={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:v}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:S}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:P}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/publications/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:H}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layout/Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:b}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Fictional Lab"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:A}}};export{le as configValuesSerialized};
