import{g as t}from"./index-DNzQhVUM.js";const e=t`
  query Contacts(
    $companyID: Int
    $firstName: String
    $lastName: String
    $primaryContact: Boolean
    $page: Int
    $first: Int
  ) {
    Contacts(
      companyID: $companyID
      firstName: $firstName
      lastName: $lastName
      primaryContact: $primaryContact
      page: $page
      first: $first
    ) {
      data {
        autotask_id
        companyID
        companyLocationID
        isActive
        additionalAddressInformation
        addressLine
        addressLine1
        alternatePhone
        apiVendorID
        isOptedOutFromBulkEmail
        bulkEmailOptOutTime
        city
        countryID
        createDate
        eMailAddress
        eMailAddress2
        eMailAddress3
        extension
        externalID
        facebookUrl
        faxNumber
        firstName
        impersonatorCreatorResourceID
        lastActivityDate
        lastModifiedDate
        lastName
        linkedInUrl
        middleInitial
        mobilePhone
        namePrefix
        nameSuffix
        note
        phone
        primaryContact
        roomNumber
        solicitationOptOut
        solicitationOptOutTime
        state
        surveyOptOut
        title
        twitterUrl
        zipCode
        FullName
      }
    }
  }
`;export{e as C};
