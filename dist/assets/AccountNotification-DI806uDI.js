import{g as t}from"./index-DO6kqxPy.js";const i=t`
query AccountNotification($_id: String!) {
  AccountNotification(_id: $_id) {
    _id
    account_id
    contact_id
    send_email
    send_sms
    severity
    ContactEmail
    AccountName
    ContactPrimaryPhone
    ContactMobilePhone
    ContactName
    ContactAlternativePhone
    deleted_at
    NotificationTypes
    description
    SIEMNotificationName
  }
}
`,a=t`
query AccountNotifications($page: Int, $account_id: Int, $contact_id: Int, $first: Int) {
  AccountNotifications(first: $first, page: $page, account_id: $account_id, contact_id: $contact_id) {
    data {
      _id
      account_id
      contact_id
      send_email
      send_sms
      severity
      ContactEmail
      AccountName
      ContactPrimaryPhone
      ContactMobilePhone
      ContactName
      ContactAlternativePhone
      deleted_at
      NotificationTypes
      SIEMNotificationName
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
`;export{a as A,i as a};
