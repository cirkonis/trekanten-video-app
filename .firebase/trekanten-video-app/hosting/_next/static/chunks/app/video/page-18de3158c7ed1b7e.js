(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[272],{7891:function(e,t,n){Promise.resolve().then(n.bind(n,8604))},8604:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return J},dynamic:function(){return K},fetchCache:function(){return Z}});var s,a,i,r,l,o,c,d,u,m,h=n(7437),x=n(2265),f=n(4660);(s=o||(o={})).UPLOADING_TO_BUCKET="Uploading to bucket",s.UPLOADING_TO_YOUTUBE="Uploading to youtube",s.UPLOADED_TO_YOUTUBE="Uploaded to youtube",s.FAILED_UPLOAD_TO_YOUTUBE="Failed to upload to youtube",s.NEW="New",s.SAVING_DRAFT="Saving Draft",s.SAVED_DRAFT="Saved Draft",s.FAILED_TO_SAVE_DRAFT="Failed to save draft",s.FAILED_UPLOAD_TO_BUCKET="Failed to upload to bucket",s.SAVED_VIDEO_TO_BUCKET="Saved video to bucket",(a=c||(c={})).DRAFT_NOT_MADE="Draft not made",a.DRAFT_SAVED_WITH_NO_VIDEO="Draft saved with no video",a.DRAFT_SAVED_WITH_VIDEO_IN_BUCKET="Draft saved video in bucket",a.NO_LONGER_A_DRAFT="No longer a draft";let p={club:{name:"Trekanten",id:"9747fb19-5a24-4c8f-b049-78072dd70ff6"},title:"",leftFencer:{name:"Left Fencer"},rightFencer:{name:"Right Fencer"},touches:[],url:"",bucketUrl:"",youtubeUrl:"",status:o.NEW,draftStatus:c.DRAFT_NOT_MADE},N=(0,f.Ue)(e=>({...p,setUploadedVideo:t=>e(()=>({url:t})),setFile:t=>e(()=>({file:t})),getFile:()=>e(e=>({file:e.file})),setPlayerRef:t=>e(()=>({playerRef:t})),getPlayerRef:()=>e(e=>({playerRef:e.playerRef})),setDraftStatus:t=>e(()=>({draftStatus:t})),getDraftStatus:()=>e(e=>({draftStatus:e.draftStatus})),getStatus:()=>e(e=>({status:e.status})),setStatus:t=>e(()=>({status:t})),setBucketUrl:t=>e(()=>({bucketUrl:t})),getBucketUrl:()=>e(e=>({bucketUrl:e.bucketUrl})),setYouTubeUrl:t=>e(()=>({youtubeUrl:t})),getYouTubeUrl:()=>e(e=>({youtubeUrl:e.youtubeUrl})),setTitle:t=>e(()=>({title:t})),setVideoId:t=>e(()=>({id:t})),getVideoId:()=>e(e=>({id:e.id})),addTouch:t=>e(e=>({touches:[...e.touches,t]})),removeTouch:t=>e(e=>({touches:e.touches.filter(e=>e!==t)})),editTouch:t=>e(e=>({touches:e.touches.map(e=>e===t?t:e)})),getTouches:()=>e(e=>({touches:e.touches})),getLeftFencer:()=>e(e=>({leftFencer:e.leftFencer})),getRightFencer:()=>e(e=>({rightFencer:e.rightFencer})),setLeftFencer:t=>e(()=>({leftFencer:t})),setRightFencer:t=>e(()=>({rightFencer:t})),resetVideo:()=>e(()=>({...p}))}));function g(e){let{onCreate:t}=e,[n,s]=(0,x.useState)(""),[a,i]=(0,x.useState)(!1),r=async()=>{i(!0);let e=document.getElementById("create-fencer-modal");e&&e.showModal()},l=async()=>{try{await fetch("/api/fencers",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({fencer:{name:n},clubId:"9747fb19-5a24-4c8f-b049-78072dd70ff6"})}).then(e=>e.json()).then(e=>{t(e.name)}).catch(()=>{console.error("Error creating fencer")}),s("")}catch(e){console.error("Error creating fencer:",e)}finally{i(!1);let e=document.getElementById("create-fencer-modal");e&&e.close()}};return(0,h.jsx)("div",{className:"flex w-full justify-center items-center",children:(0,h.jsxs)("div",{className:"flex items-center",children:[(0,h.jsx)("input",{type:"text",className:"input input-bordered",placeholder:"Enter fencer name",value:n,onChange:e=>s(e.target.value)}),(0,h.jsx)("button",{className:"btn btn-secondary ml-4",disabled:a||""===n,onClick:()=>r(),children:"Create Fencer"}),(0,h.jsx)("dialog",{id:"create-fencer-modal",className:"modal",children:(0,h.jsxs)("div",{className:"modal-box flex flex-col w-full",children:[(0,h.jsx)("h3",{className:"font-bold text-lg",children:"Are you sure?"}),(0,h.jsxs)("div",{className:"py-4",children:[(0,h.jsx)("span",{className:"",children:"ready to bring"}),(0,h.jsxs)("span",{className:"font-semibold",children:[" ",n," "]}),(0,h.jsx)("span",{children:"into existence?"})]}),(0,h.jsxs)("div",{className:"modal-action flex w-full justify-between",children:[(0,h.jsx)("form",{method:"dialog",children:(0,h.jsx)("button",{className:"btn btn-danger",children:"Nope"})}),(0,h.jsx)("button",{className:"btn btn-accent",onClick:()=>l(),children:a?"Create Fencer":"Creating..."})]})]})})]})})}let T=(0,f.Ue)(e=>({currentStep:0,setCurrentStep:t=>e({currentStep:t})}));var b=n(5368),j=n(7965),E=n(9978),S=n(5716);let v={apiKey:n(2601).env.FIREBASE_API_KEY,authDomain:"trekanten-video-app.firebaseapp.com",databaseURL:"https://trekanten-video-app-default-rtdb.europe-west1.firebasedatabase.app",projectId:"trekanten-video-app",messagingSenderId:"599078698344",appId:"1:599078698344:web:2cde5b2caa027a19e46add",measurementId:"G-S3TGTBBL1Y",storageBucket:"gs://trekanten-video-app.appspot.com"},_=(0,j.ZF)(v),A=(0,E.ad)(_);async function y(){let e=await (0,b.PL)((0,b.hJ)(A,"fencers")),t=[];return e.forEach(e=>{t.push(e.data())}),t}(0,S.cF)(_);var I=n(1872);async function w(e){try{let t=await (0,b.ET)((0,b.hJ)(A,"fencers"),{id:e.id,name:e.name});console.log("Document written with ID: ",t.id)}catch(e){console.error("Error adding document: ",e)}}async function F(e){try{if(!e.id)throw Error("Video ID is undefined.");let t=(0,b.IO)((0,b.hJ)(A,"videos"),(0,b.ar)("id","==",e.id)),n=await (0,b.PL)(t);if(n.empty)throw Error("No documents found with the provided video ID.");let s=n.docs[0];e.touches&&(e.touches=JSON.stringify(e.touches)),await (0,b.r7)((0,b.JU)(s.ref.firestore,"videos",s.id),e)}catch(e){throw console.error("Error updating document: ",e),e}}function D(){let[e,t]=(0,x.useState)([]),[n,s]=(0,x.useState)(!0),a=N(e=>e.leftFencer),i=N(e=>e.rightFencer),r=T(e=>e.setCurrentStep),[l,c]=(0,x.useState)(null),d=t=>{let n=e.find(e=>e.id===t);n?N.getState().setLeftFencer(n):console.error("Error setting left fencer")},u=t=>{let n=e.find(e=>e.id===t);n?N.getState().setRightFencer(n):console.error("Error setting right fencer")},m=async e=>{try{await w({id:(0,I.Z)(),name:e})}catch(e){console.error("Error creating fencer:",e)}t(t=>[...t,{id:"new-id",name:e}])},f=async()=>{c(o.SAVING_DRAFT);let e={id:N.getState().id,leftFencer:N.getState().leftFencer,rightFencer:N.getState().rightFencer};try{await F(e),c(o.SAVED_DRAFT),r(2)}catch(e){c(o.FAILED_TO_SAVE_DRAFT),console.error("Error saving draft:",e)}};return(0,x.useEffect)(()=>{(async()=>{try{let e=await y();t(e)}catch(e){console.error("Error fetching fencers:",e)}finally{s(!1)}})().then(e=>e)},[]),(0,h.jsxs)("div",{className:"flex flex-col w-full my-4 p-4",children:[n?(0,h.jsx)("div",{className:"flex w-full justify-center items-start min-h-[96px]",children:(0,h.jsx)("p",{className:"text-xl font-semibold",children:"\uD83E\uDD3A Fetching Fencers \uD83E\uDD3A"})}):(0,h.jsxs)("div",{className:"flex flex-col",children:[(0,h.jsx)("div",{className:"flex w-full justify-center",children:(0,h.jsx)("p",{className:"text-xl font-semibold",children:"\uD83E\uDD3A Select Fencers \uD83E\uDD3A"})}),(0,h.jsxs)("div",{className:"flex w-full flex-row justify-evenly items-center my-8",children:[(0,h.jsxs)("div",{className:"flex items-center",children:[(0,h.jsx)("label",{htmlFor:"leftFencer",className:"mx-4 text-md font-semibold",children:"Left Fencer:"}),(0,h.jsxs)("select",{id:"leftFencer",className:"select select-bordered",defaultValue:"",onChange:e=>d(e.target.value),disabled:l===o.SAVING_DRAFT,children:[(0,h.jsx)("option",{disabled:!0,value:"",children:"Select Fencer"}),e.filter(e=>e.id!==i.id).map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,h.jsxs)("div",{className:"flex items-center",children:[(0,h.jsx)("label",{htmlFor:"rightFencer",className:"mx-4 text-md font-semibold",children:"Right Fencer:"}),(0,h.jsxs)("select",{id:"rightFencer",className:"select select-bordered",defaultValue:"",onChange:e=>u(e.target.value),disabled:l===o.SAVING_DRAFT,children:[(0,h.jsx)("option",{disabled:!0,value:"",children:"Select Fencer"}),e.filter(e=>e.id!==a.id).map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]})]}),(0,h.jsx)("div",{className:"divider w-full mx-8 font-bold",children:"OR"}),(0,h.jsx)("div",{hidden:l===o.SAVING_DRAFT,className:"flex w-full flex-row justify-evenly items-center my-8",children:(0,h.jsx)(g,{onCreate:m})}),(0,h.jsx)("div",{className:"px-8 flex w-full justify-end",children:(0,h.jsx)("button",{className:"btn btn-primary",onClick:f,disabled:!(a&&i&&e.some(e=>e.id===a.id)&&e.some(e=>e.id===i.id))||l===o.SAVING_DRAFT,children:l===o.SAVING_DRAFT?"Saving draft data \uD83D\uDCBE \uD83E\uDD3A":"Next: Annotate Touces"})})]})}var L=n(429);async function R(e){try{return await (0,b.ET)((0,b.hJ)(A,"videos"),{id:e.id,title:e.title,leftFencer:e.leftFencer,rightFencer:e.rightFencer,touches:JSON.stringify(e.touches),bucketUrl:e.bucketUrl,youtubeUrl:"Not yet uploaded",draftStatus:e.draftStatus,club:e.club}),!0}catch(e){throw console.error("Error adding document: ",e),e}}function C(){let e=N(e=>e.url),t=N(e=>e.setUploadedVideo),n=N(e=>e.title),s=T(e=>e.setCurrentStep),[a,i]=(0,x.useState)(null),[r,l]=(0,x.useState)(null),d=(0,x.useRef)(null);(0,x.useEffect)(()=>{N.getState().setPlayerRef(d)},[]);let u=e=>{N.getState().setTitle(e)},m=async()=>{if(n&&e){i(o.SAVING_DRAFT),N.getState().setVideoId((0,I.Z)()),N.getState().setBucketUrl("videos/".concat(N.getState().id,"/").concat(N.getState().title));let e={id:N.getState().id,title:N.getState().title,leftFencer:N.getState().leftFencer,rightFencer:N.getState().rightFencer,touches:N.getState().touches,bucketUrl:N.getState().bucketUrl,youtubeUrl:"Not yet uploaded",draftStatus:c.DRAFT_SAVED_WITH_NO_VIDEO,club:N.getState().club};try{await R(e),i(o.SAVED_DRAFT),s(1)}catch(e){i(o.FAILED_TO_SAVE_DRAFT),console.error("Error saving draft:",e)}}};return(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{className:"flex items-center w-full justify-start",children:[(0,h.jsx)("h2",{className:"px-8 text-xl",children:"Set video title:"}),(0,h.jsx)("input",{type:"text",placeholder:"Fencer's Fencing",id:"video-form",className:"input input-bordered w-full max-w-xs",value:n,onChange:e=>u(e.target.value),disabled:a===o.SAVING_DRAFT,required:!0})]}),(0,h.jsxs)("div",{className:"w-full flex flex-col justify-evenly items-center my-8 p-16 min-h-[500px]",children:[!e&&(0,h.jsx)("div",{children:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-32 h-32",children:(0,h.jsx)("path",{strokeLinecap:"round",d:"M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"})})}),e&&(0,h.jsx)("div",{children:(0,h.jsx)(L.Z,{ref:d,url:e,onPlaying:()=>{},controls:!0})}),(0,h.jsx)("input",{type:"file",accept:"video/*",className:"mt-6 file-input file-input-bordered w-full max-w-xs",disabled:a===o.SAVING_DRAFT,onChange:e=>{if(null!==e.target.files&&e.target.files.length>0){let n=e.target.files[0];t(URL.createObjectURL(n)),l(n),N.getState().setFile(n)}else console.error("Error uploading video")}})]}),(0,h.jsx)("div",{className:"px-8 flex w-full justify-end",children:(0,h.jsx)("button",{className:"btn btn-primary",onClick:m,disabled:!n||!e||a===o.SAVING_DRAFT,children:a===o.SAVING_DRAFT?"Saving draft data \uD83D\uDCBE \uD83E\uDD3A":"Next: Select Fencers"})})]})}(i=d||(d={})).CENTER_LINE="Center Line",i.LEFT_OF_CENTER_LINE="Left of Center Line",i.RIGHT_OF_CENTER_LINE="Right of Center Line",i.BEHIND_GUARD_LINE_RIGHT="Behind Right Guard Line",i.BEHIND_GUARD_LINE_LEFT="Behind Left Guard Line",i.NEAR_WARNING_LINE_RIGHT="Near Right Warning Line",i.NEAR_WARNING_LINE_LEFT="Near Left Warning Line",i.WARNING_ZONE_RIGHT="In Right Warning Zone",i.WARNING_ZONE_LEFT="In Left Warning Zone",i.BACK_LINE_RIGHT="On Right Back Line",i.BACK_LINE_LEFT="On Left Back Line";let O={type:null,pointAwardedTo:[],touchAgainst:[],sequence:[],videoStartTimeStamp:0,position:d.CENTER_LINE},U=(0,f.Ue)(e=>({...O,setTouchType:t=>e(e=>({type:t})),setPointAwardedTo:t=>e(e=>({pointAwardedTo:t})),setTouchAgainst:t=>e(e=>({touchAgainst:t})),setSequence:t=>e(e=>({sequence:t})),setVideoStartTimeStamp:t=>e(e=>({videoStartTimeStamp:t})),setVideoEndTimeStamp:t=>e(e=>({videoEndTimeStamp:t})),setFencingStartTime:t=>e(e=>({fencingStartTime:t})),setFencingEndTime:t=>e(e=>({fencingEndTime:t})),setPosition:t=>e(e=>({position:t})),getTouchType:()=>e(e=>({type:e.type})),getPointAwardedTo:()=>e(e=>({pointAwardedTo:e.pointAwardedTo})),getTouchAgainst:()=>e(e=>({touchAgainst:e.touchAgainst})),getSequence:()=>e(e=>({sequence:e.sequence})),getVideoStartTimeStamp:()=>e(e=>({videoStartTimeStamp:e.videoStartTimeStamp})),getVideoEndTimeStamp:()=>e(e=>({videoEndTimeStamp:e.videoEndTimeStamp})),getFencingStartTime:()=>e(e=>({fencingStartTime:e.fencingStartTime})),getFencingEndTime:()=>e(e=>({fencingEndTime:e.fencingEndTime})),getPosition:()=>e(e=>({position:e.position})),resetTouch:()=>e({...O})}));function k(e){return"".concat(Math.floor(e/60).toString().padStart(2,"0"),":").concat(Math.floor(e%60).toString().padStart(2,"0"))}function G(){let e=U(e=>e.sequence),t=U(e=>e.setSequence),n=Object.values(u),s=n=>{t([...e,n])},a=n=>{let s=[...e];s.splice(n,1),t(s)};return(0,h.jsxs)("div",{className:"my-4 p-4",children:[(0,h.jsxs)("div",{className:"flex flex-row mb-2 h-9 items-center",children:["Touch sequence:",e.map((e,t)=>(0,h.jsxs)("div",{className:"badge badge-accent mx-2 ",children:[e,(0,h.jsx)("button",{className:"ml-2",onClick:()=>a(t),children:"X"})]},t))]}),(0,h.jsxs)("div",{children:[n.map(e=>(0,h.jsx)("button",{className:"btn btn-info btn-sm m-2",onClick:()=>s(e),children:e},e)),(0,h.jsx)("button",{className:"btn btn-sm btn-warning",onClick:()=>{t([])},children:"Clear Sequence"})]})]})}function H(){let e=U(e=>e.type)||null,t=N(e=>e.leftFencer),n=N(e=>e.rightFencer),s=e=>{switch(U.getState().setTouchType(e),e){case m.SINGLE_TOUCH_LEFT:U.getState().setPointAwardedTo([t]),U.getState().setTouchAgainst([n]);break;case m.SINGLE_TOUCH_RIGHT:U.getState().setPointAwardedTo([n]),U.getState().setTouchAgainst([t]);break;case m.DOUBLE_TOUCH:U.getState().setPointAwardedTo([N.getState().leftFencer,N.getState().rightFencer]);break;case m.NO_TOUCH:U.getState().setTouchAgainst([N.getState().leftFencer,N.getState().rightFencer])}};return(0,h.jsx)("div",{className:"my-2 p-4 flex justify-center",children:(0,h.jsxs)("div",{className:"flex",children:[(0,h.jsxs)("label",{className:"mr-3 flex",children:[(0,h.jsx)("input",{className:"mr-2 radio radio-primary",type:"radio",name:"touchType",value:m.SINGLE_TOUCH_LEFT,checked:e===m.SINGLE_TOUCH_LEFT,onChange:()=>s(m.SINGLE_TOUCH_LEFT)}),"Touch awarded to ",t.name]}),(0,h.jsxs)("label",{className:"mr-3 flex",children:[(0,h.jsx)("input",{className:"mr-2 radio radio-primary",type:"radio",name:"touchType",value:m.SINGLE_TOUCH_RIGHT,checked:e===m.SINGLE_TOUCH_RIGHT,onChange:()=>s(m.SINGLE_TOUCH_RIGHT)}),"Touch awarded to ",n.name]}),(0,h.jsxs)("label",{className:"mr-3 flex",children:[(0,h.jsx)("input",{className:"mr-2 radio radio-primary",type:"radio",name:"touchType",value:m.DOUBLE_TOUCH,checked:e===m.DOUBLE_TOUCH,onChange:()=>s(m.DOUBLE_TOUCH)}),"Double Touch"]}),(0,h.jsxs)("label",{className:"mr-3 flex",children:[(0,h.jsx)("input",{className:"mr-2 radio radio-primary",type:"radio",name:"touchType",value:m.NO_TOUCH,checked:e===m.NO_TOUCH,onChange:()=>s(m.NO_TOUCH)}),"No Touch"]})]})})}function B(){let e=U(e=>e.position),t=e=>{U.getState().setPosition(e)};return(0,h.jsxs)("div",{className:"text-center flex flex-col justify-center items-center",children:[(0,h.jsxs)("h1",{className:"text-lg font-semibold mb-2",children:["Piste Position: ",e]}),(0,h.jsxs)("div",{className:"flex w-[800px] h-24 border-gray-500 border-4 border-solid bg-gray-300 rounded-sm",children:[(0,h.jsx)("div",{onClick:()=>t(d.BACK_LINE_LEFT),className:"tooltip cursor-pointer h-full w-1/12","data-tip":d.BACK_LINE_LEFT}),(0,h.jsx)("div",{onClick:()=>t(d.WARNING_ZONE_LEFT),className:"tooltip cursor-pointer h-full w-3/12 border-solid border-red-500 border-l-2 border-r-2 bg-red-300","data-tip":d.WARNING_ZONE_LEFT}),(0,h.jsx)("div",{onClick:()=>t(d.NEAR_WARNING_LINE_LEFT),className:"tooltip cursor-pointer h-full w-2/12","data-tip":d.NEAR_WARNING_LINE_LEFT}),(0,h.jsx)("div",{onClick:()=>t(d.BEHIND_GUARD_LINE_LEFT),className:"tooltip cursor-pointer h-full w-2/12 border-solid border-gray border-l-2","data-tip":d.BEHIND_GUARD_LINE_LEFT}),(0,h.jsx)("div",{onClick:()=>t(d.LEFT_OF_CENTER_LINE),className:"tooltip cursor-pointer h-full w-4/12 border-solid border-white border-l-4 border-r-4","data-tip":d.LEFT_OF_CENTER_LINE}),(0,h.jsx)("div",{onClick:()=>t(d.CENTER_LINE),className:"tooltip cursor-pointer h-full w-[12px] border-black border-1 border-solid bg-gray-100","data-tip":d.CENTER_LINE}),(0,h.jsx)("div",{onClick:()=>t(d.RIGHT_OF_CENTER_LINE),className:"tooltip cursor-pointer h-full w-4/12 border-solid border-white border-l-4 border-r-4","data-tip":d.RIGHT_OF_CENTER_LINE}),(0,h.jsx)("div",{onClick:()=>t(d.BEHIND_GUARD_LINE_RIGHT),className:"tooltip cursor-pointer h-full w-2/12 border-solid border-gray border-r-2","data-tip":d.BEHIND_GUARD_LINE_RIGHT}),(0,h.jsx)("div",{onClick:()=>t(d.NEAR_WARNING_LINE_RIGHT),className:"tooltip cursor-pointer h-full w-2/12","data-tip":d.NEAR_WARNING_LINE_RIGHT}),(0,h.jsx)("div",{onClick:()=>t(d.WARNING_ZONE_RIGHT),className:"tooltip cursor-pointer h-full w-3/12 border-solid border-red-500 border-l-2 border-r-2 bg-red-300","data-tip":d.WARNING_ZONE_RIGHT}),(0,h.jsx)("div",{onClick:()=>t(d.BACK_LINE_RIGHT),className:"tooltip cursor-pointer h-full w-1/12","data-tip":d.BACK_LINE_RIGHT})]})]})}function V(){let e=N(e=>e.url),t=N(e=>e.playerRef),n=N(e=>e.title),s=N(e=>e.leftFencer),a=N(e=>e.rightFencer),i=U(e=>e.videoStartTimeStamp),r=N(e=>e.touches),[l,c]=(0,x.useState)(""),[d,u]=(0,x.useState)(!1),f=T(e=>e.setCurrentStep),[p,g]=(0,x.useState)(null);(0,x.useEffect)(()=>{let e=e=>{U.getState().setVideoStartTimeStamp(e.playedSeconds)};if(t&&t.current){let n=t.current.getInternalPlayer("video");n&&n.addEventListener("progress",e)}return()=>{if(t&&t.current){let n=t.current.getInternalPlayer("video");n&&n.removeEventListener("progress",e)}}},[t]);let b=e=>{t.current&&t.current.seekTo(e)},j=[...r].sort((e,t)=>e.videoStartTimeStamp-t.videoStartTimeStamp);async function E(e){N.getState().removeTouch(e),await S()}async function S(){g(o.SAVING_DRAFT);let e={id:N.getState().id,touches:N.getState().touches};try{await F(e),g(o.SAVED_DRAFT)}catch(e){g(o.FAILED_TO_SAVE_DRAFT),console.error("Error updating draft touches:",e)}}let v=()=>N.getState().touches.length>0;async function _(){N.getState().addTouch({type:U.getState().type,pointAwardedTo:U.getState().pointAwardedTo,touchAgainst:U.getState().touchAgainst,sequence:U.getState().sequence,videoStartTimeStamp:i,videoEndTimeStamp:U.getState().videoEndTimeStamp,fencingStartTime:U.getState().fencingStartTime,fencingEndTime:U.getState().fencingEndTime,position:U.getState().position}),await S(),U.getState().resetTouch(),u(!1)}return(0,h.jsxs)("div",{className:"flex flex-col w-full pb-24",children:[(0,h.jsxs)("div",{className:"flex flex-row items-center px-8 justify-between",children:[(0,h.jsx)("h1",{className:"text-xl font-semi-bold my-6",children:" Annotate Touches "}),(0,h.jsx)("button",{onClick:()=>{v()?f(3):console.error("Please add a touch to the video before proceeding.")},disabled:!v(),className:"btn btn-primary btn-large",children:"Submit Video"})]}),(0,h.jsxs)("div",{className:"flex flex-col w-full items-center",children:[(0,h.jsx)("h2",{className:"text-xl font-bold my-4",children:n}),(0,h.jsxs)("div",{className:"flex text-lg font-bold w-1/2 justify-between my-6",children:[(0,h.jsx)("p",{children:s.name}),(0,h.jsx)("p",{children:a.name})]}),(0,h.jsx)(L.Z,{ref:t,url:e,onPlaying:()=>{},controls:!0})]}),(0,h.jsx)("div",{className:"divider"}),(0,h.jsx)("div",{className:"flex justify-evenly",children:(0,h.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,h.jsxs)("div",{className:"flex flex-row items-center mb-4",children:[(0,h.jsx)("div",{children:"Touch start time:"}),(0,h.jsxs)("div",{className:"text-xl mx-2",children:[k(i)," "]})]}),(0,h.jsx)("button",{className:"btn btn-accent btn-sm mx-4",onClick:()=>{if(t.current){let e=Math.round(t.current.getCurrentTime());U.getState().setVideoStartTimeStamp(e)}},children:"Set Touch Start Time"})]})}),(0,h.jsx)("div",{className:"divider"}),(0,h.jsx)(G,{}),(0,h.jsx)(H,{}),(0,h.jsx)(B,{}),(0,h.jsx)("div",{className:"flex justify-center mt-8",children:(0,h.jsx)("button",{className:"btn btn-secondary btn-lg",onClick:()=>{!function(){let e=U.getState().type,t=U.getState().sequence,n=U.getState().videoStartTimeStamp;null!==e&&t.length>0&&0!==n?_():(c("Please fill out all touch information before adding."),u(!0))}()},disabled:p===o.SAVING_DRAFT,children:p===o.SAVING_DRAFT?"Saving draft data \uD83D\uDCBE \uD83E\uDD3A":"Add Touch"})}),d&&(0,h.jsxs)("div",{role:"alert",className:"alert alert-error my-2 mx-auto w-1/2 flex justify-center",children:[(0,h.jsx)("svg",{onClick:()=>u(!1),xmlns:"http://www.w3.org/2000/svg",className:"stroke-current shrink-0 h-6 w-6 cursor-pointer",fill:"none",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,h.jsx)("span",{children:l})]}),(0,h.jsx)("div",{className:"divider"}),(0,h.jsxs)("div",{children:[(0,h.jsx)("h1",{className:"text-2xl font-semibold px-8",children:"Touches"}),(0,h.jsx)("div",{children:j.map((e,t)=>(0,h.jsxs)("div",{className:"w-full px-4",children:[(0,h.jsxs)("div",{className:"flex justify-between items-center",children:[(0,h.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,h.jsxs)("h2",{className:"mr-2",children:["Touch ",t+1," - ",k(e.videoStartTimeStamp)]}),(0,h.jsx)("p",{children:e.type}),e.type===m.SINGLE_TOUCH_LEFT||e.type===m.SINGLE_TOUCH_RIGHT?(0,h.jsxs)("p",{children:["for ",e.pointAwardedTo.map(e=>e.name).join(", ")]}):null,(0,h.jsxs)("p",{className:"flex-shrink-0 ml-6",children:["Sequence: ",e.sequence.join(", ")]}),(0,h.jsxs)("p",{className:"flex-shrink-0 ml-6",children:["Piste Position: ",e.position]})]}),(0,h.jsx)("button",{className:"btn btn-info btn-circle btn-small",onClick:()=>b(e.videoStartTimeStamp),children:"Seek To"}),(0,h.jsx)("button",{className:"btn btn-warning btn-circle btn-small",onClick:()=>E(e),children:"\uD83D\uDDD1️"})]}),(0,h.jsx)("div",{className:"divider w-full"})]},t))})]})]})}function P(){return(0,h.jsxs)("div",{className:"flex items-center",children:[(0,h.jsx)("span",{className:"loading loading-ring loading-xs text-info"}),(0,h.jsx)("span",{className:"loading loading-ring loading-sm text-info"}),(0,h.jsx)("span",{className:"loading loading-ring loading-md text-info"}),(0,h.jsx)("span",{className:"loading loading-infinity loading-lg text-info"}),(0,h.jsx)("span",{className:"loading loading-ring loading-md text-info"}),(0,h.jsx)("span",{className:"loading loading-ring loading-sm text-info"}),(0,h.jsx)("span",{className:"loading loading-ring loading-xs text-info"})]})}function W(){let e=N(e=>e.title),t=N(e=>e.leftFencer),n=N(e=>e.rightFencer),s=T(e=>e.setCurrentStep),[a,i]=(0,x.useState)(null),r=[...N(e=>e.touches)].sort((e,t)=>e.videoStartTimeStamp-t.videoStartTimeStamp),l=async()=>{var e;let t,n;let s=N.getState().title,a=(e=N.getState().touches,n="Timestamps\n00:00 Start\n",e.forEach((e,t)=>{let s;let a=e.videoStartTimeStamp,i=Math.floor(a/60),r=a%60,l="".concat(i<10?"0":"").concat(i,":").concat(r<10?"0":"").concat(r),o=e.sequence.join(", ");s=e.pointAwardedTo.length>0?e.pointAwardedTo[0].name:"No one";let c="".concat(l," ").concat(o," to ").concat(s,"\n");n+=c}),n),i=N.getState().file;try{let e=await fetch("/api/auth/token",{method:"GET"});if(!e.ok)throw Error("Failed to fetch token");t=(await e.json()).access_token}catch(e){console.error("Error fetching token:",e)}try{let e=new FormData;e.append("videoFile",i),e.append("videoTitle",s),e.append("videoDescription",a),e.append("token",t),await fetch("/api/tube",{method:"POST",body:e}).then(e=>console.log(e)).catch(()=>{console.error("Error uploading video")})}catch(e){console.error("Error uploading video:",e)}},c=async()=>{let e=document.getElementById("create-video-modal");e&&e.showModal()},d=async()=>{i(o.UPLOADING_TO_YOUTUBE),await l()};return(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{className:" flex w-full justify-evenly mb-4",children:[(0,h.jsx)("button",{onClick:function(){s(2)},className:"btn btn-secondary",children:"Back"}),(0,h.jsx)("button",{onClick:()=>c(),className:"btn btn-primary",children:"Save Video"}),(0,h.jsx)("dialog",{id:"create-video-modal",className:"modal",children:(0,h.jsxs)("div",{className:"modal-box flex flex-col w-full items-center",children:[(0,h.jsx)("h3",{className:"font-bold text-lg",children:a===o.UPLOADING_TO_YOUTUBE?"Kick back, relax, we'll let you know if it works \uD83C\uDF7B":"Are you sure \uD83E\uDD14"}),a===o.UPLOADING_TO_YOUTUBE?(0,h.jsx)(P,{}):(0,h.jsx)("div",{className:"divider"}),(0,h.jsxs)("div",{className:"modal-action flex w-full justify-between",children:[(0,h.jsx)("form",{method:"dialog",children:(0,h.jsx)("button",{hidden:a===o.UPLOADING_TO_YOUTUBE,disabled:a===o.UPLOADING_TO_YOUTUBE,className:"btn btn-danger",children:"Nope"})}),(0,h.jsx)("button",{disabled:a===o.UPLOADING_TO_YOUTUBE,className:"btn btn-accent",onClick:()=>d(),children:a===o.UPLOADING_TO_YOUTUBE?"Uploading to the tube \uD83D\uDCFA \uD83E\uDD3A...":"Finish Video"})]})]})})]}),(0,h.jsxs)("h1",{className:"text-2xl font-semibold px-8 mb-2",children:["Video:",(0,h.jsx)("span",{className:"font-normal text-xl ml-2",children:e})]}),(0,h.jsxs)("h1",{className:"text-2xl font-semibold px-8 mb-2",children:["Fencers:",(0,h.jsxs)("span",{className:"font-normal text-xl ml-2",children:[t.name," & ",n.name]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("h1",{className:"text-2xl font-semibold px-8 mb-2",children:"Touches"}),(0,h.jsx)("div",{className:"px-10",children:r.map((e,t)=>(0,h.jsxs)("div",{className:"w-full px-4",children:[(0,h.jsx)("div",{className:"flex justify-between items-center",children:(0,h.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,h.jsxs)("h2",{className:"mr-2",children:["Touch ",t+1," - ",k(e.videoStartTimeStamp)]}),(0,h.jsx)("p",{children:e.type}),e.type===m.SINGLE_TOUCH_LEFT||e.type===m.SINGLE_TOUCH_RIGHT?(0,h.jsxs)("p",{children:["for ",e.pointAwardedTo.map(e=>e.name).join(", ")]}):null,(0,h.jsxs)("p",{className:"flex-shrink-0 ml-6",children:["Sequence: ",e.sequence.join(", ")]}),(0,h.jsxs)("p",{className:"flex-shrink-0 ml-6",children:["Piste Position: ",e.position]})]})}),(0,h.jsx)("div",{className:"divider w-full"})]},t))})]})]})}(r=u||(u={})).ATTACK="Attack",r.TOUCH="Touch",r.PARRY="Parry",r.RIPOSTE="Riposte",r.COUNTER="Counter",r.BEAT="Beat",r.LINE="Line",r.NO="No",r.SIMULTANEOUS="Simultaneous",r.REMISE="Remise",(l=m||(m={})).SINGLE_TOUCH_LEFT="Touch Left",l.SINGLE_TOUCH_RIGHT="Touch Right",l.DOUBLE_TOUCH="Double Touch",l.NO_TOUCH="No Touch";var q=n(1396),M=n.n(q);function Y(){return(0,h.jsxs)("div",{className:"navbar bg-base-100",children:[(0,h.jsx)("div",{className:"navbar-start",children:(0,h.jsxs)("div",{className:"dropdown",children:[(0,h.jsx)("div",{tabIndex:0,role:"button",className:"btn btn-ghost btn-circle",children:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h7"})})}),(0,h.jsxs)("ul",{tabIndex:0,className:"menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52",children:[(0,h.jsx)("li",{children:(0,h.jsx)(M(),{href:"/",children:"Home"})}),(0,h.jsx)("li",{children:(0,h.jsx)(M(),{href:"/video",children:"Video Annotator"})}),(0,h.jsx)("li",{children:(0,h.jsx)(M(),{href:"/videos",className:"pointer-events-none text-gray-400",children:"Videos"})}),(0,h.jsx)("li",{children:(0,h.jsx)("a",{className:"pointer-events-none text-gray-400",children:"Fencers"})}),(0,h.jsx)("li",{children:(0,h.jsx)("a",{className:"pointer-events-none text-gray-400",children:"Data"})})]})]})}),(0,h.jsx)("div",{className:"navbar-center",children:(0,h.jsx)("a",{className:"btn btn-ghost text-xl",children:"Trekanten Video App"})}),(0,h.jsxs)("div",{className:"navbar-end",children:[(0,h.jsx)("button",{disabled:!0,className:"btn btn-ghost btn-circle",children:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),(0,h.jsx)("button",{disabled:!0,className:"btn btn-ghost btn-circle display",children:(0,h.jsx)("div",{className:"indicator",children:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"})})})})]})]})}let K="force-dynamic",Z="force-no-store";function J(){let e=T(e=>e.currentStep),t=T(e=>e.setCurrentStep),n=[{label:"Choose Video",components:[(0,h.jsx)(C,{})]},{label:"Select Fencers",components:[(0,h.jsx)(D,{})]},{label:"Annotate Touches",components:[(0,h.jsx)(V,{})]},{label:"Submit",components:[(0,h.jsx)(W,{})]}];return(0,h.jsxs)("div",{children:[(0,h.jsx)(Y,{}),(0,h.jsx)("h1",{className:"text-3xl px-8 mt-4",children:"Video Annotator"}),(0,h.jsx)("ul",{className:"steps w-full my-6",children:n.map((n,s)=>(0,h.jsx)("li",{className:"step ".concat(s<=e?"step-primary":""),onClick:()=>t(s),children:n.label},s))}),(0,h.jsx)("div",{className:"divider mb-6"}),n.map((t,n)=>n===e&&t.components.map((e,t)=>(0,h.jsx)("div",{children:e},t)))]})}}},function(e){e.O(0,[358,250,607,971,938,744],function(){return e(e.s=7891)}),_N_E=e.O()}]);