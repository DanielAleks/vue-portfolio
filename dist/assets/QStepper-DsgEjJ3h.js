import{d as de}from"./dark-mode-CG8Py2TO.js";import{ay as h,T as $,aB as q,U as D,ax as ue,D as T,N as x,E as p,F as u,Q as ce,a4 as pe,aT as we,bs as me,bt as L,bp as B,bu as A,aV as ve,bv as F,aG as k,bw as z,by as _e,bx as Se,a0 as ye,aQ as X,M as Ie,G as b,bK as J,O as fe,R as G,bL as Z,bC as he,bD as ge,bM as Pe,Y as ee,$ as te,bN as $e,aU as Ne,aw as Oe,J as be,a5 as Te}from"./index-BmmqEUwr.js";import{g as _}from"./index-DO6kqxPy.js";import{u as Ce}from"./use-quasar-jxPryvnm.js";import{Q as qe}from"./QSlideTransition-BcQffVlC.js";import{g as j,s as K}from"./touch-BjYP5sR0.js";function ie(){let e=Object.create(null);return{getCache:(i,n)=>e[i]===void 0?e[i]=typeof n=="function"?n():n:e[i],setCache(i,n){e[i]=n},hasCache(i){return Object.hasOwnProperty.call(e,i)},clearCache(i){i!==void 0?delete e[i]:e=Object.create(null)}}}const Be=_`
query SowServices($sow_idNew: String) {
  SowServices(sow_idNew: $sow_idNew, first: 50) {
    data {
      _id
      sow_idNew
      sow_guideline_idNew
      product_id
      IsOptional
      Quantity
      LineTotal
      sow_order
      sow_detail
      PriceOverride
      IsAlreadyImplemented
      UnitPrice
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      # field not available in SowService, or SowBundle, use SowImplementationTypeName conditionals
      SowImplementationTypeID
      IsProductActive
      # Product {}
    }
  }
}
`,De=_`
  query SowImplementationTypes($sow_idNew: String, $hasRelatedService: Boolean) {
    SowImplementationTypes(
      sow_idNew: $sow_idNew
      hasRelatedService: $hasRelatedService
    ) {
      data {
        _id
        implementation_type_id
        sow_idNew
        Name
        sow_order
        IsOptional
        sow_detail

        notes
        SupportType
        HasOptionalGuidelines
        SowLaborTotal

        # not implemented anywhere yet - 7/15
        NonOptionalOneTimeSowLaborTotal
        NonOptionalMonthlySowLaborTotal
        NonOptionalYearlySowLaborTotal
      }
    }
  }
`,lt=_`
  query SowImplementationTypes($sow_idNew: String) {
    SowImplementationTypes(
      sow_idNew: $sow_idNew
      first: 10
    ) {
      data {
        _id
        implementation_type_id
        Name
        SowGuidelineAmount
      }
    }
  }
`,xe=_`
query SowServiceBundles($sow_idNew: String) {
  SowServiceBundles(sow_idNew: $sow_idNew, first: 50) {
    data {
      _id
      sow_idNew
      sow_guideline_idNew
      product_id
      IsOptional
      Quantity
      LineTotal
      sow_order
      sow_detail
      PriceOverride
      IsAlreadyImplemented
      UnitPrice
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      # field not available in SowService, or SowBundle, use SowImplementationTypeName conditionals
      SowImplementationTypeID
      IsProductActive
      # Product {}
    }
  }
}
`,Me=_`
query SowProducts($sow_idNew: String) {
  SowProducts(sow_idNew: $sow_idNew, first: 50) {
    data {
      _id
      sow_idNew
      sow_guideline_idNew
      product_id
      IsOptional
      Quantity
      LineTotal
      sow_order
      sow_detail
      PriceOverride
      IsAlreadyImplemented
      UnitPrice
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      # field not available in SowService, or SowBundle, use SowImplementationTypeName conditionals
      SowImplementationTypeID
      IsProductActive
      # Product {}
    }
  }
}
`,dt=_`
  mutation (
    $implementation_guideline_id: Int!
    $sow_id: Int!
    $quantity: Float
    $sow_detail: String
    $IsAlreadyImplemented: Boolean
    $IsOptional: Boolean
    $PriceOverride: Float
  ) {
    CreateSowGuidelineMutation(
      implementation_guideline_id: $implementation_guideline_id
      sow_id: $sow_id
      quantity: $quantity
      sow_detail: $sow_detail
      IsAlreadyImplemented: $IsAlreadyImplemented
      IsOptional: $IsOptional
      PriceOverride: $PriceOverride
    ) {
      id
      Name
      IsAlreadyImplemented
      sow_detail
      IsOptional
      implementation_guideline_id
      sow_id
      UnitPrice
      ImplementationTypeID
      LineTotal
      quantity
      sow_order
      PriceOverride
      EstimatedHours
      EstimatedHoursSubtotal
      HasSowProducts
      HasSowServices
      UnitCost
      LineTotalCost
      SkillTier
      BillingFrequency
    }
  }
`,Ue=_`
  mutation UpdateSowGuidelineMutation(
    $id: Int!
    $sow_detail: String
    $quantity: Float
    $IsOptional: Boolean
    $IsAlreadyImplemented: Boolean
    $PriceOverride: Float
    $sow_order: Int
  ) {
    UpdateSowGuidelineMutation(
      id: $id
      sow_detail: $sow_detail
      quantity: $quantity
      IsOptional: $IsOptional
      IsAlreadyImplemented: $IsAlreadyImplemented
      PriceOverride: $PriceOverride
      sow_order: $sow_order
    ) {
      id
      Name
      implementation_guideline_id
      sow_id
      sow_detail
      IsOptional
      IsAlreadyImplemented
      PriceOverride
      sow_order
      EstimatedHoursSubtotal
      quantity
      LineTotal
      UnitPrice
      UnitCost
      LineTotalCost
      SkillTier
      BillingFrequency
    }
  }
`,Fe=_`
  mutation DeleteSowGuidelineMutation($id: Int!) {
    DeleteSowGuidelineMutation(id: $id) {
      id
      ImplementationTypeID
      BillingFrequency
    }
  }
`,ut=_`
  mutation CreateSowProductMutation(
    $product_id: Int!
    $sow_idNew: String!
    $PriceOverride: Float
    $Quantity: Float
    $IsOptional: Boolean
    $IsAlreadyImplemented: Boolean
    $sow_guideline_idNew: String
    $sow_implementation_type_idNew: String!
  ) {
    CreateSowProductMutation(
      product_id: $product_id
      sow_idNew: $sow_idNew
      PriceOverride: $PriceOverride
      Quantity: $Quantity
      IsOptional: $IsOptional
      IsAlreadyImplemented: $IsAlreadyImplemented
      sow_guideline_idNew: $sow_guideline_idNew
      sow_implementation_type_idNew: $sow_implementation_type_idNew
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      IsOptional
      Quantity
      LineTotal
      sow_order
      PriceOverride
      IsAlreadyImplemented
      UnitPrice
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      product_id
    }
  }
`,Qe=_`
  mutation UpdateSowProductMutation(
    $_id: String
    $Quantity: Float
    $IsOptional: Boolean
    $IsAlreadyImplemented: Boolean
    $PriceOverride: Float
    $sow_order: Int
    $sow_detail: String
  ) {
    UpdateSowProductMutation(
      _id: $_id
      Quantity: $Quantity
      IsOptional: $IsOptional
      IsAlreadyImplemented: $IsAlreadyImplemented
      PriceOverride: $PriceOverride
      sow_order: $sow_order
      sow_detail: $sow_detail
    ) {
      _id
      Name
      Quantity
      IsOptional
      IsAlreadyImplemented
      PriceOverride
      sow_order
      LineTotal
      UnitPrice
      UnitCost
      LineTotalCost
      sow_detail
      product_id
      BillingFrequency
    }
  }
`,Le=_`
  mutation DeleteSowProductMutation(
    $_id: String
  ) {
    DeleteSowProductMutation(
      _id: $_id
    ) {
      _id
      BillingFrequency
    }
  }
`,ct=_`
  mutation CreateSowServiceMutation(
    $sow_idNew: String!
    $service_id: Int!
    $Quantity: Float
    $PriceOverride: Float
    $IsOptional: Boolean
    $sow_guideline_idNew: String
    $sow_implementation_type_idNew: String!
  ) {
    CreateSowServiceMutation(
      sow_idNew: $sow_idNew
      service_id: $service_id
      Quantity: $Quantity
      PriceOverride: $PriceOverride
      IsOptional: $IsOptional
      sow_guideline_idNew: $sow_guideline_idNew
      sow_implementation_type_idNew: $sow_implementation_type_idNew
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      IsOptional
      Quantity
      LineTotal
      sow_order
      PriceOverride
      UnitPrice
      service_id
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`,Ae=_`
  mutation UpdateSowServiceMutation(
    $_id: String!
    $Quantity: Float
    $IsOptional: Boolean
    $PriceOverride: Float
    $sow_order: Int
    $SetupFeeOverride: Float
  ) {
    UpdateSowServiceMutation(
      _id: $_id
      Quantity: $Quantity
      IsOptional: $IsOptional
      PriceOverride: $PriceOverride
      sow_order: $sow_order
      SetupFeeOverride: $SetupFeeOverride
    ) {
      _id
      Name
      Quantity
      IsOptional
      PriceOverride
      sow_order
      UnitPrice
      LineTotal
      UnitCost
      LineTotalCost
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`,ke=_`
  mutation DeleteSowServiceMutation($_id: String!) {
    DeleteSowServiceMutation(_id: $_id) {
      _id
      BillingFrequency
    }
  }
`,pt=_`
  mutation CreateSowServiceBundleMutation(
    $sow_idNew: String!
    $service_bundle_id: Int!
    $Quantity: Float
    $IsOptional: Boolean
    $PriceOverride: Float
    $sow_guideline_idNew: String
    $sow_implementation_type_idNew: String!
  ) {
    CreateSowServiceBundleMutation(
      sow_idNew: $sow_idNew
      Quantity: $Quantity
      PriceOverride: $PriceOverride
      IsOptional: $IsOptional
      service_bundle_id: $service_bundle_id
      sow_guideline_idNew: $sow_guideline_idNew
      sow_implementation_type_idNew: $sow_implementation_type_idNew
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      service_bundle_id
      IsOptional
      Name
      sow_detail
      sow_order
      Quantity
      PriceOverride
      FrequencyOverride
      UnitPrice
      BillingFrequency
      LineTotal
      UnitCost
      LineTotalCost
      SowGuidelineName
      SowImplementationTypeName
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`,Ge=_`
  mutation UpdateSowServiceBundleMutation(
    $_id: String!
    $Quantity: Float
    $PriceOverride: Float
    $IsOptional: Boolean
    $sow_order: Int
    $SetupFeeOverride: Float
  ) {
    UpdateSowServiceBundleMutation(
      _id: $_id
      Quantity: $Quantity
      PriceOverride: $PriceOverride
      IsOptional: $IsOptional
      sow_order: $sow_order
      SetupFeeOverride: $SetupFeeOverride
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      service_bundle_id
      IsOptional
      Name
      sow_detail
      sow_order
      Quantity
      PriceOverride
      FrequencyOverride
      UnitPrice
      BillingFrequency
      LineTotal
      UnitCost
      LineTotalCost
      SowGuidelineName
      SowImplementationTypeName
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`,Re=_`
  mutation DeleteSowServiceBundleMutation($_id: String!) {
    DeleteSowServiceBundleMutation(_id: $_id) {
      _id
      BillingFrequency
    }
  }
`,Ee=_`
  query ($sow_id: Int) {
    SowGuidelines(sow_id: $sow_id, first: 100) {
      data {
        id
        implementation_guideline_id
        sow_id
        IsAlreadyImplemented
        PriceOverride
        IsOptional
        sow_detail
        quantity
        UnitPrice
        Name
        LineTotal
        ImplementationTypeID
        sow_order
        HasSowProducts
        HasSowServices
        Assumption
        Exclusions
        EstimatedHours
        EstimatedHoursSubtotal
        BillingFrequency
        UnitCost
        LineTotalCost
        SkillTier
        ImplementationGuideline {
          DocURL
          Skills {
            autotask_id
            description
            name
          }
          ImplementationGuidelineProducts {
            id
            quantity
            IsOptional
            Product {
              autotask_id
              name
              description
              isActive
              PeriodTypeName
              unitPrice
              unitCost
            }
          }
          ImplementationGuidelineServices {
            id
            Quantity
            IsOptional
            Service {
              autotask_id
              name
              description
              PeriodTypeName
              unitPrice
              unitCost
              isActive
            }
          }
          ImplementationGuidelineServiceBundles {
            id
            Quantity
            IsOptional
            ServiceBundle {
              autotask_id
              name
              description
              PeriodTypeName
              unitPrice
              unitCost
              isActive
            }
          }
        }
      }
    }
  }
`,wt=_`
  mutation CreateSowImplementationTypeMutation(
    $implementation_type_id: Int!
    $sow_id: Int!
    $IsOptional: Boolean
    $sow_detail: String
  ) {
    CreateSowImplementationTypeMutation(
      implementation_type_id: $implementation_type_id
      sow_id: $sow_id
      IsOptional: $IsOptional
      sow_detail: $sow_detail
    ) {
      id
      implementation_type_id
      sow_id
      Name
      sow_order
      IsOptional
      sow_detail

      notes
      SupportType
      HasOptionalGuidelines
      SowLaborTotal
    }
  }
`,He=_`
  mutation UpdateSowImplementationTypeMutation(
    $id: Int!
    $sow_id: Int!
    $sow_order: Int
    $sow_detail: String
    $IsOptional: Boolean
  ) {
    UpdateSowImplementationTypeMutation(
      id: $id
      sow_id: $sow_id
      sow_order: $sow_order
      sow_detail: $sow_detail
      IsOptional: $IsOptional
    ) {
      id
      Name
      implementation_type_id
      sow_id
      sow_order
      sow_detail
      IsOptional
    }
  }
`,Ve=_`
  mutation DeleteSowImplementationTypeMutation($id: Int!) {
    DeleteSowImplementationTypeMutation(id: $id) {
      id
      Name
    }
  }
`,ze=_`
  mutation RestoreSowImplementationTypeMutation($id: Int!) {
    RestoreSowImplementationTypeMutation(id: $id) {
      id
      Name
      implementation_type_id
      sow_id
      sow_order
      IsOptional
      sow_detail
      notes
      SupportType
      HasOptionalGuidelines
      SowLaborTotal
    }
  }
`,mt=de({id:"implementation",state:()=>({sowImplementations:[],sowGuidelines:[],sowProducts:[],sowServices:[],sowServiceBundles:[],sowID:null,pushNewResponseData:null,$q:Ce(),initialLoad:!0}),actions:{onSetValueCallback(e){this.pushNewResponseData=e},setSowID(e){this.sowID=e},async fetchSowImplementations(){const e=$(0),{result:i,refetch:n}=q(De,()=>({sow_idNew:this.sowID}));this.initialLoad||n(),setTimeout(()=>{this.initialLoad=!1},3e3),ue(()=>{if(i.value&&i.value.SowImplementationTypes.data&&e.value<2){e.value++;const a=i.value.SowImplementationTypes.data.map((o,t)=>({...o,showProdServ:$(!1),isProdServices:!1,isEditing:!1,index:t,Name:o.sow_detail?o.sow_detail:o.Name}));this.sowImplementations=a.sort((o,t)=>o.sow_order-t.sow_order)}})},async fetchSowGuidelines(){const{result:e,refetch:i}=q(Ee,()=>({sow_idNew:this.sowID}));this.initialLoad||i(),D(()=>e.value,()=>{if(e.value){const n=e.value.SowGuidelines.data.map((a,o)=>({...a,type:"Guideline",index:o,Name:a.sow_detail?a.sow_detail:a.Name,editingValue:$(""),Quantity:a.quantity,IsOptional:a.IsOptional?a.IsOptional:!1}));this.sowGuidelines=n,n.forEach(a=>{a.BillingFrequency!=="One-Time"&&!this.sowServices.some(o=>o._id===a._id)&&this.sowServices.push({...a,FixedPrice:a.UnitPrice,type:"Guideline",index:a.index})})}})},async fetchSowProducts(){const e=$(0),{result:i,refetch:n}=q(Me,()=>({sow_idNew:this.sowID}));this.initialLoad||n(),D(()=>i.value,()=>{if(i.value){console.log(i.value.SowProducts.data,"SOW Products in watchEffect() STORE.js");const a=i.value.SowProducts.data.map((o,t)=>({...o,FixedPrice:o.UnitPrice,type:"Product",index:t,IsOptional:o.IsOptional?o.IsOptional:!1}));e.value++,this.sowProducts=a,a.forEach(o=>{o.BillingFrequency!=="One-Time"&&!this.sowServices.some(t=>t.Name===o.Name)&&this.sowServices.push({...o,FixedPrice:o.UnitPrice,type:"Product",index:o.index})})}})},async fetchSowServices(){const{result:e,refetch:i}=q(Be,()=>({sow_idNew:this.sowID}));this.initialLoad||i();const n=$(0);D(()=>e.value,()=>{if(e.value){console.log("SOW Services in STORE.js",e.value);const a=e.value.SowServices.data.map((o,t)=>({...o,FixedPrice:o.UnitPrice,type:"Service",index:t}));this.sowServices=a.filter(o=>!this.sowServices.some(t=>o.Name===t.Name)),this.sowProducts.forEach(o=>{o.BillingFrequency==="One-Time"&&!this.sowServices.some(t=>t.Name===o.Name)&&this.sowServices.push({...o,FixedPrice:o.UnitPrice,type:"Product",index:o.index})}),n.value++}})},async fetchSowServiceBundles(){const e=$(0),{result:i,refetch:n}=q(xe,()=>({sow_idNew:this.sowID}));this.initialLoad||n(),D(()=>i.value,()=>{if(i.value){console.log(i.value,"SOW Service Bundles in watchEffect() STORE.js");const a=i.value.SowServiceBundles.data.map((o,t)=>({...o,FixedPrice:o.UnitPrice,type:"ServiceBundle",index:t}));this.sowServiceBundles=a,this.sowServiceBundles.forEach(o=>{this.sowServices.some(t=>t._id===o._id)||this.sowServices.push({...o,FixedPrice:o.UnitPrice,type:"ServiceBundle",index:o.index})}),e.value++}})},async updateSowImplementation(e,i,n){try{let a={_id:e._id,sow_idNew:this.sowID};typeof i=="boolean"?(a={...a,IsOptional:i},this.sowGuidelines=this.sowGuidelines.map(l=>(l.ImplementationTypeID===e.implementation_type_id&&(l.IsOptional=i,this.updateSowGuideline({row:l,field:"IsOptional",dontUpdate:!0})),l))):i==="order"?a={...a,sow_order:n}:a={...a,sow_detail:i};const{mutate:o}=h(He),{data:t}=await o(a);this.sowImplementations=this.sowImplementations.map(l=>(l._id===t.UpdateSowImplementationTypeMutation._id&&(l.sow_detail=t.UpdateSowImplementationTypeMutation.sow_detail,l.sow_order=n),l));const r=t.UpdateSowImplementationTypeMutation;i!=="order"&&this.pushNewResponseData("implementation","update",r)}catch(a){console.error(a)}},async deleteImplementation(e){try{const i={_id:e},{mutate:n}=h(Ve),{data:a}=await n(i),o=a.DeleteSowImplementationTypeMutation;this.sowImplementations=this.sowImplementations.filter(t=>t._id!==o._id),this.sowGuidelines=this.sowGuidelines.filter(t=>t.ImplementationTypeID!==o._id),this.sowProducts=this.sowProducts.filter(t=>t.SowImplementationTypeID!==o._id),this.sowServices=this.sowServices.filter(t=>t.SowImplementationTypeName!==o.Name||t.ImplementationTypeID!==o._id),this.pushNewResponseData("implementation","delete",o),this.$q.notify({message:"Implementation Deleted: "+o.Name,color:"indigo-7",textColor:"white",icon:"delete",position:"bottom",timeout:5e3,actions:[{color:"white",handler:()=>this.restoreImplementation(e),label:"Undo",icon:"undo"}]})}catch(i){console.error(i)}},async restoreImplementation(e){try{const i={_id:e},{mutate:n}=h(ze),{data:a}=await n(i),o=a.RestoreSowImplementationTypeMutation;this.pushNewResponseData("implementation","create",o),this.$q.notify({message:"Implementation Restored: "+o.Name,color:"green-7",textColor:"white",icon:"done",position:"bottom",timeout:2e3})}catch(i){console.error(i)}},async updateSowGuideline({row:e,field:i,dontUpdate:n}){try{console.log("updateSowGuideline",e,i,e.sow_order);let a={_id:e._id};switch(i){case"Name":console.log("NAME",e.sow_order,"row.index",e.index),a={...a,sow_detail:e.Name};break;case"Quantity":console.log("QTY",e.sow_order,"row.index",e.index),a={...a,quantity:parseInt(e.Quantity)};break;case"PriceOverride":console.log("PRICEOVERRIDE",e.sow_order,"row.index",e.index),a={...a,PriceOverride:e.UnitPrice};break;case"sow_order":console.log(e.Name,e.sow_order),a={...a,sow_order:e.sow_order};break;case"IsOptional":a={...a,IsOptional:e.IsOptional};break;case"IsAlreadyImplemented":a={...a,IsAlreadyImplemented:e.IsAlreadyImplemented===1},this.sowProducts=this.sowProducts.map(t=>(t.sow_guideline_idNew===e._id&&(t.IsAlreadyImplemented=e.IsAlreadyImplemented),t));break}const{mutate:o}=h(Ue);if(!n){const{data:t}=await o(a),r=t.UpdateSowGuidelineMutation;console.log(r,"guideline update response data"),i!=="sow_order"&&this.pushNewResponseData("guideline","update",{...r,LineTotal:r.LineTotal})}}catch(a){console.error(a)}},async deleteSowGuideline(e){try{const i={_id:e._id},{mutate:n}=h(Fe),{data:a}=await n(i),o=a.DeleteSowGuidelineMutation;this.sowGuidelines=this.sowGuidelines.filter(t=>t._id!==o._id),this.sowProducts=this.sowProducts.filter(t=>t.sow_guideline_idNew!==o._id),this.sowServices=this.sowServices.filter(t=>t.sow_guideline_idNew!==o._id),this.sowServiceBundles=this.sowServiceBundles.filter(t=>t.sow_guideline_idNew!==o._id),this.pushNewResponseData("guideline","delete",o)}catch(i){console.error(i)}},async updateSowProduct({row:e,field:i}){try{let n={_id:e._id};switch(i){case"Name":n={...n,sow_detail:e.Name};break;case"Quantity":n={...n,Quantity:parseInt(e.Quantity)};break;case"IsOptional":n={...n,IsOptional:e.IsOptional};break;case"sow_order":n={...n,sow_order:e.sow_order};break;case"PriceOverride":e.SowGuidelineName==="Multiple"?n={...n,PriceOverride:e.UnitPrice,product_id:e.product_id,sow_implementation_type_id:e.SowImplementationTypeID}:n={...n,PriceOverride:e.UnitPrice};break}const{mutate:a}=h(Qe),{data:o}=await a(n),t=o.UpdateSowProductMutation;console.log(t,"updateSowProduct()"),i!=="sow_order"?this.pushNewResponseData("product","update",t):console.log(t.Name,"SowProduct Updated, sow_order: ",t.sow_order)}catch(n){console.error(n)}},async deleteSowProduct(e){try{let i={_id:e._id};const{mutate:n}=h(Le),{data:a}=await n(i),o=a.DeleteSowProductMutation;this.sowProducts=this.sowProducts.filter(t=>t._id!==o._id),this.pushNewResponseData("product","delete",o)}catch(i){console.error(i)}},async updateSowService({row:e,field:i}){try{let n={_id:e._id};switch(i){case"Quantity":n={...n,Quantity:parseInt(e.Quantity)};break;case"IsOptional":n={...n,IsOptional:e.IsOptional};break;case"sow_order":n={...n,sow_order:e.sow_order};break;case"SetupFeeOverride":n={...n,SetupFeeOverride:e.UnitSetupFee};break;case"PriceOverride":e.SowGuidelineName==="Multiple"?n={...n,PriceOverride:e.UnitPrice,service_id:e.service_id,sow_implementation_type_id:e.SowImplementationTypeID}:n={...n,PriceOverride:e.UnitPrice};break}const{mutate:a}=h(Ae),{data:o}=await a(n),t=o.UpdateSowServiceMutation;i!=="sow_order"?this.pushNewResponseData("service","update",t):console.log(t.Name,"SowService Updated, sow_order: ",t.sow_order)}catch(n){console.error(n)}},async deleteSowService(e){try{const{mutate:i}=h(ke),{data:n}=await i({_id:e._id}),a=n.DeleteSowServiceMutation;this.sowServices=this.sowServices.filter(o=>o._id!==a._id),this.pushNewResponseData("service","delete",a)}catch(i){console.error(i)}},async updateSowServiceBundle({row:e,field:i}){console.log(e,i,"updateSowServiceBundle");try{let n={_id:e._id};switch(i){case"Quantity":n={...n,Quantity:parseInt(e.Quantity)};break;case"sow_order":n={...n,sow_order:e.sow_order};break;case"PriceOverride":n={...n,PriceOverride:e.UnitPrice};break;case"SetupFeeOverride":n={...n,SetupFeeOverride:e.UnitSetupFee};break}const{mutate:a}=h(Ge),{data:o}=await a(n),t=o.UpdateSowServiceBundleMutation;i!=="sow_order"?this.pushNewResponseData("service","update",t):console.log(t.Name,"SowBUNDLE Updated, sow_order: ",t.sow_order)}catch(n){console.error(n)}},async deleteSowServiceBundle(e){try{const{mutate:i}=h(Re),{data:n}=await i({_id:e._id}),a=n.DeleteSowServiceBundleMutation;this.sowServices=this.sowServices.filter(o=>o._id!==e._id),this.sowServiceBundles=this.sowServiceBundles.filter(o=>o._id!==a._id),this.pushNewResponseData("service","delete",a)}catch(i){console.error(i)}}}}),oe=T({name:"StepHeader",props:{stepper:{},step:{},goToPanel:Function},setup(e,{attrs:i}){const{proxy:{$q:n}}=x(),a=$(null),o=p(()=>e.stepper.modelValue===e.step.name),t=p(()=>{const s=e.step.disable;return s===!0||s===""}),r=p(()=>{const s=e.step.error;return s===!0||s===""}),l=p(()=>{const s=e.step.done;return t.value===!1&&(s===!0||s==="")}),w=p(()=>{const s=e.step.headerNav,m=s===!0||s===""||s===void 0;return t.value===!1&&e.stepper.headerNav&&m}),y=p(()=>e.step.prefix&&(o.value===!1||e.stepper.activeIcon==="none")&&(r.value===!1||e.stepper.errorIcon==="none")&&(l.value===!1||e.stepper.doneIcon==="none")),c=p(()=>{const s=e.step.icon||e.stepper.inactiveIcon;if(o.value===!0){const m=e.step.activeIcon||e.stepper.activeIcon;return m==="none"?s:m||n.iconSet.stepper.active}if(r.value===!0){const m=e.step.errorIcon||e.stepper.errorIcon;return m==="none"?s:m||n.iconSet.stepper.error}if(t.value===!1&&l.value===!0){const m=e.step.doneIcon||e.stepper.doneIcon;return m==="none"?s:m||n.iconSet.stepper.done}return s}),I=p(()=>{const s=r.value===!0?e.step.errorColor||e.stepper.errorColor:void 0;if(o.value===!0){const m=e.step.activeColor||e.stepper.activeColor||e.step.color;return m!==void 0?m:s}return s!==void 0?s:t.value===!1&&l.value===!0?e.step.doneColor||e.stepper.doneColor||e.step.color||e.stepper.inactiveColor:e.step.color||e.stepper.inactiveColor}),v=p(()=>"q-stepper__tab col-grow flex items-center no-wrap relative-position"+(I.value!==void 0?` text-${I.value}`:"")+(r.value===!0?" q-stepper__tab--error q-stepper__tab--error-with-"+(y.value===!0?"prefix":"icon"):"")+(o.value===!0?" q-stepper__tab--active":"")+(l.value===!0?" q-stepper__tab--done":"")+(w.value===!0?" q-stepper__tab--navigation q-focusable q-hoverable":"")+(t.value===!0?" q-stepper__tab--disabled":"")),g=p(()=>e.stepper.headerNav!==!0?!1:w.value);function f(){a.value?.focus(),o.value===!1&&e.goToPanel(e.step.name)}function N(s){s.keyCode===13&&o.value===!1&&e.goToPanel(e.step.name)}return()=>{const s={class:v.value};w.value===!0&&(s.onClick=f,s.onKeyup=N,Object.assign(s,t.value===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:i.tabindex||0}));const m=[u("div",{class:"q-focus-helper",tabindex:-1,ref:a}),u("div",{class:"q-stepper__dot row flex-center q-stepper__line relative-position"},[u("span",{class:"row flex-center"},[y.value===!0?e.step.prefix:u(ce,{name:c.value})])])];if(e.step.title!==void 0&&e.step.title!==null){const O=[u("div",{class:"q-stepper__title"},e.step.title)];e.step.caption!==void 0&&e.step.caption!==null&&O.push(u("div",{class:"q-stepper__caption"},e.step.caption)),m.push(u("div",{class:"q-stepper__label q-stepper__line relative-position"},O))}return pe(u("div",s,m),[[we,g.value]])}}});function je(e){const i=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((n,a)=>{const o=parseFloat(n);o&&(i[a]=o)}),i}const Ke=me({name:"touch-swipe",beforeMount(e,{value:i,arg:n,modifiers:a}){if(a.mouse!==!0&&B.has.touch!==!0)return;const o=a.mouseCapture===!0?"Capture":"",t={handler:i,sensitivity:je(n),direction:j(a),noop:ve,mouseStart(r){K(r,t)&&Se(r)&&(F(t,"temp",[[document,"mousemove","move",`notPassive${o}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(r,!0))},touchStart(r){if(K(r,t)){const l=r.target;F(t,"temp",[[l,"touchmove","move","notPassiveCapture"],[l,"touchcancel","end","notPassiveCapture"],[l,"touchend","end","notPassiveCapture"]]),t.start(r)}},start(r,l){B.is.firefox===!0&&A(e,!0);const w=z(r);t.event={x:w.left,y:w.top,time:Date.now(),mouse:l===!0,dir:!1}},move(r){if(t.event===void 0)return;if(t.event.dir!==!1){k(r);return}const l=Date.now()-t.event.time;if(l===0)return;const w=z(r),y=w.left-t.event.x,c=Math.abs(y),I=w.top-t.event.y,v=Math.abs(I);if(t.event.mouse!==!0){if(c<t.sensitivity[1]&&v<t.sensitivity[1]){t.end(r);return}}else if(window.getSelection().toString()!==""){t.end(r);return}else if(c<t.sensitivity[2]&&v<t.sensitivity[2])return;const g=c/l,f=v/l;t.direction.vertical===!0&&c<v&&c<100&&f>t.sensitivity[0]&&(t.event.dir=I<0?"up":"down"),t.direction.horizontal===!0&&c>v&&v<100&&g>t.sensitivity[0]&&(t.event.dir=y<0?"left":"right"),t.direction.up===!0&&c<v&&I<0&&c<100&&f>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&c<v&&I>0&&c<100&&f>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&c>v&&y<0&&v<100&&g>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&c>v&&y>0&&v<100&&g>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(k(r),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),_e(),t.styleCleanup=N=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const s=()=>{document.body.classList.remove("no-pointer-events--children")};N===!0?setTimeout(s,50):s()}),t.handler({evt:r,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:l,distance:{x:c,y:v}})):t.end(r)},end(r){t.event!==void 0&&(L(t,"temp"),B.is.firefox===!0&&A(e,!1),t.styleCleanup?.(!0),r!==void 0&&t.event.dir!==!1&&k(r),t.event=void 0)}};if(e.__qtouchswipe=t,a.mouse===!0){const r=a.mouseCapture===!0||a.mousecapture===!0?"Capture":"";F(t,"main",[[e,"mousedown","mouseStart",`passive${r}`]])}B.has.touch===!0&&F(t,"main",[[e,"touchstart","touchStart",`passive${a.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,i){const n=e.__qtouchswipe;n!==void 0&&(i.oldValue!==i.value&&(typeof i.value!="function"&&n.end(),n.handler=i.value),n.direction=j(i.modifiers))},beforeUnmount(e){const i=e.__qtouchswipe;i!==void 0&&(L(i,"main"),L(i,"temp"),B.is.firefox===!0&&A(e,!1),i.styleCleanup?.(),delete e.__qtouchswipe)}}),We={name:{required:!0},disable:Boolean},W={setup(e,{slots:i}){return()=>u("div",{class:"q-panel scroll",role:"tabpanel"},b(i.default))}},Ye={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},Xe=["update:modelValue","beforeTransition","transition"];function Je(){const{props:e,emit:i,proxy:n}=x(),{getCache:a}=ie(),{registerTimeout:o}=ye();let t,r;const l=$(null),w={value:null};function y(d){const S=e.vertical===!0?"up":"left";C((n.$q.lang.rtl===!0?-1:1)*(d.direction===S?1:-1))}const c=p(()=>[[Ke,y,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),I=p(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),v=p(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),g=p(()=>`--q-transition-duration: ${e.transitionDuration}ms`),f=p(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),N=p(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),s=p(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);D(()=>e.modelValue,(d,S)=>{const P=M(d)===!0?Q(d):-1;r!==!0&&E(P===-1?0:P<Q(S)?-1:1),w.value!==P&&(w.value=P,i("beforeTransition",d,S),o(()=>{i("transition",d,S)},e.transitionDuration))});function m(){C(1)}function O(){C(-1)}function R(d){i("update:modelValue",d)}function M(d){return d!=null&&d!==""}function Q(d){return t.findIndex(S=>S.props.name===d&&S.props.disable!==""&&S.props.disable!==!0)}function ae(){return t.filter(d=>d.props.disable!==""&&d.props.disable!==!0)}function E(d){const S=d!==0&&e.animated===!0&&w.value!==-1?"q-transition--"+(d===-1?I.value:v.value):null;l.value!==S&&(l.value=S)}function C(d,S=w.value){let P=S+d;for(;P!==-1&&P<t.length;){const U=t[P];if(U!==void 0&&U.props.disable!==""&&U.props.disable!==!0){E(d),r=!0,i("update:modelValue",U.props.name),setTimeout(()=>{r=!1});return}P+=d}e.infinite===!0&&t.length!==0&&S!==-1&&S!==t.length&&C(d,d===-1?t.length:-1)}function H(){const d=Q(e.modelValue);return w.value!==d&&(w.value=d),!0}function V(){const d=M(e.modelValue)===!0&&H()&&t[w.value];return e.keepAlive===!0?[u(J,N.value,[u(s.value===!0?a(f.value,()=>({...W,name:f.value})):W,{key:f.value,style:g.value},()=>d)])]:[u("div",{class:"q-panel scroll",style:g.value,key:f.value,role:"tabpanel"},[d])]}function re(){if(t.length!==0)return e.animated===!0?[u(X,{name:l.value},V)]:V()}function se(d){return t=Ie(b(d.default,[])).filter(S=>S.props!==null&&S.props.slot===void 0&&M(S.props.name)===!0),t.length}function le(){return t}return Object.assign(n,{next:m,previous:O,goTo:R}),{panelIndex:w,panelDirectives:c,updatePanelsList:se,updatePanelIndex:H,getPanelContent:re,getEnabledPanels:ae,getPanels:le,isValidPanelName:M,keepAliveProps:N,needsUniqueKeepAliveWrapper:s,goToPanelByOffset:C,goToPanel:R,nextPanel:m,previousPanel:O}}function ne(e){return u("div",{class:"q-stepper__step-content"},[u("div",{class:"q-stepper__step-inner"},b(e.default))])}const Y={setup(e,{slots:i}){return()=>ne(i)}},vt=T({name:"QStep",props:{...We,icon:String,color:String,title:{type:String,required:!0},caption:String,prefix:[String,Number],doneIcon:String,doneColor:String,activeIcon:String,activeColor:String,errorIcon:String,errorColor:String,headerNav:{type:Boolean,default:!0},done:Boolean,error:Boolean,onScroll:[Function,Array]},setup(e,{slots:i,emit:n}){const{proxy:{$q:a}}=x(),o=fe(Z,G);if(o===G)return console.error("QStep needs to be a child of QStepper"),G;const{getCache:t}=ie(),r=$(null),l=p(()=>o.value.modelValue===e.name),w=p(()=>a.platform.is.ios!==!0&&a.platform.is.chrome===!0||l.value!==!0||o.value.vertical!==!0?{}:{onScroll(I){const{target:v}=I;v.scrollTop>0&&(v.scrollTop=0),e.onScroll!==void 0&&n("scroll",I)}}),y=p(()=>typeof e.name=="string"||typeof e.name=="number"?e.name:String(e.name));function c(){const I=o.value.vertical;return I===!0&&o.value.keepAlive===!0?u(J,o.value.keepAliveProps.value,l.value===!0?[u(o.value.needsUniqueKeepAliveWrapper.value===!0?t(y.value,()=>({...Y,name:y.value})):Y,{key:y.value},i.default)]:void 0):I!==!0||l.value===!0?ne(i):void 0}return()=>u("div",{ref:r,class:"q-stepper__step",role:"tabpanel",...w.value},o.value.vertical===!0?[u(oe,{stepper:o.value,step:e,goToPanel:o.value.goToPanel}),o.value.animated===!0?u(qe,c):c()]:[c()])}}),_t=T({name:"QStepperNavigation",setup(e,{slots:i}){return()=>u("div",{class:"q-stepper__nav"},b(i.default))}}),Ze='<g transform="translate(-20,-20)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g><g transform="translate(20,20) rotate(15 50 50)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g>',St=T({name:"QSpinnerGears",props:he,setup(e){const{cSize:i,classes:n}=ge(e);return()=>u("svg",{class:n.value,width:i.value,height:i.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg",innerHTML:Ze})}}),yt=T({name:"QInnerLoading",props:{...ee,...Pe,showing:Boolean,color:String,size:{type:[String,Number],default:"42px"},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(e,{slots:i}){const n=x(),a=te(e,n.proxy.$q),{transitionProps:o,transitionStyle:t}=$e(e),r=p(()=>"q-inner-loading q--avoid-card-border absolute-full column flex-center"+(a.value===!0?" q-inner-loading--dark":"")),l=p(()=>"q-inner-loading__label"+(e.labelClass!==void 0?` ${e.labelClass}`:""));function w(){const c=[u(Ne,{size:e.size,color:e.color})];return e.label!==void 0&&c.push(u("div",{class:l.value,style:e.labelStyle},[e.label])),c}function y(){return e.showing===!0?u("div",{class:r.value,style:t.value},i.default!==void 0?i.default():w()):null}return()=>u(X,o.value,y)}}),et=/(-\w)/g;function tt(e){const i={};for(const n in e){const a=n.replace(et,o=>o[1].toUpperCase());i[a]=e[n]}return i}const It=T({name:"QStepper",props:{...ee,...Ye,flat:Boolean,bordered:Boolean,alternativeLabels:Boolean,headerNav:Boolean,contracted:Boolean,headerClass:String,inactiveColor:String,inactiveIcon:String,doneIcon:String,doneColor:String,activeIcon:String,activeColor:String,errorIcon:String,errorColor:String},emits:Xe,setup(e,{slots:i}){const n=x(),a=te(e,n.proxy.$q),{updatePanelsList:o,isValidPanelName:t,updatePanelIndex:r,getPanelContent:l,getPanels:w,panelDirectives:y,goToPanel:c,keepAliveProps:I,needsUniqueKeepAliveWrapper:v}=Je();Oe(Z,p(()=>({goToPanel:c,keepAliveProps:I,needsUniqueKeepAliveWrapper:v,...e})));const g=p(()=>`q-stepper q-stepper--${e.vertical===!0?"vertical":"horizontal"}`+(e.flat===!0?" q-stepper--flat":"")+(e.bordered===!0?" q-stepper--bordered":"")+(a.value===!0?" q-stepper--dark q-dark":"")),f=p(()=>`q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels===!0?"alternative":"standard"}-labels`+(e.flat===!1||e.bordered===!0?" q-stepper__header--border":"")+(e.contracted===!0?" q-stepper__header--contracted":"")+(e.headerClass!==void 0?` ${e.headerClass}`:""));function N(){const s=b(i.message,[]);if(e.vertical===!0){t(e.modelValue)&&r();const m=u("div",{class:"q-stepper__content"},b(i.default));return s===void 0?[m]:s.concat(m)}return[u("div",{class:f.value},w().map(m=>{const O=tt(m.props);return u(oe,{key:O.name,stepper:e,step:O,goToPanel:c})})),s,Te("div",{class:"q-stepper__content q-panel-parent"},l(),"cont",e.swipeable,()=>y.value)]}return()=>(o(i),u("div",{class:g.value},be(i.navigation,N())))}});export{pt as C,vt as Q,De as S,Be as a,xe as b,Me as c,mt as d,ct as e,ut as f,dt as g,wt as h,_t as i,yt as j,St as k,It as l,lt as m,ie as u};
