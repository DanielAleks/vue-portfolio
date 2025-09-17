import{Q as E}from"./QSkeleton-Coym0GAQ.js";import{a6 as M,a7 as C,al as U,am as p,a9 as u,af as j,ac as h,ag as R,aj as B,ak as F,E as N,aB as y,T as r,ax as D,ay as P}from"./index-BmmqEUwr.js";import{Q as O}from"./QCardDetails-C0QU-irT.js";import{u as T}from"./use-quasar-jxPryvnm.js";import{g as S}from"./index-DO6kqxPy.js";import{I as A}from"./Introspection-BfTNXc1Q.js";import{u as L,s as z}from"./pinia-EQQjYdtZ.js";import{U as G,D as H}from"./Phone-CG0TUv6r.js";import"./ClosePopup-Dl7x5pRy.js";import"./QCardSection-W7OKuTbN.js";import"./QCardActions-gAV4t4Gq.js";import"./QCard-71HNS0Eo.js";import"./QDialog-DNaj6pyy.js";import"./dark-mode-CG8Py2TO.js";import"./use-key-composition-DGnxYdx2.js";import"./QFile-Dpo0hu6w.js";import"./QChip-CEk8Ad1K.js";import"./QToggle-CHdCZyvb.js";import"./parser-4S4bR1x6.js";const J=S`
query Phone($_id: String) {
    Phone(_id: $_id) {
        displayname
        notes
        _id
        macaddress
        CompanyName
        ContactName
        config
        extension_number
        extension_password
        voip_server
        updated_at
        created_at
        # account_uid
        # contact_uid
        phone_admin_password
        qrconfig
        override_config
        override_qrconfig
    }
}
`;S`
query Phones ($page: Int, $first: Int, $notes: String) {
    Phones (page: $page, first: $first, notes: $notes) {
        data {
            notes
            _id
            macaddress
            config
            updated_at
            created_at
            override_config
            override_qrconfig
            account_uid
            contact_uid
            displayname
            extension_number
            extension_password
            phone_admin_password
            qrconfig
            voip_server
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
`;const K=C({components:{QCardDetails:O},setup(){const o=B(),m=F(),d=N(()=>o.params.id),{result:t,error:l}=y(J,()=>({_id:d.value})),a=r({}),n=r(!0);D(()=>{l.value&&console.log(l.value,"Error"),t.value&&(console.log(t.value,"phoneData"),a.value=t.value.Phone,n.value=!1)});const f=r([]),{result:c,error:_}=y(A,()=>({name:"Phone"}));D(()=>{_.value&&console.log(_.value,"Error"),c.value&&(console.log(c.value.__type.fields,"introspect.value.__type.fields"),f.value=c.value.__type.fields)});const b=["macaddress","config","notes","override_config","override_qrconfig","displayname","extension_number","extension_password","phone_admin_password","qrconfig","voip_server"],{mutate:I,onDone:V}=P(G,()=>({variables:v.value}));V(e=>{console.log("onDoneUpdateScan",e),e.data&&e.data.UpdatePhoneMutation&&Object.entries(e.data.UpdatePhoneMutation).forEach(([s,i])=>{a.value[s]!==i&&(a.value[s]=i)})});const{mutate:g,onDone:$}=P(H,()=>({variables:{_id:o.params.id}})),q=T();$(e=>{console.log("onDoneDeleteTask",e),q.notify({message:"Phone VoIP Deleted: "+e.data.DeletePhoneMutation.notes+" ("+e.data.DeletePhoneMutation.displayname+")",color:"primary",icon:"delete",timeout:5e3}),setTimeout(()=>{m.push("/voip-provisioning")},3e3)});const v=r({});function w(e,s){let i=Object.keys(e)[0],k=Object.values(e)[0];s!=="delete"?i!=="IsDeprecated"?(v.value={_id:o.params.id,...e},I()):k!==!1&&g():g()}const x=L(z);function Q(e){console.log("setAccountSchedule",e),x.setVulnScanID(e)}return{routeID:d,phone:a,loading:n,phoneData:t,introspectionVulnScans:f,editableFields:b,updateVulnerabilityScan:w,setAccountSchedule:Q}}}),W={class:"flex justify-center ml-1 md:mx-10 animate__animated animate__fadeIn",style:{width:"100%"}},X={style:{width:"100%"}},Y={key:0,class:"mb-8 text-center text-2xl dark:text-slate-300 relative"},Z={key:1,class:"flex justify-center"};function ee(o,m,d,t,l,a){const n=U("QCardDetails");return u(),p("div",W,[j("div",X,[o.loading?(u(),p("div",Z,[h(E,{class:"mb-8 h-3 w-80"})])):(u(),p("p",Y," VoIP Provisioning - "+R(o.phone.notes),1)),h(n,{response:o.phone,introspectionValue:o.introspectionVulnScans,updateResponse:o.updateVulnerabilityScan,editableFields:o.editableFields,isLoading:o.loading},null,8,["response","introspectionValue","updateResponse","editableFields","isLoading"])])])}const De=M(K,[["render",ee]]);export{De as default};
