import{Q as A}from"./QSkeleton-Coym0GAQ.js";import{a6 as G,a7 as M,al as g,am as I,a9 as u,af as b,ab as v,ac as Q,a8 as w,ag as U,aj as N,au as y,T as D,aB as R,ay as $,ax as L,ak as O,O as j,U as E,E as x}from"./index-BmmqEUwr.js";import{L as P}from"./ListQTable-CU9pwRms.js";import{Q as V}from"./QCardDetails-C0QU-irT.js";import{a as W}from"./ServiceBundle-CyCxQ6nM.js";import{g as q}from"./index-DO6kqxPy.js";import"./QSelect-BiYUipAn.js";import"./use-key-composition-DGnxYdx2.js";import"./QChip-CEk8Ad1K.js";import"./QItemLabel-Da11J6wT.js";import"./QDialog-DNaj6pyy.js";import"./QToggle-CHdCZyvb.js";import"./dark-mode-CG8Py2TO.js";import"./QMarkupTable-CqW4FPo6.js";import"./ClosePopup-Dl7x5pRy.js";import"./QPagination-BPciSIuB.js";import"./QCard-71HNS0Eo.js";import"./QSeparator-DcnsD_Wj.js";import"./QCardSection-W7OKuTbN.js";import"./QCardActions-gAV4t4Gq.js";import"./QFile-Dpo0hu6w.js";import"./parser-4S4bR1x6.js";const F=q`
mutation GetATUpdateServiceBundleMutation(
  $autotask_id: Int!
) {
  GetATUpdateServiceBundleMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    name
    createDate
    isActive
    description
    lastModifiedDate
    percentageDiscount
    periodType
    unitCost
    unitDiscount
    unitPrice
    created_at
    updated_at
    __typename
    invoiceDescription
    # serviceLevelAgreementID
    # updateResourceID
    # billingCodeID
    # creatorResourceID
    AdminImplementationGuidelines {
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
`,Y=M({name:"ServiceBundleDetails",components:{ListQTable:P,QCardDetails:V},setup(){const t=N(),r=y({name:"",skill_id:null,showSkillModal:!1,showTaskModal:!1,showUpdateTaskModal:!1,limit:10,page:1,guideline_id:parseInt(t.query.id)}),o=D(null),c=D(null),m=D(!0),{result:s,error:l}=R(W,()=>({autotask_id:parseInt(t.params.id)})),p=[{label:"Get Update From AT",handler:()=>{B()}}],{mutate:B,onDone:h}=$(F,()=>({variables:{autotask_id:parseInt(t.params.id)}}));h(e=>{e.data&&e.data.GetATUpdateServiceBundleMutation&&(s.value=e.data.GetATUpdateServiceBundleMutation)}),L(()=>{l.value&&console.log(l.value,"ERR"),s.value&&(m.value=!1,s.value.ServiceBundle?o.value=s.value.ServiceBundle:s.value.GetATUpdateServiceBundleMutation&&(o.value=s.value.GetATUpdateServiceBundleMutation),c.value=o.value.AdminImplementationGuidelines)});function _(e){r.page=e}const k=O();function S(e,a,n){n.ctrlKey||n.button===1||n==="openNewTab"?window.open(`implementation-type/guideline/${e}`,"_blank"):n==="openNewWindow"?window.open(`implementation-type/guideline/${e}`,"_blank","width=full,height=full"):n==="openIncognitoWindow"?window.open(`implementation-type/guideline/${e}`,"_blank","incognito=yes"):n.button!==2&&k.push({name:"GuidelineDetails",params:{id:e}})}const i=y([{name:"name",align:"left",label:"Name",field:e=>e.Name,format:e=>`${e}`,sortable:!0},{name:"default",required:!0,label:"Include by Default",align:"left",field:e=>e.IncludeByDefault?"Yes":"No",format:e=>`${e}`,sortable:!0},{name:"status",label:"Status",align:"center",field:e=>e.IsDeprecated?"Deprecated":e.isDraft?"Draft":"Active"},{name:"actions",label:"Actions",align:"center"}]),f=j("windowWidth"),C=()=>{if(f.value<=600){const e=i.findIndex(a=>a.name==="default");e!==-1&&i.splice(e,1)}else i.find(a=>a.name==="default")||i.splice(1,0,{name:"default",label:"Include by Default",field:a=>a.IncludeByDefault?"Yes":"No",sortable:!0});if(f.value<=500){const e=i.findIndex(a=>a.name==="status");e!==-1&&i.splice(e,1)}else i.find(a=>a.name==="status")||i.splice(1,0,{name:"status",label:"Status",field:a=>a.IsDeprecated?"Deprecated":a.isDraft?"Draft":"Active",sortable:!0})};E(()=>f.value,()=>{C()},{immediate:!0});const T=x(()=>{const e=["id","CreatorResourceID","UpdateResourceID","ServiceLevelAgreementID","AllocationCodeID","InvoiceDescription","ImplementationGuidelineServiceBundles","ImplementationGuidelines","AdminImplementationGuidelines"],a=Object.keys(o.value).filter(d=>!e.includes(d)),n={};return a.forEach(d=>{n[d]=o.value[d]}),n});return{serviceBundle:o,guidelines:c,columns:i,state:r,loading:m,setPage:_,goToGuideline:S,computedServiceBundleFields:T,dynamicDropdownOptions:p}}}),K={class:"flex justify-center mx-3 sm:mx-12 animate__animated animate__fadeIn",style:{width:"100%"}},z={style:{width:"100%"}},H={key:0,class:"mb-8 text-center text-2xl dark:text-[#CBD5E1]"},J={class:"flex justify-center"};function X(t,r,o,c,m,s){const l=g("QCardDetails"),p=g("ListQTable");return u(),I("div",K,[b("div",z,[t.loading?v("",!0):(u(),I("p",H,U(t.serviceBundle?.name),1)),b("div",J,[t.loading?(u(),w(A,{key:0,class:"mb-8 h-3 w-80"})):v("",!0)]),Q(l,{response:t.serviceBundle,dynamicDropdownOptions:t.dynamicDropdownOptions,isLoading:t.loading},null,8,["response","dynamicDropdownOptions","isLoading"]),t.guidelines?(u(),w(p,{key:1,title:"Related Guidelines",rows:t.guidelines,columns:t.columns,handleRowClick:t.goToGuideline,stateValue:t.state,setPage:t.setPage,loading:t.state.searchLoading,customNoDataText:"Searching for Guidelines..."},null,8,["rows","columns","handleRowClick","stateValue","setPage","loading"])):v("",!0)])])}const ye=G(Y,[["render",X]]);export{ye as default};
