import{d as Q}from"./dark-mode-Cd1QLq0S.js";import{ay as m,T as I,aB as $,U as P,ax as L,D as h,N as g,E as u,F as r,Q as x,a4 as G,aT as A,O as k,R as C,bK as B,bL as R,G as N,bC as E,bD as H,bM as z,Y as U,$ as D,bN as K,aQ as j,aU as V,aw as W,J as Y,a5 as J}from"./index-D5yNAYFk.js";import{g as d}from"./index-B22rUDyO.js";import{u as X}from"./use-quasar-DBA3fETA.js";import{Q as Z}from"./QSlideTransition-JFkgWch6.js";import{a as ee,u as te,b as ie,c as oe,d as ne}from"./use-panel-Dyw4-_qV.js";const ae=d`
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
`,se=d`
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
`,qe=d`
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
`,re=d`
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
`,le=d`
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
`,Be=d`
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
`,de=d`
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
`,ce=d`
  mutation DeleteSowGuidelineMutation($id: Int!) {
    DeleteSowGuidelineMutation(id: $id) {
      id
      ImplementationTypeID
      BillingFrequency
    }
  }
`,Ue=d`
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
`,ue=d`
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
`,pe=d`
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
`,De=d`
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
`,we=d`
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
`,me=d`
  mutation DeleteSowServiceMutation($_id: String!) {
    DeleteSowServiceMutation(_id: $_id) {
      _id
      BillingFrequency
    }
  }
`,Me=d`
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
`,_e=d`
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
`,Se=d`
  mutation DeleteSowServiceBundleMutation($_id: String!) {
    DeleteSowServiceBundleMutation(_id: $_id) {
      _id
      BillingFrequency
    }
  }
`,ve=d`
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
`,Fe=d`
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
`,Ie=d`
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
`,ye=d`
  mutation DeleteSowImplementationTypeMutation($id: Int!) {
    DeleteSowImplementationTypeMutation(id: $id) {
      id
      Name
    }
  }
`,he=d`
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
`,Qe=Q({id:"implementation",state:()=>({sowImplementations:[],sowGuidelines:[],sowProducts:[],sowServices:[],sowServiceBundles:[],sowID:null,pushNewResponseData:null,$q:X(),initialLoad:!0}),actions:{onSetValueCallback(e){this.pushNewResponseData=e},setSowID(e){this.sowID=e},async fetchSowImplementations(){const e=I(0),{result:o,refetch:i}=$(se,()=>({sow_idNew:this.sowID}));this.initialLoad||i(),setTimeout(()=>{this.initialLoad=!1},3e3),L(()=>{if(o.value&&o.value.SowImplementationTypes.data&&e.value<2){e.value++;const n=o.value.SowImplementationTypes.data.map((t,a)=>({...t,showProdServ:I(!1),isProdServices:!1,isEditing:!1,index:a,Name:t.sow_detail?t.sow_detail:t.Name}));this.sowImplementations=n.sort((t,a)=>t.sow_order-a.sow_order)}})},async fetchSowGuidelines(){const{result:e,refetch:o}=$(ve,()=>({sow_idNew:this.sowID}));this.initialLoad||o(),P(()=>e.value,()=>{if(e.value){const i=e.value.SowGuidelines.data.map((n,t)=>({...n,type:"Guideline",index:t,Name:n.sow_detail?n.sow_detail:n.Name,editingValue:I(""),Quantity:n.quantity,IsOptional:n.IsOptional?n.IsOptional:!1}));this.sowGuidelines=i,i.forEach(n=>{n.BillingFrequency!=="One-Time"&&!this.sowServices.some(t=>t._id===n._id)&&this.sowServices.push({...n,FixedPrice:n.UnitPrice,type:"Guideline",index:n.index})})}})},async fetchSowProducts(){const e=I(0),{result:o,refetch:i}=$(le,()=>({sow_idNew:this.sowID}));this.initialLoad||i(),P(()=>o.value,()=>{if(o.value){console.log(o.value.SowProducts.data,"SOW Products in watchEffect() STORE.js");const n=o.value.SowProducts.data.map((t,a)=>({...t,FixedPrice:t.UnitPrice,type:"Product",index:a,IsOptional:t.IsOptional?t.IsOptional:!1}));e.value++,this.sowProducts=n,n.forEach(t=>{t.BillingFrequency!=="One-Time"&&!this.sowServices.some(a=>a.Name===t.Name)&&this.sowServices.push({...t,FixedPrice:t.UnitPrice,type:"Product",index:t.index})})}})},async fetchSowServices(){const{result:e,refetch:o}=$(ae,()=>({sow_idNew:this.sowID}));this.initialLoad||o();const i=I(0);P(()=>e.value,()=>{if(e.value){console.log("SOW Services in STORE.js",e.value);const n=e.value.SowServices.data.map((t,a)=>({...t,FixedPrice:t.UnitPrice,type:"Service",index:a}));this.sowServices=n.filter(t=>!this.sowServices.some(a=>t.Name===a.Name)),this.sowProducts.forEach(t=>{t.BillingFrequency==="One-Time"&&!this.sowServices.some(a=>a.Name===t.Name)&&this.sowServices.push({...t,FixedPrice:t.UnitPrice,type:"Product",index:t.index})}),i.value++}})},async fetchSowServiceBundles(){const e=I(0),{result:o,refetch:i}=$(re,()=>({sow_idNew:this.sowID}));this.initialLoad||i(),P(()=>o.value,()=>{if(o.value){console.log(o.value,"SOW Service Bundles in watchEffect() STORE.js");const n=o.value.SowServiceBundles.data.map((t,a)=>({...t,FixedPrice:t.UnitPrice,type:"ServiceBundle",index:a}));this.sowServiceBundles=n,this.sowServiceBundles.forEach(t=>{this.sowServices.some(a=>a._id===t._id)||this.sowServices.push({...t,FixedPrice:t.UnitPrice,type:"ServiceBundle",index:t.index})}),e.value++}})},async updateSowImplementation(e,o,i){try{let n={_id:e._id,sow_idNew:this.sowID};typeof o=="boolean"?(n={...n,IsOptional:o},this.sowGuidelines=this.sowGuidelines.map(l=>(l.ImplementationTypeID===e.implementation_type_id&&(l.IsOptional=o,this.updateSowGuideline({row:l,field:"IsOptional",dontUpdate:!0})),l))):o==="order"?n={...n,sow_order:i}:n={...n,sow_detail:o};const{mutate:t}=m(Ie),{data:a}=await t(n);this.sowImplementations=this.sowImplementations.map(l=>(l._id===a.UpdateSowImplementationTypeMutation._id&&(l.sow_detail=a.UpdateSowImplementationTypeMutation.sow_detail,l.sow_order=i),l));const p=a.UpdateSowImplementationTypeMutation;o!=="order"&&this.pushNewResponseData("implementation","update",p)}catch(n){console.error(n)}},async deleteImplementation(e){try{const o={_id:e},{mutate:i}=m(ye),{data:n}=await i(o),t=n.DeleteSowImplementationTypeMutation;this.sowImplementations=this.sowImplementations.filter(a=>a._id!==t._id),this.sowGuidelines=this.sowGuidelines.filter(a=>a.ImplementationTypeID!==t._id),this.sowProducts=this.sowProducts.filter(a=>a.SowImplementationTypeID!==t._id),this.sowServices=this.sowServices.filter(a=>a.SowImplementationTypeName!==t.Name||a.ImplementationTypeID!==t._id),this.pushNewResponseData("implementation","delete",t),this.$q.notify({message:"Implementation Deleted: "+t.Name,color:"indigo-7",textColor:"white",icon:"delete",position:"bottom",timeout:5e3,actions:[{color:"white",handler:()=>this.restoreImplementation(e),label:"Undo",icon:"undo"}]})}catch(o){console.error(o)}},async restoreImplementation(e){try{const o={_id:e},{mutate:i}=m(he),{data:n}=await i(o),t=n.RestoreSowImplementationTypeMutation;this.pushNewResponseData("implementation","create",t),this.$q.notify({message:"Implementation Restored: "+t.Name,color:"green-7",textColor:"white",icon:"done",position:"bottom",timeout:2e3})}catch(o){console.error(o)}},async updateSowGuideline({row:e,field:o,dontUpdate:i}){try{console.log("updateSowGuideline",e,o,e.sow_order);let n={_id:e._id};switch(o){case"Name":console.log("NAME",e.sow_order,"row.index",e.index),n={...n,sow_detail:e.Name};break;case"Quantity":console.log("QTY",e.sow_order,"row.index",e.index),n={...n,quantity:parseInt(e.Quantity)};break;case"PriceOverride":console.log("PRICEOVERRIDE",e.sow_order,"row.index",e.index),n={...n,PriceOverride:e.UnitPrice};break;case"sow_order":console.log(e.Name,e.sow_order),n={...n,sow_order:e.sow_order};break;case"IsOptional":n={...n,IsOptional:e.IsOptional};break;case"IsAlreadyImplemented":n={...n,IsAlreadyImplemented:e.IsAlreadyImplemented===1},this.sowProducts=this.sowProducts.map(a=>(a.sow_guideline_idNew===e._id&&(a.IsAlreadyImplemented=e.IsAlreadyImplemented),a));break}const{mutate:t}=m(de);if(!i){const{data:a}=await t(n),p=a.UpdateSowGuidelineMutation;console.log(p,"guideline update response data"),o!=="sow_order"&&this.pushNewResponseData("guideline","update",{...p,LineTotal:p.LineTotal})}}catch(n){console.error(n)}},async deleteSowGuideline(e){try{const o={_id:e._id},{mutate:i}=m(ce),{data:n}=await i(o),t=n.DeleteSowGuidelineMutation;this.sowGuidelines=this.sowGuidelines.filter(a=>a._id!==t._id),this.sowProducts=this.sowProducts.filter(a=>a.sow_guideline_idNew!==t._id),this.sowServices=this.sowServices.filter(a=>a.sow_guideline_idNew!==t._id),this.sowServiceBundles=this.sowServiceBundles.filter(a=>a.sow_guideline_idNew!==t._id),this.pushNewResponseData("guideline","delete",t)}catch(o){console.error(o)}},async updateSowProduct({row:e,field:o}){try{let i={_id:e._id};switch(o){case"Name":i={...i,sow_detail:e.Name};break;case"Quantity":i={...i,Quantity:parseInt(e.Quantity)};break;case"IsOptional":i={...i,IsOptional:e.IsOptional};break;case"sow_order":i={...i,sow_order:e.sow_order};break;case"PriceOverride":e.SowGuidelineName==="Multiple"?i={...i,PriceOverride:e.UnitPrice,product_id:e.product_id,sow_implementation_type_id:e.SowImplementationTypeID}:i={...i,PriceOverride:e.UnitPrice};break}const{mutate:n}=m(ue),{data:t}=await n(i),a=t.UpdateSowProductMutation;console.log(a,"updateSowProduct()"),o!=="sow_order"?this.pushNewResponseData("product","update",a):console.log(a.Name,"SowProduct Updated, sow_order: ",a.sow_order)}catch(i){console.error(i)}},async deleteSowProduct(e){try{let o={_id:e._id};const{mutate:i}=m(pe),{data:n}=await i(o),t=n.DeleteSowProductMutation;this.sowProducts=this.sowProducts.filter(a=>a._id!==t._id),this.pushNewResponseData("product","delete",t)}catch(o){console.error(o)}},async updateSowService({row:e,field:o}){try{let i={_id:e._id};switch(o){case"Quantity":i={...i,Quantity:parseInt(e.Quantity)};break;case"IsOptional":i={...i,IsOptional:e.IsOptional};break;case"sow_order":i={...i,sow_order:e.sow_order};break;case"SetupFeeOverride":i={...i,SetupFeeOverride:e.UnitSetupFee};break;case"PriceOverride":e.SowGuidelineName==="Multiple"?i={...i,PriceOverride:e.UnitPrice,service_id:e.service_id,sow_implementation_type_id:e.SowImplementationTypeID}:i={...i,PriceOverride:e.UnitPrice};break}const{mutate:n}=m(we),{data:t}=await n(i),a=t.UpdateSowServiceMutation;o!=="sow_order"?this.pushNewResponseData("service","update",a):console.log(a.Name,"SowService Updated, sow_order: ",a.sow_order)}catch(i){console.error(i)}},async deleteSowService(e){try{const{mutate:o}=m(me),{data:i}=await o({_id:e._id}),n=i.DeleteSowServiceMutation;this.sowServices=this.sowServices.filter(t=>t._id!==n._id),this.pushNewResponseData("service","delete",n)}catch(o){console.error(o)}},async updateSowServiceBundle({row:e,field:o}){console.log(e,o,"updateSowServiceBundle");try{let i={_id:e._id};switch(o){case"Quantity":i={...i,Quantity:parseInt(e.Quantity)};break;case"sow_order":i={...i,sow_order:e.sow_order};break;case"PriceOverride":i={...i,PriceOverride:e.UnitPrice};break;case"SetupFeeOverride":i={...i,SetupFeeOverride:e.UnitSetupFee};break}const{mutate:n}=m(_e),{data:t}=await n(i),a=t.UpdateSowServiceBundleMutation;o!=="sow_order"?this.pushNewResponseData("service","update",a):console.log(a.Name,"SowBUNDLE Updated, sow_order: ",a.sow_order)}catch(i){console.error(i)}},async deleteSowServiceBundle(e){try{const{mutate:o}=m(Se),{data:i}=await o({_id:e._id}),n=i.DeleteSowServiceBundleMutation;this.sowServices=this.sowServices.filter(t=>t._id!==e._id),this.sowServiceBundles=this.sowServiceBundles.filter(t=>t._id!==n._id),this.pushNewResponseData("service","delete",n)}catch(o){console.error(o)}}}}),M=h({name:"StepHeader",props:{stepper:{},step:{},goToPanel:Function},setup(e,{attrs:o}){const{proxy:{$q:i}}=g(),n=I(null),t=u(()=>e.stepper.modelValue===e.step.name),a=u(()=>{const s=e.step.disable;return s===!0||s===""}),p=u(()=>{const s=e.step.error;return s===!0||s===""}),l=u(()=>{const s=e.step.done;return a.value===!1&&(s===!0||s==="")}),v=u(()=>{const s=e.step.headerNav,c=s===!0||s===""||s===void 0;return a.value===!1&&e.stepper.headerNav&&c}),_=u(()=>e.step.prefix&&(t.value===!1||e.stepper.activeIcon==="none")&&(p.value===!1||e.stepper.errorIcon==="none")&&(l.value===!1||e.stepper.doneIcon==="none")),w=u(()=>{const s=e.step.icon||e.stepper.inactiveIcon;if(t.value===!0){const c=e.step.activeIcon||e.stepper.activeIcon;return c==="none"?s:c||i.iconSet.stepper.active}if(p.value===!0){const c=e.step.errorIcon||e.stepper.errorIcon;return c==="none"?s:c||i.iconSet.stepper.error}if(a.value===!1&&l.value===!0){const c=e.step.doneIcon||e.stepper.doneIcon;return c==="none"?s:c||i.iconSet.stepper.done}return s}),S=u(()=>{const s=p.value===!0?e.step.errorColor||e.stepper.errorColor:void 0;if(t.value===!0){const c=e.step.activeColor||e.stepper.activeColor||e.step.color;return c!==void 0?c:s}return s!==void 0?s:a.value===!1&&l.value===!0?e.step.doneColor||e.stepper.doneColor||e.step.color||e.stepper.inactiveColor:e.step.color||e.stepper.inactiveColor}),y=u(()=>"q-stepper__tab col-grow flex items-center no-wrap relative-position"+(S.value!==void 0?` text-${S.value}`:"")+(p.value===!0?" q-stepper__tab--error q-stepper__tab--error-with-"+(_.value===!0?"prefix":"icon"):"")+(t.value===!0?" q-stepper__tab--active":"")+(l.value===!0?" q-stepper__tab--done":"")+(v.value===!0?" q-stepper__tab--navigation q-focusable q-hoverable":"")+(a.value===!0?" q-stepper__tab--disabled":"")),O=u(()=>e.stepper.headerNav!==!0?!1:v.value);function T(){n.value?.focus(),t.value===!1&&e.goToPanel(e.step.name)}function b(s){s.keyCode===13&&t.value===!1&&e.goToPanel(e.step.name)}return()=>{const s={class:y.value};v.value===!0&&(s.onClick=T,s.onKeyup=b,Object.assign(s,a.value===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:o.tabindex||0}));const c=[r("div",{class:"q-focus-helper",tabindex:-1,ref:n}),r("div",{class:"q-stepper__dot row flex-center q-stepper__line relative-position"},[r("span",{class:"row flex-center"},[_.value===!0?e.step.prefix:r(x,{name:w.value})])])];if(e.step.title!==void 0&&e.step.title!==null){const f=[r("div",{class:"q-stepper__title"},e.step.title)];e.step.caption!==void 0&&e.step.caption!==null&&f.push(r("div",{class:"q-stepper__caption"},e.step.caption)),c.push(r("div",{class:"q-stepper__label q-stepper__line relative-position"},f))}return G(r("div",s,c),[[A,O.value]])}}});function F(e){return r("div",{class:"q-stepper__step-content"},[r("div",{class:"q-stepper__step-inner"},N(e.default))])}const q={setup(e,{slots:o}){return()=>F(o)}},Le=h({name:"QStep",props:{...ee,icon:String,color:String,title:{type:String,required:!0},caption:String,prefix:[String,Number],doneIcon:String,doneColor:String,activeIcon:String,activeColor:String,errorIcon:String,errorColor:String,headerNav:{type:Boolean,default:!0},done:Boolean,error:Boolean,onScroll:[Function,Array]},setup(e,{slots:o,emit:i}){const{proxy:{$q:n}}=g(),t=k(B,C);if(t===C)return console.error("QStep needs to be a child of QStepper"),C;const{getCache:a}=te(),p=I(null),l=u(()=>t.value.modelValue===e.name),v=u(()=>n.platform.is.ios!==!0&&n.platform.is.chrome===!0||l.value!==!0||t.value.vertical!==!0?{}:{onScroll(S){const{target:y}=S;y.scrollTop>0&&(y.scrollTop=0),e.onScroll!==void 0&&i("scroll",S)}}),_=u(()=>typeof e.name=="string"||typeof e.name=="number"?e.name:String(e.name));function w(){const S=t.value.vertical;return S===!0&&t.value.keepAlive===!0?r(R,t.value.keepAliveProps.value,l.value===!0?[r(t.value.needsUniqueKeepAliveWrapper.value===!0?a(_.value,()=>({...q,name:_.value})):q,{key:_.value},o.default)]:void 0):S!==!0||l.value===!0?F(o):void 0}return()=>r("div",{ref:p,class:"q-stepper__step",role:"tabpanel",...v.value},t.value.vertical===!0?[r(M,{stepper:t.value,step:e,goToPanel:t.value.goToPanel}),t.value.animated===!0?r(Z,w):w()]:[w()])}}),xe=h({name:"QStepperNavigation",setup(e,{slots:o}){return()=>r("div",{class:"q-stepper__nav"},N(o.default))}}),fe='<g transform="translate(-20,-20)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g><g transform="translate(20,20) rotate(15 50 50)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g>',Ge=h({name:"QSpinnerGears",props:E,setup(e){const{cSize:o,classes:i}=H(e);return()=>r("svg",{class:i.value,width:o.value,height:o.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg",innerHTML:fe})}}),Ae=h({name:"QInnerLoading",props:{...U,...z,showing:Boolean,color:String,size:{type:[String,Number],default:"42px"},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(e,{slots:o}){const i=g(),n=D(e,i.proxy.$q),{transitionProps:t,transitionStyle:a}=K(e),p=u(()=>"q-inner-loading q--avoid-card-border absolute-full column flex-center"+(n.value===!0?" q-inner-loading--dark":"")),l=u(()=>"q-inner-loading__label"+(e.labelClass!==void 0?` ${e.labelClass}`:""));function v(){const w=[r(V,{size:e.size,color:e.color})];return e.label!==void 0&&w.push(r("div",{class:l.value,style:e.labelStyle},[e.label])),w}function _(){return e.showing===!0?r("div",{class:p.value,style:a.value},o.default!==void 0?o.default():v()):null}return()=>r(j,t.value,_)}}),$e=/(-\w)/g;function Pe(e){const o={};for(const i in e){const n=i.replace($e,t=>t[1].toUpperCase());o[n]=e[i]}return o}const ke=h({name:"QStepper",props:{...U,...oe,flat:Boolean,bordered:Boolean,alternativeLabels:Boolean,headerNav:Boolean,contracted:Boolean,headerClass:String,inactiveColor:String,inactiveIcon:String,doneIcon:String,doneColor:String,activeIcon:String,activeColor:String,errorIcon:String,errorColor:String},emits:ie,setup(e,{slots:o}){const i=g(),n=D(e,i.proxy.$q),{updatePanelsList:t,isValidPanelName:a,updatePanelIndex:p,getPanelContent:l,getPanels:v,panelDirectives:_,goToPanel:w,keepAliveProps:S,needsUniqueKeepAliveWrapper:y}=ne();W(B,u(()=>({goToPanel:w,keepAliveProps:S,needsUniqueKeepAliveWrapper:y,...e})));const O=u(()=>`q-stepper q-stepper--${e.vertical===!0?"vertical":"horizontal"}`+(e.flat===!0?" q-stepper--flat":"")+(e.bordered===!0?" q-stepper--bordered":"")+(n.value===!0?" q-stepper--dark q-dark":"")),T=u(()=>`q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels===!0?"alternative":"standard"}-labels`+(e.flat===!1||e.bordered===!0?" q-stepper__header--border":"")+(e.contracted===!0?" q-stepper__header--contracted":"")+(e.headerClass!==void 0?` ${e.headerClass}`:""));function b(){const s=N(o.message,[]);if(e.vertical===!0){a(e.modelValue)&&p();const c=r("div",{class:"q-stepper__content"},N(o.default));return s===void 0?[c]:s.concat(c)}return[r("div",{class:T.value},v().map(c=>{const f=Pe(c.props);return r(M,{key:f.name,stepper:e,step:f,goToPanel:w})})),s,J("div",{class:"q-stepper__content q-panel-parent"},l(),"cont",e.swipeable,()=>_.value)]}return()=>(t(o),r("div",{class:O.value},Y(o.navigation,b())))}});export{Me as C,Le as Q,se as S,ae as a,re as b,le as c,De as d,Ue as e,Be as f,Fe as g,xe as h,Ae as i,Ge as j,ke as k,qe as l,Qe as u};
