import{g as a}from"./index-wVk5-s-q.js";const e=a`
  query Company($autotask_id: Int) {
    Company(autotask_id: $autotask_id) {
      autotask_id
      companyName
      companyType
      CompanyTypeString
      parentCompanyID
      ownerResourceID
      OwnerName
      ParentAccountName
      AutotaskLink
      TotalSpend
      TicketSummaryJSON
      AvailableNotifications
      HasSignedContactForm
      phone
      MSAAddress1
      MSAAddress2
      # SiemNotifications {
      #   id
      #   title
      #   description
      # }
      
      # subquery can be useful in specific cases (otherwise slow wait-time
      # Sows {
      #   id
      #   Name
      #   Opportunity {
      #     StageName
      #   }
      #   Company {
      #     companyName
      #   }
      # }
    }
  }
`,o=a`
  query Companies($companyName: String, $page: Int, $first: Int) {
    Companies(companyName: $companyName, page: $page, first: $first) {
      data {
        autotask_id
        companyName
        companyType
        CompanyTypeString
        ParentAccountName
        AvailableNotifications
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
      }
    }
  }
`;a`
  query Company($autotask_id: Int!) {
    Company(autotask_id: $autotask_id) {
      autotask_id
      companyName
      companyType
      ParentAccountName
      TicketSummaryJSON
      AvailableNotifications
    }
  }
`;a`
  query Companies($companyName: String, $page: Int) {
    Companies(companyName: $companyName, page: $page, first: 20) {
      data {
        autotask_id
        companyName
      }
    }
  }
`;export{o as A,e as a};
