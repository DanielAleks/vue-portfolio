import{g as t}from"./index-wVk5-s-q.js";const n=t`
mutation CreateAccountNotificationMutation(
  $account_id: Int!
  $contact_id: Int!
  $send_email: Boolean!
  $send_sms: Boolean!
  $severity: [Int!]
  $siem_notification_id: String
  $description: String
) {
  CreateAccountNotificationMutation(
    account_id: $account_id
    contact_id: $contact_id
    send_email: $send_email
    send_sms: $send_sms
    severity: $severity
    siem_notification_id: $siem_notification_id
    description: $description
  ) {
    _id
    account_id
    contact_id
    send_email
    send_sms
    severity
    ContactEmail
    AccountName
    ContactEmail
    ContactPrimaryPhone
    ContactMobilePhone
    ContactName
    ContactAlternativePhone
    deleted_at
    description
  }
}
`,o=t`
mutation UpdateAccountNotificationMutation(
  $_id: String!
  $send_email: Boolean!
  $send_sms: Boolean!
  $severity: [Int!]
  $siem_notification_id: String
  $description: String
) {
  UpdateAccountNotificationMutation(
    _id: $_id
    send_email: $send_email
    send_sms: $send_sms
    severity: $severity
    siem_notification_id: $siem_notification_id
    description: $description
  ) {
    _id
    account_id
    contact_id
    send_email
    send_sms
    severity
    ContactEmail
    AccountName
    ContactEmail
    ContactPrimaryPhone
    ContactMobilePhone
    ContactName
    ContactAlternativePhone
    deleted_at
    description
  }
}
`,e=t`
mutation DeleteAccountNotificationMutation($_id: String!) {
  DeleteAccountNotificationMutation(_id: $_id) {
    _id
    account_id
    contact_id
  }
}
`;export{n as C,e as D,o as U};
