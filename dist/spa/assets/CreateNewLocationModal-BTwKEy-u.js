import{g as i}from"./index-DNzQhVUM.js";import{Q as M}from"./QCardSection-CQZ8DJIa.js";import{Q as r,u as P}from"./dark-mode-DghqNWqv.js";import{a6 as Q,a7 as H,a8 as B,a9 as c,aa as d,ac as s,ae as N,af as n,an as E,aS as h,am as m,ab as z,aq as q,ar as K,ag as v,ao as b,az as W,ah as j,au as G,E as l,U as y,T as $,ay as J}from"./index-BQqINSog.js";import{Q as Y}from"./QCard-DUnYgpNY.js";import{Q as Z}from"./QDialog-DPL0UueO.js";import{u as X}from"./use-quasar-B7hMkyWz.js";const ge=i`
  query CompanyLocations(
    $companyID: Int!
    $Address: String
    $city: String
    $name: String
    $phone: String
    $state: String
    $page: Int
  ) {
    CompanyLocations(
      companyID: $companyID
      Address: $Address
      city: $city
      name: $name
      phone: $phone
      state: $state
      page: $page
      first: 20
    ) {
      data {
        autotask_id
        address1
        address2
        city
        companyID
        countryID
        description
        fax
        isActive
        isPrimary
        isTaxExempt
        name
        overrideAccountTaxSettings
        phone
        postalCode
        roundTripDistance
        state
        taxRegionID
      }
    }
  }
`,Me=i`
  mutation CreateSowMutation(
    $Name: String!
    $account_id: Int!
    $LaborContractType: String
    $opportunity_id: Int
    $Overview: String
    $cdw_am_id: Int
    $account_physical_location_id: Int!
    $MilestoneType: Int
    $salesperson_id: String
  ) {
    CreateSowMutation(
      Name: $Name
      account_id: $account_id
      LaborContractType: $LaborContractType
      opportunity_id: $opportunity_id
      Overview: $Overview
      cdw_am_id: $cdw_am_id
      account_physical_location_id: $account_physical_location_id
      MilestoneType: $MilestoneType
      salesperson_id: $salesperson_id
    ) {
      _id
      Name
      account_id
      Version
      LaborContractType
      opportunity_id
      Overview
      cdw_am_id
      MilestoneType
    }
  }
`,Ne=i`
  mutation UpdateSowMutation(
    $_id: String!
    $Name: String
    $account_id: Int
    $salesperson_id: String
    $probability: Int
    $internalNotes: String
  ) {
    UpdateSowMutation(
      _id: $_id
      Name: $Name
      account_id: $account_id
      salesperson_id: $salesperson_id
      probability: $probability
      internalNotes: $internalNotes
    ) {
      _id
      Name
      Company {
        companyName
      }
      SalespersonName
      account_id
      salesperson_id
      probability
      internalNotes
    }
  }
`,he=i`
  mutation DeleteSowMutation($_id: String!) {
    DeleteSowMutation(_id: $_id) {
      _id
    }
  }
`,ve=i`
  mutation UpdateSowMutation(
    $_id: String!
    $Name: String
    $account_id: Int
    $LaborContractType: String
    $opportunity_id: Int
    $Overview: String
    $cdw_am_id: Int
    $Tier1Rate: Float
    $Tier2Rate: Float
    $Tier3Rate: Float
    $ProjectManagerRate: Float
    $ConsultantRate: Float
    $AfterHoursRate: Float
    $BlockHourRate: Float
    $MilestoneType: Int
    $salesperson_id: String
    $InfrastructureRate: Float
    $probability: Int
    $internalNotes: String
  ) {
    UpdateSowMutation(
      _id: $_id
      Name: $Name
      account_id: $account_id
      LaborContractType: $LaborContractType
      opportunity_id: $opportunity_id
      Overview: $Overview
      cdw_am_id: $cdw_am_id
      Tier1Rate: $Tier1Rate
      Tier2Rate: $Tier2Rate
      Tier3Rate: $Tier3Rate
      ProjectManagerRate: $ProjectManagerRate
      ConsultantRate: $ConsultantRate
      AfterHoursRate: $AfterHoursRate
      BlockHourRate: $BlockHourRate
      MilestoneType: $MilestoneType
      salesperson_id: $salesperson_id
      InfrastructureRate: $InfrastructureRate
      probability: $probability
      internalNotes: $internalNotes
    ) {
      _id
      Name
      account_id
      LaborContractType
      opportunity_id
      Version
      Overview
      cdw_am_id
      MilestoneType
      MilestoneTypeName
      salesperson_id
      SalespersonName
      StartDate
      EndDate
      Tier1Rate
      Tier2Rate
      Tier3Rate
      ProjectManagerRate
      ConsultantRate
      AfterHoursRate
      CdwAmEmail
      InfrastructureRate
      probability
      internalNotes
      Opportunity {
        title
        StageName
        StatusName
      }
      Company {
        companyName
      }
    }
  }
`,be=i`
  mutation CreateOpportunityMutation($sow_idNew: String!) {
    CreateOpportunityMutation(sow_idNew: $sow_idNew) {
      _id
    }
  }
`,_e=i`
  mutation CreateQuoteMutation($sow_idNew: String!) {
    CreateQuoteMutation(sow_idNew: $sow_idNew) {
      id
    }
  }
`,ke=i`
  mutation CreateSowLocationMutation(
    $sow_idNew: String!
    $account_physical_location_id: Int!
  ) {
    CreateSowLocationMutation(
      sow_idNew: $sow_idNew
      account_physical_location_id: $account_physical_location_id
    ) {
      _id
      sow_idNew
      account_physical_location_id
      AccountID
      Name
      Address1
      Address2
      City
      State
      PostalCode
      CountryID
      Active
      Primary
      Phone
    }
  }
`,Ie=i`
  mutation CreateCopySowMutation($_id: String!) {
    CreateCopySowMutation(_id: $_id) {
      _id
    }
  }
`,Te=i`
  mutation RenewSowMutation($_id: String!) {
    RenewSowMutation(_id: $_id) {
      _id
    }
  }
`,Fe=[{Name:"Default",id:8},{Name:"All Non-Labor",id:9}],Ae=[{Name:"Block Hours",value:"BlockHours"},{Name:"Fixed Fee",value:"FixedFee"},{Name:"Time and Materials",value:"TMFullHour"}],Le=i`
query CdwAMs($page: Int, $search: String, $first: Int) {
  CdwAMs(page: $page, search: $search, first: $first) {
    data {
      id
      email
      firstname
      lastname
      autotaskid
    }
  }
}
`,_=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],x=i`
  mutation CreateCompanyLocationMutation(
    $companyID: Int!
    $name: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $postalCode: String
    $countryID: Int
    $isActive: Boolean
    $isPrimary: Boolean
    $phone: String
    $description: String
  ) {
    CreateCompanyLocationMutation(
      companyID: $companyID
      name: $name
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      postalCode: $postalCode
      countryID: $countryID
      isActive: $isActive
      isPrimary: $isPrimary
      phone: $phone
      description: $description
    ) {
      autotask_id
      address1
      address2
      city
      companyID
      countryID
      description
      fax
      isActive
      isPrimary
      isTaxExempt
      name
      overrideAccountTaxSettings
      phone
      postalCode
      roundTripDistance
      state
      taxRegionID
    }
  }
`,ee=H({props:{isCreateNew:Boolean,accountId:{type:Number,default:null},setAddMode:{type:Function,default:()=>{}},setLocation:{type:Function,default:()=>{}},refetchAccountLocations:{type:Function,default:()=>{}}},setup(t){const e=G({address:"",address2:"",city:"",stateSelected:"",zipCode:null,phone:null,name:"",showModal:!1,isCreateNew:!1,isModalOpen:!1,hoverSave:!1}),w=l(()=>P().darkmode),f=l(()=>e.address===""||e.city===""||e.stateSelected===""||e.zipCode===null),C=l(()=>e.address===""||e.city===""||e.stateSelected===""||e.zipCode===null?"Fill out all the fields":null),S=l(()=>({"set-box-shadow-teal":e.hoverSave,"box-shadow-teal":!e.hoverSave}));y(()=>e.isCreateNew,()=>{e.isCreateNew||t.setAddMode()});const a=$(null);y(()=>t.isCreateNew,()=>{e.isCreateNew=t.isCreateNew,setTimeout(()=>{a.value&&a.value.focus()},100)}),y(()=>e.showModal,()=>{e.showModal===!1&&(t.setAddMode(),setTimeout(()=>{},5e3))});const u=X();function g(){u.notify({spinner:!0,message:"Location Assigned",timeout:500,color:"indigo-9"})}function k(){t.setAddMode(),g(),I()}const{mutate:I,onDone:T,onError:F}=J(x,()=>({variables:{companyID:t.accountId,name:e.name,address1:e.address,address2:e.address2,city:e.city,state:e.stateSelected,postalCode:e.zipCode.toString(),isActive:null,isPrimary:null,phone:e.phone.toString(),description:null}}));T(o=>{console.log(o,"NEW LOCATION CREATED"),t.refetchAccountLocations(),t.setLocation(o.data.CreateCompanyLocationMutation,o.data.CreateCompanyLocationMutation.autotask_id),u.notify({spinner:!0,message:"Location Created",timeout:500,color:"primary"})}),F(o=>{console.log(o)});function A(o){o!=="false"?e.isCreateNew=!0:e.isCreateNew=!1}function L(o){e.stateSelected=o,setTimeout(()=>{e.isModalOpen=!1},10)}const R=$(_),D=l(()=>R.value.filter(o=>o.toLowerCase().includes(e.stateSelected.toLowerCase()))),p=$(null);function V(o){o==="state"&&(p.value&&p.value.focus(),e.isModalOpen=!0)}function O(){setTimeout(()=>{e.isModalOpen=!1},200)}function U(){var o=e.phone.replace(/\D/g,"").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);e.phone=o[2]?"("+o[1]+") "+o[2]+(o[3]?"-"+o[3]:""):o[1]}return{state:e,createNewLocation:k,setCreateNew:A,disableCreate:f,selectHelperMessage:C,USStates:_,setUSState:L,filteredList:D,handleFocus:V,handleFocusOut:O,inputEffects:S,usStateInput:p,acceptNumber:U,addressInput:a,darkmode:w}}}),te={class:"mr-0"},ae={class:"mb-5"},oe={class:"intro-y mb-5"},ne={class:"grid grid-cols-3 gap-x-5 mb-5"},se={class:"intro-y"},ie={class:"intro-y relative"},re=["onClick"],de={class:"intro-y"},le={class:"intro-y mb-5"},ue={class:"intro-y"},ce={style:{position:"absolute",right:"0px",bottom:"1rem",display:"flex"}};function pe(t,e,w,f,C,S){return c(),B(Z,{modelValue:t.state.isCreateNew,"onUpdate:modelValue":e[10]||(e[10]=a=>t.state.isCreateNew=a)},{default:d(()=>[s(Y,{class:N(["intro-y px-5",t.darkmode?"bg-[#28334E] text-slate-300":"bg-white"]),style:{"overflow-y":"hidden"}},{default:d(()=>[s(M,{class:"col flex flex-col mb-0 pb-0",style:{"overflow-y":"hidden"}},{default:d(()=>[...e[11]||(e[11]=[n("p",{class:"text-xl mt-4 text-center"},"Assign New Location",-1),n("hr",{style:{width:"100%"},class:"border-dashed dark:border-slate-500 mt-3"},null,-1)])]),_:1}),s(M,{class:"items-center"},{default:d(()=>[n("div",te,[n("div",null,[n("div",ae,[s(r,{ref:"addressInput",modelValue:t.state.name,"onUpdate:modelValue":e[0]||(e[0]=a=>t.state.name=a),filled:"",dense:"",type:"text",autocomplete:"nope",class:"form-control w-full",style:E([{width:"100%"},t.darkmode?"color: lightgrey":"color: black"]),placeholder:"Name",dark:t.darkmode,onFocus:t.handleFocus},null,8,["modelValue","style","dark","onFocus"])]),n("div",oe,[s(r,{modelValue:t.state.address,"onUpdate:modelValue":e[1]||(e[1]=a=>t.state.address=a),filled:"",dense:"",type:"text",autocomplete:"nope",class:"form-control w-full",style:{width:"100%"},placeholder:"Primary Address",dark:t.darkmode,onFocus:t.handleFocus},null,8,["modelValue","dark","onFocus"])]),n("div",ne,[n("div",se,[s(r,{modelValue:t.state.city,"onUpdate:modelValue":e[2]||(e[2]=a=>t.state.city=a),filled:"",dense:"",autocomplete:"nope",type:"text",placeholder:"City",dark:t.darkmode,onFocus:t.handleFocus},null,8,["modelValue","dark","onFocus"])]),n("div",ie,[s(r,{ref:"usStateInput",modelValue:t.state.stateSelected,"onUpdate:modelValue":e[3]||(e[3]=a=>t.state.stateSelected=a),filled:"",dense:"",type:"text",autocomplete:"nope",placeholder:"US State",dark:t.darkmode,onFocus:e[4]||(e[4]=a=>t.handleFocus("state")),onKeydown:e[5]||(e[5]=h(a=>t.handleFocus("state"),["tab"])),onFocusout:t.handleFocusOut,onKeyup:h(t.handleFocusOut,["enter"])},null,8,["modelValue","dark","onFocusout","onKeyup"]),n("div",null,[t.state.isModalOpen?(c(),m("div",{key:0,class:N({"location-cont-dark":t.darkmode,"location-cont":!t.darkmode})},[(c(!0),m(q,null,K(t.filteredList,(a,u)=>(c(),m("div",{key:u,tabIndex:"1000",onClick:g=>t.setUSState(a)},v(a),9,re))),128))],2)):z("",!0)])]),n("div",de,[s(r,{modelValue:t.state.zipCode,"onUpdate:modelValue":e[6]||(e[6]=a=>t.state.zipCode=a),filled:"",dense:"",type:"number",autocomplete:"nope",placeholder:"Zip Code #",dark:t.darkmode,onFocus:t.handleFocus},null,8,["modelValue","dark","onFocus"])])]),e[12]||(e[12]=n("hr",{class:"border-dashed dark:border-slate-500 mt-3 mb-5"},null,-1)),n("div",le,[s(r,{modelValue:t.state.phone,"onUpdate:modelValue":e[7]||(e[7]=a=>t.state.phone=a),modelModifiers:{number:!0},filled:"",dense:"",class:"form-control w-full",type:"number",autocomplete:"nope",style:{width:"100%"},placeholder:"Primary Phone",dark:t.darkmode,onInput:t.acceptNumber,onFocus:t.handleFocus},null,8,["modelValue","dark","onInput","onFocus"])]),n("div",ue,[s(r,{modelValue:t.state.address2,"onUpdate:modelValue":e[8]||(e[8]=a=>t.state.address2=a),filled:"",dense:"",autocomplete:"nope",type:"text",class:"form-control w-full",style:{width:"100%"},placeholder:"Secondary Address (optional)",dark:t.darkmode,onFocus:t.handleFocus},null,8,["modelValue","dark","onFocus"])]),e[13]||(e[13]=n("div",{class:"form-check form-switch relative w-full sm:w-auto sm:ml-auto mt-5 sm:mt-0"},null,-1))]),e[14]||(e[14]=n("div",{class:"mt-20"},null,-1)),n("div",ce,[s(b,{dense:"",class:"save-btn mr-8 font-regular","no-caps":"",flat:"",label:"Cancel",color:t.darkmode?"grey-5":"grey-7",onClick:t.setAddMode},null,8,["color","onClick"]),n("div",null,[s(b,{dense:"",disable:t.disableCreate,class:"save-btn q-px-md",style:{"margin-right":"1.5rem","margin-left":"0rem"},"no-caps":"",label:"Add Location",color:"primary",onClick:e[9]||(e[9]=a=>t.createNewLocation(t.cardAddMode,"close"))},null,8,["disable"]),s(W,{style:{"font-size":"0.9rem"}},{default:d(()=>[j(v(t.selectHelperMessage),1)]),_:1})])])])]),_:1})]),_:1},8,["class"])]),_:1},8,["modelValue"])}const Re=Q(ee,[["render",pe],["__scopeId","data-v-4d0e618b"]]);export{ge as C,he as D,Ae as L,Fe as M,Te as R,ve as U,Re as a,be as b,_e as c,Ie as d,ke as e,Le as f,Ne as g,Me as h};
