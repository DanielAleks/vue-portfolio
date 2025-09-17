import{E as l,D as T,O as x,aV as A,aW as p,N as C,F as i,ao as $,Q as N,J as q,X as R,Z as k,T as h,aX as j,a1 as Q,G as F,aw as E}from"./index-CQCl7-n1.js";import{g as S}from"./index-BAc7fDxH.js";const Y=["top","right","bottom","left"],m={type:{type:String,default:"a"},outline:Boolean,push:Boolean,flat:Boolean,unelevated:Boolean,color:String,textColor:String,glossy:Boolean,square:Boolean,padding:String,label:{type:[String,Number],default:""},labelPosition:{type:String,default:"right",validator:e=>Y.includes(e)},externalLabel:Boolean,hideLabel:{type:Boolean},labelClass:[Array,String,Object],labelStyle:[Array,String,Object],disable:Boolean,tabindex:[Number,String]};function P(e,a){return{formClass:l(()=>`q-fab--form-${e.square===!0?"square":"rounded"}`),stacked:l(()=>e.externalLabel===!1&&["top","bottom"].includes(e.labelPosition)),labelProps:l(()=>{if(e.externalLabel===!0){const r=e.hideLabel===null?a.value===!1:e.hideLabel;return{action:"push",data:{class:[e.labelClass,`q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${e.labelPosition}`+(r===!0?" q-fab__label--external-hidden":"")],style:e.labelStyle}}}return{action:["left","top"].includes(e.labelPosition)?"unshift":"push",data:{class:[e.labelClass,`q-fab__label q-fab__label--internal q-fab__label--internal-${e.labelPosition}`+(e.hideLabel===!0?" q-fab__label--internal-hidden":"")],style:e.labelStyle}}})}}const O={start:"self-end",center:"self-center",end:"self-start"},V=Object.keys(O),z=T({name:"QFabAction",props:{...m,icon:{type:String,default:""},anchor:{type:String,validator:e=>V.includes(e)},to:[String,Object],replace:Boolean},emits:["click"],setup(e,{slots:a,emit:r}){const t=x(p,()=>({showing:{value:!0},onChildClick:A})),{formClass:s,labelProps:c}=P(e,t.showing),u=l(()=>{const o=O[e.anchor];return s.value+(o!==void 0?` ${o}`:"")}),d=l(()=>e.disable===!0||t.showing.value!==!0);function b(o){t.onChildClick(o),r("click",o)}function g(){const o=[];return a.icon!==void 0?o.push(a.icon()):e.icon!==""&&o.push(i(N,{name:e.icon})),(e.label!==""||a.label!==void 0)&&o[c.value.action](i("div",c.value.data,a.label!==void 0?a.label():[e.label])),q(a.default,o)}const f=C();return Object.assign(f.proxy,{click:b}),()=>i($,{class:u.value,...e,noWrap:!0,stack:e.stacked,icon:void 0,label:void 0,noCaps:!0,fabMini:!0,disable:d.value,onClick:b},g)}}),H=["up","right","down","left"],W=["left","center","right"],J=T({name:"QFab",props:{...m,...k,icon:String,activeIcon:String,hideIcon:Boolean,hideLabel:{...m.hideLabel,default:null},direction:{type:String,default:"right",validator:e=>H.includes(e)},persistent:Boolean,verticalActionsAlign:{type:String,default:"center",validator:e=>W.includes(e)}},emits:R,setup(e,{slots:a}){const r=h(null),t=h(e.modelValue===!0),s=j(),{proxy:{$q:c}}=C(),{formClass:u,labelProps:d}=P(e,t),b=l(()=>e.persistent!==!0),{hide:g,toggle:f}=Q({showing:t,hideOnRouteChange:b}),o=l(()=>({opened:t.value})),I=l(()=>`q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${u.value}`+(t.value===!0?" q-fab--opened":" q-fab--closed")),B=l(()=>`q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${t.value===!0?"opened":"closed"}`),L=l(()=>{const n={id:s.value,role:"menu"};return t.value!==!0&&(n["aria-hidden"]="true"),n}),M=l(()=>`q-fab__icon-holder  q-fab__icon-holder--${t.value===!0?"opened":"closed"}`);function v(n,_){const y=a[n],w=`q-fab__${n} absolute-full`;return y===void 0?i(N,{class:w,name:e[_]||c.iconSet.fab[_]}):i("div",{class:w},y(o.value))}function D(){const n=[];return e.hideIcon!==!0&&n.push(i("div",{class:M.value},[v("icon","icon"),v("active-icon","activeIcon")])),(e.label!==""||a.label!==void 0)&&n[d.value.action](i("div",d.value.data,a.label!==void 0?a.label(o.value):[e.label])),q(a.tooltip,n)}return E(p,{showing:t,onChildClick(n){g(n),n?.qAvoidFocus!==!0&&r.value?.$el.focus()}}),()=>i("div",{class:I.value},[i($,{ref:r,class:u.value,...e,noWrap:!0,stack:e.stacked,align:void 0,icon:void 0,label:void 0,noCaps:!0,fab:!0,"aria-expanded":t.value===!0?"true":"false","aria-haspopup":"true","aria-controls":s.value,onClick:f},D),i("div",{class:B.value,...L.value},F(a.default))])}}),K=S`
  query ($_id: String!) {
    Sow(_id: $_id) {
      _id
      Name
      account_id
      LaborContractType
      Version
      cdw_am_id
      updated_at
      created_at
      opportunity_id
      ProjectManagerName
      SalespersonName
      Tier1Rate
      Tier2Rate
      Tier3Rate
      InfrastructureRate
      ProjectManagerRate
      ConsultantRate
      AfterHoursRate
      MilestoneType
      SowHardwareAmount
      SowServiceAmount
      CompanyHasSignedContactForm
      SowProject {
        project_id
        StartDateTime
        EndDateTime
      }
      Overview
      CdwAmEmail
      MilestoneTypeName
      CanBeRenewed
      AnnualTotal
      probability
      internalNotes
      PrimaryQuote {
        autotask_id
        effectiveDate
        expirationDate
      }
      Company {
        companyName
        ownerResourceID
        OwnerName
      }
      Opportunity {
        StatusName
        StageName
        title
      }
      LatestSignableSowDocument {
        _id
        original_name
        version
        DropboxSignatureRequestStatus
        DropboxSignatureRequestSentDate
        DropboxSignatureRequestSignedAt
        DropboxSignatureRequestID
      }
    }
  }
`,U=S`
  query Sows(
    $Name: String
    $first: Int
    $page: Int
    $account_id: Int
    $salesperson_id: String
    $orderBy: [QuerySowsOrderByOrderByClause!]
  ) {
    Sows(
      Name: $Name
      first: $first
      page: $page
      account_id: $account_id
      salesperson_id: $salesperson_id
      # date: $date
      orderBy: $orderBy # orderBy: [{ column: ID, order: DESC }]
    ) {
      data {
        Name
        account_id
        _id
        LaborContractType
        Overview
        cdw_am_id
        opportunity_id
        updated_at
        created_at
        project_manager_id
        ProjectManagerName
        SalespersonName
        salesperson_id
        StartDate
        EndDate
        Collaborators {
          _id
          name
          avatar
        }
        Company {
          companyName
          OwnerName
        }
        Opportunity {
          StatusName
          StageName
          title
        }
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        perPage
        total
        lastPage
      }
    }
  }
`,Z=S`
  query Sow($_id: String!) {
    Sow(_id: $_id) {
      _id
      SowProductOneTimeTotalPrice
      SowProductMonthlyTotalPrice
      SowProductYearlyTotalPrice
      SowProductTotalPrice
      SowServiceOneTimeTotal
      SowServiceMonthlyTotal
      SowServiceYearlyTotal
      SowServiceTotal
      SowServiceSetupFeeTotal
      NonOptionalMonthlySowLaborTotal
      NonOptionalOneTimeSowLaborTotal
      NonOptionalYearlySowLaborTotal
      SowLaborTotal
      SowNonLaborOneTimeTotal
      SowNonLaborMonthlyTotal
      SowNonLaborYearlyTotal
      NonOptionalOneTimeSowTotal
      NonOptionalMonthlySowTotal
      NonOptionalYearlySowTotal
      AnnualTotal
      SowLaborTotalCost
      SowMilestoneGrandTotal
      SowProductOneTimeTotalCost
      SowProductTotalCost
      SowProductYearlyTotalCost
      SowMilestones {
        MilestoneName
        MilestonePayment
        ToolTip
      }
    }
  }
`;S`
  query Sows($Name: String, $first: Int, $page: Int, $account_id: Int) {
    Sows(
      Name: $Name
      first: $first
      page: $page
      account_id: $account_id
      orderBy: [{ column: ID, order: DESC }]
    ) {
      data {
        Name
        account_id
        _id
      }
    }
  }
`;export{z as Q,U as S,J as a,Z as b,K as c};
