import{Q as C}from"./QSkeleton-Dg5Bz9Qg.js";import{a6 as G,a7 as v,al as D,am as p,a9 as l,af as A,ac as y,a8 as N,ab as Q,ag as U,aj as $,ak as B,au as b,T as f,aB as M,ax as L,ay as S,O as h,U as x}from"./index-DlQ8tVOz.js";import{L as O}from"./ListQTable-DSPopQvG.js";import{Q as R}from"./QCardDetails-w4QDk8iC.js";import{a as V}from"./Product-BVt3vq-5.js";import{g as j}from"./index-wVk5-s-q.js";import"./QSelect-B9DBrxqc.js";import"./use-key-composition-4VZXaA1o.js";import"./QChip-Cw-nA85J.js";import"./QItemLabel-CWFH1t2i.js";import"./QDialog-1bsBaQz_.js";import"./QToggle-Uap1FPWi.js";import"./dark-mode-C5mcaMLC.js";import"./QMarkupTable-DWmtGMs-.js";import"./ClosePopup-WKUFvClg.js";import"./QPagination-4qWxjayh.js";import"./QCard-Cs9621IB.js";import"./QSeparator-BlxbP3Q5.js";import"./QCardSection-C1H36PMc.js";import"./QCardActions-YMlVNL1k.js";import"./QFile-Cv-ueZ0J.js";import"./parser-yifRV-tr.js";const W=j`
mutation GetATUpdateProductMutation(
  $autotask_id: Int!
) {
  GetATUpdateProductMutation(
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
    ImplementationGuidelines {
      Name
      Question
      IncludeByDefault
      _id
      IsDeprecated
      isDraft
      ImpGuidelineSubtotal
    }
  }
}
`,q=v({components:{ListQTable:O,QCardDetails:R},setup(){const t=$(),g=B(),d=b({name:"",skill_id:null,showSkillModal:!1,showTaskModal:!1,showUpdateTaskModal:!1,limit:10,page:1,guideline_id:parseInt(t.query.id)}),s=f({}),u=f(!0),r=f([]),{result:o}=M(V,()=>({autotask_id:parseInt(t.params.id)}));L(()=>{o.value&&(u.value=!1,o.value.Product?s.value=o.value.Product:o.value.GetATUpdateProduct&&(s.value=o.value.GetATUpdateProduct),r.value=s.value.ImplementationGuidelines)});const c=[{label:"Get Update From AT",handler:()=>{w()}}],{mutate:w,onDone:k}=S(W,()=>({variables:{autotask_id:parseInt(t.params.id)}}));k(e=>{console.log(e,"result"),e.data&&e.data.GetATUpdateProduct&&(o.value=e.data.GetATUpdateProductMutation)});function T(e){d.page=e}function _(e,a,n){n.ctrlKey||n.button===1||n==="openNewTab"?window.open(`implementation-type/guideline/${e}`,"_blank"):n==="openNewWindow"?window.open(`implementation-type/guideline/${e}`,"_blank","width=full,height=full"):n==="openIncognitoWindow"?window.open(`implementation-type/guideline/${e}`,"_blank","incognito=yes"):n.button!==2&&g.push({name:"GuidelineDetails",params:{id:e}})}const i=b([{name:"name",align:"left",label:"Name",field:e=>e.Name,format:e=>`${e}`,sortable:!0},{name:"default",required:!0,label:"Include by Default",align:"left",field:e=>e.IncludeByDefault?"Yes":"No",format:e=>`${e}`,sortable:!0},{name:"status",label:"Status",align:"center",field:e=>e.IsDeprecated?"Deprecated":e.isDraft?"Draft":"Active"},{name:"actions",label:"Actions",align:"center"}]),m=h("windowWidth"),I=h("formatTotal"),P=()=>{if(m.value<=600){const e=i.findIndex(a=>a.name==="default");e!==-1&&i.splice(e,1)}else i.find(a=>a.name==="default")||i.splice(1,0,{name:"default",label:"Include by Default",field:a=>a.IncludeByDefault?"Yes":"No",sortable:!0});if(m.value<=500){const e=i.findIndex(a=>a.name==="status");e!==-1&&i.splice(e,1)}else i.find(a=>a.name==="status")||i.splice(1,0,{name:"status",label:"Status",field:a=>a.IsDeprecated?"Deprecated":a.isDraft?"Draft":"Active",sortable:!0})};return x(()=>m.value,()=>{P()},{immediate:!0}),{state:d,route:t,loading:u,goToGuideline:_,setPage:T,product:s,guidelines:r,columns:i,formatTotal:I,productData:o,getATUpdate:w,dynamicDropdownOptions:c}}}),E={class:"flex justify-center mx-3 sm:mx-12",style:{width:"100%"}},Y={style:{width:"100%"}},F={key:0,class:"mb-8 text-center text-2xl dark:text-[#CBD5E1]"},K={key:1,class:"flex justify-center"};function z(t,g,d,s,u,r){const o=D("QCardDetails"),c=D("ListQTable");return l(),p("div",E,[A("div",Y,[t.loading?(l(),p("div",K,[y(C,{class:"mb-8 h-3 w-80"})])):(l(),p("p",F,U(t.product.name),1)),y(o,{response:t.product,dynamicDropdownOptions:t.dynamicDropdownOptions,isLoading:t.loading},null,8,["response","dynamicDropdownOptions","isLoading"]),t.guidelines?(l(),N(c,{key:2,title:"Related Guidelines",rows:t.guidelines,columns:t.columns,handleRowClick:t.goToGuideline,stateValue:t.state,setPage:t.setPage,loading:t.state.searchLoading,customNoDataText:"Searching for Guidelines..."},null,8,["rows","columns","handleRowClick","stateValue","setPage","loading"])):Q("",!0)])])}const ye=G(q,[["render",z]]);export{ye as default};
