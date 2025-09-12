import gql from "graphql-tag";

const SiemNotificationQuery = gql`
  query SiemNotification($uid: Int) {
    SiemNotification(uid: $uid) {
      uid
      id
      title
      description
    }
  }
`;

const SiemNotificationsQuery = gql`
  query SiemNotifications($title: String, $first: Int, $page: Int) {
    SiemNotifications(title: $title, first: $first, page: $page) {
      data {
        uid
        id
        title
        description
      }
    }
  }
`;

export { SiemNotificationQuery, SiemNotificationsQuery };
