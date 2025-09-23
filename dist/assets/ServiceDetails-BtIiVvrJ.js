import{Q as A}from"./QSkeleton-CQslW_MF.js";import{a6 as N,a7 as Q,al as v,am as w,a9 as r,af as D,ab as p,ac as M,a8 as y,ag as U,aj as $,ak as B,au as b,T as f,aB as L,ax as P,ay as O,O as h,U as R}from"./index-D5yNAYFk.js";import{L as V}from"./ListQTable-DMWwlCDO.js";import{Q as j}from"./QCardDetails-Ce5jk6kc.js";import{a as x}from"./Service-ML5WoMLL.js";import{g as W}from"./index-B22rUDyO.js";import"./QSelect-BmmHhKDO.js";import"./use-key-composition-COT35ogy.js";import"./QChip-DHC18oyq.js";import"./QItemLabel-Cx7oXb7e.js";import"./QDialog-B5BoQEQA.js";import"./QToggle-DbLruOcG.js";import"./dark-mode-Cd1QLq0S.js";import"./QMarkupTable-DvjuvEMf.js";import"./ClosePopup-1nkdbb7J.js";import"./QPagination-CnwpqxMf.js";import"./QCard-CbW7iEIi.js";import"./QSeparator-NQtf9fTk.js";import"./QCardSection-Bxs731jM.js";import"./QCardActions-prSYt9ud.js";import"./QFile-UolSkRB9.js";import"./parser-Dz45C1v8.js";const q=W`
mutation GetATUpdateServiceMutation(
  $autotask_id: Int!
) {
  GetATUpdateServiceMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    name
    description
    created_at
    updated_at
    isActive
    periodType
    PeriodTypeName
    unitPrice
    unitCost
    ImplementationGuidelineServices {
      ImplementationGuideline {
        Name
        Question
        IncludeByDefault
        id
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
      }
    }
  }
}
`,E=Q({components:{ListQTable:V,QCardDetails:j},setup(){const t=$(),g=B(),d=b({name:"",skill_id:null,showSkillModal:!1,showTaskModal:!1,showUpdateTaskModal:!1,limit:10,page:1,guideline_id:t.query.id}),s=f({}),u=f([]),m=f(!0),{result:i,error:l}=L(x,()=>({autotask_id:parseInt(t.params.id)}));P(()=>{l.value&&console.log(l.value),i.value&&(m.value=!1,i.value.Service?s.value=i.value.Service:i.value.GetATUpdateServiceMutation&&(s.value=i.value.GetATUpdateServiceMutation),u.value=s.value.ImplementationGuidelineServices.map(e=>({...e.ImplementationGuideline})))});const k=[{label:"Get Update From AT",handler:()=>{T()}}],{mutate:T,onDone:I}=O(q,()=>({variables:{autotask_id:parseInt(t.params.id)}}));I(e=>{e.data&&e.data.GetATUpdateServiceMutation&&(i.value=e.data.GetATUpdateServiceMutation)});function S(e){d.page=e}function _(e,a,n){n.ctrlKey||n.button===1||n==="openNewTab"?window.open(`implementation-type/guideline/${e}`,"_blank"):n==="openNewWindow"?window.open(`implementation-type/guideline/${e}`,"_blank","width=full,height=full"):n==="openIncognitoWindow"?window.open(`implementation-type/guideline/${e}`,"_blank","incognito=yes"):n.button!==2&&g.push({name:"GuidelineDetails",params:{id:e}})}const o=b([{name:"name",align:"left",label:"Name",field:e=>e.Name,format:e=>`${e}`,sortable:!0},{name:"default",required:!0,label:"Include by Default",align:"left",field:e=>e.IncludeByDefault?"Yes":"No",format:e=>`${e}`,sortable:!0},{name:"status",label:"Status",align:"center",field:e=>e.IsDeprecated?"Deprecated":e.isDraft?"Draft":"Active"},{name:"actions",label:"Actions",align:"center"}]),c=h("windowWidth"),G=h("formatTotal"),C=()=>{if(c.value<=600){const e=o.findIndex(a=>a.name==="default");e!==-1&&o.splice(e,1)}else o.find(a=>a.name==="default")||o.splice(1,0,{name:"default",label:"Include by Default",field:a=>a.IncludeByDefault?"Yes":"No",sortable:!0});if(c.value<=500){const e=o.findIndex(a=>a.name==="status");e!==-1&&o.splice(e,1)}else o.find(a=>a.name==="status")||o.splice(1,0,{name:"status",label:"Status",field:a=>a.IsDeprecated?"Deprecated":a.isDraft?"Draft":"Active",sortable:!0})};return R(()=>c.value,()=>{C()},{immediate:!0}),{state:d,route:t,goToGuideline:_,setPage:S,service:s,columns:o,formatTotal:G,serviceData:i,guidelines:u,dynamicDropdownOptions:k,loading:m}}}),Y={class:"flex justify-center mx-3 sm:mx-12",style:{width:"100%"}},F={style:{width:"100%"}},K={key:0,class:"mb-8 text-center text-2xl dark:text-[#CBD5E1]"},z={class:"flex justify-center"};function H(t,g,d,s,u,m){const i=v("QCardDetails"),l=v("ListQTable");return r(),w("div",Y,[D("div",F,[t.loading?p("",!0):(r(),w("p",K,U(t.service.name),1)),D("div",z,[t.loading?(r(),y(A,{key:0,class:"mb-8 h-3 w-80"})):p("",!0)]),M(i,{response:t.service,dynamicDropdownOptions:t.dynamicDropdownOptions,isLoading:t.loading},null,8,["response","dynamicDropdownOptions","isLoading"]),t.guidelines?(r(),y(l,{key:1,title:"Related Guidelines",rows:t.guidelines,columns:t.columns,handleRowClick:t.goToGuideline,stateValue:t.state,setPage:t.setPage,loading:t.state.searchLoading,customNoDataText:"Searching for Guidelines..."},null,8,["rows","columns","handleRowClick","stateValue","setPage","loading"])):p("",!0)])])}const ye=N(E,[["render",H]]);export{ye as default};
