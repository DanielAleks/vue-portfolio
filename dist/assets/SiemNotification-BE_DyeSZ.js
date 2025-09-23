import{g as i}from"./index-B22rUDyO.js";i`
  query SiemNotification($uid: Int) {
    SiemNotification(uid: $uid) {
      uid
      id
      title
      description
    }
  }
`;const e=i`
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
`;export{e as S};
