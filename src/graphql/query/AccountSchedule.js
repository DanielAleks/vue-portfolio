import gql from "graphql-tag";

const AccountSchedulesQuery = gql`
  query AccountSchedules {
    AccountSchedules {
      data {
        Target
        Task
        VulnerabilityScan {
          _id
          account_id
          Email
          FullName
          DomainName
          ApproverEmail
          CorporateDomainList
          Notes
          LastReportDate
          LastReportScanDuration
          LastScanResultCount
          LastScanErrorCount
          LastDiscoveryScanDuration
          LastScanError
          ScanStatus
          ScanStatusPercent
          discoveryStarted
          discoveryCompleted
          ScanCompleted
          reportSentForApproval
          reportApproved
          reportSent
          mauticform_submissions_id
          startDiscoveryLink
          startScanLink
          sendReportToClientLink
          sendReportForApprovalLink
          Targets
          CompanyName
        }

        # CompanyName
        # _id
        # account_id
        # ovs_task_id
        # created_at
        # updated_at
      }
    }
  }
`;

const AccountScheduleQuery = gql`
  query AccountSchedule {
    AccountSchedule(_id: "65b1b0a6ccbd008b840712a5") {
      Target
      Task
      CompanyName
        _id
        account_id
        ovs_task_id
        created_at
        updated_at
      VulnerabilityScan {
        _id
        account_id
        Email
        FullName
        DomainName
        ApproverEmail
        CorporateDomainList
        Notes
        LastReportDate
        LastReportScanDuration
        LastScanResultCount
        LastScanErrorCount
        LastDiscoveryScanDuration
        LastScanError
        ScanStatus
        ScanStatusPercent
        discoveryStarted
        discoveryCompleted
        ScanCompleted
        reportSentForApproval
        reportApproved
        reportSent
        mauticform_submissions_id
        startDiscoveryLink
        startScanLink
        sendReportToClientLink
        sendReportForApprovalLink
        Targets
        CompanyName
      }
    }
  }
`;

export { AccountSchedulesQuery, AccountScheduleQuery };
