import{g as n}from"./index-DNzQhVUM.js";const o=n`
  mutation CreatePhoneMutation(
    $macaddress: String
    $config: String
    $notes: String
    $override_config: Boolean
    $override_qrconfig: Boolean
    $account_uid: Int
    $contact_uid: Int
    $displayname: String
    $extension_number: String
    $extension_password: String
    $phone_admin_password: String
    $qrconfig: String
    $voip_server: String
  ) {
    CreatePhoneMutation(
      macaddress: $macaddress
      config: $config
      notes: $notes
      override_config: $override_config
      override_qrconfig: $override_qrconfig
      account_uid: $account_uid
      contact_uid: $contact_uid
      displayname: $displayname
      extension_number: $extension_number
      extension_password: $extension_password
      phone_admin_password: $phone_admin_password
      qrconfig: $qrconfig
      voip_server: $voip_server
    ) {
      _id
      macaddress
      config
      notes
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
  }
`,i=n`
  mutation UpdatePhoneMutation(
    $_id: String!
    $macaddress: String
    $config: String
    $notes: String
    $override_config: Boolean
    $override_qrconfig: Boolean
    # $account_uid: Int
    # $contact_uid: Int
    $displayname: String
    $extension_number: String
    $extension_password: String
    $phone_admin_password: String
    $qrconfig: String
    $voip_server: String
  ) {
    UpdatePhoneMutation(
      _id: $_id
      macaddress: $macaddress
      config: $config
      notes: $notes
      override_config: $override_config
      override_qrconfig: $override_qrconfig
      # account_uid: $account_uid
      # contact_uid: $contact_uid
      displayname: $displayname
      extension_number: $extension_number
      extension_password: $extension_password
      phone_admin_password: $phone_admin_password
      qrconfig: $qrconfig
      voip_server: $voip_server
    ) {
      _id
      macaddress
      config
      notes
      updated_at
      created_at
      override_config
      override_qrconfig
      displayname
      extension_number
      extension_password
      phone_admin_password
      qrconfig
      voip_server
    }
  }
`,r=n`
  mutation DeletePhoneMutation($_id: String!) {
    DeletePhoneMutation(_id: $_id) {
      macaddress
      notes
      displayname
    }
  }
`;export{o as C,r as D,i as U};
