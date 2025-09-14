import gql from "graphql-tag";

const PhoneQuery = gql`
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
`;

const PhonesQuery = gql`
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
`;

export { PhoneQuery, PhonesQuery }